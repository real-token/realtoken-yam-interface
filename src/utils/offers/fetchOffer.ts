import { gql } from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';
import { readCurrentNetworkConfig } from '@real-token/core';
import { PropertiesToken } from '@real-token/types';

import { Address } from 'viem';

import { Offer as OfferGraphQl } from '../../../gql/graphql';
import { networks } from '../../config/aaConfig';
import { getExtendedTokens } from '../../constants/GetPriceToken';
import { DataRealtokenType, Offer } from '../../types/offer';
import { Price } from '../../types/price';
import { getBigDataGraphRealtoken } from './fetchOffers';
import { apiClient } from './getClientURL';
import { getOfferQuery } from './getOfferQuery';
import { parseOffer } from './parseOffer';

export const fetchOffer = (
  account: Address | undefined,
  chainId: number,
  offerId: number,
  propertiesToken: PropertiesToken[],
  wlProperties: number[],
  prices: Price
): Promise<Offer | undefined> => {
  return new Promise(async (resolve, reject) => {
    if (!account) return resolve(undefined);
    const currentNetwork = readCurrentNetworkConfig(networks, chainId);
    const graphNetworkPrefix = currentNetwork?.graphPrefix?.yam;
    if (!graphNetworkPrefix) {
      console.warn(
        'Cannot load offer, no graph network prefix found for network'
      );
      return reject();
    }

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
        id: offerId.toString(),
      },
    });

    const offerFromTheGraph: OfferGraphQl = data[graphNetworkPrefix]?.offer;

    if (offerFromTheGraph == null || offerFromTheGraph == undefined)
      return reject();

    const batch = [
      `${offerFromTheGraph.seller.address}-${offerFromTheGraph.offerToken.address}`,
    ];
    const realtokenData: [DataRealtokenType] = await getBigDataGraphRealtoken(
      chainId,
      apiClient,
      batch
    );

    const accountUser = realtokenData[0];

    const extendedTokensAddress = getExtendedTokens(chainId).map(
      (token) => token.contractAddress
    );
    const offer = await parseOffer(
      account,
      offerFromTheGraph,
      accountUser,
      propertiesToken,
      wlProperties,
      prices,
      extendedTokensAddress
    );

    const hasPropertyToken = propertiesToken.find(
      (propertyToken) =>
        propertyToken.contractAddress == offer.buyerTokenAddress ||
        propertyToken.contractAddress == offer.offerTokenAddress
    );
    offer.hasPropertyToken = hasPropertyToken ? true : false;

    resolve(offer);
  });
};
