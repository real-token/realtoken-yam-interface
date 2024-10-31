import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { useRootStore } from "../zustandStore/store"
import { usePrices } from "./interface/usePrices"

type UseOraclePriceFeed = (
    tokenAddress: string|undefined
) => BigNumber|undefined

export const useOraclePriceFeed : UseOraclePriceFeed = (tokenAddress) => {

    const { prices } = usePrices();

    return useMemo(() => {
        if(!tokenAddress || !prices) return undefined
        console.log("tokenAddress: ", tokenAddress);
        console.log(prices[tokenAddress.toLowerCase()]);
        return new BigNumber(prices[tokenAddress.toLowerCase()]);
    },[prices, tokenAddress])
}