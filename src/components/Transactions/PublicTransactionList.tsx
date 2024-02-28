import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAtom } from 'jotai';

import { useAppSelector } from 'src/hooks/react-hooks';
import { useRefreshTransactions } from 'src/hooks/transactions/useRefreshTransactions';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { statesFilterTokenAtom } from 'src/states';
import { selectPublicTransactions } from 'src/store/features/interface/interfaceSelector';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';
import { useFilterTransactions } from 'src/hooks/transactions/useFilterTransactions';
import { sortTransactions } from './Utils';
import { TransactionList } from './TransactionList';

export const PublicTransactionList = ({}) => {
  const { refreshTransactions } = useRefreshTransactions(false);
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const allTransactions = useAppSelector(selectPublicTransactions);
  const { propertiesToken } = usePropertiesToken();

  const [tokenFilterStates, setTokenFilterStates] = useAtom(
    statesFilterTokenAtom,
  );
  const { transactions } = useFilterTransactions(allTransactions);
  const sortedTransactions = sortTransactions(transactions);

  useEffect(() => {
    setTokenFilterStates(
      new Map(
        propertiesToken.map((token) => [
          token.contractAddress.toLowerCase(),
          true,
        ]),
      ),
    );
  }, [propertiesToken, setTokenFilterStates]);

  useEffect(() => {
    if (!offersIsLoading) return refreshTransactions();
  }, [offersIsLoading, refreshTransactions]);

  const handleTokenFilter = (contractAddress: string) => {
    let allSelected = true;
    let noneSelected = true;
    for (const [token, state] of tokenFilterStates) {
      //console.log('Token filter search', `Token: ${token}, State: ${state}`);
      allSelected = allSelected && state;
      if (contractAddress !== token) noneSelected = noneSelected && !state;
    }

    if (allSelected) {
      // laisser le filtre activé pour le token donné et et désactivé les autres filtres
      //console.log('Token filter allSelected');

      for (const [token] of tokenFilterStates) {
        if (token !== contractAddress) {
          setTokenFilterStates((prev) => {
            const newFilterStates = new Map(prev);
            newFilterStates.set(token, false);
            return newFilterStates;
          });
        }
      }
    } else if (noneSelected) {
      // laisser le filtre activé pour le token donné et et activé les autres filtres
      // console.log('Token filter noneSelected');

      for (const [token] of tokenFilterStates) {
        if (token !== contractAddress) {
          setTokenFilterStates((prev) => {
            const newFilterStates = new Map(prev);
            newFilterStates.set(token, true);
            return newFilterStates;
          });
        }
      }
    } else {
      // changer l'etat du filtre donnée
      setTokenFilterStates((prev) => {
        const newFilterStates = new Map(prev);
        newFilterStates.set(contractAddress, !prev.get(contractAddress));
        return newFilterStates;
      });
    }
  };

  return <TransactionList transactions={sortedTransactions}></TransactionList>;
};
