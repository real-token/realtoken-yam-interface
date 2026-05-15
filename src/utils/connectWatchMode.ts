import {
  readOnlyConnector,
  setReadOnlyAddress,
  setReadOnlyEnsName,
  setReadOnlyStorage,
} from '@real-token/web3';
import { connect, disconnect, getAccount } from '@wagmi/core';
import { isAddress, type Address } from 'viem';
import type { Config } from 'wagmi';

import { gnosisChainId } from 'src/config/aaConfig';

const GNOSIS_CHAIN_ID = Number.parseInt(gnosisChainId, 16);

/**
 * Mode « surveiller une adresse » sans client Web3Auth wagmi.
 * Utilise le connecteur readOnly de @real-token/web3, puis tente de synchroniser aa-core.
 */
export async function connectWatchMode(
  wagmiConfig: Config,
  value: string,
  syncAaWatch?: (address: Address) => Promise<void>
): Promise<Address> {
  const trimmed = value.trim();

  if (!wagmiConfig.storage) {
    throw new Error('Wagmi storage not configured for read-only mode');
  }

  setReadOnlyStorage(
    wagmiConfig.storage as Parameters<typeof setReadOnlyStorage>[0]
  );

  if (trimmed.startsWith('0x')) {
    if (!isAddress(trimmed)) {
      throw new Error('Invalid address');
    }
    await setReadOnlyAddress(trimmed);
  } else {
    await setReadOnlyEnsName(trimmed);
  }

  try {
    await disconnect(wagmiConfig);
  } catch {
    // Aucune session active
  }

  await connect(wagmiConfig, {
    connector: readOnlyConnector(),
    chainId: GNOSIS_CHAIN_ID,
  });

  const { address } = getAccount(wagmiConfig);
  if (!address) {
    throw new Error('Read-only connection did not return an address');
  }

  if (syncAaWatch) {
    try {
      await syncAaWatch(address);
    } catch {
      // wagmi read-only suffit pour l’UI ; aa-core peut être indisponible sans Web3Auth
    }
  }

  return address;
}
