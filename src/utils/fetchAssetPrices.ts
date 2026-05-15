import { NetworkId } from '@real-token/core';

import {
  ApiPriceToken,
  tokenToGetPriceApi,
} from '../constants/GetPriceTokenApi';
import {
  ChainlinkPriceParams,
  getChainlinkPricesBatch,
} from '../controllers/ChainLinkCall';
import { getCoingeckoApiPrice } from '../controllers/CoingeckoApiCall';
import { Price } from '../types/price';

function getRpcUrlForChain(chainId: number): string | undefined {
  switch (chainId) {
    case Number(NetworkId.gnosis):
      return import.meta.env.VITE_GNOSIS_RPC_URL;
    case Number(NetworkId.ethereum):
      return import.meta.env.VITE_ETH_RPC_URL;
    case Number(NetworkId.sepolia):
      return import.meta.env.VITE_SEPOLIA_RPC_URL;
    default:
      return undefined;
  }
}

/**
 * Prix USD des tokens de paiement (USDC, WXDAI, REG, …) pour un réseau.
 * Reprend la logique de l’ancienne route Vercel `api-src/prices/[chainId].ts`.
 */
export async function fetchAssetPrices(chainId: number): Promise<Price> {
  const tokens = tokenToGetPriceApi.get(chainId);
  if (!tokens?.length) {
    return {};
  }

  const rpcUrl = getRpcUrlForChain(chainId);
  if (!rpcUrl) {
    throw new Error(`RPC URL not configured for chainId ${chainId}`);
  }

  const chainlinkTokens: ChainlinkPriceParams[] = [];
  const coingeckoTokens: ApiPriceToken[] = [];
  const customTokens: ApiPriceToken[] = [];

  for (const token of tokens) {
    if (token.priceFnc.type === 'chainlink') {
      chainlinkTokens.push({
        contractAddress: token.contractAddress,
        priceFnc: {
          type: 'chainlink',
          contractAddress: token.priceFnc.contractAddress,
        },
      });
    } else if (token.priceFnc.type === 'coingecko-api') {
      coingeckoTokens.push(token);
    } else if (token.priceFnc.type === 'custom-fnc') {
      customTokens.push(token);
    }
  }

  const [chainlinkPrices, coingeckoPrices, customPrices] = await Promise.all([
    chainlinkTokens.length > 0
      ? getChainlinkPricesBatch(chainId, chainlinkTokens, rpcUrl)
      : Promise.resolve([]),
    Promise.all(
      coingeckoTokens.map((token) =>
        getCoingeckoApiPrice(
          {
            contractAddress: token.contractAddress,
            priceFnc: {
              type: 'coingecko-api',
              address:
                token.priceFnc.type === 'coingecko-api'
                  ? token.priceFnc.address
                  : undefined,
            },
          },
          chainId
        ).catch(() => ({
          contractAddress: token.contractAddress,
          price: '0',
        }))
      )
    ),
    Promise.all(
      customTokens.map(async (token) => {
        try {
          if (token.priceFnc.type !== 'custom-fnc') {
            return { contractAddress: token.contractAddress, price: '0' };
          }
          const price = await token.priceFnc.fnc();
          return {
            contractAddress: token.contractAddress,
            price: price.toString(),
          };
        } catch {
          return { contractAddress: token.contractAddress, price: '0' };
        }
      })
    ),
  ]);

  const allPrices = [...chainlinkPrices, ...coingeckoPrices, ...customPrices];

  return allPrices.reduce<Price>((acc, entry) => {
    if (!entry) return acc;
    acc[entry.contractAddress.toLowerCase()] = entry.price;
    return acc;
  }, {});
}
