import { Checkbox, Flex, Skeleton } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransaction } from '@real-token/web3';

import { useReadContract } from 'wagmi';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';

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

  const { sendTransaction, isPending: isLoading } = useSendTransaction({
    onSent: () => {
      showNotification(
        NOTIFICATIONS[
          isPaused
            ? NotificationsID.unpauseLoading
            : NotificationsID.pauseLoading
        ]({
          key: isPaused ? 'unpause' : 'pause',
          hash: '',
          href: '',
        })
      );
    },
    onSuccess: (tx) => {
      updateNotification(
        NOTIFICATIONS[
          isPaused
            ? NotificationsID.unpauseSuccess
            : NotificationsID.pauseSuccess
        ]({
          key: isPaused ? 'unpause' : 'pause',
          href: `${currentNetwork?.blockExplorerUrl}tx/${tx.transactionHash}`,
          hash: tx.transactionHash,
        })
      );
    },
    onError: (error) => {
      console.error(error);
      updateNotification(
        NOTIFICATIONS[
          isPaused ? NotificationsID.unpauseError : NotificationsID.pauseError
        ]({
          key: isPaused ? 'unpause' : 'pause',
          hash: '',
          href: '',
        })
      );
    },
  });

  const changeStatus = async () => {
    sendTransaction({
      abi: realTokenYamUpgradeableABI,
      to: currentNetwork?.contracts
        .realTokenYamUpgradeableAddress as `0x${string}`,
      functionName: isPaused ? 'unpause' : 'pause',
      args: [],
    });
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
