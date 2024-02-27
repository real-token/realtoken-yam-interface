import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { SimpleGrid, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useAtom } from 'jotai';

import { useAppSelector } from 'src/hooks/react-hooks';
import { useRefreshTransactions } from 'src/hooks/transactions/useRefreshTransactions';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { statesFilterTokenAtom } from 'src/states';
import { selectPublicTransactions } from 'src/store/features/interface/interfaceSelector';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';

import { sortTransactions } from './Utils';
import { TokenStatsCard } from './components/TokenStatsCard';

export const TransactionStatsGrid = ({}) => {
  //console.log('YamTransactionList rendered');
  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const { refreshTransactions } = useRefreshTransactions(false);
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const allTransactions = useAppSelector(selectPublicTransactions);
  const { propertiesToken } = usePropertiesToken();
  const sortedTransactions = sortTransactions(allTransactions);
  const [tokenFilterStates, setTokenFilterStates] = useAtom(
    statesFilterTokenAtom,
  );

  // useState<
  //   Map<string, boolean>
  // >(
  //   new Map(
  //     propertiesToken.map((token) => [
  //       token.contractAddress.toLowerCase(),
  //       true,
  //     ])
  //   )
  // );

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

  return (
    <>
      {
        <SimpleGrid
          cols={isSmall ? 3 : propertiesToken.length}
          spacing={isMobile ? 'xs' : 'xl'}
        >
          {propertiesToken.map((token) => (
            <TokenStatsCard
              token={token}
              transactions={sortedTransactions.filter(
                (t) =>
                  t.tokenForSale?.address.toLowerCase() ===
                    token.contractAddress.toLowerCase() ||
                  t.tokenBuyWith?.address.toLowerCase() ===
                    token.contractAddress.toLowerCase(),
              )}
              handleTokenFilter={handleTokenFilter}
              tokenFilterStates={tokenFilterStates}
              key={token.contractAddress}
            ></TokenStatsCard>
          ))}
        </SimpleGrid>
      }
    </>
  );
};
