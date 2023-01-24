import { Flex, Text, createStyles, Skeleton, ActionIcon, Title, Divider } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import { useRouter } from "next/router"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { OfferText } from "src/components/Offer/OfferText";
import { useOffer } from "src/hooks/offers/useOffer";
import { usePropertiesToken } from "src/hooks/usePropertiesToken";
import { PropertiesToken } from "src/types";
import { useModals } from '@mantine/modals';
import { useWeb3React } from "@web3-react/core";
import { Offer } from "src/types/offer/Offer";
import { useRefreshOffers } from "src/hooks/offers/useRefreshOffers";
import BigNumber from "bignumber.js";

const useStyle = createStyles((theme) => ({
    offerId: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.brand,
        borderRadius: theme.radius.md,
        width: "40px",
        height: "40px",
        // color: theme.colors.brand,
        fontWeight: 700,
        fontSize: theme.fontSizes.xl
    },
    offerHeader: {
        display: "flex",
        gap: theme.spacing.xs,
        flexDirection: "row",
        flexShrink: 0,
        alignItems: "center"
    },
    buyButton: {
        width: "125px",
        height: "50px"
    }
}));

const ShowOfferPage: FC = () => {

    const { classes } = useStyle()

    const router = useRouter();
    const { id } = router.query;

    const offerId: number = parseInt(id as string);

    const { account, provider } = useWeb3React();
    const { offer, isLoading } = useOffer(offerId);
    const { getPropertyToken, propertiesIsloading } = usePropertiesToken(false);

    const { refreshOffers } = useRefreshOffers(false);

    const { t } = useTranslation('modals', { keyPrefix: 'buy' });
    const { t: t2 } = useTranslation('modals');

    const modals = useModals();

    const propertyToken: PropertiesToken | undefined = useMemo(() => {
        // console.log(!offer, !offer?.hasPropertyToken, !offer?.offerTokenAddress, propertiesIsloading)
        if(!offer || !offer.hasPropertyToken || !offer.offerTokenAddress || propertiesIsloading) return undefined;
        return getPropertyToken(offer.offerTokenAddress);
    },[getPropertyToken, offer, propertiesIsloading])

    // console.log(offer)
    // console.log(propertyToken)

    const onOpenWalletModal = useCallback(() => {
        modals.openContextModal('wallet', {
          title: <Title order={3}>{t2('wallet.title')}</Title>,
          innerProps: {},
        });
      }, [modals, t2]);
    
      const isAccountOffer: boolean = useMemo(() => {
        if(!offer || !account) return false;
        return offer.sellerAddress == account || (isAccountOffer && offer.buyerAddress == account)
      },[offer, account])

    const onOpenBuyModal = useCallback(
        (offer: Offer) => {
          modals.openContextModal('buyPermit', {
            title: <Title order={3}>{t2('buy.title')}</Title>,
            size: "lg",
            innerProps: {
              offerId: offer.offerId,
              price: offer.price,
              offerAmount: offer.amount,
              offerTokenAddress: offer.offerTokenAddress,
              offerTokenDecimals: offer.offerTokenDecimals,
              buyerTokenAddress: offer.buyerTokenAddress,
              buyerTokenDecimals: offer.buyerTokenDecimals,
              sellerAddress: offer.sellerAddress,
              triggerTableRefresh: refreshOffers,
            },
        });
    },[modals, refreshOffers, t2]);

    return(
        <Flex direction={"column"} mt={"xl"}>
        { 
            isLoading || offer !== undefined ? (
                <Flex direction={"column"} gap={"md"}>
                    <Flex gap={"md"} align={"start"} justify={"start"}>
                        {/* <PropertyImage property={propertyToken}/> */}
                        <Flex direction={"column"} gap={"xl"}>
                            <div className={classes.offerHeader}>
                                <div className={classes.offerId}>
                                    {offerId}
                                </div>
                                {/* <Text fz={32}>{"-"}</Text> */}
                                {/* { offer?.offerTokenName && offer?.buyerTokenName ?
                                    <>
                                        <Text color={"brand"} fw={700} fz={"xl"}>
                                            {offer?.offerTokenName}
                                        </Text>
                                        <IconArrowRight/>
                                        <Text color={"brand"} fw={700} fz={"xl"}>
                                            {offer?.buyerTokenName}
                                        </Text>
                                    </>
                                    :
                                    <Skeleton width={500} height={35}  />
                                } */}
                            </div>
                            {/* <Flex align={"start"}>
                                <OfferPropertyCard
                                    title={"Amount"}
                                    value={offer?.amount}
                                    logo={<IconScale color={"brand"}/>}
                                />
                            </Flex> */}
                        </Flex>
                    </Flex>
                    <Flex direction={"column"} gap={"md"}>
                        <OfferText
                            title={t("offerTokenName")}
                            value={offer?.offerTokenName}
                        />
                        <OfferText
                            title={t("buyerTokenName")}
                            value={offer?.buyerTokenName}
                        />
                        <OfferText
                            title={t("sellerAddress")}
                            value={offer?.sellerAddress}
                        />
                        <OfferText
                            title={t("amount")}
                            value={offer?.amount}
                        />
                        <Flex direction={"column"} gap={3}>
                            <Text fw={700}>{"Price"}</Text>
                            {   offer?.offerTokenName &&  offer.buyerTokenName && offer?.price ? 
                                    <Text>{`1 "${offer?.offerTokenName}" = ${offer?.price} "${offer.buyerTokenName}"`}</Text>
                                : 
                                    <Skeleton height={25} width={400}/> 
                            }
                            {   offer?.offerTokenName &&  offer.buyerTokenName && offer?.price ? 
                                    <Text>{`1 "${offer.buyerTokenName}" = ${new BigNumber(1).dividedBy(offer?.price).toFixed(5)} ${offer?.offerTokenName}`}</Text>
                                : 
                                    <Skeleton height={25} width={400}/> 
                            }
                        </Flex>
                    </Flex>
                    <Divider />
                    <ActionIcon
                        color={'green'}
                        disabled={isAccountOffer}
                        className={classes.buyButton}
                        onClick={() => account && offer ? onOpenBuyModal(offer) : onOpenWalletModal() }
                    >
                        { isAccountOffer ? 
                            <Text fz={"sm"} align={"center"} p={6}>{"Cannot buy your own offer"}</Text> 
                            : 
                            <IconShoppingCart size={24} aria-label={'Buy'} /> 
                        }
                    </ActionIcon>
                </Flex>
            )
            :
            (
                <div>{"Offer doesn't exist :/"}</div>
            )
        }
        </Flex>
    )
}

export default ShowOfferPage;