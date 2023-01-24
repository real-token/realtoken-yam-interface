import { Button, Flex } from "@mantine/core"
import { IconCross, IconX } from "@tabler/icons";
import { useAtom } from "jotai"
import { useTranslation } from "react-i18next";
import { sortValueAtom } from "src/states";
import { OFFER_TYPE } from "src/types/offer";

export const MarketSort = () => {

    const [sorting,setS] = useAtom(sortValueAtom);

    const { t } = useTranslation("buy", { keyPrefix: "grid" })

    const setSorting = (sort: OFFER_TYPE) => {
        if(sorting == sort){
            setS(undefined);
            return;
        }
        setS(sort)
    }

    return(
        <Flex gap={"xs"}>
            <Button
                px={6}
                variant={"outline"}
                onClick={() => setS(undefined)}
            ><IconX /></Button>
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