import { Dispatch, SetStateAction, useState } from 'react';

// import { useAPI } from './useAPI';
import { useAPIGoerli } from './useAPIGoerli';
import { useAsync } from './useAsync';

export type TokenInfo = {
  fullName: string;
  tokenPrice: number;
  // shortName: string;
  // symbol: string;
  // currency: string;
  // ethereumContract: string | null;
  // xDaiContract: string;
};

type UseTokenInfo = (tokenAddress: string) => {
  tokenInfo: TokenInfo;
  refreshState: [boolean, Dispatch<SetStateAction<boolean>>];
};
export const useTokenInfo: UseTokenInfo = (tokenAddress) => {
  const { api } = useAPIGoerli(tokenAddress);
  const [isRefreshing, triggerRefresh] = useState<boolean>(true);

  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    fullName: 'undefined',
    tokenPrice: 0,
  });

  useAsync(
    async (isActive) => {
      if (!api || !isRefreshing) return;

      const tokenInfoFetched = {
        fullName: api.fullName,
        tokenPrice: api.tokenPrice,
      };

      if (isActive()) {
        setTokenInfo(tokenInfoFetched);
        triggerRefresh(false);
      }

      return tokenInfoFetched;
    },
    [api, isRefreshing]
  );

  return { tokenInfo: tokenInfo, refreshState: [isRefreshing, triggerRefresh] };
};
