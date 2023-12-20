import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
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
  
export const getTheGraphUrlRealtoken = (chainId: number): string => {
    switch (chainId) {
      case 1:
        return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-eth';
      case 5:
        return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-goerli';
      case 100:
        return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-xdai';
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

export const getRealTokenClient = (chainId: number): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
      uri: getTheGraphUrlRealtoken(chainId),
      cache: new InMemoryCache(),
  });
}

export const apiClient = new ApolloClient({
  uri: "https://staging-api.realtoken.network/graphql",
  cache: new InMemoryCache(),
});