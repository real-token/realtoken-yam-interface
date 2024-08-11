import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? undefined;
if (!apiUrl) {
  throw new Error('Missing "NEXT_PUBLIC_API_URL" var env');
}

const link = createHttpLink({
  uri: apiUrl
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.NEXT_PUBLIC_API_KEY;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});
