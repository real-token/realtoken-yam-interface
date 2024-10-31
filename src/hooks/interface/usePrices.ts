import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { Price } from "../../types/price";

type UsePrices = () => {
    pricesAreLoading: boolean;
    prices: Price | undefined;
}
export const usePrices: UsePrices = () => {

    const { chainId } = useWeb3React();
    
    const { isLoading: pricesAreLoading, data: prices, isSuccess } = useQuery({
        queryKey: ['prices', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_PRICES },
        enabled: !!chainId,
        queryFn: async (): Promise<Price> => {
            const res = await fetch(
                `/api/prices/${chainId}`,
            );
            return await res.json();
        }
    });

    return {
        pricesAreLoading,
        prices
    }
}