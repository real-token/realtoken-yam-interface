import { useMemo } from 'react';

import { useWeb3React } from '@web3-react/core';

import { ContractsID, TypedContract } from 'src/constants';
import { getContract } from 'src/utils';

import { useActiveChain } from './useActiveChain';

export const useContract = <T extends ContractsID>(contractId: T) => {
  const { account, provider } = useWeb3React();

  const activeChain = useActiveChain();

  return useMemo(() => {
    if (!activeChain || !provider) return undefined;

    const { abi, address, metadata } = activeChain.contracts[contractId];

    const contract = getContract(
      address,
      abi,
      provider,
      account?.toLowerCase()
    );

    if (!contract) return undefined;

    return Object.assign(contract, { metadata }) as TypedContract<T>;
  }, [account, activeChain, contractId, provider]);
};
