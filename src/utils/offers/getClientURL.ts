import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
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
// get the authentication token from local storage if it exists
const token = process.env.NEXT_PUBLIC_API_KEY ?? undefined;
const authBearer =
  {
    Authorization: `Bearer ${token ?? ''}`,
  } ?? {};

export const getYamClient = (
  chainId: number
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: getTheGraphUrlYAM(chainId),
    cache: new InMemoryCache(),
    headers: authBearer,
  });
};

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? undefined;
if (!apiUrl) {
  throw new Error('Missing "NEXT_PUBLIC_API_URL" var env');
}

const link = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  const headersOption = token
    ? { ...headers, Authorization: authBearer.Authorization }
    : { ...headers };
  return {
    headers: headersOption,
  };
});

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
  headers: authBearer,
});
