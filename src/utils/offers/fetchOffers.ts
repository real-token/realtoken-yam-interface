import {
  gql,
} from '@apollo/client';

import BigNumber from 'bignumber.js';
import { Offer as OfferGraphQl } from '../../../gql/graphql';

import { CHAINS, ChainsID } from 'src/constants';
import { PropertiesToken } from 'src/types';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { Offer } from 'src/types/offer/Offer';
import { Price } from 'src/types/price';

import { parseOffer } from './parseOffer';
import { useRootStore } from '../../zustandStore/store';
import { getExtendedTokens } from '../../constants/GetPriceToken';
import { graphqlQuery } from '../graphql/graphqlApiClient';
import { createLogger } from '../logger';

const logger = createLogger('fetchOffers');
const nbrFirst = 1000;

export const getBigDataGraphRealtoken = async (
  chainId: number,
  realtokenAccount: string[]
) => {
  const chainConfig = CHAINS[chainId as ChainsID];

  const { address: realTokenYamUpgradeable } =
    chainConfig.contracts.realTokenYamUpgradeable;

  const graphNetworkPrefix = chainConfig.graphPrefixes.realtoken;

  const accountRealtoken: string =
    '"' + realtokenAccount.map((account: string) => account).join('","') + '"';

  // Toutes les requêtes passent par l'API Gateway (NEXT_PUBLIC_API_URL)
  const result = await graphqlQuery({
    query: `
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

  const accountBalances = result.data?.[graphNetworkPrefix]?.accountBalances || [];

  return accountBalances.map((accountBalance: DataRealtokenType) => {
    const allowance: { id: string; allowance: string } | undefined =
      accountBalance.allowances?.find(
        (allowance: { id: string; allowance: string }) =>
          accountBalance.id + '-' + realTokenYamUpgradeable === allowance.id
      );

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
  // const { abortController } = useRootStore.getState();
  return new Promise<Offer[]>(async (resolve, reject) => {
    try {

      const graphNetworkPrefix = CHAINS[chainId as ChainsID].graphPrefixes.yam;

      const offersData: Offer[] = [];

      // Toutes les requêtes passent par l'API Gateway (NEXT_PUBLIC_API_URL)
      const activeOfferResult = await graphqlQuery({
        query: `
          query {
            ${graphNetworkPrefix}{
              global(id: "1"){
                activeOffersCount
              }
            }
          }
        `,
      });

      // Vérifier s'il y a des erreurs dans la réponse
      if (activeOfferResult.errors && activeOfferResult.errors.length > 0) {
        const firstError = activeOfferResult.errors[0];
        
        // Vérifier si c'est une erreur d'authentification
        const isAuthError = 
          firstError.extensions?.code === 'THEGRAPH_AUTH_ERROR' ||
          firstError.extensions?.code === 'AUTHENTICATION_ERROR' ||
          firstError.extensions?.code === 'DOWNSTREAM_SERVICE_ERROR' ||
          firstError.message?.toLowerCase().includes('invalid authentication token') ||
          firstError.message?.toLowerCase().includes('authentication error');
        
        if (isAuthError) {
          // Erreur d'authentification - laisser remonter pour bloquer l'interface
          logger.error('[fetchOffersTheGraph] Authentication error in activeOffersCount query:', firstError);
          throw new Error(firstError.message || 'Authentication error');
        }
        
        // Si c'est une erreur d'indexation, on peut quand même essayer de continuer avec les données partielles
        if (
          firstError.extensions?.code === 'SUBGRAPH_INDEXING_ERROR' ||
          firstError.message?.includes('indexing error') ||
          firstError.message?.includes('indexing_error')
        ) {
          logger.warn('Subgraph indexing error detected, but continuing with partial data');
          // On peut continuer si on a des données, sinon on rejette
          if (!activeOfferResult.data?.[graphNetworkPrefix]?.global) {
            throw firstError;
          }
        } else {
          // Pour les autres erreurs, on rejette
          throw firstError;
        }
      }

      // Vérifier que les données sont présentes
      if (!activeOfferResult.data?.[graphNetworkPrefix]?.global) {
        throw new Error('No data received from TheGraph');
      }

      const offersToFetch = activeOfferResult.data[graphNetworkPrefix].global.activeOffersCount || 0;
      logger.debug('Amount of offersToFetch: ', offersToFetch);

      // Toutes les requêtes passent par l'API Gateway (NEXT_PUBLIC_API_URL)
      const offersRes = await graphqlQuery({
        query: `
          query {
            ${graphNetworkPrefix} {
              offers (first: ${offersToFetch}, where: { removedAtBlock: null }) {
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
      });

      // Vérifier s'il y a des erreurs dans la réponse
      if (offersRes.errors && offersRes.errors.length > 0) {
        const firstError = offersRes.errors[0];
        // Si c'est une erreur d'indexation, on peut quand même essayer de continuer avec les données partielles
        if (
          firstError.extensions?.code === 'SUBGRAPH_INDEXING_ERROR' ||
          firstError.message?.includes('indexing error') ||
          firstError.message?.includes('indexing_error')
        ) {
          logger.warn('Subgraph indexing error detected, but continuing with partial data');
          // On continue si on a des données, sinon on rejette
          if (!offersRes.data?.[graphNetworkPrefix]?.offers) {
            throw firstError;
          }
        } else {
          // Pour les autres erreurs, on rejette
          throw firstError;
        }
      }

      const offers: OfferGraphQl[] = offersRes.data?.[graphNetworkPrefix]?.offers || [];
      logger.debug('offers: ', offers.length);
      
      // Si on n'a pas d'offres mais qu'on devrait en avoir, c'est peut-être une erreur
      if (offers.length === 0 && offersToFetch > 0 && offersRes.errors && offersRes.errors.length > 0) {
        // On rejette seulement si on n'a vraiment aucune donnée
        throw offersRes.errors[0];
      }

      const accountRealtokenDuplicates: string[] = offers.map(
        (val) => val.seller.address + '-' + val.offerToken.address
      );
      const accountBalanceId = [...new Set(accountRealtokenDuplicates)]; // remove duplicates

      const bigDataRealTokenPromises = [];
      for (let i = 0; i < accountBalanceId.length; i += nbrFirst) {
        const batch: string[] = accountBalanceId.slice(i, i + nbrFirst);
        /* dataRealtoken.push(
          await getBigDataGraphRealtoken(chainId, clientRealtoken, batch)
        ); */
        if (batch.length <= 0) break;

        bigDataRealTokenPromises.push(
          getBigDataGraphRealtoken(chainId, batch)
        );
      }

      const dataRealtoken = (
        await Promise.all(bigDataRealTokenPromises)
      ).flat() as DataRealtokenType[];


      const extendedTokensAddress = getExtendedTokens(chainId).map((token) => token.contractAddress);

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
                account,
                offer,
                accountUserRealtoken,
                propertiesToken,
                wlProperties,
                prices,
                extendedTokensAddress
              );

              offerData.hasPropertyToken =
                BigNumber(offerData.buyerTokenType).eq(1) ||
                BigNumber(offerData.offerTokenType).eq(1);

              resolve(offerData);
            } catch (err) {
              logger.error('Error when parsingOffer: ', err);
              reject(err);
            }
          })
      );

      const parsedOffers = await Promise.all(promises);
      logger.debug('Offers formated', parsedOffers.length);

      // ERROR_RANGE is used to check if the number of offers fetched is correctly
      // This is the -/+ range difference accepted
      const ERROR_RANGE = 0.1;
      if(parsedOffers.length < offersToFetch*(1-ERROR_RANGE)) {
        setTheGraphIssue(true);
      }

      offersData.push(...parsedOffers);

      resolve(offersData);
    } catch (err) {
      logger.error('Error while fetching offers from TheGraph', err);
      // Propager l'erreur pour que React Query puisse la gérer
      reject(err);
    }
  });
};
