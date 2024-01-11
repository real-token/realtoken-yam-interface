import { isAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export const getContract = <T extends Contract>(
  addressOrName: string,
  contractInterface: ContractInterface,
  provider: Web3Provider|JsonRpcProvider,
  account?: string
): T | undefined => {
  if (!isAddress(addressOrName) || addressOrName === AddressZero) {
    return undefined;
  }

  return new Contract(
    addressOrName,
    contractInterface,
    account ? provider.getSigner(account).connectUnchecked() : provider
  ) as T;
};
