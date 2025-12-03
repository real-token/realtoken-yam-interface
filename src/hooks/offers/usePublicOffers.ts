import { useMemo } from 'react';

import BigNumber from 'bignumber.js';

import { Offer } from '../../types/offer';
import { useOffers } from '../interface/useOffers';

type UsePublicOffers = () => {
  offers: Offer[];
  offersAreLoading: boolean;
  refetch: () => void;
};
export const usePublicOffers: UsePublicOffers = () => {
  const { offers, offersAreLoading, refetch } = useOffers();

  const publicOffers = useMemo(() => {
    return offers.filter(
      (offer: Offer) =>
        !offer.buyerAddress &&
        BigNumber(offer.amount).isPositive() &&
        !BigNumber(offer.amount).isZero()
    );
  }, [offers]);

  return useMemo(
    () => ({
      offers: publicOffers,
      offersAreLoading,
      refetch,
    }),
    [publicOffers, offersAreLoading, refetch]
  );
};
