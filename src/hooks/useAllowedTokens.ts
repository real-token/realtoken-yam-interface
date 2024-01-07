import { useWeb3React } from '@web3-react/core';

import {
  ethereumAllowedTokens,
  gnosisAllowedTokens,
  goerliAllowedTokens,
} from 'src/constants/allowedBuyTokens';
import { AllowedToken } from 'src/types/allowedTokens';
import { Offer } from 'src/types/offer/Offer';
import { getTokenOffer, getTokenToBuyWith } from 'src/utils/offers/TokenOffer';

type useAllowedBuyTokensReturn = {
  allowedTokens: AllowedToken[];
  getTokenOffer: (offer: Offer) => AllowedToken | undefined;
  getTokenToBuyWith: (offer: Offer) => AllowedToken | undefined;
};

export const getRightAllowBuyTokens = (
  chainId: number | undefined
): AllowedToken[] => {
  switch (chainId) {
    case 1:
      return ethereumAllowedTokens;
    case 5:
      return goerliAllowedTokens;
    case 100:
      return gnosisAllowedTokens;
    default:
      return [];
  }
};

export const useAllowedTokens = (): useAllowedBuyTokensReturn => {
  const { chainId } = useWeb3React();
  const allowedTokens = getRightAllowBuyTokens(chainId);
  return {
    allowedTokens: allowedTokens,
    getTokenOffer: (offer: Offer) => getTokenOffer(allowedTokens, offer),
    getTokenToBuyWith: (offer: Offer) =>
      getTokenToBuyWith(allowedTokens, offer),
  };
};
