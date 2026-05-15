import { disconnect } from '@wagmi/core';
import type { Config } from 'wagmi';

import { clearWatchedAddress } from 'src/utils/watchedAddressStorage';
import {
  clearUserInitiatedConnect,
  clearWalletSession,
  setExplicitDisconnect,
} from 'src/utils/walletSessionStorage';

/**
 * Déconnexion complète : flags session, persistance wallet, puis aa-core et wagmi.
 * La préférence de chaîne (storedChainPreference) est conservée pour la prochaine connexion externe.
 */
export async function disconnectWallet(
  wagmiConfig: Config,
  logout: () => Promise<void>
): Promise<void> {
  setExplicitDisconnect();
  clearUserInitiatedConnect();
  clearWalletSession();
  clearWatchedAddress();

  try {
    await logout();
  } catch {
    // Web3Auth / aa-core déjà déconnecté
  }

  try {
    await disconnect(wagmiConfig);
  } catch {
    // wagmi déjà déconnecté
  }
}
