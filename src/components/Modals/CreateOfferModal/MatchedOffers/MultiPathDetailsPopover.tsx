import { Text, Popover, Flex } from "@mantine/core"
import { AveragePrice } from "./MultiPath"
import { IconInfoCircle } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

interface MultiPathDetailsPopoverProps{
    averagePrice: AveragePrice
}
export const MultiPathDetailsPopover = ({ averagePrice }: MultiPathDetailsPopoverProps) => {

    const { t } = useTranslation('modals', { keyPrefix: "offerMatching" });
    const [opened, { open, close }] = useDisclosure(false);
    
    return(
        <Popover 
            width={"target"} 
            position={"top"} 
            withArrow={true}
            opened={opened}
        >
            <Popover.Target>
                <Flex 
                    gap={6}
                    onMouseEnter={open}
                    onMouseLeave={close}
                    align={"center"}
                >
                    <Text>{`$ ${averagePrice?.totalPriceInDollar}`}</Text>
                    <IconInfoCircle size={20}/>
                </Flex>
            </Popover.Target>
            <Popover.Dropdown>
                <Text>{t("buyTokenRepartition")}</Text>
                <ul>
                {Object.keys(averagePrice.details).map((key,index) => {
                    const detailValue = averagePrice.details[key];
                    return <li key={`detail-${index}`}>{`$ ${detailValue} of ${key}`}</li>
                })}
                </ul>
            </Popover.Dropdown>
        </Popover>
    )
}