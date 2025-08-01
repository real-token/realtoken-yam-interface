import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';

import { Address } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { Erc20ABI } from 'src/abis';
import { PropertiesToken } from 'src/types';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';

import { usePropertiesToken } from './usePropertiesToken';

type UseCreatedOffer = (createdOffer: CreatedOffer | undefined) => {
  offerTokenSymbol: string | undefined;
  buyTokenSymbol: string | undefined;
};

export const useCreatedOffer: UseCreatedOffer = (createdOffer) => {
  const { propertiesToken } = usePropertiesToken();
  const { address: account } = useAccount();

  const config = useConfig();

  const { data } = useQuery({
    queryKey: [
      'tokenSymbols',
      createdOffer?.offerTokenAddress,
      createdOffer?.buyerTokenAddress,
    ],
    enabled:
      !!createdOffer?.offerTokenAddress &&
      !!createdOffer?.buyerTokenAddress &&
      !!propertiesToken,
    queryFn: async () => {
      if (!createdOffer || !account || !config || !propertiesToken) return;

      let offerTokenSymbol: string | undefined;
      let buyTokenSymbol: string | undefined;

      const offerTokenIsRealToken: PropertiesToken | undefined =
        propertiesToken.find(
          (propertiesToken) =>
            propertiesToken.contractAddress.toLowerCase() ==
            createdOffer.offerTokenAddress.toLowerCase()
        );
      if (offerTokenIsRealToken) {
        offerTokenSymbol = offerTokenIsRealToken.shortName;
      } else {
        const symbol = await readContract(config, {
          abi: Erc20ABI,
          address: createdOffer.offerTokenAddress as Address,
          functionName: 'symbol',
        });
        offerTokenSymbol = symbol;
      }

      const buyTokenIsRealToken: PropertiesToken | undefined =
        propertiesToken.find(
          (propertiesToken) =>
            propertiesToken.contractAddress.toLowerCase() ==
            createdOffer.buyerTokenAddress.toLowerCase()
        );
      if (buyTokenIsRealToken) {
        buyTokenSymbol = buyTokenIsRealToken.shortName;
      } else {
        const symbol = await readContract(config, {
          abi: Erc20ABI,
          address: createdOffer.buyerTokenAddress as Address,
          functionName: 'symbol',
        });
        buyTokenSymbol = symbol;
      }

      return {
        offerTokenSymbol,
        buyTokenSymbol,
      };
    },
  });

  return {
    offerTokenSymbol: data?.offerTokenSymbol,
    buyTokenSymbol: data?.buyTokenSymbol,
  };
};
