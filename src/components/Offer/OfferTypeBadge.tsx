import { createStyles, Flex, useMantineTheme } from "@mantine/core"
import { useTranslation } from "react-i18next";
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

    const { colors } = useMantineTheme();
    const OFFER_COLOR: Map<OFFER_TYPE,string> = new Map<OFFER_TYPE,string>([
        [OFFER_TYPE.BUY,colors.green[9]],
        [OFFER_TYPE.SELL,colors.red[9]],
        [OFFER_TYPE.EXCHANGE,colors.orange[6]]
    ])

    const { classes } = useStyle({ offerTypeColor: OFFER_COLOR.get(offerType) ?? "blue" });
    const { t } = useTranslation('buy', { keyPrefix: 'grid' })

   const offerTypeName = () => {
        switch(offerType){
            case OFFER_TYPE.BUY:
                return t("buy").toUpperCase()
            case OFFER_TYPE.SELL:
                return t("sell").toUpperCase()
            default:
                return t("exchange").toUpperCase()
        }
    }

    return(
        <>{ offerType ? <Flex className={classes.offerType} mb={10}>{offerTypeName()}</Flex> : undefined }</>
    )
}