import { useChainId } from 'wagmi';

import { AllowedToken } from 'src/types/allowedTokens';

import { getAllowedBuyTokens } from '../constants/GetPriceToken';

type useAllowedBuyTokensReturn = {
  allowedTokens: AllowedToken[];
};

export const getRightAllowBuyTokens = (
  chainId: number | undefined
): AllowedToken[] => {
  if (!chainId) return [];
  return getAllowedBuyTokens(chainId);
};

export const useAllowedTokens = (): useAllowedBuyTokensReturn => {
  const chainId = useChainId();
  return {
    allowedTokens: getRightAllowBuyTokens(chainId),
  };
};
