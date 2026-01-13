import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { NetworkId } from '@real-token/core';

import {
  ApiPriceToken,
  tokenToGetPriceApi,
} from '../../../src/constants/GetPriceTokenApi';
import { getChainlinkPrice } from '../../../src/controllers/ChainLinkCall';
import { getCoingeckoApiPrice } from '../../../src/controllers/CoingeckoApiCall';
import { Price } from '../../../src/types/price';

// RPC URLs avec valeurs par défaut (public RPCs)
// Note: Les RPC publics peuvent bloquer les IPs Vercel - préférer des RPC privés en production
const gnosisRpcUrl =
  process.env.GNOSIS_RPC_URL && process.env.GNOSIS_RPC_URL.trim() !== ''
    ? process.env.GNOSIS_RPC_URL
    : 'https://rpc.gnosis.gateway.fm';
const ethereumRpcUrl =
  process.env.ETHEREUM_RPC_URL && process.env.ETHEREUM_RPC_URL.trim() !== ''
    ? process.env.ETHEREUM_RPC_URL
    : 'https://ethereum-rpc.publicnode.com';
const sepoliaRpcUrl =
  process.env.SEPOLIA_RPC_URL && process.env.SEPOLIA_RPC_URL.trim() !== ''
    ? process.env.SEPOLIA_RPC_URL
    : 'https://ethereum-sepolia-rpc.publicnode.com';

const rpcUrls = new Map<number, string>([
  [Number(NetworkId.gnosis), gnosisRpcUrl],
  [Number(NetworkId.ethereum), ethereumRpcUrl],
  [Number(NetworkId.sepolia), sepoliaRpcUrl],
]);

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const startTime = Date.now();
  console.log('[prices] Handler started');

  try {
    const { chainId: id } = req.query;
    console.log('[prices] chainId from query:', id);

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ChainId is missing or invalid.' });
    }

    const chainId = Number(id);
    if (isNaN(chainId)) {
      return res.status(400).json({ error: 'ChainId must be a valid number.' });
    }

    const tokens = tokenToGetPriceApi.get(chainId);
    console.log('[prices] tokens count:', tokens?.length ?? 0);

    if (!tokens) {
      return res.status(400).json({
        error: `ChainId ${chainId} is not supported. Supported chains: ${Array.from(
          tokenToGetPriceApi.keys()
        ).join(', ')}`,
      });
    }

    const rpcUrl = rpcUrls.get(chainId);
    console.log('[prices] rpcUrl:', rpcUrl);

    if (!rpcUrl) {
      return res.status(400).json({
        error: `RPC URL not configured for chainId ${chainId}. Please set ${
          chainId.toString() === NetworkId.gnosis
            ? 'GNOSIS_RPC_URL'
            : chainId.toString() === NetworkId.ethereum
            ? 'ETHEREUM_RPC_URL'
            : 'SEPOLIA_RPC_URL'
        } in your .env file.`,
      });
    }

    console.log('[prices] Starting price fetches...');
    const prices = await Promise.all<Price>(
      tokens.map(async (token: ApiPriceToken): Promise<Price> => {
        const defaultPrice: Price = {
          contractAddress: token.contractAddress,
          price: '0',
        };

        try {
          const priceFnc = token.priceFnc;

          if (priceFnc.type === 'chainlink') {
            return await getChainlinkPrice(
              chainId,
              {
                contractAddress: token.contractAddress,
                priceFnc: { type: 'chainlink', contractAddress: priceFnc.contractAddress },
              },
              rpcUrl
            );
          }

          if (priceFnc.type === 'coingecko-api') {
            return await getCoingeckoApiPrice(
              {
                contractAddress: token.contractAddress,
                priceFnc: { type: 'coingecko-api', address: priceFnc.address },
              },
              chainId
            );
          }

          if (priceFnc.type === 'custom-fnc') {
            const price = await priceFnc.fnc();
            return {
              contractAddress: token.contractAddress,
              price: price.toString(),
            };
          }

          return defaultPrice;
        } catch (error) {
          console.error(
            `Failed to get price for ${token.contractAddress}:`,
            error
          );
          return defaultPrice;
        }
      })
    );

    console.log('[prices] All fetches completed, processing results...');
    const pricesParsed = prices.reduce<Record<string, number>>((acc, price) => {
      if (!price) return acc;
      acc[price.contractAddress.toLowerCase()] = Number(price.price);
      return acc;
    }, {});

    const duration = Date.now() - startTime;
    console.log(`[prices] Success in ${duration}ms, returning ${Object.keys(pricesParsed).length} prices`);

    return res
      .setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
      .status(200)
      .json(pricesParsed);
  } catch (err) {
    const duration = Date.now() - startTime;
    console.error(`[prices] Error after ${duration}ms:`, err);
    return res.status(500).json({ error: 'Failed to fetch asset prices' });
  }
};
export default handler;
