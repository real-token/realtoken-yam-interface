/**
 * Client GraphQL pour utiliser l'endpoint API /api/graphql
 * Toutes les requêtes passent par l'API Gateway (NEXT_PUBLIC_API_URL) qui route vers TheGraph si nécessaire
 */

export interface GraphQLQueryOptions {
  query: string;
  variables?: Record<string, any>;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: {
      code?: string;
      [key: string]: any;
    };
  }>;
}

/**
 * Exécute une requête GraphQL via l'endpoint API
 * Gère l'authentification automatiquement côté serveur
 */
export async function graphqlQuery<T = any>(
  options: GraphQLQueryOptions
): Promise<GraphQLResponse<T>> {
  const { query, variables } = options;

  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables || {},
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Si erreur d'authentification, laisser remonter
    if (response.status === 401) {
      throw new Error(errorData.message || 'Authentication error');
    }

    throw new Error(errorData.message || `GraphQL query failed: ${response.status}`);
  }

  const result = await response.json();

  // Si des erreurs GraphQL sont présentes, les inclure dans la réponse
  if (result.errors && result.errors.length > 0) {
    // Vérifier si c'est une erreur d'authentification
    const hasAuthError = result.errors.some((e: any) => {
      const code = e?.extensions?.code;
      const msg = e?.message?.toLowerCase() || '';
      return (
        code === 'THEGRAPH_AUTH_ERROR' ||
        code === 'AUTHENTICATION_ERROR' ||
        msg.includes('invalid authentication token') ||
        msg.includes('invalid authentication') ||
        msg.includes('authentication failed') ||
        msg.includes('unauthorized') ||
        msg.includes('forbidden') ||
        msg.includes('no authentication token provided')
      );
    });

    if (hasAuthError) {
      throw new Error(result.errors[0]?.message || 'Authentication error');
    }
  }

  return result;
}
