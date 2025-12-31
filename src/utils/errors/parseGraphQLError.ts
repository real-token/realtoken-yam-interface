/**
 * Types pour les erreurs GraphQL
 */
export interface GraphQLErrorExtension {
  code?: string;
  serviceName?: string;
  subgraphUrl?: string;
  originalErrors?: string;
  detectedVia?: string;
}

export interface GraphQLErrorDetail {
  message: string;
  path?: string[];
  extensions?: GraphQLErrorExtension;
}

export interface GraphQLErrorResponse {
  errors?: GraphQLErrorDetail[];
  data?: any;
}

export type GraphQLErrorType =
  | 'SUBGRAPH_INDEXING_ERROR'
  | 'NETWORK_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'UNKNOWN_ERROR';

export interface ParsedGraphQLError {
  type: GraphQLErrorType;
  message: string;
  subgraphUrl?: string;
  serviceName?: string;
  originalErrors?: string;
}

/**
 * Parse une erreur GraphQL pour extraire les informations pertinentes
 */
export function parseGraphQLError(error: unknown): ParsedGraphQLError | null {
  if (!error) return null;

  // Si c'est une erreur Apollo
  if (typeof error === 'object' && 'graphQLErrors' in error) {
    const apolloError = error as {
      graphQLErrors?: Array<{
        message: string;
        path?: string[];
        extensions?: GraphQLErrorExtension;
      }>;
      networkError?: any;
    };

    // Vérifier les erreurs GraphQL
    if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
      const firstError = apolloError.graphQLErrors[0];
      
      // Vérifier si c'est une erreur d'authentification
      const errorMessage = firstError.message?.toLowerCase() || '';
      if (
        firstError.extensions?.code === 'THEGRAPH_AUTH_ERROR' ||
        firstError.extensions?.code === 'AUTHENTICATION_ERROR' ||
        errorMessage.includes('invalid authentication token') ||
        errorMessage.includes('invalid authentication') ||
        errorMessage.includes('authentication failed') ||
        errorMessage.includes('unauthorized') ||
        errorMessage.includes('forbidden')
      ) {
        return {
          type: 'AUTHENTICATION_ERROR',
          message: firstError.message || 'Erreur d\'authentification avec l\'API',
          serviceName: firstError.extensions?.serviceName,
          originalErrors: firstError.extensions?.originalErrors,
        };
      }
      
      // Vérifier si c'est une erreur d'indexation de subgraph
      if (
        firstError.extensions?.code === 'SUBGRAPH_INDEXING_ERROR' ||
        firstError.message?.includes('indexing error') ||
        firstError.message?.includes('indexing_error')
      ) {
        return {
          type: 'SUBGRAPH_INDEXING_ERROR',
          message: firstError.message,
          subgraphUrl: firstError.extensions?.subgraphUrl,
          serviceName: firstError.extensions?.serviceName,
          originalErrors: firstError.extensions?.originalErrors,
        };
      }
    }

    // Vérifier les erreurs réseau (peut contenir des erreurs d'authentification HTTP)
    if (apolloError.networkError) {
      const networkError = apolloError.networkError;
      const statusCode = (networkError as any)?.statusCode || (networkError as any)?.status;
      const errorMessage = networkError.message?.toLowerCase() || '';
      
      // Vérifier si c'est une erreur HTTP d'authentification (401, 403)
      if (
        statusCode === 401 ||
        statusCode === 403 ||
        errorMessage.includes('invalid authentication token') ||
        errorMessage.includes('invalid authentication') ||
        errorMessage.includes('authentication failed') ||
        errorMessage.includes('unauthorized') ||
        errorMessage.includes('forbidden')
      ) {
        return {
          type: 'AUTHENTICATION_ERROR',
          message: networkError.message || 'Erreur d\'authentification avec l\'API',
        };
      }
      
      return {
        type: 'NETWORK_ERROR',
        message: networkError.message || 'Network error occurred',
      };
    }
  }

  // Si c'est une réponse GraphQL directe avec errors
  if (typeof error === 'object' && 'errors' in error) {
    const graphQLError = error as GraphQLErrorResponse;
    
    if (graphQLError.errors && graphQLError.errors.length > 0) {
      const firstError = graphQLError.errors[0];
      
      // Vérifier si c'est une erreur d'authentification
      const errorMessage = firstError.message?.toLowerCase() || '';
      if (
        firstError.extensions?.code === 'THEGRAPH_AUTH_ERROR' ||
        firstError.extensions?.code === 'AUTHENTICATION_ERROR' ||
        errorMessage.includes('invalid authentication token') ||
        errorMessage.includes('invalid authentication') ||
        errorMessage.includes('authentication failed') ||
        errorMessage.includes('unauthorized') ||
        errorMessage.includes('forbidden')
      ) {
        return {
          type: 'AUTHENTICATION_ERROR',
          message: firstError.message || 'Erreur d\'authentification avec l\'API',
          serviceName: firstError.extensions?.serviceName,
          originalErrors: firstError.extensions?.originalErrors,
        };
      }
      
      if (
        firstError.extensions?.code === 'SUBGRAPH_INDEXING_ERROR' ||
        firstError.message?.includes('indexing error') ||
        firstError.message?.includes('indexing_error')
      ) {
        return {
          type: 'SUBGRAPH_INDEXING_ERROR',
          message: firstError.message,
          subgraphUrl: firstError.extensions?.subgraphUrl,
          serviceName: firstError.extensions?.serviceName,
          originalErrors: firstError.extensions?.originalErrors,
        };
      }
    }
  }

  // Erreur générique
  if (error instanceof Error) {
    return {
      type: 'UNKNOWN_ERROR',
      message: error.message,
    };
  }

  return {
    type: 'UNKNOWN_ERROR',
    message: String(error),
  };
}
