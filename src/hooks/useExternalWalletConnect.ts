import { useCallback, useState } from 'react';

import { connect, disconnect, getAccount, getConnections } from '@wagmi/core';
import type { Connector, CreateConnectorFn } from 'wagmi';
import { useConfig } from 'wagmi';

const CONNECT_ADDRESS_TIMEOUT_MS = 15_000;
const POLL_INTERVAL_MS = 200;

function waitForAccountAddress(
  wagmiConfig: ReturnType<typeof useConfig>,
  timeoutMs = CONNECT_ADDRESS_TIMEOUT_MS
): Promise<`0x${string}`> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const check = () => {
      const { address, isConnected } = getAccount(wagmiConfig);
      if (address && isConnected) {
        resolve(address);
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        reject(
          new Error(
            'Connexion au portefeuille expirée. Vérifiez que vous avez approuvé la demande dans votre extension.'
          )
        );
        return;
      }
      window.setTimeout(check, POLL_INTERVAL_MS);
    };

    check();
  });
}

function isConnectorAlreadyConnectedError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'ConnectorAlreadyConnectedError' ||
      error.message.includes('Connector already connected'))
  );
}

function getActiveConnectorUid(
  wagmiConfig: ReturnType<typeof useConfig>
): string | undefined {
  const connections = getConnections(wagmiConfig);
  const currentUid = wagmiConfig.state.current;
  if (currentUid && connections.some((c) => c.connector.uid === currentUid)) {
    return currentUid;
  }
  return connections[0]?.connector.uid;
}

async function disconnectOtherConnectors(
  wagmiConfig: ReturnType<typeof useConfig>,
  targetConnectorUid: string | undefined
): Promise<void> {
  if (!targetConnectorUid) return;
  const connections = getConnections(wagmiConfig);
  for (const { connector } of connections) {
    if (connector.uid !== targetConnectorUid) {
      try {
        await disconnect(wagmiConfig, { connector });
      } catch {
        // ignore
      }
    }
  }
}

export type ExternalWalletConnectState = 'idle' | 'connecting';

export function useExternalWalletConnect() {
  const wagmiConfig = useConfig();
  const [pendingConnectorId, setPendingConnectorId] = useState<string | null>(
    null
  );
  const [state, setState] = useState<ExternalWalletConnectState>('idle');

  const connectWallet = useCallback(
    async (
      connector: Connector | CreateConnectorFn
    ): Promise<`0x${string}`> => {
      setState('connecting');
      const connectorId =
        typeof connector === 'function' ? 'custom' : connector.id;
      setPendingConnectorId(connectorId);

      try {
        const { address: existingAddress, isConnected } = getAccount(wagmiConfig);
        const activeUid = getActiveConnectorUid(wagmiConfig);
        const targetUid =
          typeof connector === 'function' ? undefined : connector.uid;

        if (
          isConnected &&
          existingAddress &&
          targetUid &&
          activeUid === targetUid
        ) {
          return existingAddress;
        }

        if (isConnected && activeUid && targetUid && activeUid !== targetUid) {
          await disconnectOtherConnectors(wagmiConfig, targetUid);
        }

        try {
          await connect(wagmiConfig, { connector });
        } catch (error) {
          if (isConnectorAlreadyConnectedError(error)) {
            const { address } = getAccount(wagmiConfig);
            if (address) return address;
          }
          throw error;
        }

        return await waitForAccountAddress(wagmiConfig);
      } finally {
        setState('idle');
        setPendingConnectorId(null);
      }
    },
    [wagmiConfig]
  );

  return {
    connectWallet,
    state,
    pendingConnectorId,
    isConnecting: state === 'connecting',
  };
}
