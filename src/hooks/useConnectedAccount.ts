import { useAA } from '@real-token/aa-core';
import { useAccount } from 'wagmi';

import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';

/**
 * Adresse live wagmi / aa-core uniquement.
 * Ne pas utiliser pour les fetchs : préférer useWalletGate().address / canFetch.
 */
export function useConnectedAccount() {
  const { address: wagmiAddress, isConnected: isWagmiConnected, connector } =
    useAccount();
  const { walletAddress, isWatching } = useAA();
  const { explicitDisconnect, userInitiatedConnect } = useWalletRestoreContext();

  const rawLiveAddress = wagmiAddress ?? walletAddress ?? undefined;
  const liveAddress =
    explicitDisconnect && !userInitiatedConnect ? undefined : rawLiveAddress;

  return {
    liveAddress,
    wagmiAddress,
    walletAddress,
    isWatching,
    isConnected: Boolean(liveAddress),
    isWagmiConnected,
    isAaCoreSynced: Boolean(walletAddress),
    connector,
  };
}
