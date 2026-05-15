import { useCallback } from 'react';

import { useAA } from '@real-token/aa-core';
import { useConfig } from 'wagmi';

import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { disconnectWallet } from 'src/utils/disconnectWallet';

export function useDisconnectWallet() {
  const wagmiConfig = useConfig();
  const { logout } = useAA();
  const { beginUserDisconnect, endUserDisconnect } = useWalletRestoreContext();

  return useCallback(async () => {
    beginUserDisconnect();
    try {
      await disconnectWallet(wagmiConfig, logout);
    } finally {
      endUserDisconnect();
    }
  }, [beginUserDisconnect, endUserDisconnect, logout, wagmiConfig]);
}
