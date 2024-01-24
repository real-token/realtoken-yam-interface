import { gql } from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';

import { PropertiesToken } from 'src/types/PropertiesToken';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { Offer } from 'src/types/offer/Offer';
import { Price } from 'src/types/price';

import { YamGnosis_Offer as OfferGraphQl } from '../../../gql/graphql';
import { CHAINS, ChainsID } from '../../constants';
import { getBigDataGraphRealtoken } from './fetchOffers';
import { apiClient } from './getClientURL';
import { getOfferQuery } from './getOfferQuery';
import { parseOffer } from './parseOffer';

export const fetchOffer = (
  provider: Web3Provider,
  account: string,
  chainId: number,
  offerId: number,
  propertiesToken: PropertiesToken[],
  prices: Price
): Promise<Offer> => {
  return new Promise(async (resolve, reject) => {
    try {
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
          id: `0x${offerId.toString(16)}`,
        },
      });

      const offerFromTheGraph: OfferGraphQl = data[graphNetworkPrefix].offer;

      const batch = [
        `${offerFromTheGraph.seller.address}-${offerFromTheGraph.offerToken.address}`,
      ];
      const realtokenData: [DataRealtokenType] = await getBigDataGraphRealtoken(
        chainId,
        apiClient,
        batch
      );

      const accountUser = realtokenData[0];
      const offer = await parseOffer(
        provider,
        account,
        offerFromTheGraph,
        accountUser,
        propertiesToken,
        prices
      );

      const hasPropertyToken = propertiesToken.find(
        (propertyToken) =>
          propertyToken.contractAddress == offer.buyerTokenAddress ||
          propertyToken.contractAddress == offer.offerTokenAddress
      );
      offer.hasPropertyToken = hasPropertyToken ? true : false;

      resolve(offer);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
