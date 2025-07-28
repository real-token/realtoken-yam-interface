import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useWeb3React } from '@web3-react/core';

import { ALLOWED_CHAINS_ID } from '../../constants';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { OFFER_LOADING, Offer } from '../../types/offer';
import { fetchOffersTheGraph } from '../../utils/offers/fetchOffers';
import { usePrices } from './usePrices';
import { useProperties } from './useProperties';
import { useWlProperties } from './useWlProperties';

type UseOffers = () => {
  offers: Offer[];
  offersAreLoading: boolean;
  isError: boolean;
  refetch: () => void;
};
export const useOffers: UseOffers = () => {
  const { chainId, account } = useWeb3React();

  const { properties, propertiesAreLoading } = useProperties();
  const { prices, pricesAreLoading } = usePrices();
  const { wlProperties, wlPropertiesAreLoading } = useWlProperties();

  const {
    isLoading: loading,
    data: offers,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['offers', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_OFFERS },
    enabled:
      !!chainId && !!account && !!properties && !!prices && !!wlProperties,
    queryFn: async (): Promise<Offer[]> => {
      if (!chainId || !account || !properties || !prices || !wlProperties)
        return OFFER_LOADING;

      let offersData = OFFER_LOADING;
      if (
        ALLOWED_CHAINS_ID.includes(chainId.toString()) &&
        wlProperties &&
        prices
      ) {
        offersData = await fetchOffersTheGraph(
          account,
          chainId,
          properties,
          wlProperties,
          prices,
          () => {}
        );
      }

      return offersData;
    },
  });

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
      offers: isSuccess ? offers : [],
      offersAreLoading,
      isError,
      refetch,
    }),
    [offers, offersAreLoading, isError, refetch]
  );
};
