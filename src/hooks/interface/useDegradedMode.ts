import { useMemo } from 'react';
import { useChainId } from 'wagmi';

import { useWalletGate } from 'src/wallet/useWalletGate';
import { ParsedGraphQLError } from '../../utils/errors/parseGraphQLError';

import { useOffers } from './useOffers';

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
  const chainId = useChainId();
  const { address: account, canFetch } = useWalletGate();
  const { offersAreLoading, isError, parsedError } = useOffers();

  const degradedMode = useMemo(() => {
    if (!canFetch || !chainId || !account) {
      return {
        isDegraded: false,
        parsedError: null,
      };
    }

    if (isError && parsedError) {
      return {
        isDegraded: true,
        errorType: parsedError.type,
        errorMessage: parsedError.message,
        subgraphUrl: parsedError.subgraphUrl,
        parsedError,
      };
    }

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
  }, [account, canFetch, chainId, isError, offersAreLoading, parsedError]);

  return degradedMode;
}
