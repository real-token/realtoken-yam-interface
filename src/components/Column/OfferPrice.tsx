import { Flex, Skeleton, Text } from "@mantine/core"
import { Offer } from "src/types/offer"

interface OfferPriceProps{
    offer: Offer
}
export const OfferPrice = ({ offer } : OfferPriceProps) => {

    const offerPrice = offer.price;
    const tokenPriceInDollar = offer.offerPrice;

    return(
        <Flex justify={"center"} gap={"sm"}>
            <Text style={{ textAlign: "center" }}>
                { tokenPriceInDollar !== undefined && offerPrice !== undefined ? 
                    `${offerPrice} ($${parseFloat(tokenPriceInDollar ? tokenPriceInDollar?.toString() : "0").toFixed(2)})` 
                    : 
                    <Skeleton height={15}/>
                }
            </Text>
        </Flex>
    )
}