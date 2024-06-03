import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { useRootStore } from "../zustandStore/store"

type UseOraclePriceFeed = (
    tokenAddress: string|undefined
) => BigNumber|undefined

export const useOraclePriceFeed : UseOraclePriceFeed = (tokenAddress) => {

    const prices = useRootStore((state) => state.prices);

    return useMemo(() => {
        if(!tokenAddress) return undefined
        console.log("tokenAddress: ", tokenAddress);
        console.log(prices[tokenAddress.toLowerCase()]);
        return new BigNumber(prices[tokenAddress.toLowerCase()]);
    },[prices, tokenAddress])
}