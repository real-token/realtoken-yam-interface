import { Flex, Skeleton, Text } from "@mantine/core"
import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { useOfferPriceInDollar } from "src/hooks/useOfferPriceInDollar";
import { useOraclePriceFeed } from "src/hooks/useOraclePriceFeed";
import { usePropertyToken } from "src/hooks/usePropertyToken";
import { Offer, OFFER_TYPE } from "src/types/offer"
import { getPropertyTokenAddress } from "src/utils/properties";

interface OfferPriceProps{
    offer: Offer
}
export const OfferPrice = ({ offer } : OfferPriceProps) => {

    const { propertyToken } = usePropertyToken(getPropertyTokenAddress(offer));
    const { price } = useOraclePriceFeed(offer.type == OFFER_TYPE.BUY ? offer.offerTokenAddress: offer.buyerTokenAddress);

    const originalPrice = propertyToken?.officialPrice;
    const offerPrice = offer.price;

    const { tokenPriceInDollar } = useOfferPriceInDollar(price, offer);

    if(offer.offerId == "2142"){
        console.log("price: ", price?.toString())
        console.log("price in Dollar: ", tokenPriceInDollar?.toString())
    }

    const offerPriceDelta: BigNumber|undefined = useMemo(() => {
        if(!originalPrice || !propertyToken || !tokenPriceInDollar) return undefined;

        const originalYield = propertyToken.annualYield;
        return originalYield ? tokenPriceInDollar.multipliedBy(new BigNumber(1)).dividedBy(new BigNumber(originalPrice)).minus(1) : undefined;

    },[originalPrice, propertyToken, tokenPriceInDollar]);

    const isZero: boolean|undefined = useMemo(() => {
        if(!offerPriceDelta) return undefined;
        const valueFloat = Math.abs(parseFloat(offerPriceDelta.toString())*100).toFixed(0);
        return valueFloat == "0"
    },[offerPriceDelta]);

    return(
        <Flex justify={"center"} gap={"sm"}>
            <Text>{`${offerPrice} ($${parseFloat(tokenPriceInDollar ? tokenPriceInDollar?.toString() : "0").toFixed(2)})`}</Text>
            {   
                !offerPriceDelta && isZero == undefined ?
                    <Skeleton height={15}/>
                : offerPriceDelta && !isZero ?
                    <Text color={offerPriceDelta.gt(0) ? "red" : "green"}>
                        {`(${offerPriceDelta.gt(0) ? "+" : ""}${parseFloat(offerPriceDelta.multipliedBy(100).toString()).toFixed(2)}%)`}
                    </Text>
                :
                    undefined
            }
        </Flex>
    )
}