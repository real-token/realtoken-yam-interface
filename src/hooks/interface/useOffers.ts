import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useWeb3React } from '@web3-react/core';

import { ALLOWED_CHAINS_ID } from '../../constants';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { OFFER_LOADING, Offer } from '../../types/offer';
import { fetchOffersTheGraph } from '../../utils/offers/fetchOffers';
import { parseGraphQLError, ParsedGraphQLError } from '../../utils/errors/parseGraphQLError';
import { usePrices } from './usePrices';
import { useProperties } from './useProperties';
import { useWlProperties } from './useWlProperties';

type UseOffers = () => {
  offers: Offer[];
  offersAreLoading: boolean;
  isError: boolean;
  error: unknown;
  parsedError: ParsedGraphQLError | null;
  refetch: () => void;
};
export const useOffers: UseOffers = () => {
  const { chainId, account } = useWeb3React();

  // Chargement parallèle des prérequis
  // Les hooks useProperties, usePrices et useWlProperties s'exécutent déjà en parallèle
  // car React exécute tous les hooks de manière indépendante
  const { properties, propertiesAreLoading } = useProperties();
  const { prices, pricesAreLoading } = usePrices();
  const { wlProperties, wlPropertiesAreLoading } = useWlProperties();

  // Charger les offres même si wlProperties échoue (utiliser tableau vide comme fallback)
  // Les données génériques (properties, prices) doivent être disponibles
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
      if (!chainId || !account || !properties || !prices)
        return OFFER_LOADING;

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
    // Ne pas invalider automatiquement en cas d'erreur pour permettre un fonctionnement partiel
    retry: false,
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
