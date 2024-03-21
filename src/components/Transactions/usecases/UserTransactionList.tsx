import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppSelector } from 'src/hooks/react-hooks';
import { useRefreshTransactions } from 'src/hooks/transactions/useRefreshTransactions';

import { selectUserTransactions } from 'src/store/features/interface/interfaceSelector';
import {
  selectTransactionsIsLoading,
  selectOffersIsLoading,
} from 'src/store/features/interface/interfaceSelector';

import { sortTransactions } from '../utils/Utils';
import { TransactionList } from '../TransactionList';

interface UserTransactionListProps {
  setTransactionCount?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

export const UserTransactionList = ({
  setTransactionCount,
}: UserTransactionListProps) => {
  const { refreshTransactions } = useRefreshTransactions(false);

  const transactionsIsLoading = useSelector(selectTransactionsIsLoading);
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const userTransactions = useAppSelector(selectUserTransactions);

  const sortedTransactions = sortTransactions(userTransactions);

  useEffect(() => {
    if (setTransactionCount) setTransactionCount(userTransactions.length);
  }, [setTransactionCount, userTransactions]);

  useEffect(() => {
    if (!transactionsIsLoading) return refreshTransactions();
  }, [offersIsLoading, refreshTransactions]);

  return <TransactionList transactions={sortedTransactions}></TransactionList>;
};
