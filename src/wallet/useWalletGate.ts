import { useAccount, useConnections, useConnectors } from 'wagmi';

import { useWalletRestoreContext } from 'src/contexts/WalletRestoreContext';
import { WEB3AUTH_CONNECTOR_ID } from 'src/hooks/useAppSwitchChain';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { useWalletRestoreState } from 'src/hooks/useWalletRestoreState';

import { READ_ONLY_CONNECTOR_ID } from './constants';
import type { WalletConnectionStatus, WalletKind } from './types';

export type WalletGate = {
  status: WalletConnectionStatus;
  address: `0x${string}` | undefined;
  liveAddress: `0x${string}` | undefined;
  canFetch: boolean;
  canSign: boolean;
  walletKind: WalletKind | null;
  isRestoring: boolean;
  isWatching: boolean;
  connector: ReturnType<typeof useConnectedAccount>['connector'];
  wagmiAddress: `0x${string}` | undefined;
  walletAddress: string | null | undefined;
  isWagmiConnected: boolean;
};

function resolveWalletKind({
  liveAddress,
  isWatching,
  connectorId,
  isAaConnector,
}: {
  liveAddress: `0x${string}` | undefined;
  isWatching: boolean;
  connectorId: string | undefined;
  isAaConnector: boolean;
}): WalletKind | null {
  if (!liveAddress) return null;
  if (isWatching || connectorId === READ_ONLY_CONNECTOR_ID) return 'watch';
  if (isAaConnector) return 'aa';
  return 'external';
}

/**
 * Point d'entrée unique pour l'état wallet côté app :
 * déconnecté par défaut, connecté uniquement avec liveAddress stable.
 */
export function useWalletGate(): WalletGate {
  const {
    liveAddress,
    wagmiAddress,
    walletAddress,
    isWatching,
    isWagmiConnected,
    connector,
    isAaCoreSynced,
  } = useConnectedAccount();
  const { isRestoring } = useWalletRestoreState();
  const { isUserDisconnecting } = useWalletRestoreContext();
  const connections = useConnections();
  const connectors = useConnectors();

  const connectorId = connector?.id;
  const isAaConnector =
    connectorId === WEB3AUTH_CONNECTOR_ID || isAaCoreSynced;
  const walletKind = resolveWalletKind({
    liveAddress,
    isWatching,
    connectorId,
    isAaConnector,
  });

  const isReadOnlyConnector = connectorId === READ_ONLY_CONNECTOR_ID;
  const hasSignableConnection = connections.some(
    (connection) =>
      connection.connector.id !== READ_ONLY_CONNECTOR_ID &&
      connection.accounts.length > 0
  );
  const hasAaCoreConnector =
    Boolean(connectors[0]) || Boolean(connections[0]?.connector);

  const canSign = Boolean(
    liveAddress &&
      wagmiAddress &&
      isWagmiConnected &&
      !isWatching &&
      !isReadOnlyConnector &&
      hasSignableConnection &&
      hasAaCoreConnector
  );

  let status: WalletConnectionStatus = 'disconnected';
  if (isUserDisconnecting) {
    status = 'disconnecting';
  } else if (liveAddress) {
    status = 'connected';
  } else if (isRestoring) {
    status = 'restoring';
  }

  const canFetch = status === 'connected';
  const address = canFetch ? liveAddress : undefined;

  return {
    status,
    address,
    liveAddress,
    canFetch,
    canSign,
    walletKind,
    isRestoring,
    isWatching,
    connector,
    wagmiAddress,
    walletAddress,
    isWagmiConnected,
  };
}
