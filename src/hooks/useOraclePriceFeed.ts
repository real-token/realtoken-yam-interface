import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { selectPrices } from "src/store/features/interface/interfaceSelector"
import { useAppSelector } from "./react-hooks"

type UseOraclePriceFeed = (
    tokenAddress: string
) => {
    price: BigNumber|undefined
}

export const useOraclePriceFeed : UseOraclePriceFeed = (tokenAddress) => {

    const prices = useAppSelector(selectPrices);

    const price: BigNumber|undefined = useMemo(() => {
        return new BigNumber(prices[tokenAddress.toLowerCase()]);
    },[prices, tokenAddress])

    return {
        price
    }
}