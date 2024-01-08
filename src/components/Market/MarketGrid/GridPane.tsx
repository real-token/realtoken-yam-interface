import { Flex, Skeleton, Text } from "@mantine/core"
import { FC } from "react"
import { useTranslation } from "react-i18next";
import { OfferTypeBadge } from "src/components/Offer/OfferTypeBadge/OfferTypeBadge";
import { OfferDeltaTable } from "src/components/Table/OfferDeltaTable/OfferDeltaTable";
import { OFFER_TYPE } from "src/types/offer";
import { Offer } from "src/types/offer/Offer"
import { BuyActionsWithPermit } from "../BuyActions";
import { ShowOfferAction } from "../ShowOfferAction/ShowOfferAction";
import classes from './GridPane.module.css';

interface GridPaneProps{
    offer: Offer
}
export const GridPane: FC<GridPaneProps> = ({ offer }) => {

    const { t } = useTranslation('buy', { keyPrefix: 'table' });

    return(
        <>
        {
            !offer.availableAmount ?
                <Skeleton height={300} width={430}/>
            :
            <Flex className={classes.container}>
                <Flex direction={"column"} align={"start"} color={"brand"} className={classes.header} >
                    <Flex gap={"sm"} pb={12}>
                        <Flex className={classes.offerId} mb={10}>{offer.offerId}</Flex>
                        <OfferTypeBadge offerType={offer.type ?? OFFER_TYPE.SELL}/>
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
                        <Flex direction={"column"} mb={15}>
                            <Text fw={700}>{t("price")}</Text>
                            {offer.price}
                        </Flex>
                        { offer.type !== OFFER_TYPE.EXCHANGE ? 
                            <OfferDeltaTable 
                                offer={offer}
                                offerPrice={offer.offerPrice}
                                officialPrice={offer.officialPrice}
                                offerYield={offer.offerYield}
                                officialYield={offer.officialYield}
                            /> 
                            : 
                            undefined
                        }
                    </Flex>
                    <Flex gap={"sm"}>
                        <BuyActionsWithPermit
                            buyOffer={offer}
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