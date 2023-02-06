import { Button, Flex } from "@mantine/core"
import { useAtom } from "jotai"
import { useTranslation } from "react-i18next";
import { tableOfferTypeAtom } from "src/states";
import { OFFER_TYPE } from "src/types/offer";

interface MarketSortProps{
    sellCount?: number|undefined, 
    buyCount?: number|undefined,
    exchangeCount?: number|undefined,
}
export const MarketSort = ({ sellCount, buyCount, exchangeCount } : MarketSortProps) => {

    const [sorting,setSorting] = useAtom(tableOfferTypeAtom);

    const { t } = useTranslation("buy", { keyPrefix: "grid" });

    return(
        <Flex gap={"xs"}>
            <Button 
                variant={sorting == OFFER_TYPE.SELL ? "filled" : "outline"}
                onClick={() => setSorting(OFFER_TYPE.SELL)}
            >{  !sellCount ?
                    t("sell")
                :
                    `${t("buy")} (${sellCount})`
            }</Button>
            <Button 
                variant={sorting == OFFER_TYPE.BUY ? "filled" : "outline"}
                onClick={() => setSorting(OFFER_TYPE.BUY)}
            >{  !buyCount ?
                    t("buy")
                :
                    `${t("buy")} (${buyCount})`
            }</Button>
            <Button 
                variant={sorting == OFFER_TYPE.EXCHANGE ? "filled" : "outline"}
                onClick={() => setSorting(OFFER_TYPE.EXCHANGE)}
            >{  !exchangeCount ?
                    t("exchange")
                :
                    `${t("exchange")} (${exchangeCount})`
            }</Button>
        </Flex>
    )
}