import {
  ApolloClient,
  NormalizedCacheObject,
  gql,
} from '@apollo/client';

import BigNumber from 'bignumber.js';
import { Offer as OfferGraphQl } from '../../../gql/graphql';

import { CHAINS, ChainsID } from 'src/constants';
import { PropertiesToken } from 'src/types';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { Offer } from 'src/types/offer/Offer';
import { Price } from 'src/types/price';

import { apiClient } from './getClientURL';
import { parseOffer } from './parseOffer';
import { useRootStore } from '../../zustandStore/store';

const nbrFirst = 1000;

export const getBigDataGraphRealtoken = async (
  chainId: number,
  client: ApolloClient<NormalizedCacheObject>,
  realtokenAccount: string[]
) => {
  const chainConfig = CHAINS[chainId as ChainsID];

  const { address: realTokenYamUpgradeable } =
    chainConfig.contracts.realTokenYamUpgradeable;

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

  const accountBalances = data[graphNetworkPrefix].accountBalances;

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
  account: string,
  chainId: number,
  propertiesToken: PropertiesToken[],
  wlProperties: number[],
  prices: Price,
  setTheGraphIssue: (value: boolean) => void
): Promise<Offer[]> => {
  const { abortController } = useRootStore.getState();
  return new Promise<Offer[]>(async (resolve, reject) => {
    try {

      const graphNetworkPrefix = CHAINS[chainId as ChainsID].graphPrefixes.yam;

      const offersData: Offer[] = [];

      const activeOfferResult = await apiClient.query({
        query: gql`
          query {
            ${graphNetworkPrefix}{
              global(id: "1"){
                activeOffersCount
              }
            }
          }
        `,
        context: {
          fetchOptions: {
            signal: abortController.signal
          }
        }
      });

      const offersToFetch =
        activeOfferResult.data[graphNetworkPrefix].global.activeOffersCount;
      console.log('Amount of offersToFetch: ', offersToFetch);

      const offersToFetchMax = graphNetworkPrefix == 'yamEth' ? offersToFetch : 10000;

      const offersRes = await apiClient.query({
        query: gql`
          query {
            ${graphNetworkPrefix} {
              offers (first: ${offersToFetchMax}) {
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
        `,
         context: {
          fetchOptions: {
            signal: abortController.signal
          }
        }
      })

      const offers: OfferGraphQl[] = offersRes.data[graphNetworkPrefix].offers;
      console.log('offers: ', offers.length)

      const offer = offers.find((offer) => offer.id === "0x91da");
      console.log('offer: ', offer)


      const accountRealtokenDuplicates: string[] = offers.map(
        (val) => val.seller.address + '-' + val.offerToken.address
      );
      const accountBalanceId = [...new Set(accountRealtokenDuplicates)]; // remove duplicates
      // //console.log('Debug liste accountBalanceId', accountBalanceId);

      const bigDataRealTokenPromises = [];
      for (let i = 0; i < accountBalanceId.length; i += nbrFirst) {
        const batch: string[] = accountBalanceId.slice(i, i + nbrFirst);
        /* dataRealtoken.push(
          await getBigDataGraphRealtoken(chainId, clientRealtoken, batch)
        ); */
        if (batch.length <= 0) break;

        bigDataRealTokenPromises.push(
          getBigDataGraphRealtoken(chainId, apiClient, batch)
        );
        //console.log('DEBUG for realtokenData', i, batchSize, realtokenData);
      }

      const dataRealtoken = (
        await Promise.all(bigDataRealTokenPromises)
      ).flat() as DataRealtokenType[];

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

              // console.log('wlProperties: ', wlProperties)
              const offerData: Offer = await parseOffer(
                account,
                offer,
                accountUserRealtoken,
                propertiesToken,
                wlProperties,
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
      console.log('Offers formated', parsedOffers.length);

      // ERROR_RANGE is used to check if the number of offers fetched is correctly
      // This is the -/+ range difference accepted
      const ERROR_RANGE = 0.1;
      if(parsedOffers.length < offersToFetch*(1-ERROR_RANGE)) {
        setTheGraphIssue(true);
      }

      offersData.push(...parsedOffers);
      // // console.log('Offers formated', offersData.length);

      resolve(offersData);
    } catch (err) {
      console.log('Error while fetching offers from TheGraph', err);
    }
  });
};
