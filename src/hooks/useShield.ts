import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { shieldDisabledAtom, shieldValueAtom } from "src/states";

type UseShield = (
    price: number|undefined,
    officialPrice: number|undefined,
) => {
    isError: boolean;
    priceDifference: number|undefined;
    maxPriceDifference: number;
}

export const useShield: UseShield = (price, officialPrice) => {

    const shieldDisabled = useAtomValue(shieldDisabledAtom);
    const shieldValue = useAtomValue(shieldValueAtom);

    const [isError,setIsError] = useState<boolean>(false);

    const priceDelta: number|undefined = useMemo(() => {
        return price && officialPrice ? -(officialPrice-price)/officialPrice : undefined;
    },[price,officialPrice])

    useEffect(() => {
        if(!priceDelta){
            setIsError(false);
            return;
        }
        if(shieldDisabled) setIsError(false)
        if(priceDelta && !shieldDisabled) setIsError(Math.abs(priceDelta) > shieldValue)
    },[priceDelta, shieldDisabled, shieldValue])

    return{
        isError: isError,
        maxPriceDifference: shieldValue,
        priceDifference: priceDelta
    }
}