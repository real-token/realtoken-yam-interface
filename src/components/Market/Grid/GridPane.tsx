import { createStyles, Flex, Skeleton, Text } from "@mantine/core"
import { FC } from "react"
import { useTranslation } from "react-i18next";
import { useRefreshOffers } from "src/hooks/offers/useRefreshOffers";
import { Offer } from "src/types/Offer"
import { BuyActionsWithPermit } from "../BuyActions";
import { ShowOfferAction } from "../ShowOfferAction/ShowOfferAction";

const useStyle = createStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: theme.colors.brand,
        borderRadius: theme.radius.md,
        overflow: "hidden",
        // height: "100%",
    },
    header: {
        backgroundColor: theme.colors.brand,
        padding: theme.spacing.sm
    },
    offerTokenName: {
        color: "white",
        fontSize: theme.fontSizes.lg,
        fontWeight: 700
    },
    buyerTokenName: {
        fontStyle: 'italic',
        fontWeight: 500
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
    }
}));

interface GridPaneProps{
    offer: Offer
}
export const GridPane: FC<GridPaneProps> = ({ offer }) => {

    const { classes } = useStyle();
    const { refreshOffers } = useRefreshOffers(false);

    const { t } = useTranslation('buy', { keyPrefix: 'table' });

    return(
        <>
        {
            !offer.availableAmount ?
                <Skeleton height={300} width={430}/>
            :
            <Flex className={classes.container}>
                <Flex direction={"column"} color={"brand"} className={classes.header} >
                    <Text className={classes.offerTokenName}>{offer.offerTokenName}</Text>
                    <Text className={classes.buyerTokenName}>{offer.buyerTokenName}</Text>
                </Flex>
                <Flex direction={"column"} p={"sm"} gap={"sm"}>
                    <Flex direction={"column"} mb={10}>
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