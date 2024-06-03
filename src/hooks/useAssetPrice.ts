import { useMemo } from "react"
import { usePropertiesToken } from "./usePropertiesToken";
import { useRootStore } from "../zustandStore/store";

type UseAssetPrice = ({
    tokenType,
    tokenAddress
}: {
    tokenType: 'realtoken' | 'others',
    tokenAddress: string | undefined
}) => number|undefined

export const useAssetPrice: UseAssetPrice = ({ tokenType, tokenAddress }) => {

    const prices = useRootStore((state) => state.prices);

    const { getPropertyToken } = usePropertiesToken();

    return useMemo(() => {
        if(!tokenAddress) return;
        if(tokenType == 'realtoken') {
            return getPropertyToken(tokenAddress)?.officialPrice
        }else if(tokenType == 'others') {
            const price = prices[tokenAddress?.toLowerCase() ?? ""];
            return price ? parseFloat(price) : undefined
        }
    },[tokenAddress, prices, getPropertyToken, tokenType])
}