import { useEffect, useRef } from 'react';

import { useAA } from '@real-token/aa-core';
import { useAccount, useConfig } from 'wagmi';

import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { connectWatchMode } from 'src/utils/connectWatchMode';
import {
  clearWatchedAddress,
  getWatchedAddress,
  setWatchedAddress,
} from 'src/utils/watchedAddressStorage';

/**
 * Restaure l’adresse en mode « watch » après rechargement et la persiste en localStorage.
 */
export function WatchedAddressRestore() {
  const { watchAddress, walletAddress, isWatching, logout } = useAA();
  const { address } = useConnectedAccount();
  const { isConnected } = useAccount();
  const wagmiConfig = useConfig();
  const hasRestoredOnMount = useRef(false);
  const restoreCancelled = useRef(false);
  const previousWalletAddress = useRef<string | null | undefined>();

  useEffect(() => {
    if (isWatching && walletAddress) {
      setWatchedAddress(walletAddress);
    }
  }, [isWatching, walletAddress]);

  useEffect(() => {
    if (isConnected && address && !isWatching) {
      clearWatchedAddress();
    }
  }, [address, isConnected, isWatching]);

  useEffect(() => {
    const hadWallet = Boolean(previousWalletAddress.current);
    const hasWallet = Boolean(walletAddress);

    if (hadWallet && !hasWallet) {
      clearWatchedAddress();
      hasRestoredOnMount.current = true;
      restoreCancelled.current = true;
    }

    previousWalletAddress.current = walletAddress;
  }, [walletAddress]);

  useEffect(() => {
    if (hasRestoredOnMount.current) return;
    if (address) {
      hasRestoredOnMount.current = true;
      return;
    }

    const stored = getWatchedAddress();
    if (!stored) {
      hasRestoredOnMount.current = true;
      return;
    }

    hasRestoredOnMount.current = true;
    restoreCancelled.current = false;

    connectWatchMode(wagmiConfig, stored, watchAddress)
      .then(() => {
        if (restoreCancelled.current) {
          clearWatchedAddress();
          void logout();
        }
      })
      .catch((error) => {
        if (restoreCancelled.current) return;
        console.warn('[YAM] Impossible de restaurer l’adresse surveillée :', error);
        clearWatchedAddress();
      });
  }, [address, logout, wagmiConfig, watchAddress]);

  return null;
}
