import { parseChainId } from 'src/utils/chainId';

export const AA_CORE_CHAIN_ID_STORAGE_KEY = 'AA-CORE-CHAINID';

export function getStoredChainId(fallbackChainId: string | number): number {
  const stored = localStorage.getItem(AA_CORE_CHAIN_ID_STORAGE_KEY);
  if (stored) {
    const parsed = Number.parseInt(stored, 10);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return parseChainId(fallbackChainId);
}

export function setStoredChainId(chainId: number): void {
  localStorage.setItem(AA_CORE_CHAIN_ID_STORAGE_KEY, String(chainId));
}
