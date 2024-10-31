import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { tableOfferTypeAtom } from "src/states"
import { Offer, OFFER_LOADING, OFFER_TYPE } from "src/types/offer"
import { useOffers } from "../interface/useOffers"

const getTypedOffers = (type: OFFER_TYPE, offers: Offer[], offersLoading: boolean): Offer[] => {
    if (!offers || offersLoading) return OFFER_LOADING;
    return offers.filter((offer: Offer) => offer.type == type);
}

type UseTypedOffers = (offers: Offer[]) => {
    offers: Offer[];
    sellCount: number|undefined;
    buyCount: number|undefined;
    exchangeCount: number|undefined;
}

export const useTypedOffers: UseTypedOffers = (
    offers
)  => {

    const tableOfferType = useAtomValue(tableOfferTypeAtom);
    const { offersAreLoading } = useOffers();
    
    return useMemo(() => ({
        offers: [...getTypedOffers(tableOfferType, offers, offersAreLoading)],
        sellCount: !offersAreLoading ? getTypedOffers(OFFER_TYPE.SELL, offers, offersAreLoading).length : undefined,
        buyCount: !offersAreLoading ? getTypedOffers(OFFER_TYPE.BUY, offers, offersAreLoading).length : undefined,
        exchangeCount: !offersAreLoading ? getTypedOffers(OFFER_TYPE.EXCHANGE, offers, offersAreLoading).length : undefined,
    }),[offersAreLoading, tableOfferType, offers])
}