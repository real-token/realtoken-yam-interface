import { Flex, Text, TextInput } from "@mantine/core";
import { useAtom } from "jotai";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { nameFilterValueAtom } from "src/states";


export const MarketTableFilter: FC = () => {

    const { t } = useTranslation('table', { keyPrefix: 'filters' });
    const [nameFilterValue,setNamefilterValue] = useAtom(nameFilterValueAtom);
    
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
            <TextInput 
                placeholder={t('nameFilterPlaceholder')}
                value={nameFilterValue}
                onChange={(event) => setNamefilterValue(event.currentTarget.value)}
            />
        </Flex>
    )
}