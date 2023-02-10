import { useAtomValue } from "jotai"
import { useCallback, useMemo } from "react"
import { tableOfferTypeAtom } from "src/states"
import { selectOffersIsLoading } from "src/store/features/interface/interfaceSelector"
import { Offer, OFFER_LOADING, OFFER_TYPE } from "src/types/offer"
import { useAppSelector } from "../react-hooks"

type UseTypedOffers = (offers: Offer[]) => {
    offers: Offer[];
    sellCount: number|undefined;
    buyCount: number|undefined;
    exchangeCount: number|undefined;
}

export const useTypedOffers: UseTypedOffers = (offers)  => {

    const offersLoading = useAppSelector(selectOffersIsLoading);
    const tableOfferType = useAtomValue(tableOfferTypeAtom);

    const getTypedOffers = useCallback((type: OFFER_TYPE): Offer[] => {
        if (!offers || offersLoading) return OFFER_LOADING;
        return offers.filter((offer: Offer) => offer.type == type);
    },[offers, offersLoading]);

    const sellCount: number|undefined = useMemo(() => {
        if(offersLoading) return undefined;
        return getTypedOffers(OFFER_TYPE.SELL).length;
    },[getTypedOffers, offersLoading]);

    const buyCount: number|undefined = useMemo(() => {
        if(offersLoading) return undefined;
        return getTypedOffers(OFFER_TYPE.BUY).length;
    },[getTypedOffers, offersLoading]);

    const exchangeCount: number|undefined = useMemo(() => {
        if(offersLoading) return undefined;
        return getTypedOffers(OFFER_TYPE.EXCHANGE).length;
    },[getTypedOffers, offersLoading])

    const rightTypedOffers: Offer[]  = useMemo(() => {
        return getTypedOffers(tableOfferType)
    },[getTypedOffers, tableOfferType]);
 
    return{
        offers: rightTypedOffers,
        sellCount: sellCount,
        buyCount: buyCount,
        exchangeCount: exchangeCount
    }
}