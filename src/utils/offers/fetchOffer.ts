import { Offer } from "src/types/offer/Offer";
import { DataRealtokenType } from "src/types/offer/DataRealTokenType";
import { PropertiesToken } from "src/types/PropertiesToken";
import { getBigDataGraphRealtoken } from "./fetchOffers";
import { parseOffer } from "./parseOffer";
import { Offer as OfferGraphQl } from '../../../gql/graphql';
import { gql } from "@apollo/client";
import { getOfferQuery } from "./getOfferQuery";
import { Web3Provider } from "@ethersproject/providers";
import { Price } from "src/types/price";
import { CHAINS, ChainsID } from "../../constants";
import { apiClient } from "./getClientURL";

export const fetchOffer = (provider: Web3Provider, account: string, chainId: number, offerId: number, propertiesToken: PropertiesToken[], prices: Price): Promise<Offer> => {
    return new Promise(async (resolve,reject) => {
      try{

        const graphNetworkPrefix = CHAINS[chainId as ChainsID].graphPrefixes.yam;
      
        const { data } = await apiClient.query({
          query: gql`
            query MyQuery($id: ID!) {
              ${graphNetworkPrefix} {
                offer(id: $id) {
                  ${getOfferQuery()}
                }
              }
            }
          `,  
          variables: {
            "id": `0x${offerId.toString(16)}`
          }}
        );

        const offerFromTheGraph: OfferGraphQl = data[graphNetworkPrefix].offer;

        const batch = [`${offerFromTheGraph.seller.address}-${offerFromTheGraph.offerToken.address}`]
        const realtokenData: [DataRealtokenType] = await getBigDataGraphRealtoken(chainId, apiClient, batch);

        const accountUser = realtokenData[0];
        const offer = await parseOffer(provider, account, offerFromTheGraph,accountUser,propertiesToken, prices);
  
        const hasPropertyToken = propertiesToken.find(propertyToken => (propertyToken.contractAddress == offer.buyerTokenAddress || propertyToken.contractAddress == offer.offerTokenAddress));
        offer.hasPropertyToken = hasPropertyToken ? true : false;
  
        resolve(offer)
  
      }catch(err){
        console.log(err);
        reject(err);
      }
    });
};