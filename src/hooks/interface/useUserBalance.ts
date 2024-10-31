import { useWeb3React } from "@web3-react/core";
import { useQuery } from "react-query";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { UserBalances } from "../../types/UserBalance";
import { CHAINS, ChainsID } from "../../constants/chains";
import { apiClient } from "../../utils/offers/getClientURL";
import { gql } from "@apollo/client";
import BigNumber from "bignumber.js";

type UseUserBalance = () => {
    userBalancesAreLoading: boolean;
    userBalances: UserBalances;
}
export const useUserBalance: UseUserBalance = () => {

    const { chainId, account } = useWeb3React();

    const { isLoading: userBalancesAreLoading, data: userBalances, isSuccess } = useQuery({
        queryKey: ['userBalances', chainId, account],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_USER_BALANCES },
        enabled: !!chainId && !!account,
        queryFn: async (): Promise<UserBalances> => {
            if(!chainId || !account) return {};
            
            const chainDatas = CHAINS[chainId as ChainsID];
            const prefix = chainDatas.graphPrefixes.realtoken;

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
                userBalances[balance.token.address.toLowerCase()] = new BigNumber(balance.amount);
            });

            return userBalances;
        }
    })

    return {
        userBalancesAreLoading,
        userBalances: isSuccess ? userBalances : {}
    }

}