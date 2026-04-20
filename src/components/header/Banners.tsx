import { useTranslation } from 'react-i18next';

import { Flex, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { useDegradedMode } from '../../hooks/interface/useDegradedMode';
import classes from './Banner.module.css';

export const Banners = () => {
  const { t } = useTranslation('notifications');
  const { isDegraded, errorType } = useDegradedMode();

  // Afficher uniquement si on est en mode dégradé ET que c'est une erreur d'indexation
  // Les autres erreurs sont gérées par TheGraphErrorNotification
  if (!isDegraded || errorType !== 'SUBGRAPH_INDEXING_ERROR') {
    return null;
  }

  return (
    <Flex className={classes.message}>
      <IconAlertCircle
        size={20}
        aria-label={'graph issue'}
        style={{ marginRight: '8px' }}
      />
      <Text>{t('graphSyncing')}</Text>
    </Flex>
  );
};
