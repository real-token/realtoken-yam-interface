import { gql } from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';
import { PropertiesToken, ChainsID } from '@realtoken/realt-commons';
import { Offer, DataRealtokenType } from '../../types/offer';
import { getBigDataGraphRealtoken } from './fetchOffers';
import { apiClient } from './getClientURL';
import { getOfferQuery } from './getOfferQuery';
import { parseOffer } from './parseOffer';
import { CHAINS } from '../../constants';
import { Price } from '../../types/price';
import { Offer as OfferGraphQl } from '../../../gql/graphql';
import { getExtendedTokens } from '../../constants/GetPriceToken';

export const fetchOffer = (
  provider: Web3Provider, 
  account: string, 
  chainId: number, 
  offerId: number, 
  propertiesToken: PropertiesToken[],
  wlProperties: number[],
  prices: Price
): Promise<Offer|undefined> => {
    return new Promise(async (resolve,reject) => {

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
          "id": offerId.toString()
        }}
      );

      const offerFromTheGraph: OfferGraphQl = data[graphNetworkPrefix]?.offer;

      if(offerFromTheGraph == null || offerFromTheGraph == undefined) return reject();

      const batch = [`${offerFromTheGraph.seller.address}-${offerFromTheGraph.offerToken.address}`]
      const realtokenData: [DataRealtokenType] = await getBigDataGraphRealtoken(chainId, apiClient, batch);

      const accountUser = realtokenData[0];

      const extendedTokensAddress = getExtendedTokens(chainId).map((token) => token.contractAddress);
      const offer = await parseOffer(account, offerFromTheGraph,accountUser, propertiesToken, wlProperties, prices, extendedTokensAddress);

      const hasPropertyToken = propertiesToken.find(propertyToken => (propertyToken.contractAddress == offer.buyerTokenAddress || propertyToken.contractAddress == offer.offerTokenAddress));
      offer.hasPropertyToken = hasPropertyToken ? true : false;

      resolve(offer)
     
    });
};
