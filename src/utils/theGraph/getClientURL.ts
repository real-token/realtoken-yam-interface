import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { UrlTheGraphToken, UrlTheGraphYam } from 'src/constants';

export const getTheGraphUrlYAM = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return UrlTheGraphYam.Eth;
    case 5:
      return UrlTheGraphYam.Goerli;
    case 100:
      return UrlTheGraphYam.Gnosis;
    default:
      return '';
  }
};

export const getTheGraphUrlRealtoken = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return UrlTheGraphToken.Eth;
    case 5:
      return UrlTheGraphToken.Goerli;
    case 100:
      return UrlTheGraphToken.Gnosis;
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

export const getRealTokenClient = (
  chainId: number
): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: getTheGraphUrlRealtoken(chainId),
    cache: new InMemoryCache(),
  });
};
