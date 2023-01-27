import { Button, Flex } from "@mantine/core"
import { useAtom } from "jotai"
import { useTranslation } from "react-i18next";
import { tableOfferTypeAtom } from "src/states";
import { OFFER_TYPE } from "src/types/offer";

export const MarketSort = () => {

    const [sorting,setSorting] = useAtom(tableOfferTypeAtom);

    const { t } = useTranslation("buy", { keyPrefix: "grid" });

    return(
        <Flex gap={"xs"}>
            <Button 
                variant={sorting == OFFER_TYPE.SELL ? "filled" : "outline"}
                onClick={() => setSorting(OFFER_TYPE.SELL)}
            >{t("sell")}</Button>
            <Button 
                variant={sorting == OFFER_TYPE.BUY ? "filled" : "outline"}
                onClick={() => setSorting(OFFER_TYPE.BUY)}
            >{t("buy")}</Button>
            <Button 
                variant={sorting == OFFER_TYPE.EXCHANGE ? "filled" : "outline"}
                onClick={() => setSorting(OFFER_TYPE.EXCHANGE)}
            >{t("exchange")}</Button>
        </Flex>
    )
}