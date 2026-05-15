import { useTranslation } from 'react-i18next';

import { Button, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRealTokenUIConfig } from '@real-token/core';
import { SettingsMenu } from '@real-token/ui-components';
import { AaWalletConnectButton, useIsAA } from '@real-token/web3';

import { YamAaWalletMenu } from 'src/components/header/YamAaWalletMenu';
import { YamNativeBalanceButton } from 'src/components/header/YamNativeBalanceButton';
import { YamNetworkSelector } from 'src/components/header/YamNetworkSelector';
import { YamWalletMenu } from 'src/components/header/YamWalletMenu';
import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { useWalletGate } from 'src/wallet/useWalletGate';

type YamHeaderButtonsProps = {
  disableWalletConnect?: boolean;
};

export function YamHeaderButtons({
  disableWalletConnect = false,
}: YamHeaderButtonsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const { t: tCommon } = useTranslation('common');
  const { status, walletKind, liveAddress } = useWalletGate();
  const { markUserInitiatedConnect } = useWalletRestoreContext();
  const isAA = useIsAA();
  const { aaModalConfig } = useRealTokenUIConfig();

  const showWalletChrome = status === 'connected';
  const showAaMenu = walletKind === 'aa';

  const openConnectModal = () => {
    markUserInitiatedConnect();
    if (liveAddress) return;
    modals.openContextModal({
      modal: 'aaModal',
      innerProps: aaModalConfig,
      size: 'lg',
      centered: true,
    });
  };

  return (
    <Group gap={10} wrap='nowrap' align='center' style={{ flexShrink: 0 }}>
      {!disableWalletConnect && isAA && showWalletChrome && (
        <AaWalletConnectButton />
      )}
      <YamNetworkSelector />
      {showWalletChrome && <YamNativeBalanceButton />}
      {showWalletChrome ? (
        showAaMenu ? (
          <YamAaWalletMenu />
        ) : (
          <YamWalletMenu />
        )
      ) : status === 'restoring' || status === 'disconnecting' ? (
        <Button aria-label={tCommon('general.reconnecting')} loading>
          {tCommon('general.reconnecting')}
        </Button>
      ) : (
        <Button aria-label={t('title')} onClick={openConnectModal}>
          {t('title')}
        </Button>
      )}
      <SettingsMenu />
    </Group>
  );
}
