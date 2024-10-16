import { useTranslation } from "react-i18next";
import { CreatedOffer } from "../../../../../types/offer";
import { OfferModalWrapper } from "../OfferModalWrapper";
import { UseFormReturnType } from "@mantine/form";
import { Select, Divider, Flex, Text } from "@mantine/core";
import { ComboboxOfferToken } from "../../ComboboxOfferToken/ComboboxOfferToken";
import { SellFormValues } from "../../CreateOfferModal";
import { PriceComputingPane } from "../PriceComputingPane/PriceComputingPane";
import { useCreateOfferContext } from "../CreateOfferContext";

interface SellOfferModalProps{
    form: UseFormReturnType<SellFormValues>;
    offer: CreatedOffer;
}
export function SellOfferModal({ offer, form }: SellOfferModalProps){

    const { getInputProps, values } = form;
    const { t } = useTranslation('modals', { keyPrefix: 'createOffer' });

    const { offerTokens, buyerTokens, offerTokenSymbol, offerTokenPrice, buyTokenSymbol, buyerTokenPrice, choosedPrice } = useCreateOfferContext();
    console.log('offerTokenSymbol: ', offerTokenSymbol)
    console.log('buyTokenSymbol: ', buyTokenSymbol)

    return (
        <OfferModalWrapper 
            offer={offer} 
            form={form}
            tokenPrice={
                <>
                <Flex direction={'column'}>
                    <ComboboxOfferToken
                        type={'realtoken'}
                        key={"sell-select-0"}
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
                        key={"sell-select-1"}
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
                <>
                { values.amount && values.price && buyTokenSymbol && offerTokenSymbol ? (
                    <Text size={"md"} mb={10}>
                        {t("sell.txSellSummary", {
                            amount: values?.amount,
                            buyTokenSymbol: buyTokenSymbol,
                            price: values.price,
                            offerTokenSymbol: offerTokenSymbol,
                            total: ((values?.amount ?? 0)* (values.price ?? 0)).toFixed(6)
                        })}
                    </Text>
                ) : undefined}
                </>
            }
        />
    );
};