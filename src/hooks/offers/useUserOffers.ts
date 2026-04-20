import { useMemo } from 'react';

import { useAccount } from 'wagmi';

import { OFFER_LOADING, Offer } from '../../types/offer';
import { useOffers } from '../interface/useOffers';

type UseUserOffers = () => {
  offers: Offer[];
  offersAreLoading: boolean;
  refetch: () => void;
};
export const useUserOffers: UseUserOffers = () => {
  const { offers, offersAreLoading, refetch } = useOffers();
  const { address: account } = useAccount();

  const userOffers = useMemo(() => {
    if (!account || !offers) return OFFER_LOADING;
    return offers.filter(
      (offer: Offer) =>
        offer.sellerAddress &&
        offer.sellerAddress.toLowerCase() == account.toLowerCase()
    );
  }, [offers, account]);

  return { offers: userOffers, offersAreLoading, refetch };
};
