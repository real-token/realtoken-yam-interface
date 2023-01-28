import { Flex, Skeleton, Text } from "@mantine/core"
import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { useOraclePriceFeed } from "src/hooks/useOraclePriceFeed";
import { usePropertyToken } from "src/hooks/usePropertyToken";
import { Offer, OFFER_TYPE } from "src/types/offer";
import { getPropertyTokenAddress } from "src/utils/properties";

interface OfferYieldProps{
    offer: Offer
}
export const OfferYield = ({ offer } : OfferYieldProps) => {

    const { propertyToken } = usePropertyToken(getPropertyTokenAddress(offer));
    const { price } = useOraclePriceFeed(offer.type == OFFER_TYPE.BUY ? offer.offerTokenAddress: offer.buyerTokenAddress);

    const tokenPriceInDollar: BigNumber|undefined = useMemo(() => {
        if(!price) return undefined;
        const priceInDollar = new BigNumber(offer.price).dividedBy(price);
        return offer.type == OFFER_TYPE.BUY ? new BigNumber(1).dividedBy(priceInDollar) : priceInDollar;
    },[offer.price, offer.type, price]);

    const offerAjustedYield: BigNumber|undefined = useMemo(() => {
        if(!propertyToken || !propertyToken.netRentYearPerToken || !tokenPriceInDollar) return undefined;
        const offerAdjusted = new BigNumber(propertyToken.netRentYearPerToken).dividedBy(tokenPriceInDollar);
        return offerAdjusted;
    },[propertyToken, tokenPriceInDollar]);

    const offerDelta: BigNumber|undefined = useMemo(() => {
        if(!offerAjustedYield || !propertyToken) return undefined;

        const originalYield = propertyToken.annualYield;
        return originalYield ? offerAjustedYield.multipliedBy(new BigNumber(1)).dividedBy(new BigNumber(originalYield)).minus(1) : undefined;

    },[offerAjustedYield, propertyToken])

    return(
        <Flex gap={"sm"}>
            { offerAjustedYield && offerDelta ?
            <>
            <Text>{`${parseFloat(offerAjustedYield.multipliedBy(100).toString()).toFixed(2)}%`}</Text>
            <Text color={offerDelta.gt(0) ? "green" : "red"}>{`(${offerDelta.gt(0) ? "+" : ""}${parseFloat(offerDelta.multipliedBy(100).toString()).toFixed(2)}%)`}</Text>
            </>
           :
           <Skeleton height={15}/>
            }
        </Flex>
    )
}