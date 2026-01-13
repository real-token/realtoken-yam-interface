import { useMemo } from 'react';
import { useOffers } from './useOffers';
import { useWeb3React } from '@web3-react/core';
import { ParsedGraphQLError } from '../../utils/errors/parseGraphQLError';

/**
 * Hook pour détecter si l'application est en mode dégradé
 * (TheGraph est down ou les offres ne peuvent pas être chargées)
 */
export function useDegradedMode(): {
  isDegraded: boolean;
  errorType?: 'SUBGRAPH_INDEXING_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';
  errorMessage?: string;
  subgraphUrl?: string;
  parsedError: ParsedGraphQLError | null;
} {
  const { chainId, account } = useWeb3React();
  const { offersAreLoading, isError, parsedError } = useOffers();

  const degradedMode = useMemo(() => {
    // Ne pas considérer comme dégradé si on n'a pas encore de connexion
    if (!chainId || !account) {
      return {
        isDegraded: false,
        parsedError: null,
      };
    }

    // Mode dégradé si :
    // 1. Il y a une erreur lors du chargement des offres
    if (isError && parsedError) {
      return {
        isDegraded: true,
        errorType: parsedError.type,
        errorMessage: parsedError.message,
        subgraphUrl: parsedError.subgraphUrl,
        parsedError,
      };
    }

    // Si erreur mais pas parsée, on considère quand même comme dégradé
    if (isError) {
      return {
        isDegraded: true,
        errorType: 'UNKNOWN_ERROR' as const,
        parsedError: null,
      };
    }

    return {
      isDegraded: false,
      parsedError: null,
    };
  }, [isError, offersAreLoading, parsedError, chainId, account]);

  return degradedMode;
}
