import { Flex, Text, Skeleton, Divider } from "@mantine/core";
import { IconError404, IconExclamationCircle } from "@tabler/icons";
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { OfferText } from "src/components/Offer/OfferText";
import { useOffer } from "src/hooks/offers/useOffer";
import { usePropertiesToken } from "src/hooks/usePropertiesToken";
import { PropertiesToken } from "src/types";
import BigNumber from "bignumber.js";
import { PropertyCard } from "src/components/Offer/PropertyCard/PropertyCard";
import { ConnectedProvider } from "src/providers/ConnectProvider";
import classes from './Offer.module.css';
import { BuyActionsWithPermit } from "../../src/components/Market/BuyActions";

const ShowOfferPage: FC = () => {

    const router = useRouter();
    const { id } = router.query;

    const offerId: number = parseInt(id as string);

    const { offer, isLoading, hasError } = useOffer(offerId);

    const { t } = useTranslation('modals', { keyPrefix: 'buy' });

    const [propertyTokens,setPropertyTokens] = useState<PropertiesToken[]>([]);
    const { getPropertyToken, propertiesIsloading } = usePropertiesToken();

    useEffect(() => {
        if(!offer || propertiesIsloading || propertyTokens.length > 0) return undefined;

        if(offer.buyerTokenType == 1){
            const token = getPropertyToken(offer.buyerTokenAddress);
            if(token) setPropertyTokens(prev => [...prev,token])
        }

        if(offer.offerTokenType == 1){
            const token = getPropertyToken(offer.offerTokenAddress);
            if(token) setPropertyTokens(prev => [...prev,token])
        }

    },[getPropertyToken, offer, propertiesIsloading, propertyTokens.length]);

    return(
        <ConnectedProvider>
            <Flex direction={"column"} mt={"xl"} h={offer == undefined ? '100%': 'unset'}>
            { 
                isLoading || offer !== undefined ? (
                    <Flex gap={"md"}>
                        <Flex className={classes.container} direction={"column"} gap={"md"}>
                            <div className={classes.offerId}>
                                {offerId}
                            </div>
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
                            <BuyActionsWithPermit
                                buyOffer={offer}
                                loading={isLoading}
                                buttonClassName={classes.buyButton}
                            />
                        </Flex>
                        <Flex 
                            direction={"column"} 
                            gap={"md"} 
                            align={"center"}
                            w={"100%"}
                        >
                            { propertyTokens && offer && propertyTokens.length > 0 ? 
                                propertyTokens.map(token => <PropertyCard key={token.contractAddress} propertyToken={token} offer={offer}/>)
                                :
                                undefined
                            }
                        </Flex>
                    </Flex>
                )
                :
                (
                    <Flex
                        h={'100%'}
                        w={'100%'}
                        justify={'center'}
                        align={'center'}
                        direction={'column'}
                    >
                        {hasError ? (
                            <>
                            <IconExclamationCircle size={'200px'} color="#AE740A"/>
                            <Text size={'xl'}>{"An error hapenned while loading offer"}</Text>
                            </>
                        ):(
                            <>
                            <IconError404 size={'200px'} color="#AE740A"/>
                            <Text size={'xl'}>{"Offer don't exists"}</Text>
                            </>
                        )}
                        
                    </Flex>
                )
            }
            </Flex>
        </ConnectedProvider>
    )
}

export default ShowOfferPage;