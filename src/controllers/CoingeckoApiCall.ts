import { CHAINS, ChainsID } from "../constants";
import { GetPriceTokenCoingecko } from "../types/GetPriceTokens";
import { Price } from "../types/price"

export const getCoingeckoApiPrice = (allowedToken: GetPriceTokenCoingecko, chainId: number) => {
    return new Promise<Price>(async (resolve,reject) => {
      try{

        const chainConfig = CHAINS[chainId as ChainsID];
        const coingeckoNetworkId = chainConfig.coingeckoNetworkId;

        const tokenAddress = allowedToken.contractAddress;

        const res = await fetch(
            `https://api.geckoterminal.com/api/v2/simple/networks/${coingeckoNetworkId}/token_price/${tokenAddress}`
        );
        if(!res.ok){
            return reject("Failed to fetch price from coingecko api");
        }

        const data = await res.json();
        const price = data.data.attributes.token_prices[tokenAddress];

        resolve({ 
            contractAddress: tokenAddress, 
            price: price ?? 0
        })

      }catch(err){
        console.log("Error while getting oracle price: ", err);
        reject(err)
      }
    });
}