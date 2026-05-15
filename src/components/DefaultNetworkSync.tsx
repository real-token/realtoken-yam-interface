import { useEffect, useRef } from 'react';

import { useModals } from '@mantine/modals';
import {
  useNetworksConfig,
  useRealTokenUIConfig,
} from '@real-token/core';
import { useWeb3Auth } from '@web3auth/modal/react';
import { useConfig, useChainId } from 'wagmi';

import { gnosisChainId } from 'src/config/aaConfig';
import {
  WEB3AUTH_CONNECTOR_ID,
  useAppSwitchChain,
} from 'src/hooks/useAppSwitchChain';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
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
 * Restaure la chaîne mémorisée une seule fois après F5 (pas à chaque changement manuel).
 * Wallet AA : toujours Gnosis. Portefeuilles externes : dernière chaîne choisie (ETH ou Gnosis).
 */
export function DefaultNetworkSync() {
  const { defaultNetworkId, showNetworks } = useRealTokenUIConfig();
  const networks = useNetworksConfig(showNetworks);
  const wagmiConfig = useConfig();
  const chainId = useChainId();
  const { switchChain } = useAppSwitchChain();
  const { address, connector, isAaCoreSynced } = useConnectedAccount();
  const { isInitialized } = useWeb3Auth();
  const modalsState = useModals();
  const pendingInitialRestoreRef = useRef(true);

  const isConnectModalOpen = modalsState.modals.some(
    (modal) =>
      modal.type === 'context' &&
      (modal.ctx === 'aaModal' || modal.ctx === 'wallet')
  );

  const isAaWallet =
    connector?.id === WEB3AUTH_CONNECTOR_ID || isAaCoreSynced;
  const gnosisChainIdNum = parseChainId(gnosisChainId);
  const targetChainId = isAaWallet
    ? gnosisChainIdNum
    : resolveTargetChainId(defaultNetworkId, networks);

  useEffect(() => {
    if (isConnectModalOpen) return;

    if (chainId === targetChainId) {
      pendingInitialRestoreRef.current = false;
      return;
    }

    if (!pendingInitialRestoreRef.current) return;

    const enforce = () => {
      void switchChain({ chainId: targetChainId }).catch((error) => {
        console.warn('[YAM] Restauration du réseau mémorisé :', error);
      });
    };

    if (!isInitialized) {
      wagmiConfig.setState((state) => ({ ...state, chainId: targetChainId }));
    }

    enforce();
    const retryTimer = window.setTimeout(enforce, 400);
    const retryAfterWallet = window.setTimeout(() => {
      enforce();
      pendingInitialRestoreRef.current = false;
    }, 1200);

    return () => {
      window.clearTimeout(retryTimer);
      window.clearTimeout(retryAfterWallet);
    };
  }, [
    address,
    chainId,
    isAaWallet,
    isConnectModalOpen,
    isInitialized,
    switchChain,
    targetChainId,
    wagmiConfig,
  ]);

  useEffect(() => {
    if (!pendingInitialRestoreRef.current) return;
    if (!address || isConnectModalOpen) return;
    if (chainId === targetChainId) {
      pendingInitialRestoreRef.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      void switchChain({ chainId: targetChainId }).catch((error) => {
        console.warn(
          '[YAM] Ré-alignement réseau après connexion portefeuille :',
          error
        );
      });
    }, 600);

    return () => window.clearTimeout(timer);
  }, [address, chainId, isConnectModalOpen, switchChain, targetChainId]);

  return null;
}
