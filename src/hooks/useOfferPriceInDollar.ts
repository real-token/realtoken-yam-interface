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
        const priceInCurrency = new BigNumber(offer.type == OFFER_TYPE.BUY ? 1/parseFloat(offer.price) : offer.price);
        return priceInCurrency.multipliedBy(tokenPrice);
    },[offer, tokenPrice]);

    return{
        tokenPriceInDollar
    }
}