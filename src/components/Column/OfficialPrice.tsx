import { Flex, Skeleton } from "@mantine/core";
import { Offer } from "src/types/offer"

interface OffialPriceProps{
    offer: Offer
}
export const OfficialPrice = ({ offer } : OffialPriceProps) => {

    return(
        <Flex justify={"center"}>
            { offer.officialPrice ? offer.officialPrice : <Skeleton height={15}/> }
        </Flex>
    )
}