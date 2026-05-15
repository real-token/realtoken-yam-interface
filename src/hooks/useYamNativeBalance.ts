import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';
import {
  createPublicClient,
  fallback,
  formatUnits,
  getAddress,
  http,
  type Address,
  type Chain,
} from 'viem';

import type { ExtendedChainConfig } from 'src/config/aaConfig';
import { useConnectedAccount } from 'src/hooks/useConnectedAccount';
import { parseChainId } from 'src/utils/chainId';

const GNOSIS_FALLBACK_RPC = 'https://gnosis-rpc.publicnode.com';

function chainFromNetwork(network: ExtendedChainConfig): Chain {
  return {
    id: parseChainId(network.chainId),
    name: network.displayName,
    nativeCurrency: {
      name: network.tickerName,
      symbol: network.ticker,
      decimals: network.decimals,
    },
    rpcUrls: {
      default: { http: [network.rpcTarget] },
    },
  } as Chain;
}

function rpcUrlsForNetwork(network: ExtendedChainConfig): string[] {
  const urls = [network.rpcTarget, ...network.fallbackRpcTargets].filter(
    Boolean
  );
  if (parseChainId(network.chainId) === 100 && !urls.includes(GNOSIS_FALLBACK_RPC)) {
    urls.push(GNOSIS_FALLBACK_RPC);
  }
  return [...new Set(urls)];
}

function resolveBalanceAddress({
  wagmiAddress,
  walletAddress,
  isWagmiConnected,
  isWatching,
}: {
  wagmiAddress?: string;
  walletAddress?: string | null;
  isWagmiConnected: boolean;
  isWatching: boolean;
}): Address | undefined {
  if (isWatching && walletAddress) {
    return getAddress(walletAddress);
  }
  if (isWagmiConnected && wagmiAddress) {
    return getAddress(wagmiAddress);
  }
  const candidate = wagmiAddress ?? walletAddress;
  return candidate ? getAddress(candidate) : undefined;
}

async function fetchNativeBalance(
  address: Address,
  network: ExtendedChainConfig
): Promise<bigint> {
  const urls = rpcUrlsForNetwork(network);
  const transport =
    urls.length > 1 ? fallback(urls.map((url) => http(url))) : http(urls[0]!);

  const client = createPublicClient({
    chain: chainFromNetwork(network),
    transport,
  });

  return client.getBalance({ address });
}

/**
 * Balance native via RPC du réseau courant (aaConfig), pas via wagmi getClient
 * (qui peut pointer vers Ethereum si la chaîne n’est pas encore dans wagmi.chains).
 */
export function useYamNativeBalance() {
  const {
    wagmiAddress,
    walletAddress,
    isWagmiConnected,
    isWatching,
  } = useConnectedAccount();
  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const balanceAddress = resolveBalanceAddress({
    wagmiAddress,
    walletAddress,
    isWagmiConnected,
    isWatching,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      'yam-native-balance',
      balanceAddress,
      currentNetwork?.chainId,
      currentNetwork?.rpcTarget,
    ],
    queryFn: async () => {
      if (!balanceAddress || !currentNetwork) {
        throw new Error('Missing address or network for native balance');
      }
      const value = await fetchNativeBalance(balanceAddress, currentNetwork);
      return {
        value,
        decimals: currentNetwork.decimals,
        symbol: currentNetwork.ticker,
      };
    },
    enabled: Boolean(balanceAddress && currentNetwork?.rpcTarget),
    refetchInterval: 30_000,
    retry: 1,
  });

  const decimals = data?.decimals ?? currentNetwork?.decimals ?? 18;
  const symbol =
    data?.symbol ?? currentNetwork?.ticker ?? currentNetwork?.tickerName ?? 'ETH';

  return {
    balance: data?.value ?? 0n,
    formatted: data ? formatUnits(data.value, decimals) : '0',
    symbol,
    decimals,
    isLoading,
    isError,
    refetch,
  };
}
