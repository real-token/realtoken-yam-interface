import { useTranslation } from 'react-i18next';

import { Flex, Loader, Text } from '@mantine/core';
import { IconWalletOff } from '@tabler/icons-react';

import { useWalletGate } from 'src/wallet/useWalletGate';

interface ConnectedProviderProps {
  children: React.ReactNode;
}
export const ConnectedProvider = ({ children }: ConnectedProviderProps) => {
  const { status } = useWalletGate();
  const { t } = useTranslation('common', { keyPrefix: 'general' });

  if (status === 'restoring' || status === 'disconnecting') {
    return (
      <Flex
        style={{ width: '100%', height: '100%' }}
        justify="center"
        align="center"
        gap="sm"
      >
        <Loader size="md" />
        <Text fw={700} fz="xl">
          {status === 'disconnecting'
            ? t('disconnecting', { defaultValue: t('reconnecting') })
            : t('reconnecting')}
        </Text>
      </Flex>
    );
  }

  if (status === 'connected') {
    return <>{children}</>;
  }

  return (
    <Flex
      style={{ width: '100%', height: '100%' }}
      justify="center"
      align="center"
      gap="sm"
    >
      <IconWalletOff size={36} />
      <Text fw={700} fz="xl">
        {t('noConnectedWallet')}
      </Text>
    </Flex>
  );
};
