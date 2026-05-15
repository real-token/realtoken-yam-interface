import { useConnections, useConnectors } from 'wagmi';

import { useConnectedAccount } from 'src/hooks/useConnectedAccount';

/**
 * Indique si l’utilisateur peut envoyer une transaction signée (pas le mode lecture seule).
 * aa-core exige un connecteur wagmi actif ; une adresse « watch » ne suffit pas.
 */
export function useCanSignTransactions() {
  const {
    address,
    wagmiAddress,
    isWagmiConnected,
    isWatching,
    connector,
  } = useConnectedAccount();
  const connections = useConnections();
  const connectors = useConnectors();

  const isReadOnlyConnector = connector?.id === 'readOnly';
  const hasSignableConnection = connections.some(
    (connection) =>
      connection.connector.id !== 'readOnly' && connection.accounts.length > 0
  );
  const hasAaCoreConnector =
    Boolean(connectors[0]) || Boolean(connections[0]?.connector);

  const canSign = Boolean(
    wagmiAddress &&
      isWagmiConnected &&
      !isWatching &&
      !isReadOnlyConnector &&
      hasSignableConnection &&
      hasAaCoreConnector
  );

  return {
    address,
    wagmiAddress,
    canSign,
    isWatching,
    isReadOnlyConnector,
    hasSignableConnection,
  };
}
