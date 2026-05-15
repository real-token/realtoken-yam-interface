import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

declare const __DEV_API_BEARER__: string;

function getDevApiBearer(): string | undefined {
  if (!import.meta.env.DEV) return undefined;
  const bearer = __DEV_API_BEARER__?.trim();
  return bearer || undefined;
}

export const apiUrl = import.meta.env.VITE_API_URL ?? undefined;
if (!apiUrl) {
  throw new Error('Missing "VITE_API_URL" var env');
}

const devApiBearer = getDevApiBearer();

const link = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...(devApiBearer ? { Authorization: `Bearer ${devApiBearer}` } : {}),
    },
  };
});

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});
