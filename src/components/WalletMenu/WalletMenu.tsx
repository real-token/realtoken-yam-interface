import { FC, forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonProps, Menu } from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { showNotification } from '@mantine/notifications';
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconExternalLink,
  IconLogout,
} from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain } from 'src/hooks';
import { FRC } from 'src/types';
import { shortenString } from 'src/utils';

import { ChainSelect } from '../ChainSelect';

const WalletUser: FRC<ButtonProps, HTMLButtonElement> = forwardRef(
  (props, ref) => {
    const { account } = useWeb3React();

    return (
      <Button {...props} ref={ref}>
        {shortenString(account)}
      </Button>
    );
  }
);
WalletUser.displayName = 'WalletUser';

const NetworkMenuItem: FC = () => {
  const { t } = useTranslation('menu', { keyPrefix: 'wallet' });

  return (
    <>
      <Menu.Label pb={0}>{t('network')}</Menu.Label>
      <ChainSelect p={5} />
    </>
  );
};

const CopyToClipboardMenuItem: FC = () => {
  const { account } = useWeb3React();

  const { copy } = useClipboard({ timeout: 500 });

  const { t } = useTranslation('menu', { keyPrefix: 'wallet' });

  const onCopy = useCallback(() => {
    copy(account);
    showNotification(NOTIFICATIONS[NotificationsID.userCopied]);
  }, [account, copy]);

  return (
    <Menu.Item icon={<IconCopy size={18} />} onClick={onCopy}>
      {t('copy')}
    </Menu.Item>
  );
};

const ViewOnExplorerMenuItem: FC = () => {
  const { account } = useWeb3React();

  const activeChain = useActiveChain();

  const { t } = useTranslation('menu', { keyPrefix: 'wallet' });

  return (
    <Menu.Item
      icon={<IconExternalLink size={18} />}
      component={NextLink}
      href={`${activeChain?.blockExplorerUrl}address/${account}`}
      target={'_blank'}
    >
      {t('viewOn')}
    </Menu.Item>
  );
};

const DisconnectMenuItem: FC = () => {
  const { connector } = useWeb3React();

  const { t } = useTranslation('menu', { keyPrefix: 'wallet' });

  const onDisconnect = useCallback(async () => {
    if (connector.deactivate) {
      await connector.deactivate();
    } else {
      await connector.resetState();
    }
  }, [connector]);

  return (
    <Menu.Item icon={<IconLogout size={18} />} onClick={onDisconnect}>
      {t('disconnect')}
    </Menu.Item>
  );
};

export const WalletMenu: FC = () => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={false}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <WalletUser
          rightIcon={
            isOpen ? (
              <IconChevronUp size={16} stroke={3} />
            ) : (
              <IconChevronDown size={16} stroke={3} />
            )
          }
        />
      </Menu.Target>
      <Menu.Dropdown>
        <NetworkMenuItem />
        <Menu.Divider />
        <CopyToClipboardMenuItem />
        <ViewOnExplorerMenuItem />
        <DisconnectMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};
