import { CreatedOffer } from "../../../../../types/offer";
import { UseFormReturnType } from "@mantine/form";
import { SellFormValues } from "../../CreateOfferModal";
import { useTranslation } from "react-i18next";
import { useCreateOfferContext } from "../CreateOfferContext";
import { OfferModalWrapper } from "../OfferModalWrapper";
import { Flex, Text, Divider } from "@mantine/core";
import { ComboboxOfferToken } from "../../ComboboxOfferToken/ComboboxOfferToken";
import { Select } from "@mantine/core";
import { PriceComputingPane } from "../PriceComputingPane/PriceComputingPane";
import { useMemo } from "react";

interface BuyOfferModalProps{
    form: UseFormReturnType<SellFormValues>;
    offer: CreatedOffer;
}
export const BuyOfferModal = ({ offer, form }: BuyOfferModalProps) => {

    const { getInputProps, values } = form;
    const { t } = useTranslation('modals', { keyPrefix: 'createOffer' });

    const { offerTokens, buyerTokens, offerTokenSymbol, offerTokenPrice, buyTokenSymbol, buyerTokenPrice, choosedPrice } = useCreateOfferContext();

    const price = useMemo(() => {
        return (values?.amount ?? 0) * (choosedPrice ?? 0)
    }, [values?.amount, choosedPrice])

    const total = useMemo(() => {
        return ((values?.amount ?? 0)* (choosedPrice ?? 0)).toFixed(6)
    }, [values?.amount, choosedPrice])
    // console.log('total: ', total)

    return (
        <OfferModalWrapper
            offer={offer} 
            form={form}
            tokenPrice={
                <>
                <Flex direction={'column'}>
                    <ComboboxOfferToken
                        type={'others'}
                        key="sell-select-0"
                        label={t('common.offerTokenAddress')}
                        data={offerTokens}
                        placeholder={t('common.placeholderOfferTokenAddress')}
                        disabled={false}
                        required={true}
                        {...getInputProps('offerTokenAddress')}
                    />
                    {offerTokenPrice ? <Text fz={16} fs={'italic'}>{t('common.currentPrice', { price: offerTokenPrice })}</Text> : undefined}
                </Flex>
                <Flex direction={'column'}>
                    <Select
                        key="sell-select-1"
                        label={t('common.buyerTokenAddress')}
                        placeholder={t('common.placeholderBuyerTokenAddress')}
                        data={buyerTokens}
                        required={true}
                        disabled={false}
                        {...getInputProps('buyerTokenAddress')}
                    />
                    {buyerTokenPrice ? <Text fz={16} fs={'italic'}>{t('common.currentPrice', { price: buyerTokenPrice })}</Text> : undefined}
                </Flex>
                {offerTokenSymbol && buyTokenSymbol ? (
                    <>
                    <Divider />
                    <PriceComputingPane
                        form={form}
                        offer={offer}
                    />
                    </>
                ): undefined}
                </>
            }
            summary={
                <Text size={"md"} mb={10}>
                    {t("buy.txBuySummary", {
                        amount: values?.amount,
                        buyTokenSymbol: buyTokenSymbol,
                        price: choosedPrice,
                        offerTokenSymbol: offerTokenSymbol,
                        total
                    })}
                </Text>
            }
        />
    )
}