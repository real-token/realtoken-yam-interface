import { useEffect, useState } from 'react';

import { useInterval } from '@mantine/hooks';

import { ContractsID } from 'src/constants';
import { asyncRetry, getContract } from 'src/utils';

import { Offer, UseOffers } from './types';
import { useAsync } from './useAsync';
import { useContract } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { useActiveChain } from './useActiveChain';
import { Erc20, erc20ABI } from 'src/abis';
import { Web3Provider } from '@ethersproject/providers';

export const useOffers: UseOffers = () => {
  const [isRefreshing, triggerRefresh] = useState<boolean>(true);
  const [offers, setOffers] = useState<Offer[]>([
    {
      offerId: 'loading...',
      offerTokenAddress: 'loading...',
      offerTokenName: 'loading...',
      buyerTokenAddress: 'loading...',
      buyerTokenName: 'loading...',
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
  const activeChain = useActiveChain();


  const offersData: Offer[] = [];

  useAsync(
    async (isActive) => {
      if (!swapCatUpgradeable || !isRefreshing) return undefined;

      // const getEvents = () =>
      //   swapCatUpgradeable.queryFilter(
      //     swapCatUpgradeable.filters.OfferCreated(),
      //     swapCatUpgradeable.metadata.fromBlock
      //   );
      // const events = await asyncRetry(getEvents);

      const offerCount = (
        await asyncRetry(() => swapCatUpgradeable.getOfferCount())
      ).toNumber();

      for (let i = 0; i < offerCount + 1; i++) {
        const getOffer = () => swapCatUpgradeable.showOffer(i);

        const [
          offerTokenAddress,
          buyerTokenAddress,
          sellerAddress,
          price,
          amount,
        ] = await getOffer();

				const offerTokenContract = getContract<Erc20>(offerTokenAddress, erc20ABI, <Web3Provider>provider, account);
				const buyerTokenContract = getContract<Erc20>(buyerTokenAddress, erc20ABI, <Web3Provider>provider, account);
				const offerTokenName = <string>(await offerTokenContract?.name());
				const buyerTokenName = <string>(await buyerTokenContract?.name());

				// const offerTokenDecimals = <number>await offerTokenContract?.decimals();
				// const buyerTokenDecimals = <number>await buyerTokenContract?.decimals();

        const offerData: Offer = {
          offerId: i.toString(),
          offerTokenAddress: offerTokenAddress,
          offerTokenName: <string>offerTokenName,
          buyerTokenAddress: buyerTokenAddress,
          buyerTokenName: <string>buyerTokenName,
          sellerAddress: sellerAddress,
					price: price.toString(),
					amount: amount.toString(),
          // price: (Number(price)/ 10 ** (buyerTokenDecimals)).toString(),
          // amount: (Number(amount)/ 10 ** (offerTokenDecimals)).toString(),
        };

        offersData.push(offerData);
      }

      console.log('Offers Data: ', offersData);


      if (isActive()) {
        console.log('component is active');
        setOffers(offersData.filter(Boolean));
        triggerRefresh(false);
      }

      return offersData;
    },
    [isRefreshing, swapCatUpgradeable, offersData, offers]
  );
  console.log('Offer returned: ', offers);

  return {
    offers: offers,
    refreshState: [isRefreshing, triggerRefresh],
  };
};
