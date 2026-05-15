import { useEffect, useRef } from 'react';

import { useAA } from '@real-token/aa-core';
import { useWeb3Auth } from '@web3auth/modal/react';
import { reconnect } from '@wagmi/core';
import { useConfig } from 'wagmi';

import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { shouldUseAaModal } from 'src/config/web3AuthEnv';
import { connectWatchMode } from 'src/utils/connectWatchMode';
import {
  getWatchedAddress,
  setWatchedAddress,
} from 'src/utils/watchedAddressStorage';
import {
  getWalletSession,
  setWalletSession,
  type WalletSession,
} from 'src/utils/walletSessionStorage';

const RESTORE_TIMEOUT_MS = 5_000;
const READ_ONLY_CONNECTOR_ID = 'readOnly';

function resolveSessionToRestore(): WalletSession | null {
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
 * Restaure la dernière session wallet après F5 et persiste l’état connecté.
 */
export function WalletSessionRestore() {
  const { watchAddress, isWatching } = useAA();
  const { address, connector } = useConnectedAccount();
  const { isInitialized } = useWeb3Auth();
  const wagmiConfig = useConfig();
  const { markRestoreAttempted, setYamRestoring } = useWalletRestoreContext();
  const restoreStarted = useRef(false);

  useEffect(() => {
    if (!address || !connector) return;

    setWalletSession({
      address,
      connectorId: connector.id,
      mode: isWatching || connector.id === READ_ONLY_CONNECTOR_ID ? 'watch' : 'signed',
    });

    if (isWatching || connector.id === READ_ONLY_CONNECTOR_ID) {
      setWatchedAddress(address);
    }
  }, [address, connector, isWatching]);

  useEffect(() => {
    if (address) {
      markRestoreAttempted();
      return;
    }

    if (restoreStarted.current) return;

    const session = resolveSessionToRestore();
    if (!session) {
      markRestoreAttempted();
      return;
    }

    if (shouldUseAaModal() && !isInitialized) {
      return;
    }

    restoreStarted.current = true;
    setYamRestoring(true);

    const finishRestore = () => {
      markRestoreAttempted();
    };

    const runRestore = async () => {
      if (session.mode === 'watch') {
        await connectWatchMode(wagmiConfig, session.address, watchAddress);
        return;
      }

      if (!shouldUseAaModal()) {
        await reconnect(wagmiConfig);
      }
    };

    void runRestore()
      .catch((error) => {
        console.warn('[YAM] Impossible de restaurer la session wallet :', error);
      })
      .finally(finishRestore);
  }, [
    address,
    isInitialized,
    markRestoreAttempted,
    setYamRestoring,
    wagmiConfig,
    watchAddress,
  ]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      markRestoreAttempted();
    }, RESTORE_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [markRestoreAttempted]);

  return null;
}
