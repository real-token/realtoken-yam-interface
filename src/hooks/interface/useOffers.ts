import { useMemo } from 'react';
import { useQuery, useQueries } from 'react-query';

import { useWeb3React } from '@web3-react/core';

import { ALLOWED_CHAINS_ID } from '../../constants';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { OFFER_LOADING, Offer } from '../../types/offer';
import { fetchOffersTheGraph } from '../../utils/offers/fetchOffers';
import { parseGraphQLError, ParsedGraphQLError } from '../../utils/errors/parseGraphQLError';
import { mergeExtendedProperties } from '../../utils/properties';
import { getExtendedTokens } from '../../constants/GetPriceToken';
import { PropertiesToken } from '@realtoken/realt-commons';
import { Price } from '../../types/price';
import { CHAINS, ChainsID } from '../../constants';
import { graphqlQuery } from '../../utils/graphql/graphqlApiClient';
import { createLogger } from '../../utils/logger';

const logger = createLogger('useOffers');

type UseOffers = () => {
  offers: Offer[];
  offersAreLoading: boolean;
  isError: boolean;
  error: unknown;
  parsedError: ParsedGraphQLError | null;
  refetch: () => void;
};

/**
 * Hook optimisé pour charger les offres avec chargement parallèle des prérequis
 * Utilise useQueries pour un meilleur contrôle du chargement parallèle
 */
export const useOffers: UseOffers = () => {
  const { chainId, account } = useWeb3React();

  // Chargement parallèle optimisé des prérequis avec useQueries
  // Meilleur contrôle sur l'état de chargement et la gestion d'erreurs
  // Note: Dans react-query v3, useQueries prend un tableau directement
  const prerequisiteQueries = useQueries([
    // Priorité 1 : Properties (données génériques, cache long)
    {
      queryKey: ['properties', chainId],
      queryFn: async (): Promise<PropertiesToken[]> => {
        if (!chainId) return [];
        const response = await fetch(`/api/properties/${chainId}`);
        if (response.ok) {
          const responseJson: PropertiesToken[] = await response.json();
          return mergeExtendedProperties(responseJson, getExtendedTokens(chainId));
        }
        return [];
      },
      enabled: !!chainId,
      staleTime: 24 * 60 * 60 * 1000, // 24h (changement rare)
      cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 jours
      retry: 2,
      retryDelay: 1000,
      meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    },
    // Priorité 2 : Prices (données génériques, cache modéré)
    {
      queryKey: ['prices', chainId],
      queryFn: async (): Promise<Price> => {
        if (!chainId) return {};
        const res = await fetch(`/api/prices/${chainId}`);
        if (!res.ok) {
          logger.warn(`Failed to fetch prices for chainId ${chainId}:`, res.status, res.statusText);
          return {};
        }
        return await res.json();
      },
      enabled: !!chainId,
      staleTime: 60 * 60 * 1000, // 1h (changement modéré)
      cacheTime: 24 * 60 * 60 * 1000, // 24h
      retry: 2,
      retryDelay: 1000,
      meta: { errCode: REACT_QUERY_ERRORS.FETCH_PRICES },
    },
    // Priorité 3 : WlProperties (données spécifiques, optionnel)
    {
      queryKey: ['wlProperties', chainId, account],
      queryFn: async (): Promise<number[]> => {
        if (!chainId || !account) return [];

        try {
          const prefix = CHAINS[chainId as ChainsID]?.graphPrefixes?.realtoken;
          if (!prefix) {
            logger.warn(`Unsupported chainId: ${chainId}`);
            return [];
          }

          const { data, errors } = await graphqlQuery<{
            [key: string]: {
              account: {
                userIds: {
                  attributeKeys: string[];
                }[];
              };
            };
          }>({
            query: `
              query getWlProperties {
                ${prefix} {
                  account(id: "${account.toLowerCase()}") {
                    userIds {
                      userId
                      attributeKeys
                      trustedIntermediary {
                        address
                        weight
                      }
                    }
                  }
                }
              }
            `,
          });

          if (errors) {
            const authError = errors.find(
              (e) =>
                e.extensions?.code === 'THEGRAPH_AUTH_ERROR' ||
                e.extensions?.code === 'AUTHENTICATION_ERROR' ||
                e.message?.toLowerCase().includes('invalid authentication token')
            );

            if (authError) {
              logger.error('Authentication error in WL properties:', authError);
              throw new Error(authError.message || 'Authentication error');
            }

            logger.warn('Failed to fetch WL properties with GraphQL errors, using empty array as fallback:', errors);
            return [];
          }

          const userIds = data?.[prefix]?.account?.userIds;
          const wlTokenIds = userIds && userIds.length > 0 ? userIds[0].attributeKeys : undefined;
          return wlTokenIds ? wlTokenIds.map((str) => parseInt(str)) : [];
        } catch (error: any) {
          const errorMessage = error?.message?.toLowerCase() || '';
          const hasAuthError =
            errorMessage.includes('authentication error') ||
            errorMessage.includes('invalid authentication token') ||
            errorMessage.includes('invalid authentication') ||
            errorMessage.includes('authentication failed') ||
            errorMessage.includes('unauthorized') ||
            errorMessage.includes('forbidden') ||
            errorMessage.includes('no authentication token provided');

          if (hasAuthError) {
            logger.error('Authentication error in WL properties, blocking interface:', error);
            throw error;
          }

          logger.warn('Failed to fetch WL properties (non-auth error), using empty array as fallback:', error);
          return [];
        }
      },
      enabled: !!chainId && !!account,
      staleTime: 12 * 60 * 60 * 1000, // 12h
      cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 jours
      retry: 1,
      retryDelay: 1000,
      meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    },
  ]);

  // Extraire les résultats des queries
  const [propertiesQuery, pricesQuery, wlPropertiesQuery] = prerequisiteQueries;
  const properties = propertiesQuery.data;
  const prices = pricesQuery.data;
  const wlProperties = wlPropertiesQuery.data ?? []; // Fallback à tableau vide si undefined
  const propertiesAreLoading = propertiesQuery.isLoading;
  const pricesAreLoading = pricesQuery.isLoading;
  const wlPropertiesAreLoading = wlPropertiesQuery.isLoading;

  // Charger les offres une fois que les prérequis sont disponibles
  // Les données génériques (properties, prices) doivent être disponibles
  // wlProperties est optionnel (fallback vers [])
  const {
    isLoading: loading,
    data: offers,
    isSuccess,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['offers', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_OFFERS },
    enabled:
      !!chainId &&
      !!account &&
      !!properties &&
      !propertiesAreLoading &&
      !!prices &&
      !pricesAreLoading,
    // Ne pas attendre wlProperties - utiliser [] comme fallback si non disponible
    queryFn: async (): Promise<Offer[]> => {
      if (!chainId || !account || !properties || !prices) return OFFER_LOADING;

      // Utiliser wlProperties si disponible, sinon tableau vide (fallback)
      // Cela permet de charger les offres même si wlProperties échoue
      const wlProps = wlProperties ?? [];

      let offersData = OFFER_LOADING;
      if (
        ALLOWED_CHAINS_ID.includes(chainId.toString()) &&
        prices
      ) {
        offersData = await fetchOffersTheGraph(
          account,
          chainId,
          properties,
          wlProps, // Utiliser le fallback si wlProperties échoue
          prices,
          () => {}
        );
      }

      return offersData;
    },
    staleTime: Infinity, // Pas de TTL - mise à jour via événements blockchain
    cacheTime: Infinity, // Conservé indéfiniment
    refetchInterval: 5 * 60 * 1000, // Vérifier toutes les 5 min si événements manqués
    // Permettre de garder les données en cache même en cas d'erreur
    // pour permettre un fonctionnement partiel
    keepPreviousData: true,
    // Ne pas retry en cas d'erreur (notamment erreurs d'authentification)
    // pour éviter les appels multiples inutiles
    retry: false,
    retryOnMount: false, // Ne pas retry au remount
  });

  const parsedError = useMemo(() => {
    if (!error) return null;
    return parseGraphQLError(error);
  }, [error]);

  const offersAreLoading = useMemo(
    () =>
      loading ||
      propertiesAreLoading ||
      pricesAreLoading ||
      wlPropertiesAreLoading,
    [loading, propertiesAreLoading, pricesAreLoading, wlPropertiesAreLoading]
  );

  return useMemo(
    () => ({
      // Retourner les offres même en cas d'erreur si on en a (données partielles)
      // Cela permet un fonctionnement partiel de l'interface
      offers: offers && offers !== OFFER_LOADING ? offers : [],
      offersAreLoading,
      isError,
      error,
      parsedError,
      refetch,
    }),
    [offers, offersAreLoading, isError, error, parsedError, refetch]
  );
};
