import { createStyles, Flex, Skeleton, Text, useMantineTheme } from "@mantine/core"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { useRefreshOffers } from "src/hooks/offers/useRefreshOffers";
import { usePropertiesToken } from "src/hooks/usePropertiesToken";
import { theme } from "src/theme";
import { Offer } from "src/types/Offer"
import { BuyActionsWithPermit } from "../BuyActions";
import { ShowOfferAction } from "../ShowOfferAction/ShowOfferAction";

enum OFFER_TYPE{
    BUY,
    SELL,
    EXCHANGE
}

interface StyleProps{
    offerTypeColor: string
}

const useStyle = createStyles((theme, { offerTypeColor } : StyleProps) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#624105",
        borderRadius: theme.radius.md,
        overflow: "hidden",
        height: "100%",
    },
    header: {
        backgroundColor: "#624105",
        padding: theme.spacing.sm
    },
    content: {
        height: "100%",
    },
    data: {
        flexGrow: 1
    },
    offerTokenName: {
        color: "white",
        fontSize: theme.fontSizes.lg,
        fontWeight: 700
    },
    buyerTokenName: {
        fontStyle: 'italic',
        fontWeight: 500,
        color: theme.colors.gray[5]
    },
    buyButtonGroup: {
        width: "50%",
    },
    buyButton: {
        width: "100%",
        height: "35px"
    },
    showOfferButton: {
        width: "50%",
        height: "35px"
    },
    loader: {
        height: "500px",
        width: "500px"
    },
    offerType: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: offerTypeColor,
        borderRadius: theme.radius.md,
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        // width: "80px",
        // height: "80px",
        padding: `0 ${theme.spacing.sm}px`,
        color: "white"
    }, 
    offerId:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `0 ${theme.spacing.sm}px`,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.dark,
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        color: "white"
    }
}));

interface GridPaneProps{
    offer: Offer
}
export const GridPane: FC<GridPaneProps> = ({ offer }) => {

    const { colors } = useMantineTheme();
    const OFFER_COLOR: Map<OFFER_TYPE,string> = new Map<OFFER_TYPE,string>([
        [OFFER_TYPE.BUY,colors.green[9]],
        [OFFER_TYPE.SELL,colors.red[9]],
        [OFFER_TYPE.EXCHANGE,colors.orange[6]]
    ])

    const { refreshOffers } = useRefreshOffers(false);

    const { t } = useTranslation('buy', { keyPrefix: 'table' });
    const { t: t1 } = useTranslation('buy', { keyPrefix: 'grid' })

    const { propertiesToken } = usePropertiesToken(false);

    const offerType: OFFER_TYPE = useMemo((): OFFER_TYPE => {
        if(!offer && !propertiesToken) return OFFER_TYPE.EXCHANGE
        const buyerTokenIsProperty = propertiesToken.find(propertyToken => propertyToken.contractAddress.toLowerCase() == offer.buyerTokenAddress) !== undefined;
        const offerTokenIsProperty = propertiesToken.find(propertyToken => propertyToken.contractAddress.toLowerCase() == offer.offerTokenAddress) !== undefined;

        // console.log(buyerTokenIsProperty,offerTokenIsProperty)

        if(buyerTokenIsProperty && offerTokenIsProperty) return OFFER_TYPE.EXCHANGE
        if(buyerTokenIsProperty) return OFFER_TYPE.BUY
        if(offerTokenIsProperty) return OFFER_TYPE.SELL

        return OFFER_TYPE.EXCHANGE

    },[propertiesToken,offer])

    const offerTypeName = () => {
        switch(offerType){
            case OFFER_TYPE.BUY:
                return t1("buy").toUpperCase()
            case OFFER_TYPE.SELL:
                return t1("sell").toUpperCase()
            default:
                return t1("exchange").toUpperCase()
        }
    }

    const { classes } = useStyle({
        offerTypeColor: OFFER_COLOR.get(offerType) ?? "blue"
    });

    return(
        <>
        {
            !offer.availableAmount ?
                <Skeleton height={300} width={430}/>
            :
            <Flex className={classes.container}>
                <Flex direction={"column"} align={"start"} color={"brand"} className={classes.header} >
                    <Flex gap={"sm"}>
                        <Flex className={classes.offerId} mb={10}>{offer.offerId}</Flex>
                        <Flex className={classes.offerType} mb={10}>{offerTypeName()}</Flex>
                    </Flex>
                
                    <Text className={classes.offerTokenName}>{offer.offerTokenName}</Text>
                    <Text className={classes.buyerTokenName}>{offer.buyerTokenName}</Text>
                </Flex>
                <Flex direction={"column"} p={"sm"} gap={"sm"} className={classes.content}>
                    <Flex direction={"column"} mb={10} className={classes.data}>
                        <Flex direction={"column"}>
                            <Text fw={700}>{t("sellerAddress")}</Text>
                            {offer.sellerAddress}
                        </Flex>
                        <Flex direction={"column"}>
                            <Text fw={700}>{t("amount")}</Text>
                            {offer.amount}
                        </Flex>
                        <Flex direction={"column"}>
                            <Text fw={700}>{t("price")}</Text>
                            {offer.price}
                        </Flex>
                    </Flex>
                    <Flex gap={"sm"}>
                        <BuyActionsWithPermit
                            buyOffer={offer}
                            triggerRefresh={refreshOffers}
                            groupClassName={classes.buyButtonGroup}
                            buttonClassName={classes.buyButton}
                        />
                        <ShowOfferAction 
                            offer={offer}
                            className={classes.showOfferButton}
                        />
                    </Flex>
                </Flex>
            </Flex>
        }
        </>
    )
}