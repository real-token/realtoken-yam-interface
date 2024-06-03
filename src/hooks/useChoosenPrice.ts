import { useMemo } from "react";

type UseChoosenPrice = (
    price: number|undefined,
    tokenPriceInDollar: number|undefined,
    priceUnit: 'dollar'|'token',
    decimals: number,
    isRatio: boolean
) => number|undefined
export const useChoosenPrice: UseChoosenPrice = (price, tokenPriceInDollar, priceUnit, decimals, isRatio) => {
    return useMemo(() => {
        if(!price || !tokenPriceInDollar) return undefined;
        return parseFloat((priceUnit == 'dollar' ? 
            isRatio ? price : tokenPriceInDollar 
            : 
            price*tokenPriceInDollar).toFixed(decimals));
    },[price, tokenPriceInDollar, isRatio, priceUnit, decimals])
}