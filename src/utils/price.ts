import { Web3Provider } from "@ethersproject/providers";
import BigNumber from "bignumber.js";
import { oraclePriceFeedABI } from "src/abis";
import { OraclePriceFeed } from "src/abis/types/oraclePriceFeed";
import { AllowedToken } from "src/types/allowedTokens";
import { chainLink } from "./chainlink/chainlink";
import { getContract } from "./getContract";

export interface Price{
  contractAddress: string;
  price: string;
}

export const getPrice = (provider: Web3Provider, allowedToken: AllowedToken) => {
    return new Promise<Price>(async (resolve,reject) => {
      try{
  
        const tokenAddress = allowedToken.contractAddress;
        const oracleContractAddress: string|undefined = chainLink.get(tokenAddress);
  
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