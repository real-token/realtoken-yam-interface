import { useWalletGate } from 'src/wallet/useWalletGate';

/**
 * Indique si l'utilisateur peut envoyer une transaction signée (pas le mode lecture seule).
 */
export function useCanSignTransactions() {
  const {
    address,
    wagmiAddress,
    canSign,
    canFetch,
    isWatching,
    connector,
    liveAddress,
  } = useWalletGate();

  const isReadOnlyConnector = connector?.id === 'readOnly';
  const isWalletReady = canSign;

  return {
    address,
    wagmiAddress,
    liveAddress,
    canSign,
    isWalletReady,
    isSessionPlaceholder: false,
    isWatching,
    isReadOnlyConnector,
    hasSignableConnection: canSign,
    canFetch,
  };
}
