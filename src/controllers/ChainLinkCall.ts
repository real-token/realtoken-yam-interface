import BigNumber from 'bignumber.js';
import { createPublicClient, http } from 'viem';
import { readContract } from 'viem/actions';
import { gnosis, mainnet, sepolia } from 'viem/chains';

import { oraclePriceFeedABI } from 'src/abis';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { Price as P, Price } from 'src/types/price';

import { GetPriceTokenChainLink } from '../types/GetPriceTokens';

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

export const getChainlinkPrice = async (
  chainId: number,
  allowedToken: GetPriceTokenChainLink,
  rpcUrl: string
): Promise<Price> => {
  const tokenAddress = allowedToken.contractAddress;
  const oracleContractAddress = allowedToken.priceFnc.contractAddress;

  const defaultPrice: Price = {
    contractAddress: tokenAddress,
    price: BigNumber(1).toString(),
  };

  if (!oracleContractAddress) {
    return defaultPrice;
  }

  try {
    const chain = getChainFromId(chainId);
    const client = createPublicClient({
      chain,
      transport: http(rpcUrl, { timeout: 5000 }), // 5s timeout
    });

    // Execute both RPC calls in parallel
    const [assetPrice, assetDecimals] = await Promise.all([
      readContract(client, {
        address: oracleContractAddress as `0x${string}`,
        abi: oraclePriceFeedABI,
        functionName: 'latestAnswer',
      }) as Promise<bigint>,
      readContract(client, {
        address: oracleContractAddress as `0x${string}`,
        abi: oraclePriceFeedABI,
        functionName: 'decimals',
      }) as Promise<number>,
    ]);

    const tokenPrice = new BigNumber(assetPrice.toString()).shiftedBy(
      -assetDecimals
    );

    return {
      contractAddress: tokenAddress,
      price: tokenPrice.toString(),
    };
  } catch (err) {
    console.error(`Error reading oracle for ${tokenAddress}:`, err);
    return defaultPrice;
  }
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
