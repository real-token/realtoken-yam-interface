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
    availableAmount: '0',
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
              offerTokenAddress: offerTokenAddress.toLowerCase(),
              offerTokenName: <string>offerTokenName,
              offerTokenDecimals: offerTokenDecimals.toString(),
              buyerTokenAddress: buyerTokenAddress.toLowerCase(),
              buyerTokenName: <string>buyerTokenName,
              buyerTokenDecimals: buyerTokenDecimals.toString(),
              sellerAddress: sellerAddress.toLowerCase(),
              buyerAddress: buyerAddress.toLowerCase(),
              price: (new BigNumber(price.toString())).shiftedBy(- buyerTokenDecimals).toFixed(10).toString(),
              amount: (bnAmount.shiftedBy(- offerTokenDecimals)).toFixed(10).toString(),
              availableAmount:(bnAmount.shiftedBy(- offerTokenDecimals)).toFixed(10).toString(),
              hasPropertyToken: hasPropertyToken ? true : false,
              removed: false,
            };

            const condFiltreZeroAmount = filterZeroAmount ? !bnAmount.isZero() : true;
// console.log('offerData.offerId', offerData.offerId);
            
// if(offerData.offerId == "9"){
// console.log('Debug Offer Data', offerData.amount);

// }
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
        let uriYAM = undefined
        let uriWallet = undefined
        switch (chainId) {
          case 1:
            uriYAM = "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph";
            uriWallet = "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-eth";
            break;
          case 5:
            uriYAM = "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-goerli";
            uriWallet = "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-xdai";//TODO ajouter le bon URL quant le Graph Goerli sera dispo
            break;
          case 100:
            uriYAM = "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-gnosis";
            uriWallet = "https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-xdai";
            break;
          default:

            break;
        }

        const clientYAM = new ApolloClient({
          uri: uriYAM,
          cache: new InMemoryCache(),
        });

        const clientWallet = new ApolloClient({
          uri: uriWallet,
          cache: new InMemoryCache(),
        });

        const dataYAM = await clientYAM.query({query: gql`
        query getOffers{
          offers(first: 1000){
            id
            removedAtBlock
            availableAmount
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

        const promisesYAM = dataYAM.data.offers?.map(async (offer: OfferGraphQl) => {
          //TODO optmisier pour ne pas caller toutes les offre si affiche mes offre ou les offres privé
          //TODO en l'état ça fais beaucoup de call sur le graph des tokens, il faudrais optimiser en fesant la reques plus haut avec un array de user
              
          let dataWallet = { data: { account: { balances: [{ amount: '0' }] } } };
          //Récupère la blance pour le token du vendeur 
          let condSeller = true;
          if(filterSeller){
            condSeller = account === offer.seller.address.toLowerCase();
          }
          //console.log('DEBUG condSeller', new BigNumber( offer.id).toString(), condSeller,account === offer.seller.address.toLowerCase())

          if(
            condSeller && 
            /^realtoken/.test(offer.offerToken.name!.toLowerCase()) &&
            offer.availableAmount.toString() != '0' &&
            offer.removedAtBlock === null
          ){
            // console.log('DEBUG fetch balance', new BigNumber( offer.id).toString(),
            // account, offer.seller.address.toLowerCase(), 
            // condSeller,
            // offer
            // );
            
            try {
              dataWallet = await clientWallet.query({query: gql`
              query account{
                account(id: "${offer.seller.address}") {
                  balances(
                    where: {token_: {address: "${offer.offerToken.address}"}}
                  ) {
                    amount
                  }
                }
              }
            `})
            } catch (e) {
              console.log(e);
            }
            
          //  if(parseFloat(offer.availableAmount.toString()) > 0){
          //    console.log('DEBUG dataWallet', dataWallet.data.account?.balances[0]?.amount ?? '0',offer.availableAmount.toString(), new BigNumber( offer.id).toString(), offer);}

          }
          
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
            amount: '0',
            availableAmount: offer.availableAmount.toString(),
            balanceWallet: dataWallet.data.account?.balances[0]?.amount ?? '0',
            hasPropertyToken: propertiesToken.find(propertyToken => (
              propertyToken.contractAddress == offer.buyerToken.address || 
              propertyToken.contractAddress == offer.offerToken.address)) ? true : false,
            removed: offer.removedAtBlock === null ? false : true
          };

          const nAvailableAmount = parseFloat(offerData.availableAmount);
          const nBalanceWallet = parseFloat(offerData.balanceWallet!);
          const bnAmount = nAvailableAmount <= nBalanceWallet ?  nAvailableAmount.toString() : nBalanceWallet.toString() ;//TODO ajouter le teste de l'allowance

          offerData.amount = bnAmount;

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
        await Promise.all(promisesYAM)
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
    if(chainId == 1 || (chainId == 5 && process.env.NEXT_PUBLIC_ENV == 'dev') || chainId == 100){
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