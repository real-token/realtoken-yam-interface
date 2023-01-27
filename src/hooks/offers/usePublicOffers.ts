import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { tableOfferTypeAtom } from "src/states"
import { selectBuyPublicOffers, selectExchangePublicOffers, selectSellPublicOffers } from "src/store/features/interface/interfaceSelector"
import { Offer, OFFER_TYPE } from "src/types/offer"
import { useAppSelector } from "../react-hooks"

interface UsePublicOffers{
    offers: Offer[]
}

export const usePublicOffers = (): UsePublicOffers => {

    const sellPublicOffers = useAppSelector(selectSellPublicOffers);
    const buyPublicOffers = useAppSelector(selectBuyPublicOffers);
    const exchangePublicOffers = useAppSelector(selectExchangePublicOffers);

    const tableOfferType = useAtomValue(tableOfferTypeAtom);

    const offers: Offer[] = useMemo(() => {
        switch(tableOfferType){
            case OFFER_TYPE.BUY:
                return buyPublicOffers;
            case OFFER_TYPE.SELL:
                return sellPublicOffers;
            case OFFER_TYPE.EXCHANGE:
                return exchangePublicOffers;
            default:
                return sellPublicOffers;
        }
    },[buyPublicOffers, exchangePublicOffers, sellPublicOffers, tableOfferType])
 
    return{
        offers
    }
}