import { useEffect, useState } from 'react';

import { useInterval } from '@mantine/hooks';

import { ContractsID, ZERO_ADDRESS } from 'src/constants';
import { asyncRetry, getContract } from 'src/utils';

import { Offer, UseOffers } from './types';
import { useAsync } from './useAsync';
import { useContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { Erc20, Erc20ABI } from 'src/abis';
import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { isRefreshedAutoAtom } from 'src/states';

// filterSeller = 0 when fetching all offers, = 1 when fetching offers of the connected wallet
export const useOffers: UseOffers = (filterSeller, filterBuyer, filterZeroAmount) => {
  const { t } = useTranslation('common', { keyPrefix: 'general' });
  const [isRefreshing, triggerRefresh] = useState<boolean>(true);
  const [initialized,setInitialized] = useState<boolean>(false);
  
  const [offers, setOffers] = useState<Offer[]>([
    {
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
    },
  ]);

  const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

  const interval = useInterval(() => triggerRefresh(true), 60000);

  const isAutoRefreshEnabled = useAtomValue(isRefreshedAutoAtom);

  useEffect(() => {
    // interval.start();
    // return interval.stop;
	triggerRefresh(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

	if(!isAutoRefreshEnabled || !realTokenYamUpgradeable || !initialized) return;

	triggerRefresh(isAutoRefreshEnabled);
	isAutoRefreshEnabled ? interval.start() : interval.stop();
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realTokenYamUpgradeable,isAutoRefreshEnabled,initialized]);

  const { account, provider } = useWeb3React();

  const offersData: Offer[] = [];

  useEffect(() => { if(offersData) setInitialized(true); },[offersData])

  useAsync(
    async (isActive) => {
      	if (!realTokenYamUpgradeable || !isRefreshing) return undefined;

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
			// console.log("offerCount", offerCount)
			const offerCountArray = Array.from(Array(offerCount).keys());
			const offersToFetch = offerCountArray.filter(x => !offersDeleted.includes(x));

      	for (const i of offersToFetch) {
        	const getOffer = () => realTokenYamUpgradeable.showOffer(i);

				try {
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
				} catch (e) {
					console.log("Error getting when fetching offers: ", e);
				}
      	}

		if (isActive()) {
			setOffers(offersData.filter(Boolean));
			triggerRefresh(false);
		}

      	return offersData;
    },
    [realTokenYamUpgradeable, isRefreshing, offersData, provider, account, filterSeller, filterBuyer]
  );

  return {
    offers: offers,
    refreshState: [isRefreshing, triggerRefresh],
  };
};
