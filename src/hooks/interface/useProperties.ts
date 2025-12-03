import { PropertiesToken } from '@real-token/types';
import { useQuery } from '@tanstack/react-query';
import { gql } from '@apollo/client';

import { useChainId } from 'wagmi';

import { getExtendedTokens } from '../../constants/GetPriceToken';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { mergeExtendedProperties } from '../../utils/properties';
import { apiClient } from '../../utils/offers/getClientURL';

const GET_PROPERTIES_QUERY = gql`
  query getProperties {
    privateApi {
      tokens {
        fullName
        shortName
        symbol
        tokenIdRules
        price
        decimal
        product {
          currency
          marketplaceLink
          imageLink
          rentsValue {
            netRentYearlyPerToken
          }
        }
        blockchainAddresses {
          networkId
          addressToken
        }
      }
    }
  }
`;

type UseProperties = () => {
  propertiesAreLoading: boolean;
  properties: PropertiesToken[] | undefined;
};
export const useProperties: UseProperties = () => {
  const chainId = useChainId();

  // Fetch properties
  const {
    isLoading,
    data: properties,
  } = useQuery({
    queryKey: ['properties', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    enabled: !!chainId,
    queryFn: async (): Promise<PropertiesToken[]> => {
      if (!chainId) return [];

      try {
        const response = await apiClient.query({
          query: GET_PROPERTIES_QUERY,
        });

        const tokens: any[] = response.data.privateApi.tokens;

        const transformedTokens: PropertiesToken[] = tokens
          .flatMap((token) => {
            const contractAddress = token.blockchainAddresses?.find(
              (addr: any) => addr.networkId === chainId
            )?.addressToken;

            if (!contractAddress) return [];

            const property: PropertiesToken = {
              uuid: token.tokenIdRules?.toString() ?? '',
              shortName: token.shortName,
              fullName: token.fullName,
              contractAddress: contractAddress.toLowerCase(),
              officialPrice: token.price,
              currency: token.product?.currency ?? '',
              marketplaceLink: token.product?.marketplaceLink ?? '',
              imageLink: token.product?.imageLink ?? [],
              netRentYearPerToken: token.product?.rentsValue?.netRentYearlyPerToken ?? 0,
              tokenIdRules: token.tokenIdRules ?? 0,
            };

            if (token.product?.rentsValue?.netRentYearlyPerToken && token.price) {
              property.annualYield = token.product.rentsValue.netRentYearlyPerToken / token.price;
            }

            return [property];
          });

        return mergeExtendedProperties(
          transformedTokens,
          getExtendedTokens(chainId)
        );
      } catch (error) {
        console.error('Failed to fetch properties from GraphQL API', error);
        return [];
      }
    },
  });

  return {
    propertiesAreLoading: isLoading,
    properties: properties,
  };
};
