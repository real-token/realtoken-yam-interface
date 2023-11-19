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
  //const { offers } = useTypedOffers(allOffers);
  const { allowedTokens } = useAllowedTokens();

  console.log(
    'LOAD TransactionList allOffers',
    allOffers.map((a) => a.offerId)
  );

  // console.log(
  //   'LOAD TransactionList offers',
  //   offers.map((o) => o.offerId)
  // );

  const {
    buyTransactions: transactions,
    createOfferTransactions,
    isLoading,
    isError,
    setSize,
    size,
  } = useTransaction(
    chain?.contracts[ContractsID.realTokenYamUpgradeable].address ?? '',
    3,
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
