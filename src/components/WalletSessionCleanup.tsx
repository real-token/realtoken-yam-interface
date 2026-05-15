import { useEffect } from 'react';

import { useWeb3Auth } from '@web3auth/modal/react';
import { useAccount, useConfig } from 'wagmi';

import { shouldUseAaModal } from 'src/config/web3AuthEnv';
import { clearWatchedAddress } from 'src/utils/watchedAddressStorage';
import { clearWalletSession } from 'src/utils/walletSessionStorage';

const WEB3AUTH_DISCONNECTED_KEY = 'web3auth.disconnected';

/**
 * Efface la mémoire de session YAM quand Web3Auth signale une déconnexion explicite.
 */
export function WalletSessionCleanup() {
  const { isInitialized } = useWeb3Auth();
  const { status } = useAccount();
  const wagmiConfig = useConfig();

  useEffect(() => {
    if (!shouldUseAaModal() || !isInitialized) return;

    const clearIfDisconnected = async () => {
      const storage = wagmiConfig.storage;
      if (!storage) return;

      const isDisconnected = await storage.getItem(WEB3AUTH_DISCONNECTED_KEY);
      if (!isDisconnected) return;

      clearWalletSession();
      clearWatchedAddress();
    };

    void clearIfDisconnected();
  }, [isInitialized, status, wagmiConfig.storage]);

  return null;
}
