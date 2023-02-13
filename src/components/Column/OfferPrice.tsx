import { Flex, Skeleton, Text } from "@mantine/core"
import { useOfferPriceInDollar } from "src/hooks/useOfferPriceInDollar";
import { useOraclePriceFeed } from "src/hooks/useOraclePriceFeed";
import { Offer, OFFER_TYPE } from "src/types/offer"

interface OfferPriceProps{
    offer: Offer
}
export const OfferPrice = ({ offer } : OfferPriceProps) => {

    const { price } = useOraclePriceFeed(offer.type == OFFER_TYPE.BUY ? offer.offerTokenAddress: offer.buyerTokenAddress);
    const offerPrice = offer.price;

    const { tokenPriceInDollar } = useOfferPriceInDollar(price, offer);

    return(
        <Flex justify={"center"} gap={"sm"}>
            <Text>{ tokenPriceInDollar && offerPrice ? `${offerPrice} ($${parseFloat(tokenPriceInDollar ? tokenPriceInDollar?.toString() : "0").toFixed(2)})` : <Skeleton height={15}/>}</Text>
        </Flex>
    )
}