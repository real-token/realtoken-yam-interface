import { Divider, Flex, Loader, MantineTheme } from "@mantine/core"
import { IconSwitchHorizontal } from "@tabler/icons";
import { FC } from "react";
import { useMatchedOffers } from "../../../../hooks/useMatchedOffers";
import { OFFER_TYPE } from "../../../../types/offer";
import { MatchedOffer } from "./MatchedOffer";
import { MultiPath } from "./MultiPath";
import { useTranslation } from "react-i18next";
import { OFFER_BEST_TYPE } from "../../../../hooks/useMatchedOfferBestType";
import classes from './MatchedOffers.module.css';

interface MatchedOffersProps{
    offerType: OFFER_TYPE;
    offerTokenAddress: string;
    buyerTokenAddress: string;
    price: number|undefined;
    amount: number|undefined;
    closeModal: () => void;
}
export const MatchedOffers: FC<MatchedOffersProps> = ({ offerType, offerTokenAddress, buyerTokenAddress, price, amount, closeModal }) => {

    const { t } = useTranslation('modals', { keyPrefix: "offerMatching" })

    const { 
        bestPrice, 
        multiPath,
        multiPathAmountFilled,
        multiPathAmountFilledPercentage,
        otherMatching 
    } = useMatchedOffers(offerType, offerTokenAddress, buyerTokenAddress, price, amount);

    return(
        <Flex className={classes.container} direction={"column"}>
            <Flex gap={"sm"} className={classes.header}>
                <IconSwitchHorizontal/>
                {t("title")}
            </Flex>
            <Flex direction={"column"} className={classes.body} gap={"sm"}>
                { !bestPrice && !multiPath && otherMatching && otherMatching.length == 0 ? (
                    <div>{t("noMatchingFound")}</div>
                ): undefined}
                {!bestPrice && !multiPath && !otherMatching ? (
                    <Flex align={"center"} gap={"sm"}>
                        <Loader size={"sm"}/>
                        {t("waitingMatching")}
                    </Flex>
                ): undefined}
                { multiPath ? 
                    <MultiPath 
                        offers={multiPath} 
                        amount={amount}
                        multiPathAmountFilled={multiPathAmountFilled}
                        multiPathAmountFilledPercentage={multiPathAmountFilledPercentage}
                        closeModal={closeModal}
                    /> 
                : (
                    <>{ bestPrice ? <MatchedOffer offer={bestPrice} amount={amount} offerBestType={OFFER_BEST_TYPE.BEST_PRICE} /> : undefined }</>
                )}
                {otherMatching && otherMatching.length> 1 ? (
                    <>
                    <Divider color={"brand"}/>
                    {otherMatching.map((offer) => <MatchedOffer key={offer.createdAtTimestamp} offer={offer} amount={amount}/>)}
                    </>
                ): undefined}
            </Flex>
        </Flex>
    )
}