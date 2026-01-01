import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthService } from '../auth/authService';

// ⚠️ IMPORTANT: Ne pas initialiser AuthService au niveau du module
// Cela causerait des race conditions lors du build Next.js (plusieurs processus)
// L'initialisation se fait de manière lazy dans getTokenAsync() quand nécessaire
// OU utilisez AUTH_TOKEN dans .env pour éviter complètement le login automatique

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? undefined;
if (!apiUrl) {
  throw new Error('Missing "NEXT_PUBLIC_API_URL" var env');
}

const link = createHttpLink({
  uri: apiUrl,
});

// Créer un authLink pour l'API principale (serveur uniquement)
const authLink = setContext(async (_, { headers }) => {
  // Seulement côté serveur
  if (typeof window !== 'undefined') {
    return { headers };
  }

  const token = await AuthService.getTokenAsync();
  
  // Debug: logger le token seulement si nécessaire (commenté pour réduire les logs)
  // if (token) {
  //   console.log('[getClientURL] Token disponible, longueur:', token.length, 'Début:', token.substring(0, 20) + '...');
  // } else {
  //   console.warn('[getClientURL] ⚠ Aucun token disponible');
  // }
  
  // Ne envoyer le header Authorization QUE si on a un token
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  
  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

/**
 * Client Apollo pour l'API principale (serveur uniquement)
 * Utilisé uniquement dans les endpoints API Next.js
 */
export const apiClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          realTokenGnosis: {
            // Fusionner les résultats en remplaçant complètement l'ancien résultat
            // car RealTokenGnosisQuery n'a pas d'ID unique
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: authLink.concat(link),
});
