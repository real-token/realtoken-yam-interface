import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { useRootStore } from "../zustandStore/store"
import { usePrices } from "./interface/usePrices"
import { createLogger } from '../utils/logger';
const logger = createLogger('src/hooks/useOraclePriceFeed');

type UseOraclePriceFeed = (
    tokenAddress: string|undefined
) => BigNumber|undefined

export const useOraclePriceFeed : UseOraclePriceFeed = (tokenAddress) => {

    const { prices } = usePrices();

    return useMemo(() => {
        if(!tokenAddress || !prices) return undefined
        logger.debug("tokenAddress: ", tokenAddress);
        logger.debug('Price:', prices[tokenAddress.toLowerCase()]);
        return new BigNumber(prices[tokenAddress.toLowerCase()]);
    },[prices, tokenAddress])
}