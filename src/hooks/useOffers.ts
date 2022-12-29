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
import { Offer as OfferGraphQl } from "../../.graphclient/index";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// filterSeller = 0 when fetching all offers, = 1 when fetching offers of the connected wallet
export const useOffers: UseOffers = (filterSeller, filterBuyer, filterZeroAmount, filterRemoved) => {

  const { t } = useTranslation('common', { keyPrefix: 'general' });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [initialized,setInitialized] = useState<boolean>(false);

  const [offers, setOffers] = useState<Offer[]>([{
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
    hasPropertyToken: false,
    removed: false,
  }]);
  const { propertiesToken } = usePropertiesToken();

  const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);
  const { account: acc, provider, chainId } = useWeb3React();

  const account = (acc as string)?.toLowerCase();

  const fetchOffers = useCallback(async (): Promise<Offer[]> => {
    return new Promise<Offer[]>(async (resolve, reject) => {
      setOffers([]);
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
              hasPropertyToken: hasPropertyToken ? true : false,
              removed: false,
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

  const fetchOfferTheGraph = useCallback(async (): Promise<Offer[]> => {
    return new Promise<Offer[]>(async (resolve, reject) => {
      try{

        const offersData: Offer[] = [];
        // const { data } = await execute(getOffersDocument, {}, {
        //   source: source
        // });
        const client = new ApolloClient({
          uri: chainId == 100 ? "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-gnosis" : "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph",
          cache: new InMemoryCache(),
        });

        const { data } = await client.query({query: gql`
        query getOffers{
          offers(first: 1000){
            id
            removedAtBlock
            offerToken {
              address
              name
              decimals
              symbol
            }
            prices {
              amount
              price
            }
            price{
              amount
              price
            }
            seller {
              id
              address
            }
            buyerToken {
              name
              symbol
              address
              decimals
            }
            buyer {
              address
            }
          }
        }
        `})

        await data.offers?.forEach((offer: OfferGraphQl) => {
          
          const offerData: Offer = {
            offerId: parseInt(offer.id, 16).toString(),
            offerTokenAddress: offer.offerToken.address,
            offerTokenName: offer.offerToken.name ?? "",
            offerTokenDecimals: offer.offerToken.decimals?.toString() ?? "",
            buyerTokenAddress: offer.buyerToken.address,
            buyerTokenName: offer.buyerToken.name ?? "",
            buyerTokenDecimals: offer.buyerToken.decimals?.toString() ?? "",
            sellerAddress: offer.seller.address,
            buyerAddress: offer.buyer?.address,
            price: offer.price.price.toString(),
            amount: offer.price.amount.toString(),
            hasPropertyToken: false,
            removed: offer.removedAtBlock === null ? false : true
          };

          const bnAmount = offerData.amount;

          const condFiltreZeroAmount = filterZeroAmount ? parseFloat(bnAmount) !== 0 : true;
          const toBeRemoved = filterRemoved && offerData.removed ? true : false;

          if(condFiltreZeroAmount && !toBeRemoved){
              if (filterSeller) {
                // console.log("is seller")
                if (offerData.sellerAddress === account) {
                  offersData.push(offerData);
                }
              } else if (filterBuyer) {
                // Filter offer by buyer
                // console.log("is buyer");
                if (offerData.buyerAddress === account) {
                  offersData.push(offerData);
                }
              } else {
                // No filter, show public offers
                // console.log("is public");
                if (!offerData.buyerAddress) {
                  offersData.push(offerData);
                }
              }
          }
          
        });

        resolve(offersData);

      }catch(err){
        console.log(err)
        reject(err)
      }
    });
  },[account, filterBuyer, filterSeller, filterZeroAmount, filterRemoved, chainId])

  const fetch = useCallback(async () => {
    setOffers([{
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
      hasPropertyToken: false,
      removed: false
    }]);
    setIsRefreshing(true);

    let offers; 
    if(chainId == 1 || chainId == 100){
      offers = await fetchOfferTheGraph();
    }else{
      offers = await fetchOffers();
    }

    if(offers) setOffers(offers);
    setInitialized(true);
    setIsRefreshing(false);
  },[t, chainId, fetchOfferTheGraph, fetchOffers])

  const interval = useInterval(() => fetch(), 60000);
  const isAutoRefreshEnabled = useAtomValue(isRefreshedAutoAtom);

  // LOAD OFFERS ON INIT
  useEffect(() => {
    if (realTokenYamUpgradeable && chainId && account) fetch()
  },[realTokenYamUpgradeable, chainId, fetch, account])

  useEffect(() => {
    if(!isAutoRefreshEnabled || !realTokenYamUpgradeable || !initialized) return;
    setIsRefreshing(isAutoRefreshEnabled);
    isAutoRefreshEnabled ? interval.start() : interval.stop();
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realTokenYamUpgradeable,isAutoRefreshEnabled,initialized]);

  return {
    offers: offers,
    refreshState: [isRefreshing, fetch],
  };
};