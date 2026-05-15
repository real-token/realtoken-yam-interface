import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  clearExplicitDisconnect as clearExplicitDisconnectStorage,
  clearUserInitiatedConnect,
  hasExplicitDisconnect,
  hasStoredWalletSession,
  hasUserInitiatedConnect,
  markUserInitiatedConnect as markUserInitiatedConnectStorage,
  setExplicitDisconnect as setExplicitDisconnectStorage,
} from 'src/utils/walletSessionStorage';

type WalletRestoreContextValue = {
  isYamRestoring: boolean;
  setYamRestoring: (value: boolean) => void;
  markRestoreAttempted: () => void;
  markRestoreSucceeded: () => void;
  hasAttemptedRestore: boolean;
  isRestoreComplete: boolean;
  isUserDisconnecting: boolean;
  beginUserDisconnect: () => void;
  endUserDisconnect: () => void;
  markUserInitiatedConnect: () => void;
  explicitDisconnect: boolean;
  userInitiatedConnect: boolean;
  clearExplicitDisconnect: () => void;
};

const WalletRestoreContext = createContext<WalletRestoreContextValue | null>(
  null
);

export function WalletRestoreProvider({ children }: { children: ReactNode }) {
  const [isYamRestoring, setYamRestoring] = useState(hasStoredWalletSession);
  const [hasAttemptedRestore, setHasAttemptedRestore] = useState(false);
  const [isRestoreComplete, setIsRestoreComplete] = useState(
    () => !hasStoredWalletSession()
  );
  const [isUserDisconnecting, setIsUserDisconnecting] = useState(false);
  const [explicitDisconnect, setExplicitDisconnectState] = useState(
    () => hasExplicitDisconnect()
  );
  const [userInitiatedConnect, setUserInitiatedConnectState] = useState(
    () => hasUserInitiatedConnect()
  );

  const markRestoreAttempted = useCallback(() => {
    setHasAttemptedRestore(true);
    setYamRestoring(false);
    setIsRestoreComplete(true);
  }, []);

  const markRestoreSucceeded = useCallback(() => {
    setHasAttemptedRestore(true);
    setYamRestoring(false);
    setIsRestoreComplete(true);
  }, []);

  const beginUserDisconnect = useCallback(() => {
    setIsUserDisconnecting(true);
    clearUserInitiatedConnect();
    setUserInitiatedConnectState(false);
    setExplicitDisconnectStorage();
    setExplicitDisconnectState(true);
    setIsRestoreComplete(true);
  }, []);

  const endUserDisconnect = useCallback(() => {
    setIsUserDisconnecting(false);
  }, []);

  const markUserInitiatedConnect = useCallback(() => {
    markUserInitiatedConnectStorage();
    setUserInitiatedConnectState(true);
  }, []);

  const clearExplicitDisconnect = useCallback(() => {
    clearExplicitDisconnectStorage();
    setExplicitDisconnectState(false);
  }, []);

  const value = useMemo(
    () => ({
      isYamRestoring,
      setYamRestoring,
      markRestoreAttempted,
      markRestoreSucceeded,
      hasAttemptedRestore,
      isRestoreComplete,
      isUserDisconnecting,
      beginUserDisconnect,
      endUserDisconnect,
      markUserInitiatedConnect,
      explicitDisconnect,
      userInitiatedConnect,
      clearExplicitDisconnect,
    }),
    [
      beginUserDisconnect,
      clearExplicitDisconnect,
      endUserDisconnect,
      explicitDisconnect,
      hasAttemptedRestore,
      isRestoreComplete,
      isUserDisconnecting,
      isYamRestoring,
      markRestoreAttempted,
      markRestoreSucceeded,
      markUserInitiatedConnect,
      userInitiatedConnect,
    ]
  );

  return (
    <WalletRestoreContext.Provider value={value}>
      {children}
    </WalletRestoreContext.Provider>
  );
}

export function useWalletRestoreContext(): WalletRestoreContextValue {
  const context = useContext(WalletRestoreContext);
  if (!context) {
    throw new Error(
      'useWalletRestoreContext must be used within WalletRestoreProvider'
    );
  }
  return context;
}
