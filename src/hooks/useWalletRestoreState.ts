import { useWeb3Auth } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';

import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { shouldUseAaModal } from 'src/config/web3AuthEnv';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { getWatchedAddress } from 'src/utils/watchedAddressStorage';
import { getWalletSession } from 'src/utils/walletSessionStorage';

export function useWalletRestoreState() {
  const { isYamRestoring, hasAttemptedRestore } = useWalletRestoreContext();
  const { address } = useConnectedAccount();
  const { status } = useAccount();
  const { isInitialized } = useWeb3Auth();

  const hasStoredSession =
    getWalletSession() !== null || getWatchedAddress() !== null;

  const wagmiReconnecting =
    status === 'connecting' || status === 'reconnecting';
  const web3AuthPending = shouldUseAaModal() && !isInitialized;

  const isRestoring =
    !address &&
    (isYamRestoring ||
      wagmiReconnecting ||
      web3AuthPending ||
      (hasStoredSession && !hasAttemptedRestore));

  return {
    isRestoring,
    hasStoredSession,
    address,
  };
}
