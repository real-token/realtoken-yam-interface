import { createElement, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  RealTokenUiNetworkConfig,
  useCurrentNetwork,
  useIsUnsuportedNetwork,
  useNetworksConfig,
  useRealTokenUIConfig,
} from '@real-token/core';
import type { LogoProps } from '@real-token/types';
import { IconAlertCircle } from '@tabler/icons-react';
import { useChainId } from 'wagmi';

import { gnosisChainId } from 'src/config/aaConfig';
import { useAppSwitchChain } from 'src/hooks/useAppSwitchChain';
import { useWalletGate } from 'src/wallet/useWalletGate';
import { parseChainId } from 'src/utils/chainId';

import type { ExtendedChainConfig } from 'src/config/aaConfig';

const chainLogoProps: LogoProps = {
  width: 20,
  height: 20,
  color: 'var(--mantine-color-brand)',
};

function renderChainLogo(
  chainLogo: RealTokenUiNetworkConfig['chainLogo']
) {
  if (!chainLogo) return null;
  const Logo = chainLogo as ComponentType<LogoProps>;
  return createElement(Logo, chainLogoProps);
}

function YamNetworkMenuItem({ network }: { network: RealTokenUiNetworkConfig }) {
  const { switchChain } = useAppSwitchChain();
  const chainId = useChainId();
  const targetChainId = parseChainId(network.chainId);

  return (
    <Menu.Item
      onClick={() => {
        void switchChain({ chainId: targetChainId });
      }}
      leftSection={renderChainLogo(network.chainLogo)}
      color={chainId === targetChainId ? 'brand' : undefined}
    >
      {network.displayName}
    </Menu.Item>
  );
}

function YamNetworkList() {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  const { showNetworks } = useRealTokenUIConfig();
  const networks = useNetworksConfig(showNetworks);
  const { walletKind } = useWalletGate();

  const gnosisChainIdNum = parseChainId(gnosisChainId);
  const visibleNetworks =
    walletKind === 'external'
      ? networks
      : networks.filter(
          (network) => parseChainId(network.chainId) === gnosisChainIdNum
        );

  if (visibleNetworks.length <= 1) {
    return null;
  }

  return (
    <>
      <Menu.Label pb={0}>{t('network')}</Menu.Label>
      {visibleNetworks.map((network) => (
        <YamNetworkMenuItem key={network.chainId} network={network} />
      ))}
    </>
  );
}

export function YamNetworkSelector() {
  const [isOpen, handlers] = useDisclosure(false);
  const isUnsuportedNetwork = useIsUnsuportedNetwork();
  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  if (!currentNetwork) {
    return null;
  }

  return (
    <Menu
      closeOnItemClick
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
      disabled={isUnsuportedNetwork}
    >
      <Menu.Target>
        <ActionIcon size={36} variant="outline" color="brand">
          {isUnsuportedNetwork ? (
            <IconAlertCircle size={20} aria-label="Network" />
          ) : (
            renderChainLogo(currentNetwork.chainLogo)
          )}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <YamNetworkList />
      </Menu.Dropdown>
    </Menu>
  );
}
