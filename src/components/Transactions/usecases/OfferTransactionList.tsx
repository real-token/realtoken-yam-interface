import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader, Center } from '@mantine/core';

import { useAppSelector } from 'src/hooks/react-hooks';
import { useRefreshTransactions } from 'src/hooks/transactions/useRefreshTransactions';

import { selectOfferTransactions } from 'src/store/features/interface/interfaceSelector';
import {
  selectTransactionsIsLoading,
  selectOffersIsLoading,
} from 'src/store/features/interface/interfaceSelector';

import { sortTransactions } from '../utils/Utils';
import { TransactionList } from '../TransactionAmountList';

interface OfferTransactionTableProps {
  offerId: string;
  setTransactionCount?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  isSmall?: boolean;
}

export const OfferTransactionList = ({
  offerId,
  isSmall = false,
  setTransactionCount,
}: OfferTransactionTableProps) => {
  const { refreshTransactions } = useRefreshTransactions(false);

  const transactionsIsLoading = useSelector(selectTransactionsIsLoading);
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const userTransactions = useAppSelector(selectOfferTransactions(offerId));

  const sortedTransactions = sortTransactions(userTransactions);

  useEffect(() => {
    if (setTransactionCount) setTransactionCount(userTransactions.length);
  }, [setTransactionCount, userTransactions]);

  useEffect(() => {
    if (!transactionsIsLoading) return refreshTransactions();
  }, [offersIsLoading, refreshTransactions]);

  return (
    <>
      {transactionsIsLoading && (
        <Center mx={'auto'} h={100}>
          <Loader variant={'dots'} />
        </Center>
      )}
      <TransactionList
        transactions={sortedTransactions}
        isSmallLine={isSmall}
      ></TransactionList>{' '}
    </>
  );
};