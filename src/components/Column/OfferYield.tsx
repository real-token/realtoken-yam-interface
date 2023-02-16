import { Flex, Skeleton, Text } from "@mantine/core"
import { Offer } from "src/types/offer";

interface OfferYieldProps{
    offer: Offer
}
export const OfferYield = ({ offer } : OfferYieldProps) => {
    return(
        <Flex gap={"sm"} justify={"center"}>
            { offer.offerYield ?
                <Text>{`${offer.offerYield.toFixed(2)}%`}</Text>
                :
                <Skeleton height={15}/>
            }
        </Flex>
    )
}