import { Flex, Skeleton } from "@mantine/core";
import { usePropertyToken } from "src/hooks/usePropertyToken";
import { Offer, OFFER_TYPE } from "src/types/offer"
import { TextUrl } from "../TextUrl/TextUrl";

interface TokenNameProps{
    offer: Offer
}
export const TokenName = ({ offer } : TokenNameProps) => {

    const { propertyToken } = usePropertyToken(offer.type == OFFER_TYPE.BUY ? offer.buyerTokenAddress : offer.offerTokenAddress);

    return(
        <Flex justify={"start"}>
        {propertyToken ? 
                <TextUrl url={propertyToken.marketplaceLink}>{propertyToken.shortName}</TextUrl>
            : 
            <Skeleton height={15} />
        }
        </Flex>
    )
}