import { useTranslation } from 'react-i18next';

import { Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  CopyToClipboardMenuItem,
  CurrentConnectorMenuItem,
  ManageAaAccountsMenuItem,
  UserWalletAddressButton,
  ViewOnExplorerMenuItem,
} from '@real-token/ui-components';
import { useIsAA } from '@real-token/web3';
import { IconChevronDown, IconChevronUp, IconLogout } from '@tabler/icons-react';

import { useDisconnectWallet } from 'src/hooks/useDisconnectWallet';

/**
 * Menu portefeuille AA (équivalent WalletMenu) avec déconnexion YAM
 * qui purge la session et évite une reconnexion automatique au 1er clic.
 */
export function YamAaWalletMenu() {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const [isOpen, handlers] = useDisclosure(false);
  const isAA = useIsAA();
  const disconnect = useDisconnectWallet();

  const handleDisconnect = async () => {
    await disconnect();
    handlers.close();
  };

  return (
    <Menu
      closeOnItemClick={false}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <UserWalletAddressButton
          rightSection={
            isOpen ? (
              <IconChevronUp size={16} stroke={3} />
            ) : (
              <IconChevronDown size={16} stroke={3} />
            )
          }
        />
      </Menu.Target>
      <Menu.Dropdown>
        <CurrentConnectorMenuItem />
        {isAA ? <ManageAaAccountsMenuItem /> : null}
        <CopyToClipboardMenuItem />
        <ViewOnExplorerMenuItem />
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
