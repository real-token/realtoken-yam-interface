import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { shieldDisabledAtom, shieldValueAtom } from "../states";
import { selectPublicOffers } from "../store/features/interface/interfaceSelector";
import { Offer, OFFER_TYPE } from "../types/offer";
import { useAppSelector } from "./react-hooks";

const getReverseOfferType = (offerType: OFFER_TYPE) => {
    switch(offerType){
        case OFFER_TYPE.BUY:
            return OFFER_TYPE.SELL
        case OFFER_TYPE.SELL:
            return OFFER_TYPE.BUY
        default: 
            return OFFER_TYPE.EXCHANGE;
    }
}

type UseMatchedOffers = (
    offerType: OFFER_TYPE,
    offerTokenAddress: string,
    buyerTokenAddress: string,
    price: number|undefined,
    amount: number|undefined
) => {
    bestPrice: Offer|undefined,
    bestAmount: Offer|undefined,
    otherMatching: Offer[]|undefined;
}

export const useMatchedOffers: UseMatchedOffers = (offerType, offerTokenAddress, buyerTokenAddress, price, amount) => {

    const shieldDisabled = useAtomValue(shieldDisabledAtom);
    const shieldValue = useAtomValue(shieldValueAtom);

    const publicOffers = useAppSelector(selectPublicOffers);
    const revesedOfferType = getReverseOfferType(offerType);

    const matchedOffersWithType = useMemo(() => {
        if(publicOffers.length == 0) return [];
        if(!offerType || !offerTokenAddress || !buyerTokenAddress || !price) return undefined;

        const offersMatchingType = publicOffers.filter((offer) => offer.type == revesedOfferType);
        return offersMatchingType;

    },[buyerTokenAddress, offerTokenAddress, offerType, price, publicOffers, revesedOfferType]);
    
    const priceMinLimit = price ? price*(1-shieldValue) : 0;
    const priceMaxLimit = price ? price*(1+shieldValue) : 0;

    const matchedOffers = useMemo(() => {
        if(!matchedOffersWithType || !price) return [];
        if(offerType == OFFER_TYPE.BUY){
            return matchedOffersWithType
                .filter((offer) => 
                    offer.offerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                    offer.buyerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase() &&
                    (shieldDisabled && price >= priceMinLimit) && (shieldDisabled && price <= priceMaxLimit) &&
                    (amount ? Number(offer.amount) >= amount : true)
                );
        }else if(offerType == OFFER_TYPE.SELL) {
            return matchedOffersWithType
                .filter((offer) => 
                    offer.buyerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                    offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase() &&
                    (shieldDisabled && 1/price >= priceMinLimit) && (shieldDisabled && 1/price <= priceMaxLimit) &&
                    (amount ? Number(amount)/price >= amount: true)
                );
        }else{
            return matchedOffersWithType
            .filter((offer) => 
                offer.buyerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase()
            );
        }
    },[amount, buyerTokenAddress, matchedOffersWithType, offerTokenAddress, offerType, price, priceMaxLimit, priceMinLimit, shieldDisabled]);

    const bestPrice = useMemo(() => {
        const sortedBestPrice = matchedOffers.sort((a,b)=> Number(a.price)-Number(b.price));
        return sortedBestPrice.length > 0 ? sortedBestPrice[0] : undefined
    },[matchedOffers]);

    const bestAmount = useMemo(() => {
        const sortedBestAmount = matchedOffers.sort((a,b)=> Number(b.amount)-Number(a.amount));
        return sortedBestAmount.length > 0 ? sortedBestAmount[0] : undefined
    },[matchedOffers]);

    return {
        bestPrice: bestPrice,
        bestAmount: bestAmount,
        otherMatching: matchedOffers.filter((offer) => ![bestPrice?.offerId,bestAmount?.offerId].includes(offer.offerId))
    }
}