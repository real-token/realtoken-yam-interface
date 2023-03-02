import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PropertiesToken } from 'src/types';
import { usePropertiesToken } from './usePropertiesToken';

export type TokenInfo = {
  fullName: string;
  tokenPrice: number;
};

type UseTokenInfo = (sellerTokenAddress: string, buyerTokenAddress: string) => {
  tokenInfo: TokenInfo;
  refreshState: [boolean, Dispatch<SetStateAction<boolean>>];
};
export const useTokenInfo: UseTokenInfo = (sellerTokenAddress,buyerTokenAddress) => {
  // const { api } = useAPIGoerli(tokenAddress);
  const { propertiesToken } = usePropertiesToken();
  const [isRefreshing, triggerRefresh] = useState<boolean>(true);

  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    fullName: 'undefined',
    tokenPrice: 0,
  });

  const contract: PropertiesToken = propertiesToken?.filter(
    propertyToken => (propertyToken.contractAddress == sellerTokenAddress || propertyToken.contractAddress == buyerTokenAddress)
  )[0];

  useEffect(() => {
    if (!isRefreshing || !propertiesToken) return;
    
    let tokenInfoFetched: TokenInfo|undefined;
    if(contract){
      tokenInfoFetched = {
        fullName: contract.fullName != "" ? contract.fullName : contract.shortName,
        tokenPrice: contract.officialPrice ?? 0,
      };
    }

    if (contract && tokenInfoFetched) {
      setTokenInfo(tokenInfoFetched);
      triggerRefresh(false);
    }
  },[isRefreshing, propertiesToken, contract])  

  return { tokenInfo: tokenInfo, refreshState: [isRefreshing, triggerRefresh] };
};