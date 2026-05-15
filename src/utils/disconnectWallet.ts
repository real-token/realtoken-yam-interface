import { disconnect } from '@wagmi/core';
import type { Config } from 'wagmi';

import { clearWatchedAddress } from 'src/utils/watchedAddressStorage';
import { clearWalletSession } from 'src/utils/walletSessionStorage';

export async function disconnectWallet(
  wagmiConfig: Config,
  logout: () => Promise<void>
): Promise<void> {
  clearWalletSession();
  clearWatchedAddress();

  try {
    await disconnect(wagmiConfig);
  } catch {
    // déjà déconnecté
  }

  await logout();
}
