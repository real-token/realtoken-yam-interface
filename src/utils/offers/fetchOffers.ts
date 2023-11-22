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
import {
  getTheGraphUrlRealtoken,
  getTheGraphUrlYAM,
} from '../theGraph/getClientURL';
import { getOfferQuery } from './getOfferQuery';
import { parseOffer } from './parseOffer';

export const getBigDataGraphRealtoken = async (
  chainId: number,
  client: ApolloClient<NormalizedCacheObject>,
  realtokenAccount: string[]
) => {
  const { address: realTokenYamUpgradeable } =
    CHAINS[chainId as ChainsID].contracts.realTokenYamUpgradeable;

  const accountRealtoken: string =
    '"' + realtokenAccount.map((account: string) => account).join('","') + '"';
  //console.log('DEBUG accountRealtoken', accountRealtoken);

  const { data } = await client.query({
    query: gql`
      query getAccountsRealtoken {
        accountBalances(
          first: 1000 
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
      const { data: usersDataYAM } = await clientYAM.query({
        query: gql`
          query getUersData {
            accounts(
              first: 1000
              where: { offers_: { removedAtBlock: null } }
            ) {
              address
              offers(first: 1000) {
                id
                offerToken {
                  address
                }
              }
            }
          }
        `,
      });

      //console.log('Debug Query usersDataYAM', usersDataYAM);

      //TODO: tmp supprimer la partie false quant déploiement ok sur Eth et Gnosis, remettre en const a la place de let try = new graph, catch = old graph

      // Pagination
      const offers: OfferGraphQl[] = [];
      let skip = 0;
      let stop = false;
      while (!stop) {
        const { data } = await clientYAM.query({
          query: gql`
            query getOffers {
              offers(first: 1000, skip: ${skip}) {
                ${getOfferQuery()}
              }
            }
          `,
        }); //, where: { removedAtBlock: null }) {

        if (data.offers && data.offers.length > 0) {
          skip += 1000;

          offers.push(...data.offers);

          // Avoid one request more
          if (data.offers.length < 1000) stop = true;
        } else {
          stop = true;
        }
      }

      const accountRealtoken: string[] = usersDataYAM.accounts.map(
        (account: { address: string; offers: [] }) =>
          account.offers.map(
            (offer: { id: string; offerToken: { address: string } }) =>
              account.address + '-' + offer.offerToken.address
          )
      );
      const accountBalanceId: string[] = accountRealtoken.flat();
      //console.log('Debug liste accountBalanceId', accountBalanceId);

      const batchSize = 1000;
      const dataRealtoken: [DataRealtokenType] = [
        {
          amount: '0',
          id: '0',
        },
      ];
      for (let i = 0; i < accountBalanceId.length; i += batchSize) {
        const batch: string[] = accountBalanceId.slice(i, i + batchSize);
        /* dataRealtoken.push(
          await getBigDataGraphRealtoken(chainId, clientRealtoken, batch)
        ); */
        if (batch.length <= 0) break;

        const realtokenData: [DataRealtokenType] =
          await getBigDataGraphRealtoken(chainId, clientRealtoken, batch);

        //console.log('DEBUG for realtokenData', i, batchSize, realtokenData);
        dataRealtoken.push(...realtokenData);
      }

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

      // console.log(
      //   'Query dataYAM',
      //   parsedOffers.length,
      //   parsedOffers.map((o) => o.offerId)
      // );

      offersData.push(...parsedOffers);

      resolve(offersData);
    } catch (err) {
      console.log('Error while fetching offers from TheGraph', err);
      reject(err);
    }
  });
};
