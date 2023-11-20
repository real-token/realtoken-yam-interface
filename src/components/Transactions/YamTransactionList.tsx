import React, { memo, useEffect, useMemo, useState } from 'react';

import { Button } from '@mantine/core';

import { ContractsID } from 'src/constants/contracts';
import { useAppSelector } from 'src/hooks/react-hooks';
import { useActiveChain } from 'src/hooks/useActiveChain';
import { useAllowedTokens } from 'src/hooks/useAllowedTokens';
import useTransaction from 'src/hooks/useTransactions';
import { selectAllOffers } from 'src/store/features/interface/interfaceSelector';

import TransactionList from './TransactionList';

const YamTransactionList = ({}) => {
  console.log('YamTransactionList rendered');
  const chain = useActiveChain();
  const allOffers = useAppSelector(selectAllOffers);
  const { allowedTokens } = useAllowedTokens();

  const {
    buyTransactions: transactions,
    createOfferTransactions,
    isLoading,
    isError,
    setSize,
    size,
  } = useTransaction(
    chain?.contracts[ContractsID.realTokenYamUpgradeable].address ?? '',
    1,
    allOffers,
    allowedTokens
  );

  if (isLoading) {
    return <div>{'Loading...'}</div>;
  }

  if (isError) {
    return <div>{'Error: ' + isError.message}</div>;
  }

  return (
    <>
      <Button
        onClick={() => {
          console.log('SIZE', size);
          setSize(size + 1);
          console.log('SIZE +1', size);
        }}
      >
        {'Load more'}
      </Button>
      <TransactionList
        transactions={transactions}
        transactionsOffer={createOfferTransactions}
      >
        <Button
          onClick={() => {
            console.log('SIZE', size);
            setSize(size + 1);
            console.log('SIZE +1', size);
          }}
        >
          {'Load more'}
        </Button>
      </TransactionList>
    </>
  );
};

export default YamTransactionList;
