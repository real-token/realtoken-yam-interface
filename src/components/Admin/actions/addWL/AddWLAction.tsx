import { useTranslation } from 'react-i18next';

import { Button, Flex, Text } from '@mantine/core';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransactions } from '@real-token/web3';
import { IconPlus } from '@tabler/icons';

import { useAtom } from 'jotai';

import { wlTokensAtom } from 'src/states';
import { DEFAULT_WL_TOKEN } from 'src/types/WlToken';
import { calcRem } from 'src/utils/style';
import { whitelistTokenTransaction } from 'src/utils/tx/admin';

import { ExtendedChainConfig } from '../../../../config/aaConfig';
import { Action } from '../../Action';
import { AddWL } from './AddWL';
import classes from './AddWLAction.module.css';

export const AddWLAction = () => {
  const [wlTokens, setWlTokens] = useAtom(wlTokensAtom);

  const { t } = useTranslation('admin', { keyPrefix: 'addWlActions' });

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { sendTransactions, isPending } = useSendTransactions({
    onAllComplete: () => {
      setWlTokens([DEFAULT_WL_TOKEN]);
    },
  });

  const whitelistToken = async () => {
    const addresses: `0x${string}`[] = [];
    const types: number[] = [];

    wlTokens.forEach((wlToken) => {
      addresses.push(wlToken.address as `0x${string}`);
      types.push(parseInt(wlToken.type));
    });

    const transactions = whitelistTokenTransaction(
      currentNetwork,
      addresses,
      types
    );
    sendTransactions(transactions);
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
