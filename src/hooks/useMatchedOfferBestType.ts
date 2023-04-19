import { useTranslation } from "react-i18next"


export enum OFFER_BEST_TYPE{
    BEST_PRICE,
    BEST_AMOUNT
}


type UseMatchedOfferBestType = () => {
    getOfferBestTypeTranslation: (offerBestType: OFFER_BEST_TYPE) => string
}
export const useMatchedOfferBestType: UseMatchedOfferBestType = () => {

    const { t } = useTranslation('modals', { keyPrefix: "offerMatching" });

    const getOfferBestTypeTranslation = (offerBestType: OFFER_BEST_TYPE) => {
        switch(offerBestType){
            case OFFER_BEST_TYPE.BEST_PRICE:
                return t("bestPrice");
            case OFFER_BEST_TYPE.BEST_AMOUNT:
                return t("bestAmount");
            default:
                return ""
        }
    }

    return {
        getOfferBestTypeTranslation
    }
}