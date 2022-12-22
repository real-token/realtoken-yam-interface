import { useCallback, useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';

import { ContractsID, ZERO_ADDRESS } from 'src/constants';
import { asyncRetry, getContract } from 'src/utils';
import { Offer, UseOffers } from './types';
import { useContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { Erc20, Erc20ABI } from 'src/abis';
import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { isRefreshedAutoAtom } from 'src/states';
import { usePropertiesToken } from './usePropertiesToken';

// filterSeller = 0 when fetching all offers, = 1 when fetching offers of the connected wallet
export const useOffers: UseOffers = (filterSeller, filterBuyer, filterZeroAmount) => {
  const { t } = useTranslation('common', { keyPrefix: 'general' });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [initialized,setInitialized] = useState<boolean>(false);
  
  const LOADING_OFFER = {
    offerId: t('loading'),
    offerTokenAddress: t('loading'),
    offerTokenName: t('loading'),
    offerTokenDecimals: t('loading'),
    buyerTokenAddress: t('loading'),
    buyerTokenName: t('loading'),
    buyerTokenDecimals: t('loading'),
    sellerAddress: t('loading'),
    buyerAddress: t('loading'),
    price: t('loading'),
    amount: t('loading'),
  hasPropertyToken: false
  };
  const LOADING_OFFERS = [LOADING_OFFER,LOADING_OFFER,LOADING_OFFER]

  const [offers, setOffers] = useState<Offer[]>(LOADING_OFFERS);
  const { propertiesToken } = usePropertiesToken();

  const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);
  const { account, provider, chainId } = useWeb3React();

  const fetchOffers = useCallback(async (): Promise<Offer[]> => {
    return new Promise<Offer[]>(async (resolve, reject) => {
      if(realTokenYamUpgradeable){
        try{
          const offersData: Offer[] = [];

          const getEvents = () =>
            realTokenYamUpgradeable.queryFilter(
            realTokenYamUpgradeable.filters.OfferDeleted(),
            realTokenYamUpgradeable.metadata.fromBlock
          );

          const events = await asyncRetry(getEvents);
          const offersDeleted = events.map(event => event.args.offerId.toNumber());
          const offerCount = (
            await asyncRetry(() => realTokenYamUpgradeable.getOfferCount())
          ).toNumber();

            const offerCountArray = Array.from(Array(offerCount).keys());
            const offersToFetch = offerCountArray.filter(x => !offersDeleted.includes(x));

          for (const i of offersToFetch) {
            const getOffer = () => realTokenYamUpgradeable.showOffer(i);

            const [
              offerTokenAddress,
              buyerTokenAddress,
              sellerAddress,
              buyerAddress,
              price,
              amount,
            ] = await getOffer();

            const offerToken = getContract<Erc20>(offerTokenAddress, Erc20ABI, <Web3Provider>provider, account);
            const buyerToken = getContract<Erc20>(buyerTokenAddress, Erc20ABI, <Web3Provider>provider, account);
            const offerTokenName = <string>(await offerToken?.name());
            const buyerTokenName = <string>(await buyerToken?.name());
            const offerTokenDecimals = <number>await offerToken?.decimals();
            const buyerTokenDecimals = <number>await buyerToken?.decimals();

            const hasPropertyToken = propertiesToken.find(propertyToken => (propertyToken.contractAddress == buyerTokenAddress || propertyToken.contractAddress == offerTokenAddress));

            const bnAmount = new BigNumber(amount.toString());
            const offerData: Offer = {
              offerId: i.toString(),
              offerTokenAddress: offerTokenAddress,
              offerTokenName: <string>offerTokenName,
              offerTokenDecimals: offerTokenDecimals.toString(),
              buyerTokenAddress: buyerTokenAddress,
              buyerTokenName: <string>buyerTokenName,
              buyerTokenDecimals: buyerTokenDecimals.toString(),
              sellerAddress: sellerAddress,
              buyerAddress: buyerAddress,
              price: (new BigNumber(price.toString())).shiftedBy(- buyerTokenDecimals).toFixed(10).toString(),
              amount: (bnAmount.shiftedBy(- offerTokenDecimals)).toFixed(10).toString(),
              hasPropertyToken: hasPropertyToken ? true : false
            };

            const condFiltreZeroAmount = filterZeroAmount ? !bnAmount.isZero() : true;

            if(condFiltreZeroAmount){
              if (filterSeller) {
                //console.log("is seller", account, sellerAddress,buyerAddress)
                if (offerData.sellerAddress === account) {
                  offersData.push(offerData);
                }
              } else if (filterBuyer) {
                // Filter offer by buyer
                //console.log("is buyer", account, buyerAddress,sellerAddress);
                if (offerData.buyerAddress === account) {
                  offersData.push(offerData);
                }
              } else {
                // No filter, show public offers
                // console.log("is public", account, sellerAddress, buyerAddress);
                if (offerData.buyerAddress === ZERO_ADDRESS) {
                  offersData.push(offerData);
                }
              }
            }
          }
        
          resolve(offersData);

        }catch(err){
          console.log("Error getting when fetching offers: ", err);
          reject(err);
        }
      }
    })
  },[account, filterBuyer, filterSeller, filterZeroAmount, propertiesToken, provider, realTokenYamUpgradeable])

  const fetch = async () => {
    setOffers(LOADING_OFFERS);
    setIsRefreshing(true);
    const offers = await fetchOffers();

    console.log(offers)

    setOffers(offers);
    setInitialized(true);
    setIsRefreshing(false);
  }

  const interval = useInterval(() => fetch(), 60000);
  const isAutoRefreshEnabled = useAtomValue(isRefreshedAutoAtom);

  // LOAD OFFERS ON INIT

  useEffect(() => {
    if(!isAutoRefreshEnabled || !realTokenYamUpgradeable || !initialized) return;
    setIsRefreshing(isAutoRefreshEnabled);
    isAutoRefreshEnabled ? interval.start() : interval.stop();
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realTokenYamUpgradeable,isAutoRefreshEnabled,initialized]);

  useEffect(() => {
    if (realTokenYamUpgradeable) fetch()
  },[realTokenYamUpgradeable, chainId])

  return {
    offers: offers,
    refreshState: [isRefreshing, fetch],
  };
};
