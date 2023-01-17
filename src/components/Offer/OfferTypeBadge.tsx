import { createStyles, Flex } from "@mantine/core"
import { useTranslation } from "react-i18next";
import { useOfferType } from "src/hooks/useOfferType";
import { OFFER_TYPE } from "src/types/Offer";

interface StyleProps{
    offerTypeColor: string
}

const useStyle = createStyles((theme, { offerTypeColor } : StyleProps) => ({
    offerType: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: offerTypeColor,
        borderRadius: theme.radius.md,
        fontWeight: 700,
        padding: `0 ${theme.spacing.sm}px`,
        color: "white"
    },
}));

interface OfferTypeBadgeProps{
    offerType: OFFER_TYPE;
    textSize?: number;
}
export const OfferTypeBadge = ({ offerType, textSize }: OfferTypeBadgeProps) => {

    const { getColor, getI18OfferTypeName } = useOfferType();
    const { classes } = useStyle({ offerTypeColor: getColor(offerType) ?? "blue" });

    return(
        <>{ offerType ? <Flex className={classes.offerType}>{getI18OfferTypeName(offerType)?.toUpperCase()}</Flex> : undefined }</>
    )
}