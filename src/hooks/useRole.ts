import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';
import { createPublicClient, http, type Chain } from 'viem';
import { useWalletGate } from 'src/wallet/useWalletGate';

import { ROLE, USER_ROLE } from 'src/types/admin';
import { parseChainId } from 'src/utils/chainId';

import { realTokenYamUpgradeableABI } from '../abis';
import { ExtendedChainConfig } from '../config/aaConfig';

const GNOSIS_MULTICALL3 = '0xcA11bde05977b3631167028862bE2a173976CA11' as const;

function chainFromNetworkConfig(network: ExtendedChainConfig): Chain {
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

type UseRole = (address?: string) => {
  role: USER_ROLE;
  isPending: boolean;
};

export const useRole: UseRole = (address) => {
  const { address: account, canFetch } = useWalletGate();
  const addressToCheck = address ?? account;
  const networkConfig = useCurrentNetwork<ExtendedChainConfig>();

  const getAddressRole = async (): Promise<USER_ROLE> => {
    if (!addressToCheck || !networkConfig) {
      throw new Error('[UseRole] Missing address or network config');
    }

    const realTokenYamUpgradeableAddress =
      networkConfig.contracts.realTokenYamUpgradeableAddress;

    const adminRole = ROLE.get(USER_ROLE.ADMIN);
    const moderatorRole = ROLE.get(USER_ROLE.MODERATOR);
    if (!adminRole || !moderatorRole) {
      throw new Error('Admin or moderator role not found');
    }

    const publicClient = createPublicClient({
      chain: chainFromNetworkConfig(networkConfig),
      transport: http(networkConfig.rpcTarget),
    });

    const multicallResult = await publicClient.multicall({
      contracts: [
        {
          abi: realTokenYamUpgradeableABI,
          address: realTokenYamUpgradeableAddress,
          functionName: 'hasRole',
          args: [adminRole, addressToCheck as `0x${string}`],
        },
        {
          abi: realTokenYamUpgradeableABI,
          address: realTokenYamUpgradeableAddress,
          functionName: 'hasRole',
          args: [moderatorRole, addressToCheck as `0x${string}`],
        },
      ],
      multicallAddress: GNOSIS_MULTICALL3,
    });

    if (multicallResult[0]?.result) return USER_ROLE.ADMIN;
    if (multicallResult[1]?.result) return USER_ROLE.MODERATOR;
    return USER_ROLE.NO_ROLE;
  };

  const { data, isPending } = useQuery({
    queryKey: ['role', addressToCheck, networkConfig?.chainId],
    queryFn: getAddressRole,
    enabled: Boolean(canFetch && addressToCheck && networkConfig),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  return {
    role: data ?? USER_ROLE.NO_ROLE,
    isPending,
  };
};
