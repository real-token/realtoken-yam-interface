import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { useRootStore } from "../zustandStore/store"

type UseOraclePriceFeed = (
    tokenAddress: string|undefined
) => {
    price: BigNumber|undefined
}

export const useOraclePriceFeed : UseOraclePriceFeed = (tokenAddress) => {

    const prices = useRootStore((state) => state.prices);

    const price: BigNumber|undefined = useMemo(() => {
        if(!tokenAddress) return undefined
        return new BigNumber(prices[tokenAddress.toLowerCase()]);
    },[prices, tokenAddress])

    return {
        price
    }
}