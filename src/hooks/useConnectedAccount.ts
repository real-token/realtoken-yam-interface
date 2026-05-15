import { useAA } from '@real-token/aa-core';
import { useAccount } from 'wagmi';

/**
 * Source de vérité pour l’adresse connectée (wagmi ou aa-core / watch).
 */
export function useConnectedAccount() {
  const { address: wagmiAddress, isConnected: isWagmiConnected, connector } =
    useAccount();
  const { walletAddress, isWatching } = useAA();

  const address = wagmiAddress ?? walletAddress ?? undefined;

  return {
    address,
    wagmiAddress,
    walletAddress,
    isWatching,
    isConnected: Boolean(address),
    isWagmiConnected,
    isAaCoreSynced: Boolean(walletAddress),
    connector,
  };
}
