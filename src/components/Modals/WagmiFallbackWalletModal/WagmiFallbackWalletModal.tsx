import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Accordion,
  Avatar,
  Button,
  Flex,
  Loader,
  ScrollArea,
  Text,
  TextInput,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useAA } from '@real-token/aa-core';
import { IconSpy } from '@tabler/icons-react';
import { isAddress, type Address } from 'viem';
import { useConfig, useConnectors } from 'wagmi';

import GnosisSafe from 'src/assets/connectors/gnosisSafe.svg';
import MetaMask from 'src/assets/connectors/metaMask.svg';
import Rabby from 'src/assets/connectors/rabby.svg';
import WalletConnectLogo from 'src/assets/connectors/walletConnect.svg';
import { isWalletConnectConfigured } from 'src/config/web3AuthEnv';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { useExternalWalletConnect } from 'src/hooks/useExternalWalletConnect';
import { connectWatchMode } from 'src/utils/connectWatchMode';
import {
  getEthereumProvider,
  resolveFallbackConnector,
  type FallbackWalletOption,
} from 'src/utils/resolveFallbackConnector';
import { setWatchedAddress } from 'src/utils/watchedAddressStorage';

const FALLBACK_WALLETS: FallbackWalletOption[] = [
  {
    id: 'metaMask',
    name: 'MetaMask',
    logo: MetaMask,
    connectorId: 'metaMask',
    detectInstalled: () => Boolean(getEthereumProvider()?.isMetaMask),
  },
  {
    id: 'rabby',
    name: 'Rabby',
    logo: Rabby,
    connectorId: 'injected',
    detectInstalled: () => Boolean(getEthereumProvider()?.isRabby),
  },
  {
    id: 'gnosis',
    name: 'Gnosis Safe',
    logo: GnosisSafe,
    connectorId: 'safe',
  },
];

export const WagmiFallbackWalletModal = ({
  id,
}: ContextModalProps<Record<string, never>>) => {
  const { t } = useTranslation('components', { keyPrefix: 'walletFallback' });
  const { t: tReadOnly } = useTranslation('components', {
    keyPrefix: 'walletFallback.readOnly',
  });
  const wagmiConfig = useConfig();
  const connectors = useConnectors();
  const { address } = useConnectedAccount();
  const { connectWallet, pendingConnectorId, isConnecting } =
    useExternalWalletConnect();
  const { watchAddress } = useAA();

  const [watchInputValue, setWatchInputValue] = useState('');
  const [readOnlyError, setReadOnlyError] = useState<string | null>(null);
  const [isWatchPending, setIsWatchPending] = useState(false);

  const walletOptions = useMemo(() => {
    const options = [...FALLBACK_WALLETS];
    if (isWalletConnectConfigured()) {
      options.push({
        id: 'walletConnect',
        name: 'WalletConnect',
        logo: WalletConnectLogo,
        useWalletConnect: true,
      });
    }
    return options;
  }, []);

  useEffect(() => {
    if (address) {
      modals.close(id);
    }
  }, [address, id]);

  useEffect(() => {
    if (!isWalletConnectConfigured()) {
      console.info(
        '[YAM] WalletConnect non disponible : définissez un VITE_WC_PROJECTID valide dans .env (https://cloud.walletconnect.com).'
      );
    }
  }, []);

  const handleConnect = useCallback(
    async (wallet: FallbackWalletOption) => {
      try {
        const connector = resolveFallbackConnector(wallet, connectors);
        await connectWallet(connector);
      } catch (error) {
        console.error(error);
        notifications.show({
          title: t('connectErrorTitle'),
          message: (error as Error).message,
          color: 'red',
        });
      }
    },
    [connectWallet, connectors, t]
  );

  const handleWatchAddress = async () => {
    const value = watchInputValue.trim();
    if (!value) {
      setReadOnlyError(tReadOnly('required'));
      return;
    }
    if (value.startsWith('0x') && !isAddress(value)) {
      setReadOnlyError(tReadOnly('invalidAddress'));
      return;
    }
    if (!value.startsWith('0x') && !value.endsWith('.eth')) {
      setReadOnlyError(tReadOnly('invalidEns'));
      return;
    }

    setIsWatchPending(true);
    setReadOnlyError(null);
    try {
      const resolved = await connectWatchMode(
        wagmiConfig,
        value,
        (addr: Address) => watchAddress(addr)
      );
      setWatchedAddress(resolved);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: t('connectErrorTitle'),
        message: (error as Error).message,
        color: 'red',
      });
    } finally {
      setIsWatchPending(false);
    }
  };

  return (
    <Flex direction="column" gap="md" mih={320}>
      <Text fz="sm" c="dimmed">
        {t('fallbackHint')}
      </Text>

      <ScrollArea h={220}>
        <Flex direction="column" gap="sm" pr="sm">
          {walletOptions.map((wallet) => {
            const isInstalled = wallet.detectInstalled?.() ?? false;
            const loading =
              isConnecting && pendingConnectorId === wallet.id;

            return (
              <Button
                key={wallet.id}
                variant="light"
                justify="flex-start"
                leftSection={<Avatar src={wallet.logo} size="sm" radius="sm" />}
                onClick={() => handleConnect(wallet)}
                loading={loading}
                disabled={isConnecting && pendingConnectorId !== wallet.id}
              >
                <Flex justify="space-between" w="100%" align="center">
                  <Text fw={500}>{wallet.name}</Text>
                  {isInstalled ? (
                    <Text fz="xs" c="blue">
                      {t('installed')}
                    </Text>
                  ) : null}
                </Flex>
              </Button>
            );
          })}
        </Flex>
      </ScrollArea>

      <Accordion>
        <Accordion.Item value="readOnly">
          <Accordion.Control icon={<IconSpy size={18} />}>
            <Text fw={500}>{tReadOnly('title')}</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Flex direction="column" gap="sm">
              <Text fz="sm" c="dimmed">
                {tReadOnly('description')}
              </Text>
              <TextInput
                label={tReadOnly('label')}
                placeholder={tReadOnly('placeholder')}
                value={watchInputValue}
                onChange={(event) => setWatchInputValue(event.currentTarget.value)}
                error={readOnlyError}
              />
              <Button
                onClick={handleWatchAddress}
                loading={isWatchPending}
                disabled={!watchInputValue.trim() || isConnecting}
              >
                {tReadOnly('button')}
              </Button>
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {isConnecting && !pendingConnectorId ? <Loader size="sm" /> : null}
    </Flex>
  );
};
