import { Flex, Text} from "@mantine/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ShowOnlyWlCheckbox } from "./OnlyShowWLCheckbox";

export const MarketTableFilter: FC = () => {

    const { t } = useTranslation('table', { keyPrefix: 'filters' });
    
    return(
        <Flex
            gap={"xs"}
            align={"flex-start"}
            direction={"column"}
            wrap={"wrap"}
            mb={20}
        >
            <Text size={'xl'}>
                {t('title')}
            </Text>
            <ShowOnlyWlCheckbox />
        </Flex>
    )
}