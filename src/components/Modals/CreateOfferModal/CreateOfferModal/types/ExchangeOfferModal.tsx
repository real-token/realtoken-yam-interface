import { UseFormReturnType } from "@mantine/form";
import { SellFormValues } from "../../CreateOfferModal";
import { CreatedOffer } from "../../../../../types/offer";
import { OfferModalWrapper } from "../OfferModalWrapper";
import { useMemo, useState } from "react";
import { Flex, Select, Divider, Text } from '@mantine/core';
import { useTranslation } from "react-i18next";
import { useCreateOfferContext } from "../CreateOfferContext";
import { ComboboxOfferToken } from "../../ComboboxOfferToken/ComboboxOfferToken";
import { IconSwitchVertical } from "@tabler/icons";
import { ExchangeRateComputing } from "../ExchangeRateComputing";

interface BuyOfferModalProps{
    form: UseFormReturnType<SellFormValues>;
    offer: CreatedOffer;
}
export const ExchangeOfferModal = ({ offer, form }: BuyOfferModalProps) => {

    const { values, getInputProps } = form;

    const [exchangeType, setExchangeType] = useState<'realtoken'|'others'>('realtoken');
    const { t } = useTranslation('modals', { keyPrefix: 'createOffer' });

    const data = [{ value: 'realtoken', label: t("common.realtTokenType") },{ value: 'others', label: t("common.otherTokenType") }];

    const { properties, allowedTokens, choosedPrice } = useCreateOfferContext();

    const offerTokenSymbol = useMemo(() => {
        const list = exchangeType == 'realtoken' ? properties : allowedTokens;
        return list.find((token) => token.value === values.offerTokenAddress)?.label;
    },[exchangeType, properties, allowedTokens, values.offerTokenAddress]);

    const buyTokenSymbol = useMemo(() => {
        const list = exchangeType == 'realtoken' ? properties : allowedTokens;
        return list.find((token) => token.value === values.buyerTokenAddress)?.label;
    },[exchangeType, properties, allowedTokens, values.buyerTokenAddress]);

    const exchangeOfferTokens = useMemo(() => {
        return exchangeType == 'realtoken' ? 
            properties.filter(property => property.value != values.buyerTokenAddress)
        : 
            allowedTokens.filter(allowedToken => allowedToken.value != values.buyerTokenAddress)
    },[exchangeType, properties, allowedTokens, values.buyerTokenAddress])

    const exchangeBuyerToken = useMemo(() => {
        return exchangeType == 'realtoken' ? 
            properties.filter(property => property.value != values.offerTokenAddress)
        : 
            allowedTokens.filter(allowedToken => allowedToken.value != values.offerTokenAddress)
    },[exchangeType, properties, allowedTokens, values.offerTokenAddress])

    const total = useMemo(() => {
        return ((values?.amount ?? 0)*(choosedPrice ?? 0)).toFixed(exchangeType == 'realtoken' ? 18 : 6)
    },[values?.amount, choosedPrice, exchangeType])

    return(
        <OfferModalWrapper 
            offer={offer} 
            form={form}
            tokenPrice={
                <>
                    <Select 
                        label={t("exchange.chooseExchangeTokenType")}
                        data={data}
                        value={exchangeType}
                        onChange={(value) => setExchangeType(value as 'realtoken'|'others')}
                    /> 
                    <Divider />
                    <Flex gap={"md"} direction={'column'} align={'center'}>
                        <ComboboxOfferToken
                            key={"select-0"}
                            label={t('common.offerTokenAddress')}
                            type={exchangeType}
                            data={exchangeOfferTokens}
                            placeholder={t('common.placeholderOfferTokenAddress')}
                            disabled={false} 
                            {...getInputProps('offerTokenAddress')}
                        />
                        <IconSwitchVertical/>
                        <Select
                            key={"select-1"}
                            label={t('common.buyerTokenAddress')}
                            placeholder={t('common.placeholderBuyerTokenAddress')}
                            w={'100%'}
                            data={exchangeBuyerToken}
                            {...getInputProps('buyerTokenAddress')}
                        />
                    </Flex>
                    <ExchangeRateComputing 
                        form={form}
                        exchangeOfferTokens={exchangeOfferTokens}
                        exchangeBuyerToken={exchangeBuyerToken}
                    />
                </>
            }
            summary={
                <Text size={"md"} mb={10}>
                    {t("exchange.txExchangeSummary", {
                        amount: values?.amount,
                        buyTokenSymbol: offerTokenSymbol,
                        price: choosedPrice,
                        offerTokenSymbol: buyTokenSymbol,
                        total
                    })}
                </Text>
            }
        />
    )
}