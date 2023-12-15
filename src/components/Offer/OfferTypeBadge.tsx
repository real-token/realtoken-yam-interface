import { createStyles, Flex, Sx } from "@mantine/core"
import { useOfferType } from "src/hooks/useOfferType";
import { OFFER_TYPE } from "src/types/offer";

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
        padding: `0 ${theme.spacing.sm}`,
        color: "white"
    },
}));

interface OfferTypeBadgeProps{
    offerType: OFFER_TYPE;
    textSize?: number;
    sx?: Sx
}
export const OfferTypeBadge = ({ offerType, sx }: OfferTypeBadgeProps) => {

    const { getColor, getI18OfferTypeName } = useOfferType();
    const { classes } = useStyle({ offerTypeColor: getColor(offerType) ?? "blue" });

    return(
        <>{ offerType ? <Flex className={classes.offerType} sx={sx}>{getI18OfferTypeName(offerType)?.toUpperCase()}</Flex> : undefined }</>
    )
}