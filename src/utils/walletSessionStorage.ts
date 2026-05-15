import { isAddress } from 'viem';

const WALLET_SESSION_STORAGE_KEY = 'yam-wallet-session';

export type WalletSessionMode = 'signed' | 'watch';

export type WalletSession = {
  address: `0x${string}`;
  connectorId: string;
  mode: WalletSessionMode;
};

function isWalletSession(value: unknown): value is WalletSession {
  if (!value || typeof value !== 'object') return false;
  const session = value as WalletSession;
  return (
    typeof session.connectorId === 'string' &&
    (session.mode === 'signed' || session.mode === 'watch') &&
    isAddress(session.address)
  );
}

export function getWalletSession(): WalletSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(WALLET_SESSION_STORAGE_KEY);
    if (!stored) return null;
    const parsed: unknown = JSON.parse(stored);
    return isWalletSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setWalletSession(session: WalletSession): void {
  if (typeof window === 'undefined' || !isAddress(session.address)) return;
  localStorage.setItem(WALLET_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearWalletSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WALLET_SESSION_STORAGE_KEY);
}

/** @deprecated Utiliser getWalletSession avec mode watch */
export function getWatchedAddressFromSession(): `0x${string}` | null {
  const session = getWalletSession();
  return session?.mode === 'watch' ? session.address : null;
}
