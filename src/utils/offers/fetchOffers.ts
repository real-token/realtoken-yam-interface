import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';

import BigNumber from 'bignumber.js';

import { CHAINS, ChainsID } from 'src/constants';
import { PropertiesToken } from 'src/types';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { Offer } from 'src/types/offer/Offer';
import { Price } from 'src/types/price';

import { Offer as OfferGraphQl } from '../../../.graphclient/index';
import { getTheGraphUrlRealtoken, getTheGraphUrlYAM } from './getClientURL';
import { getOfferQuery } from './getOfferQuery';
import { parseOffer } from './parseOffer';

const nbrFirst = 300;

export const getBigDataGraphRealtoken = async (
  chainId: number,
  client: ApolloClient<NormalizedCacheObject>,
  realtokenAccount: string[]
) => {
  const { address: realTokenYamUpgradeable } =
    CHAINS[chainId as ChainsID].contracts.realTokenYamUpgradeable;

  // console.log('getBigDataGraphRealtoken', realtokenAccount.length);

  const accountRealtoken: string =
    '"' + realtokenAccount.map((account: string) => account).join('","') + '"';
  //console.log('DEBUG accountRealtoken', accountRealtoken);

  const { data } = await client.query({
    query: gql`
      query getAccountsRealtoken {
        accountBalances(
          first: ${nbrFirst} 
          where: {amount_gt: "0",id_in: [${accountRealtoken}]}
        ) {
          id
          amount
          allowances(
            where: {spender: "${realTokenYamUpgradeable}"}
          ) {
            allowance
            id
          }
        }
      }
    `,
  });
  //console.log('DEBUG getBigDataGraphRealtoken data', data);

  return data.accountBalances.map((accountBalance: DataRealtokenType) => {
    const allowance: { id: string; allowance: string } | undefined =
      accountBalance.allowances?.find(
        (allowance: { id: string; allowance: string }) =>
          accountBalance.id + '-' + realTokenYamUpgradeable === allowance.id
      );
    /*  console.log(
      'DEBUG data.accountBalances.map allowance',
      allowance,
      data.allowances,
      accountBalance.id + '-' + realTokenYamUpgradeable
    ); */

    return {
      id: accountBalance.id,
      amount: accountBalance.amount,
      allowance: allowance?.allowance ?? '0',
    };
  });
};

export const fetchOffersTheGraph = (
  provider: Web3Provider,
  account: string,
  chainId: number,
  propertiesToken: PropertiesToken[],
  prices: Price
): Promise<Offer[]> => {
  return new Promise<Offer[]>(async (resolve, reject) => {
    try {
      const offersData: Offer[] = [];
      // const { data } = await execute(getOffersDocument, {}, {
      //   source: source
      // });
      const clientYAM = new ApolloClient({
        uri: getTheGraphUrlYAM(chainId),
        cache: new InMemoryCache(),
      });

      const clientRealtoken = new ApolloClient({
        uri: getTheGraphUrlRealtoken(chainId),
        cache: new InMemoryCache(),
      });

      //Récupère la liste des users qui ont créer une offre et les token associer a ses offres
      // const { data: usersDataYAM } = await clientYAM.query({
      //   query: gql`
      //     query getUersData {
      //       accounts(
      //         first: ${nbrFirst}
      //         where: { offers_: { removedAtBlock: null } }
      //       ) {
      //         address
      //         offers(first: ${nbrFirst}) {
      //           id
      //           offerToken {
      //             address
      //           }
      //         }
      //       }
      //     }
      //   `,
      // });

      const activeOfferResult = await clientYAM.query({
        query: gql`
          query qetActiveOfferCount {
            global(id: "1") {
              activeOffersCount
            }
          }
        `,
      });

      const offersToFetch = activeOfferResult.data.global.activeOffersCount;
      const prom = [];
      const q = Math.floor(offersToFetch / nbrFirst)
      const r = offersToFetch % nbrFirst

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const formatRequest = (first: number, skip: number) => {
        const query =  `{\n    offers (first: ${first}, skip: ${skip}, where: { removedAtBlock: null}) {${getOfferQuery()}}}`;

        const graphql = JSON.stringify({
          query: query,
          variables: {}
        })
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: graphql,
          redirect: 'follow'
        };
        return requestOptions;
      }

      
      const formatQuery = (first: number, skip: number) => (
        fetch(getTheGraphUrlYAM(chainId), formatRequest(first, skip) as any)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .catch(error => console.log('error', error))
      )
      //console.log('Debug Query usersDataYAM', usersDataYAM);

      //TODO: tmp supprimer la partie false quant déploiement ok sur Eth et Gnosis, remettre en const a la place de let try = new graph, catch = old graph

      // Pagination
      let skip = 0;
      for (let i = 0; i < q; i++) {
        prom.push(
          formatQuery(nbrFirst, skip),
        )
        skip += nbrFirst
      } 

      prom.push(formatQuery(r, skip))

      const offersFromYam = await Promise.all(prom);
      console.log(offersFromYam)

      const offers: OfferGraphQl[] = offersFromYam.map(val => val.data).reduce((prev, current) => {
        if(!current) return prev;
        return [...prev, ...current.offers] 
      }, []) as OfferGraphQl[];

      const accountRealtokenDuplicates: string[] = offers.map(val => (val.seller.address + '-' + val.offerToken.address));
      const accountBalanceId = [...new Set(accountRealtokenDuplicates)]; // remove duplicates
      //console.log('Debug liste accountBalanceId', accountBalanceId);

      // const dataRealtoken: [DataRealtokenType] = [
      //   {
      //     amount: '0',
      //     id: '0',
      //   },
      // ];
      const bigDataRealTokenPromises = [];
      for (let i = 0; i < accountBalanceId.length; i += nbrFirst) {
        const batch: string[] = accountBalanceId.slice(i, i + nbrFirst);
        /* dataRealtoken.push(
          await getBigDataGraphRealtoken(chainId, clientRealtoken, batch)
        ); */
        if (batch.length <= 0) break;

        bigDataRealTokenPromises.push(getBigDataGraphRealtoken(chainId, clientRealtoken, batch));

        //console.log('DEBUG for realtokenData', i, batchSize, realtokenData);
      }

      const dataRealtoken = (await Promise.all(bigDataRealTokenPromises)).flat() as DataRealtokenType[]

      //console.log('Debug Query dataRealtoken', dataRealtoken);

      const promises = offers.map(
        (offer: OfferGraphQl) =>
          new Promise<Offer>(async (resolve, reject) => {
            try {
              const accountUserRealtoken: DataRealtokenType =
                dataRealtoken.find(
                  (accountBalance: DataRealtokenType): boolean =>
                    accountBalance.id ===
                    offer.seller.address + '-' + offer.offerToken.address
                )!;

              const offerData: Offer = await parseOffer(
                provider,
                account,
                offer,
                accountUserRealtoken,
                propertiesToken,
                prices
              );

              offerData.hasPropertyToken =
                BigNumber(offerData.buyerTokenType).eq(1) ||
                BigNumber(offerData.offerTokenType).eq(1);

              resolve(offerData);
            } catch (err) {
              console.log('Error when parsingOffer: ', err);
              reject(err);
            }
          })
      );

      const parsedOffers = await Promise.all(promises);

      offersData.push(...parsedOffers);
      // console.log('Offers formated', offersData.length);

      resolve(offersData);
    } catch (err) {
      console.log('Error while fetching offers from TheGraph', err);
    }
  });
};
