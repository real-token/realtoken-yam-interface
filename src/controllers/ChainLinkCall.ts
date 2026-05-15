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

const GNOSIS_MULTICALL3 = '0xcA11bde05977b3631167028862bE2a173976CA11' as const;

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
  });

  const tokensWithOracle = tokens.filter((t) => t.priceFnc.contractAddress);
  const tokensWithoutOracle = tokens.filter((t) => !t.priceFnc.contractAddress);

  const resultsWithoutOracle: Price[] = tokensWithoutOracle.map((token) => ({
    contractAddress: token.contractAddress,
    price: '1',
  }));

  if (tokensWithOracle.length === 0) {
    return resultsWithoutOracle;
  }

  // Un seul appel RPC par oracle (ex. USDC et armmv3USDC partagent le même feed)
  const uniqueOracleAddresses = [
    ...new Set(
      tokensWithOracle.map((t) => t.priceFnc.contractAddress.toLowerCase())
    ),
  ];

  const oraclePriceByAddress = new Map<string, string>();

  try {
    const multicallResult = await client.multicall({
      contracts: uniqueOracleAddresses.map((oracleAddress) => ({
        address: oracleAddress as `0x${string}`,
        abi: oraclePriceFeedABI,
        functionName: 'latestAnswer' as const,
      })),
      multicallAddress: GNOSIS_MULTICALL3,
    });

    uniqueOracleAddresses.forEach((oracleAddress, index) => {
      const entry = multicallResult[index];
      if (entry?.status === 'success' && entry.result !== undefined) {
        const tokenPrice = new BigNumber(entry.result.toString()).shiftedBy(
          -CHAINLINK_USD_DECIMALS
        );
        oraclePriceByAddress.set(oracleAddress, tokenPrice.toString());
      } else {
        console.error(
          `[chainlink] Multicall failed for oracle ${oracleAddress.slice(0, 10)}`
        );
        oraclePriceByAddress.set(oracleAddress, '1');
      }
    });
  } catch (err) {
    console.error('[chainlink] Multicall batch failed:', err);
    uniqueOracleAddresses.forEach((oracleAddress) => {
      oraclePriceByAddress.set(oracleAddress, '1');
    });
  }

  const resultsWithOracle: Price[] = tokensWithOracle.map((token) => {
    const oracleKey = token.priceFnc.contractAddress.toLowerCase();
    return {
      contractAddress: token.contractAddress,
      price: oraclePriceByAddress.get(oracleKey) ?? '1',
    };
  });

  console.log(
    `[chainlink] Batch completed in ${Date.now() - startTime}ms (${uniqueOracleAddresses.length} oracle(s), ${tokens.length} token(s))`
  );

  return [...resultsWithoutOracle, ...resultsWithOracle];
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
