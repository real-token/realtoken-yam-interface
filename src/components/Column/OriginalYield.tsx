import { Flex, Skeleton } from "@mantine/core"
import { Offer } from "src/types/offer"

interface OriginalYieldProps{
    offer: Offer
}
export const OriginalYield = ({ offer } : OriginalYieldProps) => {

    return(
        <Flex justify={"center"}>
            {offer.officialYield ? `${offer.officialYield.toFixed(2)}%` : <Skeleton height={15}/>}
        </Flex>
    )
}