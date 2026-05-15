import { gql } from '@apollo/client';
import { PropertiesToken } from '@real-token/types';
import { useQuery } from '@tanstack/react-query';

import { useChainId } from 'wagmi';

import { getExtendedTokens } from '../../constants/GetPriceToken';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { apiClient } from '../../utils/offers/apiClient';
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

type PrivateApiToken = {
  fullName: string;
  shortName: string;
  tokenIdRules: number;
  price: number;
  blockchainAddresses?: Array<{ networkId: number; addressToken: string }>;
  product?: {
    currency?: string;
    marketplaceLink?: string;
    imageLink?: string[];
    rentsValue?: { netRentYearlyPerToken?: number };
  };
};

function mapPrivateApiTokens(
  tokens: PrivateApiToken[],
  chainId: number
): PropertiesToken[] {
  return tokens
    .map((token) => {
      const contractAddress = token.blockchainAddresses?.find(
        (a) => a.networkId === chainId
      )?.addressToken;
      if (!contractAddress) return null;

      return {
        uuid: String(token.tokenIdRules),
        shortName: token.shortName,
        fullName: token.fullName,
        contractAddress,
        officialPrice: token.price,
        currency: token.product?.currency ?? '',
        marketplaceLink: token.product?.marketplaceLink ?? '',
        imageLink: token.product?.imageLink ?? [],
        tokenIdRules: token.tokenIdRules,
        netRentYearPerToken:
          token.product?.rentsValue?.netRentYearlyPerToken ?? 0,
      };
    })
    .filter((t): t is PropertiesToken => t !== null);
}

type UseProperties = () => {
  propertiesAreLoading: boolean;
  properties: PropertiesToken[] | undefined;
};
export const useProperties: UseProperties = () => {
  const chainId = useChainId();

  const {
    isLoading,
    data: properties,
  } = useQuery({
    queryKey: ['properties', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_PROPERTIES },
    enabled: !!chainId,
    queryFn: async (): Promise<PropertiesToken[]> => {
      if (!chainId) return [];

      const { data, errors } = await apiClient.query({
        query: GET_PROPERTIES_QUERY,
        fetchPolicy: 'network-only',
      });

      if (errors?.length) {
        throw new Error(errors[0]?.message ?? 'GraphQL error');
      }

      const tokens = data?.privateApi?.tokens as PrivateApiToken[] | undefined;
      if (!tokens) {
        throw new Error('No properties found');
      }

      const mapped = mapPrivateApiTokens(tokens, chainId);

      return mergeExtendedProperties(mapped, getExtendedTokens(chainId));
    },
  });

  return {
    propertiesAreLoading: isLoading,
    properties: properties,
  };
};
