import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

declare const __DEV_API_BEARER__: string;

function getDevApiBearer(): string | undefined {
  if (!import.meta.env.DEV) return undefined;
  const bearer = __DEV_API_BEARER__?.trim();
  return bearer || undefined;
}

export const getTheGraphUrlYAM = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph';
    case 5:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-goerli';
    case 100:
      return 'https://gnosis-mainnet.graph-eu.p2pify.com/144b769c6a2babc002760ad88a90ba24/Yam-Gnosis';
    default:
      return '';
  }
};

export const getYamClient = (
  chainId: number
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: getTheGraphUrlYAM(chainId),
    cache: new InMemoryCache(),
  });
};

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
