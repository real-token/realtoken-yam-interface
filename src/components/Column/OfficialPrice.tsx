import { Flex, Skeleton } from "@mantine/core";
import { useMemo } from "react";
import { usePropertyToken } from "src/hooks/usePropertyToken";
import { Offer, OFFER_TYPE } from "src/types/offer"

interface OffialPriceProps{
    offer: Offer
}
export const OffialPrice = ({ offer } : OffialPriceProps) => {

    const { propertyToken } = usePropertyToken(offer.type == OFFER_TYPE.BUY ? offer.buyerTokenAddress : offer.offerTokenAddress);

    const officialPrice: string|undefined = useMemo(() => {
        if(!propertyToken) return undefined;

        const buyCurrency = propertyToken.currency;
        const buyPrice = propertyToken.officialPrice;

        return `${buyPrice} $${buyCurrency}`;
    },[propertyToken]);

    return(
        <Flex justify={"center"}>
            { officialPrice ? officialPrice : <Skeleton height={15}/> }
        </Flex>
    )
}