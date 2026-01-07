import { useQuery } from 'react-query';

import { gql } from '@apollo/client';
import { PropertiesToken } from '@realtoken/realt-commons';
import { useWeb3React } from '@web3-react/core';

import { getExtendedTokens } from '../../constants/GetPriceToken';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { apiClient } from '../../utils/offers/getClientURL';
import { mergeExtendedProperties } from '../../utils/properties';

type UseProperties = () => {
  propertiesAreLoading: boolean;
  properties: PropertiesToken[] | undefined;
};
export const useProperties: UseProperties = () => {
  const { chainId } = useWeb3React();

  // Fetch properties
  const {
    isLoading,
    data: properties,
    isSuccess,
  } = useQuery({
    queryKey: ['properties', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    enabled: !!chainId,
    queryFn: async (): Promise<PropertiesToken[]> => {
      if (!chainId) return [];

      //   {
      //     properties: {
      //         id: string,
      //         shortName: string,
      //         fullName: string,
      //         product: {
      //             currency: string,
      //             imageLink: string[],
      //             annualPercentageYield: number,
      //             tokens: {
      //                 tokenIdRules: number
      //                 price: number
      //                 blockchainAddresses{
      //                     networkId: number
      //                     addressToken: string
      //                 }
      //             }[]
      //         }
      //     }[]
      //   }

      // const { data } = await apiClient.query({
      //   query: gql`
      //     query getProperties {
      //       privateApi {
      //         properties {
      //           id
      //           shortName
      //           fullName
      //           product {
      //             currency
      //             imageLink
      //             marketplaceLink
      //             annualPercentageYield
      //             tokens {
      //               tokenIdRules
      //               price
      //               blockchainAddresses {
      //                 networkId
      //                 addressToken
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   `,
      // });
      // const datasProperties = data?.privateApi?.properties;
      // if (!datasProperties) {
      //   throw new Error('No properties found');
      // }

      const tokens = await fetch('/tokens.json');
      const datasProperties = await tokens.json();

      return mergeExtendedProperties(
        datasProperties
          .map((property: any) => {
            // Sélectionner l'adresse selon le chainId
            let contractAddress: string | undefined;
            if (chainId === 1) {
              contractAddress = property.ethereumContract;
            } else if (chainId === 100) {
              contractAddress = property.gnosisContract || property.xDaiContract;
            }

            // Ignorer les propriétés sans contrat sur ce réseau
            if (!contractAddress) {
              return null;
            }

            return {
              uuid: property.uuid,
              shortName: property.shortName,
              fullName: property.fullName,
              currency: property.currency,
              marketplaceLink: property.marketplaceLink,
              imageLink: property.imageLink,
              officialPrice: property.tokenPrice,
              contractAddress: contractAddress,
              tokenIdRules: property.tokenIdRules ?? 0,
              netRentYearPerToken: property.netRentYearPerToken,
              annualYield: property.annualPercentageYield,
            };
          })
          .filter(Boolean),
        getExtendedTokens(chainId)
      );

      // return mergeExtendedProperties(
      //   datasProperties.map((property: any) => {
      //     const contractAddress =
      //       property.product.tokens.blockchainAddresses.find(
      //         (address: any) => address.networkId === chainId
      //       )?.addressToken;
      //     if (!contractAddress) {
      //       throw new Error('No contract address found');
      //     }
      //     return {
      //       uuid: property.id,
      //       shortName: property.shortName,
      //       fullName: property.fullName,
      //       currency: property.product.currency,
      //       marketplaceLink: property.product.marketplaceLink,
      //       imageLink: property.product.imageLink[0],
      //       officialPrice: property.product.tokens.price,
      //       contractAddress: contractAddress,
      //       tokenIdRules: property.product.tokens.tokenIdRules,
      //       netRentYearPerToken: property.product.tokens.price,
      //       annualYield: property.product.annualPercentageYield,
      //     };
      //   }),
      //   getExtendedTokens(chainId)
      // );
    },
  });

  return {
    propertiesAreLoading: isLoading,
    properties: properties,
  };
};
