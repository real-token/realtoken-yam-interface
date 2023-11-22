import { useEffect } from 'react';

import { useWeb3React } from '@web3-react/core';

import {
  fetchAddressWlProperties,
  fetchPrices,
  fetchProperties,
} from 'src/store/features/interface/interfaceSlice';
import { addressChangedDispatchType } from 'src/store/features/settings/settingsSlice';

import { useAutoRefresh } from './offers/useAutoRefresh';
import { useRefreshOffers } from './offers/useRefreshOffers';
import { useAppDispatch } from './react-hooks';
import { useRefreshTransactions } from './transactions/useRefreshTransactions';

export default function useInitStore() {
  const dispatch = useAppDispatch();
  const { account, chainId, provider } = useWeb3React();

  // INIT REDUX STORE HERE
  useRefreshOffers(true);
  useAutoRefresh();
  useRefreshTransactions(true);

  useEffect(() => {
    if (account)
      dispatch({ type: addressChangedDispatchType, payload: account });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (chainId && account && provider) {
      dispatch(fetchProperties(chainId));
      dispatch(fetchAddressWlProperties(account, chainId));
      dispatch(fetchPrices(chainId, provider));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account, provider]);
}
