import { isAddress } from 'viem';

const WATCHED_ADDRESS_STORAGE_KEY = 'yam-watched-address';

export function getWatchedAddress(): `0x${string}` | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(WATCHED_ADDRESS_STORAGE_KEY);
  if (!stored || !isAddress(stored)) {
    return null;
  }

  return stored as `0x${string}`;
}

export function setWatchedAddress(address: string): void {
  if (typeof window === 'undefined' || !isAddress(address)) return;
  localStorage.setItem(WATCHED_ADDRESS_STORAGE_KEY, address);
}

export function clearWatchedAddress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WATCHED_ADDRESS_STORAGE_KEY);
}
