import { useQuery } from '@tanstack/react-query';

import { useChainId } from 'wagmi';

import { useConnectedAccount } from '../useConnectedAccount';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { Price } from '../../types/price';
import { fetchAssetPrices } from '../../utils/fetchAssetPrices';

type UsePrices = () => {
  pricesAreLoading: boolean;
  prices: Price | undefined;
};
export const usePrices: UsePrices = () => {
  const chainId = useChainId();
  const { address: account } = useConnectedAccount();

  const { isLoading: pricesAreLoading, data: prices } = useQuery({
    queryKey: ['prices', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_PRICES },
    enabled: !!chainId && !!account,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Price> => {
      if (!chainId) return {};

      return fetchAssetPrices(chainId);
    },
  });

  return {
    pricesAreLoading: account ? pricesAreLoading : false,
    prices,
  };
};
