import { useTranslation } from 'react-i18next';

import { Flex, Loader, Text } from '@mantine/core';
import { IconWalletOff } from '@tabler/icons-react';

import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { useWalletRestoreState } from 'src/hooks/useWalletRestoreState';

interface ConnectedProviderProps {
  children: React.ReactNode;
}
export const ConnectedProvider = ({ children }: ConnectedProviderProps) => {
  const { address } = useConnectedAccount();
  const { isRestoring } = useWalletRestoreState();
  const { t } = useTranslation('common', { keyPrefix: 'general' });

  if (address) {
    return <>{children}</>;
  }

  if (isRestoring) {
    return (
      <Flex
        style={{ width: '100%', height: '100%' }}
        justify="center"
        align="center"
        gap="sm"
      >
        <Loader size="md" />
        <Text fw={700} fz="xl">
          {t('reconnecting')}
        </Text>
      </Flex>
    );
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
