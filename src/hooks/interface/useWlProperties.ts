import { gql } from '@apollo/client';
import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';

import { useChainId } from 'wagmi';

import { ExtendedChainConfig } from '../../config/aaConfig';
import { useConnectedAccount } from '../useConnectedAccount';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { apiClient } from '../../utils/offers/apiClient';

type UseWlProperties = () => {
  wlPropertiesAreLoading: boolean;
  wlProperties: number[] | undefined;
};
export const useWlProperties: UseWlProperties = () => {
  const chainId = useChainId();
  const { address: account } = useConnectedAccount();

  const networkConfig = useCurrentNetwork<ExtendedChainConfig>();

  const { isLoading: wlPropertiesAreLoading, data: wlProperties } = useQuery({
    queryKey: ['wlProperties', chainId, account],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    enabled: !!chainId && !!account && !!networkConfig,
    queryFn: async (): Promise<number[]> => {
      if (!chainId || !account || !networkConfig) return [];

      const prefix = networkConfig.graphPrefix.realToken;

      const { data, errors } = await apiClient.query({
        query: gql`
                query getWlProperties{
                ${prefix}{
                    account(id: "${account.toLowerCase()}") {
                    userIds{
                        userId
                        attributeKeys
                        trustedIntermediary{
                        address
                        weight
                        }
                    }
                    }
                }
                }
            `,
        fetchPolicy: 'network-only',
      });

      if (errors?.length) {
        throw new Error(errors[0]?.message ?? 'GraphQL error');
      }

      const userIds = data[prefix]?.account?.userIds;

      let wlTokenIds: string[] | undefined = undefined;
      if (userIds && userIds.length > 0) {
        wlTokenIds = userIds[0].attributeKeys;
      }

      return wlTokenIds ? wlTokenIds.map((str) => parseInt(str)) : [];
    },
  });

  return {
    wlPropertiesAreLoading: account ? wlPropertiesAreLoading : false,
    wlProperties: account ? wlProperties : [],
  };
};
