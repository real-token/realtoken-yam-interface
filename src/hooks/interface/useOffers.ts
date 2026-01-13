import { useMemo } from 'react';

import { useAA } from '@real-token/aa-core';
import { useQuery } from '@tanstack/react-query';

import { useChainId } from 'wagmi';

import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { OFFER_LOADING, Offer } from '../../types/offer';
import {
  ParsedGraphQLError,
  parseGraphQLError,
} from '../../utils/errors/parseGraphQLError';
import { fetchOffersTheGraph } from '../../utils/offers/fetchOffers';
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
  const { walletAddress: account } = useAA();
  const chainId = useChainId();

  const { properties, propertiesAreLoading } = useProperties();
  const { prices, pricesAreLoading } = usePrices();
  const { wlProperties, wlPropertiesAreLoading } = useWlProperties();

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
      !!chainId && !!account && !!properties && !!prices && !!wlProperties,
    queryFn: async (): Promise<Offer[]> => {
      if (!chainId || !account || !properties || !prices || !wlProperties)
        return OFFER_LOADING;

      const offersData = await fetchOffersTheGraph(
        account,
        chainId,
        properties,
        wlProperties,
        prices,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      );

      return offersData;
    },
    // Permettre de garder les données en cache même en cas d'erreur
    // pour permettre un fonctionnement partiel
    // keepPreviousData: true,
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
