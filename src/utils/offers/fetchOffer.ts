import { Offer } from "src/types/offer/Offer";
import { DataRealtokenType } from "src/types/offer/DataRealTokenType";
import { PropertiesToken } from "src/types/PropertiesToken";
import { getBigDataGraphRealtoken } from "./fetchOffers";
import { parseOffer } from "./parseOffer";
import { Offer as OfferGraphQl } from '../../../.graphclient/index';
import { getRealTokenClient, getYamClient } from "./getClientURL";
import { gql } from "@apollo/client";
import { getOfferQuery } from "./getOfferQuery";
import { Web3Provider } from "@ethersproject/providers";

export const fetchOffer = (provider: Web3Provider, account: string, chainId: number, offerId: number, propertiesToken: PropertiesToken[]): Promise<Offer> => {
    return new Promise(async (resolve,reject) => {
      try{

        const clientYam = getYamClient(chainId);
        const clientRealToken = getRealTokenClient(chainId);
      
        const { data } = await clientYam.query({query: gql`
          query MyQuery($id: String!) {
            offer(id: $id) {
              ${getOfferQuery()}
            }
          }`
          , variables: {
            "id": `0x${offerId.toString(16)}`
          }}
        );

        const offerFromTheGraph: OfferGraphQl = data.offer;

        const batch = [`${offerFromTheGraph.seller.address}-${offerFromTheGraph.offerToken.address}`]
        const realtokenData: [DataRealtokenType] = await getBigDataGraphRealtoken(chainId, clientRealToken, batch);

        const accountUser = realtokenData[0];
        const offer = await parseOffer(provider, account, offerFromTheGraph,accountUser,propertiesToken);
  
        const hasPropertyToken = propertiesToken.find(propertyToken => (propertyToken.contractAddress == offer.buyerTokenAddress || propertyToken.contractAddress == offer.offerTokenAddress));
        offer.hasPropertyToken = hasPropertyToken ? true : false;
  
        resolve(offer)
  
      }catch(err){
        console.log(err);
        reject(err);
      }
    });
};