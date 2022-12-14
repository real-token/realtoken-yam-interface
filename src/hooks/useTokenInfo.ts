import { useWeb3React } from '@web3-react/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { PropertiesToken } from 'src/types';

import { useAPIGoerli } from './useAPIGoerli';
import { useAsync } from './useAsync';
import { usePropertiesToken } from './usePropertiesToken';

export type TokenInfo = {
  fullName: string;
  tokenPrice: number;
};

type UseTokenInfo = (tokenAddress: string) => {
  tokenInfo: TokenInfo;
  refreshState: [boolean, Dispatch<SetStateAction<boolean>>];
};
export const useTokenInfo: UseTokenInfo = (tokenAddress) => {
  const { api } = useAPIGoerli(tokenAddress);
  const { propertiesToken } = usePropertiesToken();
  const [isRefreshing, triggerRefresh] = useState<boolean>(true);
  const { chainId } = useWeb3React();

  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    fullName: 'undefined',
    tokenPrice: 0,
  });

  useAsync(
    async (isActive) => {
      if (!api || !isRefreshing || !propertiesToken) return;

      // TODO: Reemove bypass
      let tokenInfoFetched: TokenInfo|undefined = undefined;
      if(chainId == 5){

        const contract: PropertiesToken = propertiesToken.filter(propertyToken => propertyToken.contractAddress == tokenAddress)[0];

        tokenInfoFetched = {
          fullName: contract.fullName,
          tokenPrice: 0,
        };

      }else{
        tokenInfoFetched = {
          fullName: api.fullName,
          tokenPrice: api.tokenPrice,
        };
      }

      if (isActive() && tokenInfoFetched) {
        setTokenInfo(tokenInfoFetched);
        triggerRefresh(false);
      }

      return tokenInfoFetched;
    },
    [api, isRefreshing, propertiesToken]
  );

  return { tokenInfo: tokenInfo, refreshState: [isRefreshing, triggerRefresh] };
};
