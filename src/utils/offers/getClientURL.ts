import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

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

export const getYamClient = (chainId: number): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        uri: getTheGraphUrlYAM(chainId),
        cache: new InMemoryCache(),
    });
}

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? undefined;
if(!apiUrl){
  throw new Error('Missing "NEXT_PUBLIC_API_URL" var env')
}

export const apiClient = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});
