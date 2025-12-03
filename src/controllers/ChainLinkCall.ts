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

export const getChainlinkPrice = (
  chainId: number,
  allowedToken: GetPriceTokenChainLink,
  rpcUrl: string
) => {
  return new Promise<Price>(async (resolve, reject) => {
    try {
      const chain = getChainFromId(chainId);
      const client = createPublicClient({
        chain,
        transport: http(rpcUrl),
      });

      const tokenAddress = allowedToken.contractAddress;
      const oracleContractAddress = allowedToken.priceFnc.contractAddress;

      if (!oracleContractAddress) {
        resolve({
          contractAddress: tokenAddress,
          price: BigNumber(1).toString(),
        });
        return;
      }

      try {
        const assetPrice = (await readContract(client, {
          address: oracleContractAddress as `0x${string}`,
          abi: oraclePriceFeedABI,
          functionName: 'latestAnswer',
        })) as bigint;

        const assetDecimals = (await readContract(client, {
          address: oracleContractAddress as `0x${string}`,
          abi: oraclePriceFeedABI,
          functionName: 'decimals',
        })) as number;

        const tokenPrice = new BigNumber(assetPrice.toString()).shiftedBy(
          -assetDecimals
        );

        resolve({
          contractAddress: tokenAddress,
          price: tokenPrice.toString(),
        });
      } catch (contractError) {
        console.log('Error reading oracle contract: ', contractError);
        // Fallback to price 1 if contract read fails
        resolve({
          contractAddress: tokenAddress,
          price: BigNumber(1).toString(),
        });
      }
    } catch (err) {
      console.log('Error while getting oracle price: ', err);
      reject(err);
    }
  });
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
