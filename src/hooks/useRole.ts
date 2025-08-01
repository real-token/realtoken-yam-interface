import { useEffect, useState } from 'react';

import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';
import { multicall } from '@wagmi/core';

import { useAccount, useConfig } from 'wagmi';

import { ROLE, USER_ROLE } from 'src/types/admin';

import { realTokenYamUpgradeableABI } from '../abis';
import { ExtendedChainConfig } from '../config/aaConfig';

type UseRole = (address?: string) => {
  role: USER_ROLE;
  isPending: boolean;
};

export const useRole: UseRole = (address) => {
  const { address: account } = useAccount();
  const config = useConfig();

  const addressToCheck = address ?? account;

  const networkConfig = useCurrentNetwork<ExtendedChainConfig>();

  const getAddressRole = (): Promise<USER_ROLE> => {
    return new Promise<USER_ROLE>(async (resolve, reject) => {
      try {
        if (!config || !addressToCheck || !networkConfig || !!addressToCheck)
          return;

        const realTokenYamUpgradeableAddress =
          networkConfig.contracts.realTokenYamUpgradeableAddress;

        const adminRole = ROLE.get(USER_ROLE.ADMIN);
        const moderatorRole = ROLE.get(USER_ROLE.MODERATOR);
        if (!adminRole || !moderatorRole) {
          throw new Error('Admin or moderator role not found');
        }

        const multicallResult = await multicall(config, {
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
        });

        const isAdmin = multicallResult[0]?.result;
        const isModerator = multicallResult[1]?.result;

        if (isAdmin) {
          resolve(USER_ROLE.ADMIN);
          return;
        }
        if (isModerator) {
          resolve(USER_ROLE.MODERATOR);
          return;
        }

        resolve(USER_ROLE.NO_ROLE);
      } catch (err) {
        console.log('Fail to get address role: ', err);
        reject();
      }
    });
  };

  const { data, isPending } = useQuery({
    queryKey: ['role', addressToCheck],
    queryFn: getAddressRole,
    enabled: !!config && !!addressToCheck && !!networkConfig,
  });

  return {
    role: data ?? USER_ROLE.NO_ROLE,
    isPending,
  };
};
