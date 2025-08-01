import { gql } from '@apollo/client';
import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';

import BigNumber from 'bignumber.js';
import { useAccount, useChainId } from 'wagmi';

import { ExtendedChainConfig } from '../../config/aaConfig';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { UserBalances } from '../../types/UserBalance';
import { apiClient } from '../../utils/offers/getClientURL';

type UseUserBalance = () => {
  userBalancesAreLoading: boolean;
  userBalances: UserBalances;
};
export const useUserBalance: UseUserBalance = () => {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const networkConfig = useCurrentNetwork<ExtendedChainConfig>();

  const {
    isLoading: userBalancesAreLoading,
    data: userBalances,
    isSuccess,
  } = useQuery({
    queryKey: ['userBalances', chainId, account],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_USER_BALANCES },
    enabled: !!chainId && !!account && !!networkConfig,
    queryFn: async (): Promise<UserBalances> => {
      if (!chainId || !account || !networkConfig) return {};

      const prefix = networkConfig.graphPrefix.realToken;

      const res = await apiClient.query({
        query: gql`
                query getBalances{
                    ${prefix}{
                        accountBalances(where: { account: "${account.toLowerCase()}" }, first: 1000){
                        token{
                            address
                        }
                        amount
                        }
                    }
                    }
                `,
        // context: {
        //     fetchOptions: {
        //         signal: abortController.signal,
        //     },
        // }
      });

      const balances = res.data[prefix].accountBalances;
      console.log('USER BALANCES: ', balances);

      const userBalances: UserBalances = {};
      balances.forEach((balance: any) => {
        userBalances[balance.token.address.toLowerCase()] = new BigNumber(
          balance.amount
        );
      });

      return userBalances;
    },
  });

  return {
    userBalancesAreLoading,
    userBalances: isSuccess ? userBalances : {},
  };
};
