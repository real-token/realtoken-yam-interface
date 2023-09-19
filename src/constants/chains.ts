import { FC } from 'react';

import { GnosisLogo, Chain as RealtChains } from '@realtoken/realt-commons';

import { complianceRegistryABI, realTokenYamUpgradeableABI } from 'src/abis';

import { ContractCSM, Contracts, ContractsID } from './contracts';
import { Currency, DAI } from './currencies';

export enum ChainsID {
  // Ethereum = 0x01,
  // Goerli = 0x05,
  Gnosis = 0x64,
}

export type Chain = Omit<RealtChains, 'blockExplorerUrl'> & {
  chainId: ChainsID;
  chainName: string;
  logo: FC;
  nativeCurrency: Currency;
  rpcUrl: string;
  blockExplorerUrl: string;
  contracts: Contracts;
  compliance: ContractCSM;
};

export const CHAINS: Record<ChainsID, Chain> = {
  [ChainsID.Gnosis]: {
    chainId: ChainsID.Gnosis,
    chainName: 'Gnosis Chain',
    logo: GnosisLogo,
    nativeCurrency: DAI,
    rpcUrl: 'https://rpc.ankr.com/gnosis',
    blockExplorerUrl: 'https://gnosisscan.io/',
    isTestnet: false,
    contracts: {
      [ContractsID.realTokenYamUpgradeable]: {
        abi: realTokenYamUpgradeableABI,
        address: '0x7ac028f8fe6e7705292dc13e46a609dd95fc84ba',
        metadata: { fromBlock: 27516835 },
      },
      // [ContractsID.complianceRegistry]: {
      //   abi: complianceRegistryABI,
      //   address: '0x136abcf7271479d087a8187eb991d2a0701d2890',
      // },
    },
    compliance: {
      abi: complianceRegistryABI,
      address: '0x99759357A9923Bb164A7aE8b85703a6882CB84ea',
    },
  },
  // [ChainsID.Goerli]: {
  //   chainId: ChainsID.Goerli,
  //   chainName: 'Goerli',
  //   logo: EthereumLogo,
  //   nativeCurrency: ETH,
  //   rpcUrl: 'https://rpc.ankr.com/eth_goerli',
  //   blockExplorerUrl: 'https://goerli.etherscan.io/',
  //   isTestnet: true,
  //   contracts: {
  //     [ContractsID.realTokenYamUpgradeable]: {
  //       abi: realTokenYamUpgradeableABI,
  //       address: '0xba2e37248804eb636cf4e0b0aba50cf48ab49e2b',
  //       //address: "0xBDAa060F27D00b9e135C005Ae5Ad0F51C8ba4FD9",
  //       metadata: { fromBlock: 7385668 },
  //     },
  //   },
  // },
};

export const URLS = Object.keys(CHAINS).reduce<Record<number, string>>(
  (accumulator, chainId) => {
    accumulator[Number(chainId)] = CHAINS[Number(chainId) as ChainsID].rpcUrl;
    return accumulator;
  },
  {}
);

export const ALLOWED_CHAINS = Object.keys(URLS).map((chainId) =>
  Number(chainId)
);

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
