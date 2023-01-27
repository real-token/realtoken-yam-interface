import { Flex, Skeleton } from "@mantine/core"
import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { useOraclePriceFeed } from "src/hooks/useOraclePriceFeed";
import { usePropertyToken } from "src/hooks/usePropertyToken";
import { Offer, OFFER_TYPE } from "src/types/offer";

interface OfferYieldProps{
    offer: Offer
}
export const OfferYield = ({ offer } : OfferYieldProps) => {

    const { propertyToken } = usePropertyToken(offer.type == OFFER_TYPE.BUY ? offer.buyerTokenAddress : offer.offerTokenAddress);
    const { price } = useOraclePriceFeed(offer.type == OFFER_TYPE.BUY ? offer.offerTokenAddress: offer.buyerTokenAddress);

    const tokenPriceInDollar: BigNumber|undefined = useMemo(() => {
        if(!price) return undefined;
        const priceInDollar = new BigNumber(offer.price).dividedBy(price);
        return offer.type == OFFER_TYPE.BUY ? new BigNumber(1).dividedBy(priceInDollar) : priceInDollar;
    },[offer.price, offer.type, price]);

    const offerAjustedYield: BigNumber|undefined = useMemo(() => {
        if(!propertyToken || !propertyToken.netRentYearPerToken || !tokenPriceInDollar) return undefined;

        const offerAdjusted = new BigNumber(propertyToken.netRentYearPerToken).dividedBy(tokenPriceInDollar);
        console.log("offerAdjusted: ", offerAdjusted.toString())
        return offerAdjusted;
    },[propertyToken, tokenPriceInDollar])

    if(offer.offerId == "366"){
        console.log(offer)
        console.log(offerAjustedYield)
    }

    return(
        <Flex>
           {offerAjustedYield ? `${parseFloat(offerAjustedYield.multipliedBy(100).toString()).toFixed(2)}%` : <Skeleton height={15}/>}
        </Flex>
    )
}