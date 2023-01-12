import { Offer } from "src/types/Offer";
import { DataRealtokenType } from "src/types/offer/DataRealTokenType";
import { PropertiesToken } from "src/types/PropertiesToken";
import { getBigDataGraphRealtoken } from "./fetchOffers";
import { parseOffer } from "./parseOffer";
import { Offer as OfferGraphQl } from '../../../.graphclient/index';
import { getRealTokenClient, getYamClient } from "./getClientURL";
import { gql } from "@apollo/client";

export const fetchOffer = (chainId: number, offerId: number, propertiesToken: PropertiesToken[]): Promise<Offer> => {
    return new Promise(async (resolve,reject) => {
      try{

        const clientYam = getYamClient(chainId);
        const clientRealToken = getRealTokenClient(chainId);
      
        const { data } = await clientYam.query({query: gql`
          query MyQuery($id: String!) {
            offer(id: $id) {
              id
                seller {
                  id
                  address
                }
                removedAtBlock
                availableAmount
                allowance {
                  allowance
                }
                balance {
                  amount
                }
                offerToken {
                  address
                  name
                  decimals
                  symbol
                  tokenType
                }
                price {
                  price
                  amount
                }
                buyerToken {
                  name
                  symbol
                  address
                  decimals
                  tokenType
                }
                buyer {
                  address
                }
            }
          }`
          , variables: {
            "id": `0x${offerId.toString(16)}`
          }}
        );

        const offerFromTheGraph: OfferGraphQl = data.offer;

        const test = [`${offerFromTheGraph.seller.address}-${offerFromTheGraph.offerToken.address}`]

        const realtokenData: [DataRealtokenType] = await getBigDataGraphRealtoken(chainId, clientRealToken, test);

        const accountUser = realtokenData[0];
  
        const offer = await parseOffer(offerFromTheGraph,accountUser,chainId);
  
        const hasPropertyToken = propertiesToken.find(propertyToken => (propertyToken.contractAddress == offer.buyerTokenAddress || propertyToken.contractAddress == offer.offerTokenAddress));
        offer.hasPropertyToken = hasPropertyToken ? true : false;
  
  
        resolve(offer)
  
      }catch(err){
        console.log(err);
        reject(err);
      }
    });
};