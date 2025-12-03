import { useMemo } from 'react';

import { useAccount } from 'wagmi';

import { Offer } from '../../types/offer';
import { useOffers } from '../interface/useOffers';

type UsePrivateOffers = () => {
  offers: Offer[];
  offersAreLoading: boolean;
  refetch: () => void;
};
export const usePrivateOffers: UsePrivateOffers = () => {
  const { address: account } = useAccount();
  const { offers, offersAreLoading, refetch } = useOffers();

  const privateOffers = useMemo(() => {
    if (!account || !offers) return [];
    return offers.filter(
      (offer: Offer) =>
        offer.buyerAddress &&
        offer.buyerAddress.toLowerCase() == account.toLowerCase()
    );
  }, [offers, account]);

  return { offers: privateOffers, offersAreLoading, refetch };
};
