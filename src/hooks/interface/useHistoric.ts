import { useQuery } from "react-query";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { useWeb3React } from "@web3-react/core";
import { CHAINS, ChainsID } from "../../constants";
import { getPurchases, getSales } from "../../utils/historic/historic";
import { Historic } from "../../types/historic";

type UseHistoric = () => {
    historicsAreLoading: boolean;
    historics: Historic[];
    isError: boolean;
}
export const useHistoric: UseHistoric = () => {

    const { chainId, account } = useWeb3React();

    const { data: historics, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['historics', chainId, account],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_HISTORICS },
        enabled: !!chainId && !!account,
        queryFn: async () => {
            if(!chainId || !account) return [];
            console.log('FETCH HISTORICS')
    
            const graphNetworkPrefix = CHAINS[chainId as ChainsID].graphPrefixes.yam;
    
            const [buyerHistorics, sellerHistorics] = await Promise.all([
                getPurchases(account, graphNetworkPrefix),
                getSales(account, graphNetworkPrefix)
            ]);

            const historics = buyerHistorics.concat(sellerHistorics);
            const sortedHistorics = historics.sort((a, b) => a.createdAtTimestamp > b.createdAtTimestamp ? -1 : 1);
    
            return sortedHistorics;
        }
    });

    return {
        historicsAreLoading: isLoading,
        historics: isSuccess ? historics : [],
        isError
    }

}