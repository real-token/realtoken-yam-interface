import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppSelector } from 'src/hooks/react-hooks';
import { useRefreshTransactions } from 'src/hooks/transactions/useRefreshTransactions';

import { selectPublicTransactions } from 'src/store/features/interface/interfaceSelector';
import {
  selectOffersIsLoading,
  selectTransactionsIsLoading,
} from 'src/store/features/interface/interfaceSelector';
import { useFilterTransactions } from 'src/hooks/transactions/useFilterTransactions';
import { sortTransactions } from '../Utils';
import { TransactionList } from '../TransactionList';

export const PublicTransactionList = ({}) => {
  const { refreshTransactions } = useRefreshTransactions(false);
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const transactionsIsLoading = useSelector(selectTransactionsIsLoading);

  const allTransactions = useAppSelector(selectPublicTransactions);

  const { transactions } = useFilterTransactions(allTransactions);
  const sortedTransactions = sortTransactions(transactions);

  useEffect(() => {
    if (!transactionsIsLoading) return refreshTransactions();
  }, [offersIsLoading, refreshTransactions]);

  return <TransactionList transactions={sortedTransactions}></TransactionList>;
};
