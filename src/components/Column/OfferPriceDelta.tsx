import { Flex, Skeleton, Text } from "@mantine/core"
import { useMemo } from "react";
import { Offer } from "src/types/offer"

interface OfferPriceDeltaProps{
    offer: Offer
}
export const OfferPriceDelta = ({ offer }: OfferPriceDeltaProps) => {

    const priceDelta = offer.priceDelta;

    const isZero: boolean|undefined = useMemo(() => {
        if(!priceDelta) return undefined;
        const valueFloat = Math.abs(priceDelta*100).toFixed(0);
        return valueFloat == "0"
    },[priceDelta]);

    return(
        <Flex justify={"center"}>
            {   
                !priceDelta ?
                    <Skeleton height={15}/>
                : priceDelta && !isZero ?
                    <Text color={isZero ? "white" : priceDelta > 0 ? "red" : "green"}>
                        {`(${priceDelta > 0 ? "+" : ""}${(priceDelta*100).toFixed(2)}%)`}
                    </Text>
                :
                    "-"
            }
        </Flex>
    )
}