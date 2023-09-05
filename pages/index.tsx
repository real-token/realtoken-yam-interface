import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NextPage } from 'next';

import { Flex, Notification, createStyles } from '@mantine/core';

import Display from 'src/components/Display/Display';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { ConnectedProvider } from 'src/providers/ConnectProvider';

const useStyle = createStyles((theme) => ({
  notification: {
    marginBottom: '16px',
    backgroundColor:
      theme.colorScheme === 'dark' ? undefined : theme.colors.gray[2],
  },
}));

const HomePage: NextPage = () => {
  const { classes } = useStyle();
  const { t } = useTranslation('notifications', { keyPrefix: 'kycRequired' });
  const [isNotificationClosed, setIsNotificationClosed] =
    useState<boolean>(false);
  return (
    <ConnectedProvider>
      <Flex my={'xl'} direction={'column'}>
        {!isNotificationClosed && (
          <Notification
            className={classes.notification}
            color={'yellow'}
            title={t('title')}
            onClose={() => {
              setIsNotificationClosed(() => true);
            }}
          >
            {t('message')
              .split('\n')
              .map((text, i) => {
                return <p key={i}>{text}</p>;
              })}
          </Notification>
        )}
        <MarketTableFilter />
        <Display />
      </Flex>
    </ConnectedProvider>
  );
};

export default HomePage;
