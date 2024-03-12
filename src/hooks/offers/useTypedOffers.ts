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

type UseTypedOffers = (role: USER_ROLE) => {
    offers: Offer[];
    sellCount: number|undefined;
    buyCount: number|undefined;
    exchangeCount: number|undefined;
}

export const useTypedOffers: UseTypedOffers = (role)  => {

    const tableOfferType = useAtomValue(tableOfferTypeAtom);
    const [allOffers, offersLoading] = useRootStore((state) => [state.offers, state.offersAreLoading]);

    const { publicOffers, allPublicOffers } = useMemo(() => {

        const pOffers = allOffers.filter((offer: Offer) =>
            !offer.buyerAddress &&
            BigNumber(offer.amount).isPositive() &&
            !BigNumber(offer.amount).isZero()
        );

        const pAllOffers = allOffers.filter((offer: Offer) =>
            !offer.buyerAddress && BigNumber(offer.amount).isPositive()
        );

        return {
            publicOffers: !allOffers || offersLoading ? OFFER_LOADING : pOffers,
            allPublicOffers: !allOffers || offersLoading ? OFFER_LOADING : pAllOffers,
        }
    },[allOffers])

    const offers = useMemo(() => role == USER_ROLE.ADMIN ? allPublicOffers : publicOffers, [role, allPublicOffers, publicOffers]);

    return useMemo(() => ({
        offers: [...getTypedOffers(tableOfferType, offers, offersLoading)],
        sellCount: !offersLoading ? getTypedOffers(OFFER_TYPE.SELL, offers, offersLoading).length : undefined,
        buyCount: !offersLoading ? getTypedOffers(OFFER_TYPE.BUY, offers, offersLoading).length : undefined,
        exchangeCount: !offersLoading ? getTypedOffers(OFFER_TYPE.EXCHANGE, offers, offersLoading).length : undefined,
    }),[offersLoading, tableOfferType, offers])
}