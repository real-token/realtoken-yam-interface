import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useWeb3React } from '@web3-react/core';

import { ContractsID } from 'src/constants';
import {
  selectOffersIsLoading,
  selectTransactionsIsLoading,
} from 'src/store/features/interface/interfaceSelector';
import { fetchTransactions } from 'src/store/features/interface/interfaceSlice';

import { useAppDispatch, useAppSelector } from '../react-hooks';
import { useContract } from '../useContract';
import { usePropertiesToken } from '../usePropertiesToken';

type UseRefreshTransactions = (refreshOnMount: boolean) => {
  transactionsIsLoading: boolean;
  refreshTransactions: () => void;
};
export const useRefreshTransactions: UseRefreshTransactions = (
  refreshOnMount,
) => {
  const { chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const transactionsIsLoading = useSelector(selectTransactionsIsLoading);
  const [initialized, setInitialized] = useState<boolean>(false);

  //const { propertiesToken, propertiesIsloading } = usePropertiesToken();

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable,
  );

  const refreshTransactions = useCallback(() => {
    try {
      // console.log(!realTokenYamUpgradeable, !provider, !account, !chainId, !propertiesToken, propertiesToken.length == 0, propertiesIsloading)
      if (!chainId) return;
      dispatch(fetchTransactions(chainId));
    } catch (err) {
      console.log(err);
    }
  }, [chainId, dispatch]);

  useEffect(() => {
    if (
      realTokenYamUpgradeable &&
      refreshOnMount &&
      !initialized &&
      !offersIsLoading
    ) {
      refreshTransactions();
      setInitialized(true);
    }
  }, [
    realTokenYamUpgradeable,
    refreshOnMount,
    initialized,

    refreshTransactions,
    offersIsLoading,
  ]);

  // eslint-disable-next-line object-shorthand
  return {
    transactionsIsLoading,
    refreshTransactions,
  };
};
