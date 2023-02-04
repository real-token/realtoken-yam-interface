import BigNumber from "bignumber.js"
import { useMemo } from "react";
import { Offer, OFFER_TYPE } from "src/types/offer";

type UseOfferPriceInDollar = (
    tokenPrice: BigNumber|undefined,
    offer: Offer
) => {
    tokenPriceInDollar: BigNumber|undefined
}

export const useOfferPriceInDollar: UseOfferPriceInDollar = (tokenPrice, offer) => {

    const tokenPriceInDollar: BigNumber|undefined = useMemo(() => {
        if(!tokenPrice || !offer) return undefined;
        const priceInDollar = offer.type == OFFER_TYPE.SELL ? new BigNumber(offer.price).multipliedBy(tokenPrice) : new BigNumber(tokenPrice).dividedBy(offer.price);
        return priceInDollar;
    },[offer, tokenPrice]);

    return{
        tokenPriceInDollar
    }
}