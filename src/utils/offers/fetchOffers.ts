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

import { Offer as OfferGraphQl } from 'gql/graphql';
import { parseOffer } from './parseOffer';

const nbrFirst = 1000;

export const getBigDataGraphRealtoken = async (
  chainId: number,
  client: ApolloClient<NormalizedCacheObject>,
  realtokenAccount: string[],
) => {

  const chainConfig = CHAINS[chainId as ChainsID];

  const { address: realTokenYamUpgradeable } = chainConfig.contracts.realTokenYamUpgradeable;

  const graphNetworkPrefix = chainConfig.graphPrefixes.realtoken;

  // console.log('getBigDataGraphRealtoken', realtokenAccount.length);

  const accountRealtoken: string =
    '"' + realtokenAccount.map((account: string) => account).join('","') + '"';
  //console.log('DEBUG accountRealtoken', accountRealtoken);

  const { data } = await client.query({
    query: gql`
      query getAccountsRealtoken {
        ${graphNetworkPrefix} {
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
      }
    `,
  });
  //console.log('DEBUG getBigDataGraphRealtoken data', data);

  const accountBalances = data[graphNetworkPrefix].accountBalances

  return accountBalances.map((accountBalance: DataRealtokenType) => {
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

      const graphNetworkPrefix = CHAINS[chainId as ChainsID].graphPrefixes.yam;

      const offersData: Offer[] = [];
      
      const client = new ApolloClient({
        uri: "https://staging-api.realtoken.network/graphql",
        cache: new InMemoryCache(),
      });

      const activeOfferResult = await client.query({
        query: gql`
          query {
            ${graphNetworkPrefix}{
              global(id: "1"){
                activeOffersCount
              }
            }
          }
        `,
      });

      const offersToFetch = activeOfferResult.data[graphNetworkPrefix].global.activeOffersCount;
      console.log('Amount of offersToFetch: ', offersToFetch)

      const offersRes = await client.query({
        query: gql`
          query {
            ${graphNetworkPrefix} {
              offers (first: ${offersToFetch}) {
                id
                seller {
                    id
                    address
                }
                allowance {
                    allowance
                }
                balance {
                    amount
                }
                offerToken {
                    address
                    name
                    decimals
                    symbol
                    tokenType
                }
                price {
                    price
                    amount
                }
                buyerToken {
                    name
                    symbol
                    address
                    decimals
                    tokenType
                }
                buyer {
                    address
                }
                removedAtBlock
                availableAmount
                createdAtTimestamp
              }
            }
          }
        `
      })

      const offers: OfferGraphQl[] = offersRes.data[graphNetworkPrefix].offers;
      console.log(offers)

      const accountRealtokenDuplicates: string[] = offers.map(val => (val.seller.address + '-' + val.offerToken.address));
      const accountBalanceId = [...new Set(accountRealtokenDuplicates)]; // remove duplicates
      // //console.log('Debug liste accountBalanceId', accountBalanceId);

      const bigDataRealTokenPromises = [];
      for (let i = 0; i < accountBalanceId.length; i += nbrFirst) {
        const batch: string[] = accountBalanceId.slice(i, i + nbrFirst);
        /* dataRealtoken.push(
          await getBigDataGraphRealtoken(chainId, clientRealtoken, batch)
        ); */
        if (batch.length <= 0) break;

        bigDataRealTokenPromises.push(getBigDataGraphRealtoken(chainId, client, batch));
        //console.log('DEBUG for realtokenData', i, batchSize, realtokenData);
      }

      const dataRealtoken = (await Promise.all(bigDataRealTokenPromises)).flat() as DataRealtokenType[]

      // //console.log('Debug Query dataRealtoken', dataRealtoken);

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
      // // console.log('Offers formated', offersData.length);

      resolve(offersData);
    } catch (err) {
      console.log('Error while fetching offers from TheGraph', err);
    }
  });
};
