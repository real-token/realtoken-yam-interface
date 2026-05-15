import { useTranslation } from 'react-i18next';

import { Flex, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { useDegradedMode } from '../../hooks/interface/useDegradedMode';
import { YamUnsupportedNetworkBanner } from './YamUnsupportedNetworkBanner';
import classes from './Banner.module.css';

export const Banners = () => {
  const { t } = useTranslation('notifications');
  const { isDegraded, errorType } = useDegradedMode();

  const showGraphBanner =
    isDegraded && errorType === 'SUBGRAPH_INDEXING_ERROR';

  if (!showGraphBanner) {
    return <YamUnsupportedNetworkBanner />;
  }

  return (
    <>
      <YamUnsupportedNetworkBanner />
      <Flex className={classes.message}>
        <IconAlertCircle
          size={20}
          aria-label={'graph issue'}
          style={{ marginRight: '8px' }}
        />
        <Text>{t('graphSyncing')}</Text>
      </Flex>
    </>
  );
};
