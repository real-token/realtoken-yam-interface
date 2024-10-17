import { useMemo } from "react";

type UseChoosenPrice = (
    price: number|undefined,
    tokenPriceInDollar: number|undefined,
    buyerTokenPrice: number|undefined,
    priceUnit: 'dollar'|'token',
    isRatio: boolean
) => number|undefined
export const useChoosenPrice: UseChoosenPrice = (price, tokenPriceInDollar, buyerTokenPrice, priceUnit, isRatio) => {
    return useMemo(() => {
        if(!price || !tokenPriceInDollar || !buyerTokenPrice) return undefined;
        if(priceUnit == 'token') {
            return price * buyerTokenPrice;
        }else if(priceUnit == 'dollar') {
            return isRatio ? tokenPriceInDollar * price : price
        }
    },[price, tokenPriceInDollar, isRatio, priceUnit, buyerTokenPrice])
}