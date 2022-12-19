import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';

import {
  ethereumAllowedBuyTokens,
  gnosisAllowedBuyTokens,
  goerliAllowedBuyTokens,
} from 'src/constants/allowedBuyTokens';
import { AllowedBuyToken } from 'src/types/allowedBuyTokens';

type useAllowedBuyTokensReturn = {
  allowedBuyTokens: AllowedBuyToken[];
};

const getRightAllowBuyTokens = (
  chainId: number | undefined
): AllowedBuyToken[] => {
  switch (chainId) {
    case 1:
      return ethereumAllowedBuyTokens;
    case 5:
      return goerliAllowedBuyTokens;
    case 100:
      return gnosisAllowedBuyTokens;
    default:
      return [];
  }
};

export const useAllowedBuyTokens = (): useAllowedBuyTokensReturn => {
  const { chainId } = useWeb3React();

  return {
    allowedBuyTokens: getRightAllowBuyTokens(chainId),
  };
};
