import { Flex } from "@mantine/core"
import { useMemo } from "react"
import Skeleton from "react-loading-skeleton"
import { usePropertyToken } from "src/hooks/usePropertyToken"
import { Offer, OFFER_TYPE } from "src/types/offer"

interface OriginalYieldProps{
    offer: Offer
}
export const OriginalYield = ({ offer } : OriginalYieldProps) => {

    const { propertyToken } = usePropertyToken(offer.type == OFFER_TYPE.BUY ? offer.buyerTokenAddress : offer.offerTokenAddress);

    const originalYield: number|undefined = useMemo(() => {
        if(!propertyToken) return undefined;
        return propertyToken.annualYield ? propertyToken.annualYield*100 : undefined;
    },[propertyToken])

    return(
        <Flex>
            {originalYield ? `${originalYield.toFixed(2)}%` : <Skeleton height={15}/>}
        </Flex>
    )
}