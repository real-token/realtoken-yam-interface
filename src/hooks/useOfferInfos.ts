import { useMemo } from "react";
import { Offer, OFFER_TYPE } from "../types/offer"
import { useERC20TokenInfo } from "./useERC20TokenInfo";
import { usePropertyToken } from "./usePropertyToken";

type UseOfferInfos = (offer: Offer) => {
    buyerTokenName: string;
    offerTokenName: string;
}

export const useOfferInfos: UseOfferInfos = (offer) => {

    const type = offer.type;

    const { propertyToken: propertyBuyerToken } = usePropertyToken(offer.buyerTokenAddress);
    const { propertyToken: propertyOfferToken } = usePropertyToken(offer.offerTokenAddress);

    const buyerTokenName = useMemo(() => {
        if(type == OFFER_TYPE.BUY) return propertyBuyerToken?.shortName;
        if(type == OFFER_TYPE.SELL) return offer.buyerTokenName;
        return "";
    },[offer.buyerTokenName, propertyBuyerToken?.shortName, type])

    const offerTokenName = useMemo(() => {
        if(type == OFFER_TYPE.BUY) return offer.offerTokenName;
        if(type == OFFER_TYPE.SELL) return propertyOfferToken?.shortName;
        return ""
    },[offer.offerTokenName, propertyOfferToken?.shortName, type])

    return{
        buyerTokenName: buyerTokenName ?? "",
        offerTokenName: offerTokenName ?? ""
    }
}