import { useQuery } from '@tanstack/react-query';

import { useChainId } from 'wagmi';

import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { Price } from '../../types/price';

type UsePrices = () => {
  pricesAreLoading: boolean;
  prices: Price | undefined;
};
export const usePrices: UsePrices = () => {
  const chainId = useChainId();

  const { isLoading: pricesAreLoading, data: prices } = useQuery({
    queryKey: ['prices', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_PRICES },
    enabled: !!chainId,
    queryFn: async (): Promise<Price> => {
      const res = await fetch(`/api/prices/${chainId}`);
      return await res.json();
    },
  });

  return {
    pricesAreLoading,
    prices,
  };
};
