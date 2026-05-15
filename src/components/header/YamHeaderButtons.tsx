import { Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useRealTokenUIConfig } from '@real-token/core';
import { SettingsMenu, WalletMenu } from '@real-token/ui-components';
import {
  AaConnectButton,
  AaWalletConnectButton,
  useIsAA,
} from '@real-token/web3';

import { YamNativeBalanceButton } from 'src/components/header/YamNativeBalanceButton';
import { YamNetworkSelector } from 'src/components/header/YamNetworkSelector';
import { YamWalletMenu } from 'src/components/header/YamWalletMenu';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { useWalletRestoreState } from 'src/hooks/useWalletRestoreState';

type YamHeaderButtonsProps = {
  disableWalletConnect?: boolean;
};

export function YamHeaderButtons({
  disableWalletConnect = false,
}: YamHeaderButtonsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const { address, walletAddress } = useConnectedAccount();
  const { isRestoring } = useWalletRestoreState();
  const isAA = useIsAA();
  const { aaModalConfig } = useRealTokenUIConfig();

  return (
    <Group gap={10} wrap="nowrap" align="center" style={{ flexShrink: 0 }}>
      {!disableWalletConnect && isAA && address && (
        <AaWalletConnectButton />
      )}
      <YamNetworkSelector />
      {address && <YamNativeBalanceButton />}
      {address ? (
        walletAddress ? <WalletMenu /> : <YamWalletMenu />
      ) : (
        isRestoring ? (
          <Button aria-label={t('title')} loading>
            {t('title')}
          </Button>
        ) : (
          <AaConnectButton config={aaModalConfig} />
        )
      )}
      <SettingsMenu />
    </Group>
  );
};
