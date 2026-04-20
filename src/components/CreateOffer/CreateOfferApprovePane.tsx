import { useMemo } from 'react';

import { Button, Flex, Skeleton, Text } from '@mantine/core';
import { useCurrentNetwork } from '@real-token/core';
import { encodeTransaction, useSendTransactions } from '@real-token/web3';
import { IconCheck } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import BigNumber from 'bignumber.js';
import { PublicClient } from 'viem';
import { readContract } from 'viem/actions';
import { useAccount, usePublicClient } from 'wagmi';

import { Erc20ABI } from '../../abis';
import { ExtendedChainConfig } from '../../config/aaConfig';
import { ContractsID } from '../../constants';
import { Approves } from '../../hooks/getBatchApprove';
import { useAllowedTokens } from '../../hooks/useAllowedTokens';
import { usePropertiesToken } from '../../hooks/usePropertiesToken';
import { useRootStore } from '../../zustandStore/store';
import classes from './CreateOfferApprovePane.module.css';

const checkNeedApprove = (
  amount: BigNumber,
  tokenAddress: string,
  publicClient: PublicClient,
  account: string,
  realTokenYamUpgradeable: string
) => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const allowance = await readContract(publicClient, {
        address: tokenAddress as `0x${string}`,
        abi: Erc20ABI,
        functionName: 'allowance',
        args: [
          account as `0x${string}`,
          realTokenYamUpgradeable as `0x${string}`,
        ],
      });
      resolve(new BigNumber(allowance.toString()).lt(amount));
    } catch (e) {
      reject(e);
    }
  });
};

interface CreateOfferApprovePaneProps {
  tokenAddress: string;
  approval: Approves;
}
export const CreateOfferApprovePane = ({
  tokenAddress,
  approval,
}: CreateOfferApprovePaneProps) => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  const { propertiesToken } = usePropertiesToken();
  const { allowedTokens } = useAllowedTokens();

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();
  const realTokenYamUpgradeable =
    currentNetwork?.contracts.realTokenYamUpgradeableAddress;

  const token = useMemo(() => {
    if (!propertiesToken || !allowedTokens) return 'Unknown';
    const token = propertiesToken?.find(
      (token) =>
        token.contractAddress.toLowerCase() === tokenAddress.toLowerCase()
    );
    const allowedToken = allowedTokens?.find(
      (token) =>
        token.contractAddress.toLowerCase() === tokenAddress.toLowerCase()
    );
    return token
      ? token.shortName
      : allowedToken
      ? allowedToken.name
      : 'Unknown';
  }, [propertiesToken, allowedTokens, tokenAddress]);

  const [addApproval] = useRootStore((state) => [state.addApproval]);

  const {
    data: needApprove,
    isLoading: checkIfApproveNeeded,
    refetch,
  } = useQuery({
    queryKey: ['need-approve', tokenAddress],
    enabled:
      !!approval && !!publicClient && !!realTokenYamUpgradeable && !!account,
    refetchInterval: 5000,
    queryFn: async () => {
      if (!publicClient || !realTokenYamUpgradeable || !account || !approval)
        return false;

      const needApprove = await checkNeedApprove(
        new BigNumber(approval.amount),
        tokenAddress,
        publicClient,
        account,
        realTokenYamUpgradeable
      );
      console.log('needApprove: ', needApprove);
      addApproval(tokenAddress, !needApprove);
      return needApprove;
    },
  });

  const { sendTransactions, isPending: isApproving } = useSendTransactions({
    onAllComplete: () => {
      console.log('Approval transaction completed');
    },
    onError: (error) => {
      console.error('Transaction error:', error);
    },
  });

  const amount = useMemo(() => {
    return new BigNumber(approval.amount)
      .shiftedBy(-approval.decimals)
      .toFixed(0);
  }, [approval]);

  return (
    <Flex className={classes.container} justify={'space-between'}>
      <Flex direction={'column'}>
        <Text fw={700}>
          {token ? token : <Skeleton height={35} width={'100%'} />}
        </Text>
        <Text fs={'italic'} fw={500} c={'gray'}>
          {amount ? amount : <Skeleton height={35} width={'100%'} />}
        </Text>
      </Flex>
      <Button
        color={'green'}
        h={'100%'}
        loading={isApproving || (checkIfApproveNeeded && !needApprove)}
        disabled={isApproving || !needApprove}
        leftSection={!needApprove ? <IconCheck size={18} /> : undefined}
        onClick={() => {
          if (!realTokenYamUpgradeable) return;
          sendTransactions([
            {
              prepareTransaction: async () => ({
                type: 'onchain',
                to: tokenAddress as `0x${string}`,
                data: encodeTransaction({
                  abi: Erc20ABI,
                  functionName: 'approve',
                  args: [
                    realTokenYamUpgradeable as `0x${string}`,
                    BigInt(new BigNumber(approval.amount).toString(10)),
                  ],
                }),
              }),
            },
          ]);
        }}
      >
        {needApprove ? 'Approve' : 'Approved'}
      </Button>
    </Flex>
  );
};
