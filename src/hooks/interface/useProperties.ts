import { gql } from '@apollo/client';
import { PropertiesToken } from '@real-token/types';
import { useQuery } from '@tanstack/react-query';

import { useChainId } from 'wagmi';

import { getExtendedTokens } from '../../constants/GetPriceToken';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { mergeExtendedProperties } from '../../utils/properties';

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
    isSuccess,
  } = useQuery({
    queryKey: ['properties', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    enabled: !!chainId,
    queryFn: async (): Promise<PropertiesToken[]> => {
      if (!chainId) return [];

      const tokens = await fetch(
        `${import.meta.env.VITE_ASSETS_API_URL}/properties/${chainId}`,
        {
          headers: import.meta.env.VITE_ASSETS_API_KEY ? {
            "X-API-Key": import.meta.env.VITE_ASSETS_API_KEY
          } : {}
        }
      );
      const datasProperties = await tokens.json();
      return mergeExtendedProperties(
        datasProperties,
        getExtendedTokens(chainId)
      );
    },
  });

  return {
    propertiesAreLoading: isLoading,
    properties: properties,
  };
};
