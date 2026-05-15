export type WalletConnectionStatus =
  | 'disconnected'
  | 'restoring'
  | 'connected'
  | 'disconnecting';

export type WalletKind = 'aa' | 'external' | 'watch';

export type WalletBootState = {
  hasStoredSession: boolean;
  explicitDisconnect: boolean;
  userInitiatedConnect: boolean;
};
