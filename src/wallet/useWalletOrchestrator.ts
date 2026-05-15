import { useEffect, useRef } from 'react';

import { useAA } from '@real-token/aa-core';
import { useWeb3Auth } from '@web3auth/modal/react';
import { getAccount } from '@wagmi/core';
import { useConfig } from 'wagmi';

import { isWeb3AuthConfigured } from 'src/config/web3AuthEnv';
import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import {
  getWatchedAddress,
  setWatchedAddress,
} from 'src/utils/watchedAddressStorage';
import {
  getWalletSession,
  hasExplicitDisconnect,
  hasUserInitiatedConnect,
  setWalletSession,
  type WalletSession,
} from 'src/utils/walletSessionStorage';

import { READ_ONLY_CONNECTOR_ID } from './constants';
import {
  isAaSignedSession,
  isExternalSignedSession,
  isWatchSession,
  restoreWatchSession,
} from './restoreStrategies';

const RESTORE_TIMEOUT_MS = 15_000;

function resolveSessionToRestore(): WalletSession | null {
  if (hasExplicitDisconnect()) return null;

  const session = getWalletSession();
  if (session) return session;

  const legacyWatch = getWatchedAddress();
  if (!legacyWatch) return null;

  return {
    address: legacyWatch,
    connectorId: READ_ONLY_CONNECTOR_ID,
    mode: 'watch',
  };
}

/**
 * Restauration F5 : persistance session, watch, timeout AA.
 * Les wallets externes sont gérés par wagmi autoReconnect + ExternalWalletWeb3AuthShield.
 */
export function useWalletOrchestrator(): void {
  const { watchAddress, isWatching } = useAA();
  const { liveAddress, connector } = useConnectedAccount();
  const { isInitialized, isConnected: isWeb3AuthConnected } = useWeb3Auth();
  const wagmiConfig = useConfig();
  const restoreAttemptId = useRef(0);

  const {
    markRestoreAttempted,
    markRestoreSucceeded,
    setYamRestoring,
    isUserDisconnecting,
    clearExplicitDisconnect,
  } = useWalletRestoreContext();

  useEffect(() => {
    if (isUserDisconnecting) return;
    if (!liveAddress || !connector) return;

    const explicitDisconnect = hasExplicitDisconnect();
    const userInitiatedConnect = hasUserInitiatedConnect();
    if (explicitDisconnect && !userInitiatedConnect) return;

    if (explicitDisconnect && userInitiatedConnect) {
      clearExplicitDisconnect();
    }

    setWalletSession({
      address: liveAddress,
      connectorId: connector.id,
      mode:
        isWatching || connector.id === READ_ONLY_CONNECTOR_ID ? 'watch' : 'signed',
    });

    if (isWatching || connector.id === READ_ONLY_CONNECTOR_ID) {
      setWatchedAddress(liveAddress);
    }
  }, [clearExplicitDisconnect, connector, isUserDisconnecting, isWatching, liveAddress]);

  useEffect(() => {
    if (!liveAddress) return;
    markRestoreSucceeded();
  }, [liveAddress, markRestoreSucceeded]);

  useEffect(() => {
    if (isUserDisconnecting) {
      restoreAttemptId.current += 1;
      markRestoreAttempted();
      return;
    }

    if (liveAddress) return;

    const session = resolveSessionToRestore();
    if (!session) {
      markRestoreAttempted();
      return;
    }

    if (isWatchSession(session)) {
      if (isWeb3AuthConfigured() && !isInitialized) return;

      if (restoreAttemptId.current > 0) return;

      const attemptId = ++restoreAttemptId.current;
      setYamRestoring(true);

      void restoreWatchSession(session, { wagmiConfig, syncAaWatch: watchAddress })
        .catch((error) => {
          console.warn('[YAM] Impossible de restaurer la session watch :', error);
        })
        .finally(() => {
          if (restoreAttemptId.current !== attemptId) return;
          const { isConnected, address } = getAccount(wagmiConfig);
          if (isConnected && address) {
            markRestoreSucceeded();
          } else {
            markRestoreAttempted();
          }
        });
    }
  }, [
    isInitialized,
    isUserDisconnecting,
    liveAddress,
    markRestoreAttempted,
    markRestoreSucceeded,
    setYamRestoring,
    wagmiConfig,
    watchAddress,
  ]);

  useEffect(() => {
    if (liveAddress || isUserDisconnecting) return;

    const session = resolveSessionToRestore();
    if (!session) return;

    const needsAaTimeout =
      isAaSignedSession(session) && isInitialized && !isWeb3AuthConnected;
    const needsExternalTimeout = isExternalSignedSession(session);

    if (!needsAaTimeout && !needsExternalTimeout) return;

    const timeout = window.setTimeout(() => {
      const { address: wagmiAddress, isConnected } = getAccount(wagmiConfig);
      if (isConnected && wagmiAddress) return;
      markRestoreAttempted();
    }, RESTORE_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [
    isInitialized,
    isUserDisconnecting,
    isWeb3AuthConnected,
    liveAddress,
    markRestoreAttempted,
    wagmiConfig,
  ]);

  useEffect(() => {
    if (liveAddress || isUserDisconnecting) return;
    if (resolveSessionToRestore()) return;
    markRestoreAttempted();
  }, [isUserDisconnecting, liveAddress, markRestoreAttempted]);
}
