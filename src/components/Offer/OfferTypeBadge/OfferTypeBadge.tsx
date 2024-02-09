import { MantineStyleProp, Flex } from "@mantine/core"
import { useOfferType } from "src/hooks/useOfferType";
import { OFFER_TYPE } from "src/types/offer";
import classes from "./OfferTypeBadge.module.css"

interface OfferTypeBadgeProps{
    offerType: OFFER_TYPE;
    textSize?: number;
    sx?: MantineStyleProp
}
export const OfferTypeBadge = ({ offerType, sx }: OfferTypeBadgeProps) => {

    const { getColor, getI18OfferTypeName } = useOfferType();

    return(
        <>
        { offerType ? (
            <Flex
                className={classes.offerType}
                style={{
                    backgroundColor: getColor(offerType) ?? "blue",
                    ...sx
                }}
            >
                {getI18OfferTypeName(offerType)?.toUpperCase()}
            </Flex>)
            : undefined 
        }
        </>
    )
}