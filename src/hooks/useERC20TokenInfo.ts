import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { multicall } from '@wagmi/core';

import BigNumber from 'bignumber.js';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import { Erc20ABI } from 'src/abis';

interface ERC20TokensInfos {
  decimals: string;
  symbol: string;
  name: string;
}

export type UseERC20TokenInfo = (tokenAddress: string) => {
  address: string | undefined;
  decimals: string | undefined;
  symbol: string | undefined;
  name: string | undefined;
};

export const useERC20TokenInfo: UseERC20TokenInfo = (tokenAddress) => {
  const [uuid] = useState<number>(Math.random() * 1000);
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const config = useConfig();

  const getTokenInfos = async (): Promise<ERC20TokensInfos> => {
    return new Promise<ERC20TokensInfos>(async (resolove, reject) => {
      try {
        if (!publicClient || !account || !config) return;

        const multicallResult = await multicall(config, {
          contracts: [
            {
              abi: Erc20ABI,
              address: tokenAddress as `0x${string}`,
              functionName: 'name',
            },
            {
              abi: Erc20ABI,
              address: tokenAddress as `0x${string}`,
              functionName: 'decimals',
            },
            {
              abi: Erc20ABI,
              address: tokenAddress as `0x${string}`,
              functionName: 'symbol',
            },
          ],
        });

        const name = multicallResult[0]?.result?.toString();
        const decimals = new BigNumber(
          multicallResult[1]?.result?.toString() ?? '0'
        ).toString();
        const symbol = multicallResult[2]?.result?.toString();

        if (!name || !decimals || !symbol) {
          return reject(new Error('Failed to get ERC20 token infos'));
        }

        const res = {
          name,
          symbol,
          decimals,
        };
        resolove(res);
      } catch (err) {
        console.log('Failed to get ERC20 token infos: ', err);
        reject(err);
      }
    });
  };

  const { data: tokenInfos, refetch } = useQuery({
    queryKey: [`erc20TokenInfos-${uuid}`],
    queryFn: getTokenInfos,
    enabled: !!publicClient && !!tokenAddress && !!account && !!config,
  });

  return {
    address: tokenAddress ? tokenAddress : undefined,
    decimals: tokenInfos ? tokenInfos.decimals : undefined,
    symbol: tokenInfos ? tokenInfos.symbol : undefined,
    name: tokenInfos ? tokenInfos.name : undefined,
  };
};
