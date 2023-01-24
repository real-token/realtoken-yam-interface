import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { shieldDisabledAtom, shieldValueAtom } from "src/states";
import { OFFER_TYPE } from "src/types/offer";

type UseShield = (
    offerType: OFFER_TYPE,
    price: number|undefined,
    officialPrice: number|undefined,
) => {
    isError: boolean;
    priceDifference: number|undefined;
    maxPriceDifference: number;
}

export const useShield: UseShield = (offerType, price, officialPrice) => {

    const shieldDisabled = useAtomValue(shieldDisabledAtom);
    const shieldValue = useAtomValue(shieldValueAtom);

    const [isError,setIsError] = useState<boolean>(false);

    const priceDelta: number|undefined = useMemo(() => {
        return price && officialPrice ? -(officialPrice-price)/officialPrice : undefined;
    },[price,officialPrice])

    useEffect(() => {
        if(shieldDisabled || offerType == OFFER_TYPE.EXCHANGE || !priceDelta ){
            setIsError(false);
            return;
        }
        if(priceDelta && !shieldDisabled) setIsError(Math.abs(priceDelta) > shieldValue)
    },[priceDelta, shieldDisabled, shieldValue,offerType])

    return{
        isError: isError,
        maxPriceDifference: shieldValue,
        priceDifference: priceDelta
    }
}