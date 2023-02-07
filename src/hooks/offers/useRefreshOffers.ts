import { ContractsID } from 'src/constants';
import { useContract } from '../useContract';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '../react-hooks';
import { fetchOffers } from 'src/store/features/interface/interfaceSlice';
import { useSelector } from 'react-redux';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';
import { useCallback, useEffect, useState } from 'react';
import { usePropertiesToken } from '../usePropertiesToken';

type UseRefreshOffers = (
    refreshOnMount: boolean
) => {
    offersIsLoading: boolean
    refreshOffers: () => void
}
export const useRefreshOffers: UseRefreshOffers = (refreshOnMount) => {
  
  const { account, provider, chainId } = useWeb3React();
  const dispatch = useAppDispatch();
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const [initialized,setInitialized] = useState<boolean>(false);
  
  const { propertiesToken, propertiesIsloading } = usePropertiesToken();

  const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

  const refreshOffers = useCallback(() => {
    try{
      // console.log(!realTokenYamUpgradeable, !provider, !account, !chainId, !propertiesToken, propertiesToken.length == 0, propertiesIsloading)
      if(!provider || !account || !chainId || !propertiesToken || propertiesToken.length == 0 || propertiesIsloading) return;
      dispatch(fetchOffers(provider, account, chainId, propertiesToken))
    }catch(err){
      console.log(err)
    }
  },[provider, account, chainId, propertiesToken, propertiesIsloading, dispatch])

useEffect(() => {
    if(realTokenYamUpgradeable && provider && account && refreshOnMount && !initialized && !propertiesIsloading && propertiesToken.length > 0){
        refreshOffers();
        setInitialized(true);
    }
},[realTokenYamUpgradeable, provider, account, refreshOnMount, initialized, propertiesIsloading, propertiesToken, refreshOffers])

  // eslint-disable-next-line object-shorthand
  return{
    offersIsLoading: offersIsLoading,
    refreshOffers: refreshOffers
  }

};