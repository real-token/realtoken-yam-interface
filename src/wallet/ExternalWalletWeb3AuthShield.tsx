import { useEffect, useRef, type MutableRefObject } from 'react';

import { connect, getConnectors, reconnect } from '@wagmi/core';
import { useConfig } from 'wagmi';

import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { getWalletSession } from 'src/utils/walletSessionStorage';

import { isExternalSignedSession } from './restoreStrategies';

/**
 * Protège une session wallet externe (Rabby) de l’init Web3Auth :
 * - aligne recentConnectorId wagmi sur la session YAM
 * - reconnecte ciblé si wagmi est coupé à l’init Web3Auth
 */
function reconnectExternalSession(
  wagmiConfig: ReturnType<typeof useConfig>,
  session: NonNullable<ReturnType<typeof getWalletSession>>,
  recoveryInFlight: MutableRefObject<boolean>
): void {
  if (recoveryInFlight.current) return;

  recoveryInFlight.current = true;
  const targetConnector = getConnectors(wagmiConfig).find(
    (c) => c.id === session.connectorId
  );
  const done = () => {
    recoveryInFlight.current = false;
  };

  if (targetConnector) {
    void connect(wagmiConfig, { connector: targetConnector }).finally(done);
  } else {
    void reconnect(wagmiConfig).finally(done);
  }
}

export function ExternalWalletWeb3AuthShield(): null {
  const wagmiConfig = useConfig();
  const { liveAddress } = useConnectedAccount();
  const recoveryInFlight = useRef(false);

  useEffect(() => {
    const session = getWalletSession();
    if (!session || !isExternalSignedSession(session)) return;
    void wagmiConfig.storage?.setItem('recentConnectorId', session.connectorId);
  }, [wagmiConfig]);

  useEffect(() => {
    if (liveAddress) return;

    const session = getWalletSession();
    if (!session || !isExternalSignedSession(session)) return;

    reconnectExternalSession(wagmiConfig, session, recoveryInFlight);
  }, [liveAddress, wagmiConfig]);

  useEffect(() => {
    return wagmiConfig.subscribe(
      (state) => state.status,
      (status, previousStatus) => {
        if (previousStatus !== 'connected' || status === 'connected') return;

        const session = getWalletSession();
        if (!session || !isExternalSignedSession(session)) return;
        if (recoveryInFlight.current) return;

        recoveryInFlight.current = true;
        const targetConnector = getConnectors(wagmiConfig).find(
          (c) => c.id === session.connectorId
        );

        reconnectExternalSession(wagmiConfig, session, recoveryInFlight);
      }
    );
  }, [wagmiConfig]);

  useEffect(() => {
    if (liveAddress) {
      recoveryInFlight.current = false;
    }
  }, [liveAddress]);

  return null;
}
