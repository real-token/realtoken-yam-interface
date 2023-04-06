import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { multiPathMultiCurrencyAtom, shieldDisabledAtom, shieldValueAtom } from "../states";
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
    multiPath: Offer[]|undefined,
    multiPathAmountFilled: number;
    multiPathAmountFilledPercentage: number;
    otherMatching: Offer[]|undefined;
}

export const useMatchedOffers: UseMatchedOffers = (offerType, offerTokenAddress, buyerTokenAddress, price, amount) => {

    const shieldDisabled = useAtomValue(shieldDisabledAtom);
    const shieldValue = useAtomValue(shieldValueAtom);
    const useMultiCurrencies = useAtomValue(multiPathMultiCurrencyAtom);

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
        if(!matchedOffersWithType || !price) return undefined;
        if(offerType == OFFER_TYPE.BUY){
            return matchedOffersWithType
                .filter((offer) => 
                    offer.offerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                    offer.buyerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase() &&
                    (shieldDisabled && price >= priceMinLimit) && (shieldDisabled && price <= priceMaxLimit)
                );
        }else if(offerType == OFFER_TYPE.SELL) {
            return matchedOffersWithType
                .filter((offer) => 
                    offer.buyerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                    offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase() &&
                    (shieldDisabled && 1/price >= priceMinLimit) && (shieldDisabled && 1/price <= priceMaxLimit)
                );
        }else{
            return matchedOffersWithType
            .filter((offer) => 
                offer.buyerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase()
            );
        }
    },[buyerTokenAddress, matchedOffersWithType, offerTokenAddress, offerType, price, priceMaxLimit, priceMinLimit, shieldDisabled]);

    // Those are only filter by offerToken
    const matchedRawOffers = useMemo(() => {
        if(!matchedOffersWithType || !price) return [];
        if(offerType == OFFER_TYPE.BUY){
            return matchedOffersWithType.filter((offer) => offer.offerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase());
        }else if(offerType == OFFER_TYPE.SELL) {
            return matchedOffersWithType.filter((offer) => offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase());
        }else{
            return matchedOffersWithType
            .filter((offer) => offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase());
        }
    },[buyerTokenAddress, matchedOffersWithType, offerTokenAddress, offerType, price]);

    const bestPrice = useMemo(() => {
        if(!matchedOffers) return undefined;
        const sortedBestPrice = matchedOffers.sort((a,b)=> Number(a.price)-Number(b.price));
        return sortedBestPrice.length > 0 ? sortedBestPrice[0] : undefined
    },[matchedOffers]);

    const sortedAmount = useMemo(() => {
        if(!matchedOffers) return undefined;
        const offers = useMultiCurrencies ? matchedRawOffers : matchedOffers;
        return offers.sort((a,b)=> Number(b.amount)-Number(a.amount));
    },[matchedOffers, matchedRawOffers, useMultiCurrencies]);

    const multiPath = useMemo(() => {
        if(!sortedAmount) return undefined;
        if(!amount) return;
        const path: Offer[] = [];
        sortedAmount.forEach((offer) => {
            const currentAmount = path.reduce((accumulator,offer) => { return accumulator + parseFloat(offer.amount)},0);
            if(currentAmount < amount) path.push(offer);
        });
        return path;
    },[amount, sortedAmount]);

    const multiPathAmountFilled = useMemo(() => {
        if(!multiPath) return 0;
        const sum = multiPath.reduce((accumulator,offer) => {
            return accumulator+parseFloat(offer.amount)
        },0)
        return sum;
    },[multiPath]);

    const multiPathAmountFilledPercentage = useMemo(() => {
        const perc = amount ? parseFloat((multiPathAmountFilled/amount).toFixed(4)) : 0;
        return perc >= 1 ? 1 : 0
    },[amount, multiPathAmountFilled]);

    return {
        bestPrice: bestPrice,
        multiPath: multiPath,
        multiPathAmountFilled: multiPathAmountFilled,
        multiPathAmountFilledPercentage: multiPathAmountFilledPercentage,
        otherMatching: matchedOffers ? matchedOffers.filter((offer) => ![bestPrice?.offerId].includes(offer.offerId)) : undefined
    }
}