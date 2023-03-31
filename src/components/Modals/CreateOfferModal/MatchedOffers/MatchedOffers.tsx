import { createStyles, Flex, Loader, MantineTheme } from "@mantine/core"
import { IconSwitchHorizontal } from "@tabler/icons";
import { FC } from "react";
import { useMatchedOffers } from "../../../../hooks/useMatchedOffers";
import { OFFER_TYPE } from "../../../../types/offer";
import { MatchedOffer, OFFER_BEST_TYPE } from "./MatchedOffer";

const useStyles = createStyles((theme: MantineTheme) => ({
    container: {
        position: 'absolute',
        top: 0,
        left: '105%',
        borderRadius: '8px',
        width: '70%',
        backgroundColor: '#1A1B1E',
        overflow: 'hidden',
        maxHeight: '70%'
    },
    header: {
        backgroundColor: theme.colors.brand,
        padding: '20px',
    },
    body: {
        padding: '20px',
        overflowY: 'scroll'
    }
}));

interface MatchedOffersProps{
    offerType: OFFER_TYPE;
    offerTokenAddress: string;
    buyerTokenAddress: string;
    price: number|undefined;
    amount: number|undefined;
}
export const MatchedOffers: FC<MatchedOffersProps> = ({ offerType, offerTokenAddress, buyerTokenAddress, price, amount }) => {

    const { classes } = useStyles();
    const { bestPrice, bestAmount, otherMatching } = useMatchedOffers(offerType, offerTokenAddress, buyerTokenAddress, price, amount);

    return(
        <Flex className={classes.container} direction={"column"}>
            <Flex gap={"sm"} className={classes.header}>
                <IconSwitchHorizontal/>
                {"Offers matching"}
            </Flex>
            <Flex direction={"column"} className={classes.body} gap={"sm"}>
                {}
                {!otherMatching ? (
                    <Flex align={"center"} gap={"sm"}>
                        <Loader size={"sm"}/>
                        {"Matching offers..."}
                    </Flex>
                ) : !bestPrice && !bestAmount && otherMatching && otherMatching.length == 0 ? (
                    <div>{"❌ No matching offers founded "}</div>
                ) : undefined }
                { bestPrice && bestAmount && bestPrice.offerId == bestAmount.offerId ? (
                    <MatchedOffer offer={bestAmount} offerBestType={OFFER_BEST_TYPE.BEST_PRICE_AMOUNT}/>
                ): (
                    <>
                    { bestPrice ? <MatchedOffer offer={bestPrice} offerBestType={OFFER_BEST_TYPE.BEST_PRICE} /> : undefined }
                    { bestAmount ? <MatchedOffer offer={bestAmount} offerBestType={OFFER_BEST_TYPE.BEST_AMOUNT} /> : undefined }
                    </>
                )}
                {otherMatching && otherMatching.map((offer) => <MatchedOffer key={offer.createdAtTimestamp} offer={offer} />)}
            </Flex>
        </Flex>
    )
}