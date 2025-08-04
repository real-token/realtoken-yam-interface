import { FC, useEffect, useState } from 'react';

import { useAA } from '@real-token/aa-core';
import { useQuery } from '@tanstack/react-query';
import { multicall } from '@wagmi/core';

import BigNumber from 'bignumber.js';
import { Address } from 'viem';
import { useConfig } from 'wagmi';

import { WalletERC20Balance } from 'src/components/WalletBalance/WalletERC20Balance';

import { Erc20ABI } from '../abis';

interface TokenInfos {
  balance: BigNumber;
  symbol: string;
  decimals: string;
}

interface UseWalletERC20Balance {
  bigNumberbalance: BigNumber | undefined;
  balance: string | undefined;
  WalletERC20Balance: any;
}

export const useWalletERC20Balance = (
  tokenAddress: string | undefined
): UseWalletERC20Balance => {
  const [bigNumberbalance, setBigNumberbalance] = useState<
    BigNumber | undefined
  >(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [tokenSymbol, setTokenSymbol] = useState<string | undefined>(undefined);

  const config = useConfig();
  const { walletAddress: account } = useAA();
  console.log('account', account);

  const getTokenInfos = async (): Promise<TokenInfos> => {
    return new Promise<TokenInfos>(async (resolove, reject) => {
      try {
        if (!config || !account) return;

        const multicallResult = await multicall(config, {
          contracts: [
            {
              abi: Erc20ABI,
              address: tokenAddress as Address,
              functionName: 'balanceOf',
              args: [account],
            },
            {
              abi: Erc20ABI,
              address: tokenAddress as Address,
              functionName: 'decimals',
            },
            {
              abi: Erc20ABI,
              address: tokenAddress as Address,
              functionName: 'symbol',
            },
          ],
        });

        const balanceResult = multicallResult[0]?.result;
        const decimalsResult = multicallResult[1]?.result;

        if (balanceResult === undefined || decimalsResult === undefined) {
          throw new Error('Failed to fetch balance or decimals from multicall');
        }

        const balance = balanceResult.toString();
        const balanceBigNumber = new BigNumber(balance);
        const decimals = new BigNumber(decimalsResult.toString());
        const tokenSymbol = multicallResult[2]?.result;

        resolove({
          balance: balanceBigNumber,
          symbol: tokenSymbol ?? '',
          decimals: decimals.toString() ?? '',
        });
      } catch (err) {
        console.log('Failed to get wallet balance: ', err);
        reject(err);
      }
    });
  };

  const { data, refetch } = useQuery({
    queryKey: [tokenAddress],
    queryFn: getTokenInfos,
    enabled: !!config && !!tokenAddress && !!account,
  });

  useEffect(() => {
    if (tokenAddress) {
      setBigNumberbalance(undefined);
      setTokenSymbol(undefined);
      setBalance(undefined);
      refetch();
    }
  }, [tokenAddress]);

  useEffect(() => {
    if (data) {
      setBigNumberbalance(data.balance);
      setTokenSymbol(data.symbol);
      setBalance(data.balance.shiftedBy(-data.decimals).toFixed(10).toString());
    }
  }, [data]);

  const Component: FC = (): React.ReactElement => (
    <WalletERC20Balance balance={balance} symbol={tokenSymbol} />
  );

  return {
    WalletERC20Balance: Component,
    bigNumberbalance: bigNumberbalance,
    balance: balance,
  };
};
