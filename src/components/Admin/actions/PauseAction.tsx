import { Checkbox, Flex, Skeleton } from '@mantine/core';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransactions } from '@real-token/web3';

import { useReadContract } from 'wagmi';

import { pauseTransaction } from 'src/utils/tx/admin';

import { realTokenYamUpgradeableABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';
import { Action } from '../Action';

export const PauseAction = () => {
  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { data: isPaused, isLoading: isLoadingPaused } = useReadContract({
    abi: realTokenYamUpgradeableABI,
    address: currentNetwork?.contracts
      .realTokenYamUpgradeableAddress as `0x${string}`,
    functionName: 'paused',
  });

  const { sendTransactions, isPending: isLoading } = useSendTransactions({});

  const changeStatus = async () => {
    const transactions = pauseTransaction(currentNetwork, !!isPaused);
    sendTransactions(transactions);
  };

  return (
    <Action title={'Pause contract'}>
      <Flex align={'center'} gap={6}>
        {isLoading || isLoadingPaused ? (
          <Skeleton width={75} height={15} />
        ) : (
          <Checkbox
            label={'Paused'}
            color={'brand'}
            checked={isPaused}
            onChange={() => changeStatus()}
          />
        )}
      </Flex>
    </Action>
  );
};
