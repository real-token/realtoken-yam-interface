import { useQuery } from "react-query";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { CHAINS, ChainsID } from "../../constants";
import { useWeb3React } from "@web3-react/core";
import { apiClient } from "../../utils/offers/getClientURL";
import { gql } from "@apollo/client";

type UseWlProperties = () => {
    wlPropertiesAreLoading: boolean;
    wlProperties: number[] | undefined;
}
export const useWlProperties: UseWlProperties = () => {
    
    const { chainId, account } = useWeb3React();

    const { isLoading: wlPropertiesAreLoading, data: wlProperties, isSuccess } = useQuery({
        queryKey: ['wlProperties', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
        enabled: !!chainId,
        queryFn: async (): Promise<number[]> => {
            if(!chainId || !account) return [];

            const prefix = CHAINS[chainId as ChainsID].graphPrefixes.realtoken;
        
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
            if(userIds){
                wlTokenIds = userIds[0].attributeKeys;
            }

            return wlTokenIds ? wlTokenIds.map(str => parseInt(str)) : [];

        }
    });

    return {
        wlPropertiesAreLoading,
        wlProperties
    }
}