import { isAddress } from 'viem';

const WALLET_SESSION_STORAGE_KEY = 'yam-wallet-session';
const EXPLICIT_DISCONNECT_KEY = 'yam-explicit-disconnect';
const USER_INITIATED_CONNECT_KEY = 'yam-user-initiated-connect';

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

export function setExplicitDisconnect(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(EXPLICIT_DISCONNECT_KEY, '1');
}

export function clearExplicitDisconnect(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(EXPLICIT_DISCONNECT_KEY);
}

export function hasExplicitDisconnect(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(EXPLICIT_DISCONNECT_KEY) === '1';
}

export function markUserInitiatedConnect(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(USER_INITIATED_CONNECT_KEY, '1');
}

export function clearUserInitiatedConnect(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(USER_INITIATED_CONNECT_KEY);
}

export function hasUserInitiatedConnect(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(USER_INITIATED_CONNECT_KEY) === '1';
}

/**
 * Détecte de façon synchrone si une session wallet est mémorisée et restaurable.
 * Utilisé comme lazy initializer de useState pour éviter le flash "Reconnecting...".
 */
export function hasStoredWalletSession(): boolean {
  if (typeof window === 'undefined') return false;
  if (sessionStorage.getItem(EXPLICIT_DISCONNECT_KEY) === '1') return false;
  const stored = localStorage.getItem(WALLET_SESSION_STORAGE_KEY);
  if (!stored) return false;
  try {
    const parsed: unknown = JSON.parse(stored);
    return isWalletSession(parsed);
  } catch {
    return false;
  }
}

/** @deprecated Utiliser getWalletSession avec mode watch */
export function getWatchedAddressFromSession(): `0x${string}` | null {
  const session = getWalletSession();
  return session?.mode === 'watch' ? session.address : null;
}
