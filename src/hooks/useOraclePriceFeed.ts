import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { useRootStore } from "../zustandStore/store"

type UseOraclePriceFeed = (
    tokenAddress: string
) => {
    price: BigNumber|undefined
}

export const useOraclePriceFeed : UseOraclePriceFeed = (tokenAddress) => {

    const prices = useRootStore((state) => state.prices);

    const price: BigNumber|undefined = useMemo(() => {
        return new BigNumber(prices[tokenAddress.toLowerCase()]);
    },[prices, tokenAddress])

    return {
        price
    }
}