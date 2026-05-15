import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type WalletRestoreContextValue = {
  isYamRestoring: boolean;
  setYamRestoring: (value: boolean) => void;
  markRestoreAttempted: () => void;
  hasAttemptedRestore: boolean;
};

const WalletRestoreContext = createContext<WalletRestoreContextValue | null>(
  null
);

export function WalletRestoreProvider({ children }: { children: ReactNode }) {
  const [isYamRestoring, setYamRestoring] = useState(true);
  const [hasAttemptedRestore, setHasAttemptedRestore] = useState(false);

  const markRestoreAttempted = useCallback(() => {
    setHasAttemptedRestore(true);
    setYamRestoring(false);
  }, []);

  const value = useMemo(
    () => ({
      isYamRestoring,
      setYamRestoring,
      markRestoreAttempted,
      hasAttemptedRestore,
    }),
    [hasAttemptedRestore, isYamRestoring, markRestoreAttempted]
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
