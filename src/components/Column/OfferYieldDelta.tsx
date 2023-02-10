import { Flex, Text } from "@mantine/core"
import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { Offer } from "src/types/offer"

interface OfferYieldDeltaProps{
    offer: Offer
}
export const OfferYieldDelta = ({ offer }: OfferYieldDeltaProps) => {

    const offerDelta = useMemo(() => new BigNumber(offer.yieldDelta ?? 0),[offer.yieldDelta]);;

    const isZero: boolean|undefined = useMemo(() => {
        if(!offerDelta) return undefined;
        const valueFloat = (parseFloat(offerDelta.toString())*100).toFixed(0);
        return valueFloat == "0" || valueFloat == "-0"
    },[offerDelta])

    return(
        <Flex justify={"center"}>
            <Text color={isZero ? "white" : offerDelta.gt(0) ? "green" : "red"}>
                { !isZero ? 
                    `(${offerDelta.gt(0) ? "+" : ""}${parseFloat(offerDelta.multipliedBy(100).toString()).toFixed(2)}%)`
                    :
                    "-"
                }   
            </Text> 
        </Flex>
    )
} 