import { JsonRpcProvider } from '@ethersproject/providers';

const providersByChain = new Map<number, JsonRpcProvider>();

/**
 * Un seul JsonRpcProvider par chainId pour éviter les polls RPC dupliqués
 * (eth_blockNumber, etc.) quand plusieurs hooks écoutent le contrat YAM.
 */
export function getSharedJsonRpcProvider(
  chainId: number,
  rpcUrl: string
): JsonRpcProvider {
  const existing = providersByChain.get(chainId);
  if (existing) return existing;

  const provider = new JsonRpcProvider(rpcUrl);
  provider.pollingInterval = 15_000;
  providersByChain.set(chainId, provider);
  return provider;
}
