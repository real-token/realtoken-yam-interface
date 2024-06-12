import { useMemo } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';

import { getContract } from 'src/utils';

import { useActiveChain } from './useActiveChain';

interface UseComplianceReturn {
  contract: Contract;
  account: string | undefined;
}

interface UseComplianceParam {
  account?: string | undefined;
}

export const useCompliance = (
  param: UseComplianceParam = {},
): UseComplianceReturn | undefined => {
  const { account: connectedAccount, provider } = useWeb3React();

  const account = param.account ?? connectedAccount;

  const activeChain = useActiveChain();

  return useMemo(() => {
    if (!activeChain || !provider) return undefined;

    const { abi, address } = activeChain.compliance;

    const contract = getContract(address, abi, provider, account);

    if (!contract) return undefined;

    return { contract: Object.assign(contract) as Contract, account: account };
  }, [account, activeChain, provider]);
};
