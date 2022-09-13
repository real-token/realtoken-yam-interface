import { JsonFragment } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';

import { SwapCatUpgradeable } from 'src/abis';

export enum ContractsID {
  swapCatUpgradeable = 'swapCatUpgradeable',
}

type Metadata<T extends ContractsID> = T extends ContractsID.swapCatUpgradeable
  ? {
      metadata: {
        fromBlock: number;
      };
    }
  : { metadata?: never };

export type TypedContract<T extends ContractsID> = Metadata<T> &
  (T extends ContractsID.swapCatUpgradeable ? SwapCatUpgradeable : Contract);

export type Contracts = {
  [contract in ContractsID]: {
    abi: ReadonlyArray<JsonFragment>;
    address: string;
  } & Metadata<contract>;
};
