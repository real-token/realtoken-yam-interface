import { useEffect, useRef } from 'react';

import { useModals } from '@mantine/modals';
import {
  useNetworksConfig,
  useRealTokenUIConfig,
} from '@real-token/core';
import { useConfig, useChainId } from 'wagmi';

import { gnosisChainId } from 'src/config/aaConfig';
import { WEB3AUTH_CONNECTOR_ID } from 'src/hooks/useAppSwitchChain';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { useWalletGate } from 'src/wallet/useWalletGate';
import { parseChainId } from 'src/utils/chainId';
import {
  getStoredChainId,
  setStoredChainId,
} from 'src/utils/storedChainPreference';

function resolveTargetChainId(
  defaultNetworkId: string,
  networks: { chainId: string }[]
): number {
  let target = getStoredChainId(defaultNetworkId);
  const isKnown = networks.some(
    (network) => parseChainId(network.chainId) === target
  );
  if (!isKnown) {
    target = parseChainId(defaultNetworkId);
    setStoredChainId(target);
  }
  return target;
}

/**
 * Aligne la chaîne wagmi uniquement pour les wallets AA (Gnosis).
 * Wallets externes : ne rien toucher au boot — switch via sélecteur / bannière.
 */
export function DefaultNetworkSync() {
  const { defaultNetworkId, showNetworks } = useRealTokenUIConfig();
  const networks = useNetworksConfig(showNetworks);
  const wagmiConfig = useConfig();
  const chainId = useChainId();
  const {
    liveAddress,
    connector,
    isAaCoreSynced,
    isWagmiConnected,
  } = useConnectedAccount();
  const { isRestoreComplete } = useWalletRestoreContext();
  const { walletKind } = useWalletGate();
  const modalsState = useModals();
  const initialChainSyncedRef = useRef(false);

  const isConnectModalOpen = modalsState.modals.some(
    (modal) =>
      modal.type === 'context' &&
      (modal.ctx === 'aaModal' || modal.ctx === 'wallet')
  );

  const isAaWallet =
    walletKind === 'aa' ||
    connector?.id === WEB3AUTH_CONNECTOR_ID ||
    isAaCoreSynced;
  const gnosisChainIdNum = parseChainId(gnosisChainId);
  const targetChainId = isAaWallet
    ? gnosisChainIdNum
    : resolveTargetChainId(defaultNetworkId, networks);

  useEffect(() => {
    if (isConnectModalOpen) return;
    if (!isRestoreComplete) return;
    if (!liveAddress || !isWagmiConnected) return;
    if (initialChainSyncedRef.current) return;
    if (!isAaWallet) {
      initialChainSyncedRef.current = true;
      return;
    }

    if (chainId !== targetChainId) {
      setStoredChainId(targetChainId);
      wagmiConfig.setState((state) => ({ ...state, chainId: targetChainId }));
    }

    initialChainSyncedRef.current = true;
  }, [
    chainId,
    isAaWallet,
    isConnectModalOpen,
    isRestoreComplete,
    isWagmiConnected,
    liveAddress,
    targetChainId,
    wagmiConfig,
  ]);

  return null;
}
