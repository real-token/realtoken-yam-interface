import { JsonFragment } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';

import { RealTokenYamUpgradeable } from 'src/abis';

export enum ContractsID {
  realTokenYamUpgradeable = 'realTokenYamUpgradeable',
  //complianceRegistry = 'complianceRegistry',
}

type Metadata<T extends ContractsID> =
  T extends ContractsID.realTokenYamUpgradeable
    ? {
        metadata: {
          fromBlock: number;
        };
      }
    : { metadata?: never };

export type TypedContract<T extends ContractsID> = Metadata<T> &
  (T extends ContractsID.realTokenYamUpgradeable
    ? RealTokenYamUpgradeable
    : Contract);

export type ContractCSM = {
  abi: ReadonlyArray<JsonFragment>;
  address: string;
};

export type Contracts = {
  [contract in ContractsID]: ContractCSM & Metadata<contract>;
};
