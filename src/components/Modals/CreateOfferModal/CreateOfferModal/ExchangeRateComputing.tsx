import { useEffect, useState } from "react";
import { ComboboxItem, Text, Flex, Skeleton } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SellFormValues } from "../CreateOfferModal";
import { useTranslation } from "react-i18next";
import { NumberInput } from "../../../NumberInput";
import { IconArrowRight } from "@tabler/icons";
import { useCreateOfferContext } from "./CreateOfferContext";

interface ExchangeRateComputingProps{
    form: UseFormReturnType<SellFormValues>;
    exchangeOfferTokens: ComboboxItem[];
    exchangeBuyerToken: ComboboxItem[];
}
export const ExchangeRateComputing = ({ form, exchangeOfferTokens, exchangeBuyerToken }: ExchangeRateComputingProps) => {

    const { values, setFieldValue } = form;

    const { t } = useTranslation('modals', { keyPrefix: 'createOffer' });
    const [price,setPrice] = useState<number>(1);

    const { setChoosedPrice } = useCreateOfferContext()

    const exchangeOfferTokenSymbol = exchangeOfferTokens.find(value => value.value == values.offerTokenAddress)?.label;
    const exchangeBuyerTokenSymbol = exchangeBuyerToken.find(value => value.value == values.buyerTokenAddress)?.label;

    useEffect(() => {
      if(price){
        const p = (1/price).toFixed(6);
        setFieldValue("price",p)
        setChoosedPrice(Number(p))
      }
    },[price]);

    return (
        <Flex direction={"column"}>
            <Text fw={700} fz={"md"}>{t("exchange.priceComputingTitle")}</Text>
            { exchangeOfferTokenSymbol && exchangeBuyerTokenSymbol ?(
            <>
                <Text mb={"md"}>{t("exchange.priceComputing", { exchangeBuyerTokenSymbol, exchangeOfferTokenSymbol })}</Text>
                <Flex gap={"md"}>
                    <Flex gap={9} direction={"column"} style={{ width: "100%" }}>
                        <NumberInput
                            hideControls={true}
                            label={exchangeOfferTokenSymbol}
                            decimalScale={6}
                            value={1}
                            disabled={true}
                            style={{ width: "100%" }}
                        />
                    </Flex>
                    <IconArrowRight style={{ marginTop: "22px" }} size={46}/>
                    <Flex gap={9} direction={"column"} style={{ width: "100%" }}>
                        <NumberInput
                            hideControls={true}
                            label={exchangeBuyerTokenSymbol}
                            decimalScale={6}
                            value={price ?? 0}
                            style={{ width: "100%" }}
                            onChange={(price) => setPrice(Number(price ? price : 1))}
                        />
                    </Flex>
                </Flex>
                <Text>{`1 "${exchangeBuyerTokenSymbol}" = ${(1/price).toFixed(3)} "${exchangeOfferTokenSymbol}"`}</Text>
            </>
            ): (
                <Skeleton width={"100%"} height={100} mt={5}/>
            )}
        </Flex>
    )
}