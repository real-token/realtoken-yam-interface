import { isAddress } from 'viem';

import {
  getWatchedAddressFromSession,
  setWalletSession,
} from 'src/utils/walletSessionStorage';

const WATCHED_ADDRESS_STORAGE_KEY = 'yam-watched-address';
const READ_ONLY_CONNECTOR_ID = 'readOnly';

export function getWatchedAddress(): `0x${string}` | null {
  if (typeof window === 'undefined') return null;

  const fromSession = getWatchedAddressFromSession();
  if (fromSession) return fromSession;

  const stored = localStorage.getItem(WATCHED_ADDRESS_STORAGE_KEY);
  if (!stored || !isAddress(stored)) {
    return null;
  }

  return stored as `0x${string}`;
}

export function setWatchedAddress(address: string): void {
  if (typeof window === 'undefined' || !isAddress(address)) return;
  localStorage.setItem(WATCHED_ADDRESS_STORAGE_KEY, address);
  setWalletSession({
    address: address as `0x${string}`,
    connectorId: READ_ONLY_CONNECTOR_ID,
    mode: 'watch',
  });
}

export function clearWatchedAddress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WATCHED_ADDRESS_STORAGE_KEY);
}
