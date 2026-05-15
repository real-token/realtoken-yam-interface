import { useTranslation } from 'react-i18next';

import { Button, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useAA } from '@real-token/aa-core';
import { useCurrentNetwork } from '@real-token/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconExternalLink,
  IconLogout,
} from '@tabler/icons-react';
import { useConfig } from 'wagmi';

import type { ExtendedChainConfig } from 'src/config/aaConfig';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { shortenString } from 'src/utils';
import { disconnectWallet } from 'src/utils/disconnectWallet';

/**
 * Menu portefeuille pour connexion wagmi sans walletAddress aa-core synchronisé.
 * Le WalletMenu de @real-token/ui-components ne rend rien si walletAddress est absent.
 */
export function YamWalletMenu() {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const { address } = useConnectedAccount();
  const { logout } = useAA();
  const wagmiConfig = useConfig();
  const networkConfig = useCurrentNetwork<ExtendedChainConfig>();
  const [isOpen, handlers] = useDisclosure(false);

  if (!address) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      notifications.show({
        message: t('copy'),
        color: 'green',
      });
    } catch {
      notifications.show({
        message: t('copy'),
        color: 'red',
      });
    }
    handlers.close();
  };

  const handleViewExplorer = () => {
    if (!networkConfig?.blockExplorerUrl) return;
    const url = `${networkConfig.blockExplorerUrl}address/${address}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    handlers.close();
  };

  const handleDisconnect = async () => {
    await disconnectWallet(wagmiConfig, logout);
    handlers.close();
  };

  return (
    <Menu
      closeOnItemClick
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <Button
          size="sm"
          aria-label={shortenString(address)}
          rightSection={
            isOpen ? (
              <IconChevronUp size={16} stroke={3} />
            ) : (
              <IconChevronDown size={16} stroke={3} />
            )
          }
        >
          {shortenString(address)}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconCopy size={18} />}
          onClick={() => void handleCopy()}
        >
          {t('copy')}
        </Menu.Item>
        {networkConfig?.blockExplorerUrl ? (
          <Menu.Item
            leftSection={<IconExternalLink size={18} />}
            onClick={handleViewExplorer}
          >
            {t('viewOn')}
          </Menu.Item>
        ) : null}
        <Menu.Item
          leftSection={<IconLogout size={18} />}
          onClick={() => void handleDisconnect()}
        >
          {t('disconnect')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
