import { useTranslation } from 'react-i18next';

import { Flex, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import { useRootStore } from '../../zustandStore/store';
import classes from './Banner.module.css';

export const Banners = () => {
  // const [theGraphHasIssue] = useRootStore((state) => [state.theGraphHasIssue]);
  const { t } = useTranslation('notifications');

  return (
    <>
      {/* {theGraphHasIssue ? ( */}
      <Flex className={classes.message}>
        <IconAlertCircle
          size={20}
          aria-label={'graph issue'}
          style={{ marginRight: '8px' }}
        />
        <Text>{t('graphSyncing')}</Text>
      </Flex>
      {/* ) : undefined} */}
    </>
  );
};
