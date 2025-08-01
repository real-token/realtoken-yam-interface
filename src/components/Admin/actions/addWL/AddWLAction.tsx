import { useTranslation } from 'react-i18next';

import { Button, Flex, Text } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransaction } from '@real-token/web3';
import { IconPlus } from '@tabler/icons';

import { useAtom } from 'jotai';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';
import { wlTokensAtom } from 'src/states';
import { DEFAULT_WL_TOKEN } from 'src/types/WlToken';
import { calcRem } from 'src/utils/style';

import { realTokenYamUpgradeableABI } from '../../../../abis';
import { ExtendedChainConfig } from '../../../../config/aaConfig';
import { Action } from '../../Action';
import { AddWL } from './AddWL';
import classes from './AddWLAction.module.css';

export const AddWLAction = () => {
  const [wlTokens, setWlTokens] = useAtom(wlTokensAtom);

  const { t } = useTranslation('admin', { keyPrefix: 'addWlActions' });

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { sendTransaction, isPending } = useSendTransaction({
    onSent: () => {
      const notificationPayload = {
        key: 'wl-tokens',
        href: '',
        hash: '',
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
      );
    },
    onSuccess: (tx) => {
      updateNotification(
        NOTIFICATIONS[NotificationsID.createOfferSuccess]({
          key: 'wl-tokens',
          href: `${currentNetwork?.blockExplorerUrl}tx/${tx.transactionHash}`,
          hash: tx.transactionHash,
        })
      );
      setWlTokens([DEFAULT_WL_TOKEN]);
    },
    onError: (err) => {
      console.error('Error while adding token to WL: ', err);
      updateNotification(
        NOTIFICATIONS[NotificationsID.createOfferError]({
          key: 'wl-tokens',
          href: '',
          hash: '',
        })
      );
    },
  });

  const whitelistToken = async () => {
    const addresses: string[] = [];
    const types: string[] = [];

    wlTokens.forEach((wlToken) => {
      addresses.push(wlToken.address);
      types.push(wlToken.type);
    });

    sendTransaction({
      abi: realTokenYamUpgradeableABI,
      to: currentNetwork?.contracts
        .realTokenYamUpgradeableAddress as `0x${string}`,
      functionName: 'toggleWhitelistWithType',
      args: [addresses as `0x${string}`[], types.map((type) => parseInt(type))],
    });
  };

  return (
    <Action title={t('title')}>
      <Flex direction={'column'} align={'start'}>
        <Flex mb={10} gap={'md'} pl={50}>
          <Text style={{ width: calcRem(400) }}>{'Token type'}</Text>
          <Text>{t('tokenAddress')}</Text>
        </Flex>
        <Flex direction={'column'} mb={10} gap={'md'}>
          {wlTokens.map((wlToken, index) => (
            <AddWL key={`wl-${index}`} index={index} />
          ))}
          <Flex
            justify={'center'}
            className={classes.addButton}
            onClick={() => setWlTokens((prev) => [...prev, DEFAULT_WL_TOKEN])}
          >
            <IconPlus />
          </Flex>
        </Flex>
        <Button
          type={'submit'}
          onClick={() => whitelistToken()}
          loading={isPending}
          disabled={
            wlTokens.length == 0 ||
            (wlTokens.length > 0 && wlTokens[0].address == '')
          }
        >
          {t('wlToken')}
        </Button>
      </Flex>
    </Action>
  );
};
