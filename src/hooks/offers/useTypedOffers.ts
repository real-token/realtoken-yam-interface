import { useAtomValue } from "jotai"
import { useCallback, useMemo } from "react"
import { tableOfferTypeAtom } from "src/states"
import { Offer, OFFER_LOADING, OFFER_TYPE } from "src/types/offer"
import { useRootStore } from "../../zustandStore/store"
import { selectAllPublicOffers, selectOffersIsLoading, selectPublicOffers } from "../../zustandStore/selectors"
import { USER_ROLE } from "../../types/admin"
import BigNumber from "bignumber.js"

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
    const [ offersLoading] = useRootStore((state) => [state.offersAreLoading]);
    
    return useMemo(() => ({
        offers: [...getTypedOffers(tableOfferType, offers, offersLoading)],
        sellCount: !offersLoading ? getTypedOffers(OFFER_TYPE.SELL, offers, offersLoading).length : undefined,
        buyCount: !offersLoading ? getTypedOffers(OFFER_TYPE.BUY, offers, offersLoading).length : undefined,
        exchangeCount: !offersLoading ? getTypedOffers(OFFER_TYPE.EXCHANGE, offers, offersLoading).length : undefined,
    }),[offersLoading, tableOfferType, offers])
}