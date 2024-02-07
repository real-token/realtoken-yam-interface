import { useRootStore } from "../../zustandStore/store";
import { Flex, Text } from "@mantine/core";
import classes from './Banner.module.css';
import { useTranslation } from "react-i18next";
import { IconAlertCircle } from "@tabler/icons";

export const Banners = () => {

    const [theGraphHasIssue] = useRootStore(state => [state.theGraphHasIssue]);
    const { t } = useTranslation('notifications');

    return(
        <>
        {theGraphHasIssue ? (
            <Flex className={classes.message}>
                <IconAlertCircle size={20} aria-label={'graph issue'} style={{ marginRight: '8px' }} />
                <Text>{t('graphIssue')}</Text>
            </Flex>
        ): undefined}
        </>
    )

}