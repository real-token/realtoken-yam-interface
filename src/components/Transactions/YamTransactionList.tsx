import React, { memo, useEffect } from 'react';

import { Button } from '@mantine/core';

import { ContractsID } from 'src/constants/contracts';
import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useAppSelector } from 'src/hooks/react-hooks';
import { useActiveChain } from 'src/hooks/useActiveChain';
import { useAllowedTokens } from 'src/hooks/useAllowedTokens';
import useTransaction from 'src/hooks/useTransactions';
import { selectAllOffers } from 'src/store/features/interface/interfaceSelector';

import TransactionList from './TransactionList';

const YamTransactionList = ({}) => {
  const chain = useActiveChain();

  const allOffers = useAppSelector(selectAllOffers);
  const { offers } = useTypedOffers(allOffers);
  const { allowedTokens } = useAllowedTokens();

  console.log('LOAD TransactionList');

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
    offers,
    allowedTokens
  );

  useEffect(() => {
    // Chargez les dix premières pages au montage du composant
    if (size < 10) {
      setSize(size + 1);
    } else {
      // Le nombre de pages n'a pas changé, pas besoin de rappeler useTransaction
      console.log('Number of pages unchanged, skipping useTransaction');
    }
  }, [size, setSize]);

  if (isLoading) {
    return <div>{'Loading...'}</div>;
  }

  if (isError) {
    return <div>{'Error: ' + isError.message}</div>;
  }

  return (
    <>
      <TransactionList
        transactions={transactions}
        transactionsOffer={createOfferTransactions}
      >
        <Button
          onClick={() => {
            setSize(size + 1);
          }}
        >
          {'Load more'}
        </Button>
      </TransactionList>
    </>
  );
};

export default memo(YamTransactionList);
