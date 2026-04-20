import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';

import { useAccount, useChainId } from 'wagmi';

import { ExtendedChainConfig } from '../../config/aaConfig';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { Historic } from '../../types/historic';
import { getPurchases, getSales } from '../../utils/historic/historic';

type UseHistoric = () => {
  historicsAreLoading: boolean;
  historics: Historic[];
  isError: boolean;
};
export const useHistoric: UseHistoric = () => {
  const { address: account } = useAccount();
  const chainId = useChainId();

  const network = useCurrentNetwork<ExtendedChainConfig>();

  const {
    data: historics,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['historics', chainId, account],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_HISTORICS },
    enabled: !!chainId && !!account && !!network,
    queryFn: async () => {
      if (!chainId || !account || !network) return [];

      const graphNetworkPrefix = network.graphPrefix?.yam;
      if (!graphNetworkPrefix) {
        console.warn(
          'Cannot load historic, no graph network prefix found for network'
        );
        return [];
      }

      const [buyerHistorics, sellerHistorics] = await Promise.all([
        getPurchases(account, graphNetworkPrefix),
        getSales(account, graphNetworkPrefix),
      ]);

      const historics = buyerHistorics.concat(sellerHistorics);
      const sortedHistorics = historics.sort((a, b) =>
        a.createdAtTimestamp > b.createdAtTimestamp ? -1 : 1
      );

      return sortedHistorics;
    },
  });

  return {
    historicsAreLoading: isLoading,
    historics: isSuccess ? historics : [],
    isError,
  };
};
