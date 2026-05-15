import type { Address } from 'viem';
import type { Config } from 'wagmi';

import { isAaWalletLoginEnabled } from 'src/config/web3AuthEnv';
import { connectWatchMode } from 'src/utils/connectWatchMode';
import type { WalletSession } from 'src/utils/walletSessionStorage';

import { READ_ONLY_CONNECTOR_ID } from './constants';

const WEB3AUTH_CONNECTOR_ID = 'web3auth';

export function isExternalSignedSession(session: WalletSession): boolean {
  if (session.mode !== 'signed') return false;
  return (
    session.connectorId !== WEB3AUTH_CONNECTOR_ID &&
    session.connectorId !== READ_ONLY_CONNECTOR_ID
  );
}

export type RestoreContext = {
  wagmiConfig: Config;
  syncAaWatch?: (address: Address) => Promise<void>;
};

export async function restoreWatchSession(
  session: WalletSession,
  { wagmiConfig, syncAaWatch }: RestoreContext
): Promise<void> {
  await connectWatchMode(wagmiConfig, session.address, syncAaWatch);
}

export function isAaSignedSession(session: WalletSession): boolean {
  return session.mode === 'signed' && isAaWalletLoginEnabled();
}

export function isWatchSession(session: WalletSession): boolean {
  return (
    session.mode === 'watch' || session.connectorId === READ_ONLY_CONNECTOR_ID
  );
}
