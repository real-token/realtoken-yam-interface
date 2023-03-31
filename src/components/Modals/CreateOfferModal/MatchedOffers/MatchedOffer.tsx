import { Button, createStyles, Flex, MantineTheme, Text } from "@mantine/core";
import { IconArrowDownLeft, IconArrowUpRight, IconCash, IconScale } from "@tabler/icons";
import { useOfferInfos } from "../../../../hooks/useOfferInfos";
import { Offer, OFFER_TYPE } from "../../../../types/offer";
import { OfferTypeBadge } from "../../../Offer/OfferTypeBadge";

export enum OFFER_BEST_TYPE{
    BEST_PRICE = 'Best price',
    BEST_AMOUNT = 'Best amount',
    BEST_PRICE_AMOUNT = 'Best price and amount'
}

const useStyle = createStyles((theme: MantineTheme) => ({
    container: {
        position: 'relative',
        border: `2px solid ${theme.colors.brand[0]}`,
        padding: theme.spacing.md,
        borderRadius: theme.spacing.md
    },
    floatingButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: '10px',
        marginRight: '10px'
    },
    offerId: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.brand,
        borderRadius: theme.radius.md,
        height: "40px",
        padding: `0 ${10}px`,
        // color: theme.colors.brand,
        fontWeight: 700,
        fontSize: theme.fontSizes.xl
    },
}));

interface MatchedOfferProps{
    offerBestType?: OFFER_BEST_TYPE,
    offer: Offer
}
export const MatchedOffer = ({ offerBestType, offer } : MatchedOfferProps) => {

    const { classes } = useStyle();
    const { buyerTokenName, offerTokenName } = useOfferInfos(offer);

    return(
        <Flex direction={"column"} className={classes.container}>
            <Flex gap={"xs"} direction={"column"} mb={10}>
                { offerBestType ? (
                    <Flex 
                        sx={(theme) => ({ 
                            backgroundColor: offerBestType == OFFER_BEST_TYPE.BEST_PRICE_AMOUNT ? theme.colors.indigo : OFFER_BEST_TYPE.BEST_PRICE ? theme.colors.blue : theme.colors.grape,
                            borderRadius: theme.radius.md,
                            fontWeight: 700,
                            padding: `0 ${theme.spacing.sm}px`,
                            color: "white",
                            justifyContent: 'center'
                        })}
                    >
                        {String(offerBestType).toUpperCase()}
                    </Flex>
                ): undefined}
                <Flex gap={"xs"}>
                    <div className={classes.offerId}>{offer.offerId}</div>
                    <OfferTypeBadge offerType={offer.type ?? OFFER_TYPE.EXCHANGE} sx={{ flexGrow: 1 }}/>
                </Flex>
            </Flex>
            <Flex gap={"sm"} mt={6}>
                <IconArrowUpRight color={"red"} />
                <Text>{buyerTokenName}</Text>
            </Flex>
            <Flex gap={"sm"}>
                <IconArrowDownLeft color={"green"} />
                <Text>{offerTokenName}</Text>
            </Flex>
            <Flex gap={"sm"}>
                <IconCash/>
                <Text>{offer.price}</Text>
            </Flex>
            <Flex gap={"sm"}>
                <IconScale/>
                <Text>{offer.amount}</Text>
            </Flex>
            <Button className={classes.floatingButton}>{"Buy"}</Button>
        </Flex>
    )
}