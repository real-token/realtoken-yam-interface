import { useMemo } from 'react';

import { useWeb3React } from '@web3-react/core';

import { CHAINS, Chain, ChainsID } from 'src/constants';

type UseActiveChain = () => Chain | undefined;

export const useActiveChain: UseActiveChain = () => {
  const { chainId } = useWeb3React();

  return useMemo(
    () =>
      chainId && chainId in ChainsID ? CHAINS[chainId as ChainsID] : undefined,
    [chainId]
  );
};
