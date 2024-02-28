import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@mantine/core';

import { ContractsID } from 'src/constants/contracts';
import { useAppSelector } from 'src/hooks/react-hooks';
import { useActiveChain } from 'src/hooks/useActiveChain';
import { useAllowedTokens } from 'src/hooks/useAllowedTokens';
import useTransaction from 'src/hooks/useTransactions';
import { selectAllOffers } from 'src/store/features/interface/interfaceSelector';

import TransactionList from './TransactionDataList';

const AdminTransactionList = ({}) => {
  console.log('YamTransactionList rendered');
  const { t } = useTranslation('transactions', { keyPrefix: 'loader' });

  const chain = useActiveChain();
  const allOffers = useAppSelector(selectAllOffers);
  const { allowedTokens } = useAllowedTokens();

  const {
    buyTransactions: transactions,
    isLoading,
    isError,
    setSize,
    size,
  } = useTransaction(
    chain?.contracts[ContractsID.realTokenYamUpgradeable].address ?? '',
    1,
    allOffers,
    allowedTokens,
  );

  if (isLoading) {
    return <div>{'Loading...'}</div>;
  }

  if (isError) {
    return <div>{'Error: ' + isError.message}</div>;
  }

  return (
    <>
      <TransactionList transactions={transactions}>
        <Button
          onClick={() => {
            setSize(size + 1);
          }}
        >
          {t('loadMore')}
        </Button>
      </TransactionList>
    </>
  );
};

export default AdminTransactionList;
