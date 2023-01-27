import { Flex } from "@mantine/core";
import Skeleton from "react-loading-skeleton";
import { usePropertyToken } from "src/hooks/usePropertyToken";
import { Offer, OFFER_TYPE } from "src/types/offer"

interface TokenNameProps{
    offer: Offer
}
export const TokenName = ({ offer } : TokenNameProps) => {

    const { propertyToken } = usePropertyToken(offer.type == OFFER_TYPE.BUY ? offer.buyerTokenAddress : offer.offerTokenAddress);

    return(
        <Flex>
            {propertyToken ? propertyToken.shortName : <Skeleton height={15} />}
        </Flex>
    )
}