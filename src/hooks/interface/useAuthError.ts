import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useOffers } from './useOffers';
import { useWeb3React } from '@web3-react/core';
import { parseGraphQLError, ParsedGraphQLError } from '../../utils/errors/parseGraphQLError';

/**
 * Hook pour détecter les erreurs d'authentification dans toutes les queries
 * Bloque l'interface si une erreur d'authentification est détectée
 */
export function useAuthError(): {
  hasAuthError: boolean;
  errorMessage?: string;
  parsedError: ParsedGraphQLError | null;
} {
  const { chainId, account } = useWeb3React();
  const queryClient = useQueryClient();
  const { isError: offersError, parsedError: offersParsedError } = useOffers();

  const authError = useMemo(() => {
    // Ne pas vérifier si on n'a pas encore de connexion
    if (!chainId || !account) {
      return {
        hasAuthError: false,
        parsedError: null,
      };
    }

    // Vérifier les erreurs d'authentification dans toutes les queries actives
    const queries = queryClient.getQueryCache().getAll();
    
    for (const query of queries) {
      if (query.state.error) {
        const parsedError = parseGraphQLError(query.state.error);
        
        if (parsedError?.type === 'AUTHENTICATION_ERROR') {
          return {
            hasAuthError: true,
            errorMessage: parsedError.message,
            parsedError,
          };
        }
      }
    }

    // Vérifier spécifiquement les erreurs des offres
    if (offersError && offersParsedError?.type === 'AUTHENTICATION_ERROR') {
      return {
        hasAuthError: true,
        errorMessage: offersParsedError.message,
        parsedError: offersParsedError,
      };
    }

    return {
      hasAuthError: false,
      parsedError: null,
    };
  }, [chainId, account, queryClient, offersError, offersParsedError]);

  return authError;
}
