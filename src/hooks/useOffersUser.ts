import { useEffect, useState } from 'react';

import { useInterval } from '@mantine/hooks';

import { ContractsID } from 'src/constants';
import { asyncRetry, getContract } from 'src/utils';

import { Offer, UseOffers } from './types';
import { useAsync } from './useAsync';
import { useContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { useActiveChain } from './useActiveChain';
import { Erc20, Erc20ABI } from 'src/abis';
import { Web3Provider } from '@ethersproject/providers';
// import { BigNumber } from 'ethers';
import BigNumber from 'bignumber.js';

export const useOffersUser: UseOffers = () => {
  const [isRefreshing, triggerRefresh] = useState<boolean>(true);
  const [offers, setOffers] = useState<Offer[]>([
    {
      offerId: 'loading...',
      offerTokenAddress: 'loading...',
      offerTokenName: 'loading...',
			offerTokenDecimals: 'loading...',
      buyerTokenAddress: 'loading...',
      buyerTokenName: 'loading...',
			buyerTokenDecimals: 'loading...',
      sellerAddress: 'loading...',
      price: 'loading...',
      amount: 'loading...',
    },
  ]);

  const swapCatUpgradeable = useContract(ContractsID.swapCatUpgradeable);

  const interval = useInterval(() => triggerRefresh(true), 60000);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    triggerRefresh(true);
  }, [swapCatUpgradeable]);

  const { account, provider } = useWeb3React();

  const offersData: Offer[] = [];

  useAsync(
    async (isActive) => {
      if (!swapCatUpgradeable || !isRefreshing) return undefined;

			const getEvents = () =>
			swapCatUpgradeable.queryFilter(
				swapCatUpgradeable.filters.OfferDeleted(),
				swapCatUpgradeable.metadata.fromBlock
			);

			const events = await asyncRetry(getEvents);
			const offersDeleted = events.map(event => event.args.offerId.toNumber());
      const offerCount = (
        await asyncRetry(() => swapCatUpgradeable.getOfferCount())
      ).toNumber();
			const offerCountArray = Array.from(Array(offerCount).keys());
			const offersToFetch = offerCountArray.filter(x => !offersDeleted.includes(x));

      for (const i of offersToFetch) {
        const getOffer = () => swapCatUpgradeable.showOffer(i);

				try {
					const [
						offerTokenAddress,
						buyerTokenAddress,
						sellerAddress,
						price,
						amount,
					] = await getOffer();
	
					const offerTokenContract = getContract<Erc20>(offerTokenAddress, Erc20ABI, <Web3Provider>provider, account);
					const buyerTokenContract = getContract<Erc20>(buyerTokenAddress, Erc20ABI, <Web3Provider>provider, account);
					const offerTokenName = <string>(await offerTokenContract?.name());
					const buyerTokenName = <string>(await buyerTokenContract?.name());
					const offerTokenDecimals = <number>await offerTokenContract?.decimals();
					const buyerTokenDecimals = <number>await buyerTokenContract?.decimals();
	
					const offerData: Offer = {
						offerId: i.toString(),
						offerTokenAddress: offerTokenAddress,
						offerTokenName: <string>offerTokenName,
						offerTokenDecimals: offerTokenDecimals.toString(),
						buyerTokenAddress: buyerTokenAddress,
						buyerTokenName: <string>buyerTokenName,
						buyerTokenDecimals: buyerTokenDecimals.toString(),
						sellerAddress: sellerAddress,
						price: (new BigNumber(price.toString())).shiftedBy(- buyerTokenDecimals).toString(),
						amount: (new BigNumber(amount.toString()).shiftedBy(- offerTokenDecimals)).toString(),
					};
	
					if (offerData.sellerAddress === account) {
						offersData.push(offerData);
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
    [swapCatUpgradeable, isRefreshing, offersData, provider, account]
  );

  return {
    offers: offers,
    refreshState: [isRefreshing, triggerRefresh],
  };
};
