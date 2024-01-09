import { Flex, Text, TextInput, Checkbox } from "@mantine/core";
import { useAtom } from "jotai";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { nameFilterValueAtom, showOnlyWhitelistedAtom } from "src/states";

export const MarketTableFilter: FC = () => {

    const { t } = useTranslation('table', { keyPrefix: 'filters' });
    const [nameFilterValue,setNamefilterValue] = useAtom(nameFilterValueAtom);
    const [showOnlyWhitelisted, setShowOnlyWhitelisted] = useAtom(showOnlyWhitelistedAtom);
    
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
            <Checkbox
                label={t('showOnlyWhitelisted')}
                checked={showOnlyWhitelisted}
                onChange={(event) => setShowOnlyWhitelisted(event.currentTarget.checked)}
            />
        </Flex>
    )
}