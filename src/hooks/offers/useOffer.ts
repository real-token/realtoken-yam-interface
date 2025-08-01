import { useQuery } from '@tanstack/react-query';

import { useAccount, useChainId, usePublicClient } from 'wagmi';

import { fetchOffer } from 'src/utils/offers/fetchOffer';

import { Offer } from '../../types/offer/Offer';
import { usePrices } from '../interface/usePrices';
import { useWlProperties } from '../interface/useWlProperties';
import { usePropertiesToken } from '../usePropertiesToken';

type UseOfferProps = (offerId: number) => {
  offer: Offer | undefined;
  isLoading: boolean;
  hasError: boolean;
};

export const useOffer: UseOfferProps = (offerId: number) => {
  const { address: account } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();

  const { propertiesToken, propertiesIsloading } = usePropertiesToken();

  const { prices } = usePrices();
  const { wlProperties } = useWlProperties();

  const {
    data: offer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [offerId],
    enabled:
      !!offerId &&
      !!chainId &&
      !!account &&
      !!propertiesToken &&
      !!prices &&
      !!wlProperties,
    queryFn: () => {
      if (!account || !chainId || !propertiesToken || !wlProperties || !prices)
        return Promise.resolve(undefined);
      return fetchOffer(
        account,
        chainId,
        offerId,
        propertiesToken,
        wlProperties,
        prices
      );
    },
  });

  return {
    offer,
    isLoading,
    hasError: isError,
  };
};
