import { useWeb3React } from '@web3-react/core';

import {
  ethereumAllowedTokens,
  gnosisAllowedTokens,
  goerliAllowedTokens,
} from 'src/constants/allowedBuyTokens';
import { AllowedToken } from 'src/types/allowedTokens';

type useAllowedBuyTokensReturn = {
  allowedTokens: AllowedToken[];
};

const getRightAllowBuyTokens = (
  chainId: number | undefined
): AllowedToken[] => {
  switch (chainId) {
    case 1:
      return ethereumAllowedTokens;
    case 5:
      return gnosisAllowedTokens;
    case 100:
      return goerliAllowedTokens;
    default:
      return [];
  }
};

export const useAllowedTokens = (): useAllowedBuyTokensReturn => {
  const { chainId } = useWeb3React();

  return {
    allowedTokens: getRightAllowBuyTokens(chainId),
  };
};
