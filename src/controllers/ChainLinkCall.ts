import BigNumber from 'bignumber.js';
import { createPublicClient, http } from 'viem';
import { gnosis, sepolia } from 'viem/chains';
import { mainnet } from 'src/config/viemMainnet';

import { oraclePriceFeedABI } from 'src/abis';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { Price as P, Price } from 'src/types/price';

// Simplified type for API usage (no React dependencies)
export interface ChainlinkPriceParams {
  contractAddress: string;
  priceFnc: {
    type: 'chainlink';
    contractAddress: string;
  };
}

// Chainlink USD price feeds always use 8 decimals
const CHAINLINK_USD_DECIMALS = 8;

// Map chainId to viem chain objects
const getChainFromId = (chainId: number) => {
  switch (chainId) {
    case 1:
      return mainnet;
    case 100:
      return gnosis;
    case 11155111: // Sepolia
      return sepolia;
    default:
      return mainnet; // fallback
  }
};

// Batch fetch all chainlink prices in a single multicall
export const getChainlinkPricesBatch = async (
  chainId: number,
  tokens: ChainlinkPriceParams[],
  rpcUrl: string
): Promise<Price[]> => {
  const startTime = Date.now();
  console.log(`[chainlink] Batch fetching ${tokens.length} prices...`);

  const chain = getChainFromId(chainId);
  const client = createPublicClient({
    chain,
    transport: http(rpcUrl, { timeout: 10000 }),
    batch: { multicall: true },
  });

  const results = await Promise.all(
    tokens.map(async (token): Promise<Price> => {
      const oracleAddress = token.priceFnc.contractAddress;
      if (!oracleAddress) {
        return { contractAddress: token.contractAddress, price: '1' };
      }

      try {
        const assetPrice = await client.readContract({
          address: oracleAddress as `0x${string}`,
          abi: oraclePriceFeedABI,
          functionName: 'latestAnswer',
        });

        const tokenPrice = new BigNumber((assetPrice as bigint).toString()).shiftedBy(
          -CHAINLINK_USD_DECIMALS
        );

        return {
          contractAddress: token.contractAddress,
          price: tokenPrice.toString(),
        };
      } catch (err) {
        console.error(`[chainlink] Error for ${token.contractAddress.slice(0, 10)}:`, err);
        return { contractAddress: token.contractAddress, price: '1' };
      }
    })
  );

  console.log(`[chainlink] Batch completed in ${Date.now() - startTime}ms`);
  return results;
};

// Single price fetch (legacy, for compatibility)
export const getChainlinkPrice = async (
  chainId: number,
  allowedToken: ChainlinkPriceParams,
  rpcUrl: string
): Promise<Price> => {
  const results = await getChainlinkPricesBatch(chainId, [allowedToken], rpcUrl);
  return results[0];
};

export const getPriceInDollar = (
  prices: P,
  offer: Offer
): number | undefined => {
  if (offer.type == OFFER_TYPE.SELL) {
    const buyTokenPriceInDollar = parseFloat(
      prices[offer.buyerTokenAddress.toLowerCase()]
    );
    return buyTokenPriceInDollar * parseFloat(offer.price);
  }
  if (offer.type == OFFER_TYPE.BUY && offer.officialPrice) {
    const buyTokenPriceInDollar = 1 / parseFloat(offer.price);
    return buyTokenPriceInDollar;
  }
};

export const getBuyPriceInDollar = (
  prices: P,
  offer: Offer
): number | undefined => {
  return parseFloat(prices[offer.offerTokenAddress.toLowerCase()]);
};
