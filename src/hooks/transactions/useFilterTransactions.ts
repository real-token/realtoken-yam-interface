import { useCallback, useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { statesFilterTokenAtom } from 'src/states';
import { selectTransactionsIsLoading } from 'src/store/features/interface/interfaceSelector';
import { OFFER_TYPE } from 'src/types/offer';
import { Transaction } from 'src/types/transaction/Transaction';

import { useAppSelector } from '../react-hooks';

type UseFilterTransactions = (transactions: Transaction[]) => {
  transactions: Transaction[];
};

export const useFilterTransactions: UseFilterTransactions = (transactions) => {
  const transactionsLoading = useAppSelector<boolean>(
    selectTransactionsIsLoading,
  );
  const tokenOfferFilter = useAtomValue(statesFilterTokenAtom);

  const getTypedOffers = useCallback((): Transaction[] => {
    if (!transactions || transactionsLoading) return [];
    return transactions.filter((transaction: Transaction) => {
      const hasFilter = tokenOfferFilter.keys.length > 0;
      const tokenBuyWith =
        transaction.tokenBuyWith?.address.toLowerCase() ?? '';
      const tokenForSale =
        transaction.tokenForSale?.address.toLowerCase() ?? '';

      const offerTokenFilter = tokenOfferFilter.has(tokenForSale)
        ? tokenOfferFilter.get(tokenForSale)
        : false;
      const buyerTokenFilter = tokenOfferFilter.has(tokenBuyWith)
        ? tokenOfferFilter.get(tokenBuyWith)
        : false;
      return (
        transaction.offerType !== OFFER_TYPE.EXCHANGE &&
        (hasFilter || offerTokenFilter || buyerTokenFilter)
      );
    });
  }, [transactions, transactionsLoading, tokenOfferFilter]);

  const rightTypedTransactions: Transaction[] = useMemo(() => {
    return getTypedOffers();
  }, [getTypedOffers]);

  return {
    transactions: rightTypedTransactions,
  };
};
