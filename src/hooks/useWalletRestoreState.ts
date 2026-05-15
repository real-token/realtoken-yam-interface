import { useWeb3Auth } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';

import { isWeb3AuthConfigured } from 'src/config/web3AuthEnv';
import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { getWatchedAddress } from 'src/utils/watchedAddressStorage';
import { getWalletSession } from 'src/utils/walletSessionStorage';
import { isExternalSignedSession } from 'src/wallet/restoreStrategies';

export function useWalletRestoreState() {
  const { isYamRestoring, explicitDisconnect, isRestoreComplete } =
    useWalletRestoreContext();
  const { liveAddress } = useConnectedAccount();
  const { status } = useAccount();
  const { isInitialized } = useWeb3Auth();

  const hasStoredSession =
    !explicitDisconnect &&
    (getWalletSession() !== null || getWatchedAddress() !== null);

  const wagmiReconnecting =
    status === 'connecting' || status === 'reconnecting';
  const storedSession = getWalletSession();
  const web3AuthPending =
    isWeb3AuthConfigured() &&
    !isInitialized &&
    !(storedSession && isExternalSignedSession(storedSession));

  const externalSignedRestorePending = Boolean(
    storedSession &&
      isExternalSignedSession(storedSession) &&
      !liveAddress &&
      !explicitDisconnect &&
      !isRestoreComplete
  );

  const isRestoring =
    !liveAddress &&
    hasStoredSession &&
    !explicitDisconnect &&
    (isYamRestoring ||
      externalSignedRestorePending ||
      (!isRestoreComplete && (wagmiReconnecting || web3AuthPending)));

  return {
    isRestoring,
    hasStoredSession,
    address: liveAddress,
  };
}
