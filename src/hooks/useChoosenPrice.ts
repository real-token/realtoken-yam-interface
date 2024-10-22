import BigNumber from "bignumber.js";
import { useMemo } from "react";

type UseChoosenPrice = (
    price: string|undefined,
    tokenPriceInDollar: number|undefined,
    buyerTokenPrice: number|undefined,
    priceUnit: 'dollar'|'token',
    isRatio: boolean
) => number|undefined
export const useChoosenPrice: UseChoosenPrice = (price, tokenPriceInDollar, buyerTokenPrice, priceUnit, isRatio) => {
    return useMemo(() => {
        if(!price || !tokenPriceInDollar || !buyerTokenPrice) return undefined;
        if(priceUnit == 'token') {
            return new BigNumber(price).multipliedBy(buyerTokenPrice).toNumber();
        }else if(priceUnit == 'dollar') {
            return isRatio ? new BigNumber(tokenPriceInDollar).multipliedBy(price).toNumber() : new BigNumber(price).toNumber()
        }
    },[price, tokenPriceInDollar, isRatio, priceUnit, buyerTokenPrice])
}