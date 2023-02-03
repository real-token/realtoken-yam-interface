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
        const priceInDollar = new BigNumber(offer.price).multipliedBy(tokenPrice);
        return priceInDollar;
    },[offer, tokenPrice]);

    return{
        tokenPriceInDollar
    }
}