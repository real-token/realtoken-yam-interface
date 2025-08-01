import { gql } from '@apollo/client';
import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';

import { useAccount, useChainId } from 'wagmi';

import { ExtendedChainConfig } from '../../config/aaConfig';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { apiClient } from '../../utils/offers/getClientURL';

type UseWlProperties = () => {
  wlPropertiesAreLoading: boolean;
  wlProperties: number[] | undefined;
};
export const useWlProperties: UseWlProperties = () => {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const networkConfig = useCurrentNetwork<ExtendedChainConfig>();

  const {
    isLoading: wlPropertiesAreLoading,
    data: wlProperties,
    isSuccess,
  } = useQuery({
    queryKey: ['wlProperties', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    enabled: !!chainId && !!account && !!networkConfig,
    queryFn: async (): Promise<number[]> => {
      if (!chainId || !account || !networkConfig) return [];

      const prefix = networkConfig.graphPrefix.realToken;

      const { data } = await apiClient.query({
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
        // context: {
        //     fetchOptions: {
        //     signal: abortController.signal
        //     }
        // }
      });

      const userIds = data[prefix]?.account?.userIds;

      let wlTokenIds: string[] | undefined = undefined;
      if (userIds) {
        wlTokenIds = userIds[0].attributeKeys;
      }

      return wlTokenIds ? wlTokenIds.map((str) => parseInt(str)) : [];
    },
  });

  return {
    wlPropertiesAreLoading,
    wlProperties,
  };
};
