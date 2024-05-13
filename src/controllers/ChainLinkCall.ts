import { JsonRpcProvider } from "@ethersproject/providers";
import BigNumber from "bignumber.js";
import { oraclePriceFeedABI } from "src/abis";
import { OraclePriceFeed } from "src/abis/types/oraclePriceFeed";
import { Offer, OFFER_TYPE } from "src/types/offer";
import { Price as P, Price } from "src/types/price";
import { getContract } from "../utils";
import { GetPriceTokenChainLink } from "../types/GetPriceTokens";
import { CHAINS, ChainsID } from "../constants";

export const getChainlinkPrice = (allowedToken: GetPriceTokenChainLink, chainId: number) => {
    return new Promise<Price>(async (resolve,reject) => {
      try{

        const rpcUrl = CHAINS[chainId as ChainsID].rpcUrl;
        console.log("rpcUrl: ", rpcUrl);

        const provider = new JsonRpcProvider(rpcUrl);

        const tokenAddress = allowedToken.contractAddress;
        const oracleContractAddress = allowedToken.priceFnc.contractAddress;
  
        if(!oracleContractAddress){
          resolve({ contractAddress: tokenAddress, price: BigNumber(1).toString() });
          return;
        }
  
        const oracleContract = getContract<OraclePriceFeed>(
          oracleContractAddress,
          oraclePriceFeedABI,
          provider
        );

        if(!oracleContract){
          resolve({ contractAddress: tokenAddress, price: BigNumber(1).toString() });
          return;
        }
  
        const assetPrice = await oracleContract.latestAnswer();
        const assetDecimals = await oracleContract.decimals();
        const tokenPrice = new BigNumber(assetPrice.toString()).shiftedBy(-assetDecimals);
    
        resolve({ contractAddress: tokenAddress, price: tokenPrice.toString() });
  
      }catch(err){
        console.log("Error while getting oracle price: ", err);
        reject(err)
      }
    });
}

export const getPriceInDollar = (prices: P, offer: Offer): number|undefined => {
  if(offer.type == OFFER_TYPE.SELL){
    const buyTokenPriceInDollar = parseFloat(prices[offer.buyerTokenAddress.toLowerCase()]);
    return buyTokenPriceInDollar*parseFloat(offer.price);
  }
  if(offer.type == OFFER_TYPE.BUY && offer.officialPrice){
    const buyTokenPriceInDollar = 1/parseFloat(offer.price);
    return buyTokenPriceInDollar;
  }
}

export const getBuyPriceInDollar = (prices: P, offer: Offer): number|undefined => {
  return parseFloat(prices[offer.offerTokenAddress.toLowerCase()]);
}