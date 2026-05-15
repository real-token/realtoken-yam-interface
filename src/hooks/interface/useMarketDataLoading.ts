import { useIsFetching } from '@tanstack/react-query';
import { useChainId } from 'wagmi';

import { useConnectedAccount } from '../useConnectedAccount';

/**
 * Indique si les données marché (offres, propriétés, prix, WL) sont en cours de chargement.
 * N’abonne pas la chaîne complète useOffers → évite des centaines d’observers React Query
 * dans les lignes de tableau / cartes grille.
 */
export function useMarketDataLoading(): boolean {
  const chainId = useChainId();
  const { address: account } = useConnectedAccount();

  const offersFetching = useIsFetching({
    queryKey: ['offers', chainId, account],
  });
  const propertiesFetching = useIsFetching({
    queryKey: ['properties', chainId],
  });
  const pricesFetching = useIsFetching({ queryKey: ['prices', chainId] });
  const wlFetching = useIsFetching({
    queryKey: ['wlProperties', chainId, account],
  });

  if (!account) return false;

  return (
    offersFetching > 0 ||
    propertiesFetching > 0 ||
    pricesFetching > 0 ||
    wlFetching > 0
  );
}
