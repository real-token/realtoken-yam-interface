import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useWeb3React } from '@web3-react/core';

import { ContractsID } from 'src/constants';
import {
  selectOffersIsLoading,
  selectPricesIsLoading,
} from 'src/store/features/interface/interfaceSelector';
import { fetchOffers } from 'src/store/features/interface/interfaceSlice';

import { useAppDispatch, useAppSelector } from '../react-hooks';
import { useContract } from '../useContract';
import { usePropertiesToken } from '../usePropertiesToken';

type UseRefreshOffers = (refreshOnMount: boolean) => {
  offersIsLoading: boolean;
  refreshOffers: () => void;
};
export const useRefreshOffers: UseRefreshOffers = (refreshOnMount) => {
  const { account, provider, chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const [initialized, setInitialized] = useState<boolean>(false);

  const { propertiesToken, propertiesIsloading } = usePropertiesToken();

  const pricesIsLoading = useAppSelector(selectPricesIsLoading);

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

  const refreshOffers = useCallback(() => {
    try {
      // console.log(!realTokenYamUpgradeable, !provider, !account, !chainId, !propertiesToken, propertiesToken.length == 0, propertiesIsloading)
      if (
        !provider ||
        !account ||
        !chainId ||
        !propertiesToken ||
        propertiesToken.length == 0 ||
        propertiesIsloading
      )
        return;
      dispatch(fetchOffers(provider, account, chainId, propertiesToken));
    } catch (err) {
      console.log(err);
    }
  }, [
    provider,
    account,
    chainId,
    propertiesToken,
    propertiesIsloading,
    dispatch,
  ]);

  useEffect(() => {
    if (
      realTokenYamUpgradeable &&
      provider &&
      account &&
      refreshOnMount &&
      !initialized &&
      !propertiesIsloading &&
      propertiesToken.length > 0 &&
      !pricesIsLoading
    ) {
      refreshOffers();
      setInitialized(true);
    }
  }, [
    realTokenYamUpgradeable,
    provider,
    account,
    refreshOnMount,
    initialized,
    propertiesIsloading,
    propertiesToken,
    refreshOffers,
    pricesIsLoading,
  ]);

  // eslint-disable-next-line object-shorthand
  return {
    offersIsLoading: offersIsLoading,
    refreshOffers: refreshOffers,
  };
};
