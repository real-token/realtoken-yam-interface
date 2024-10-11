import { FC } from 'react';

import {
  EthereumLogo,
  GnosisLogo,
  Chain as RealtChains,
} from '@realtoken/realt-commons';

import { realTokenYamUpgradeableABI } from 'src/abis';

import { Contracts, ContractsID } from './contracts';
import { Currency, DAI, ETH } from './currencies';

export enum ChainsID {
  Ethereum = 0x01,
  Gnosis = 0x64,
  Sepolia = 0xaa36a7
}

export type Chain = Omit<RealtChains, 'blockExplorerUrl'> & {
  chainId: ChainsID;
  chainName: string;
  logo: FC;
  nativeCurrency: Currency;
  rpcUrl: string;
  blockExplorerUrl: string;
  contracts: Contracts;
  graphPrefixes: {
    yam: string;
    realtoken: string;
  };
  coingeckoNetworkId: string;
};

export const CHAINS: Record<ChainsID, Chain> = {
  [ChainsID.Gnosis]: {
    chainId: ChainsID.Gnosis,
    chainName: 'Gnosis Chain',
    logo: GnosisLogo,
    nativeCurrency: DAI,
    rpcUrl: 'https://endpoints.omniatech.io/v1/gnosis/mainnet/public',
    blockExplorerUrl: 'https://gnosisscan.io/',
    isTestnet: false,
    graphPrefixes: {
      yam: 'yamGnosis',
      realtoken: 'realTokenGnosis',
    },
    contracts: {
      [ContractsID.realTokenYamUpgradeable]: {
        abi: realTokenYamUpgradeableABI,
        address: '0xc759aa7f9dd9720a1502c104dae4f9852bb17c14',
        metadata: { fromBlock: 25530390 },
      },
    },
    coingeckoNetworkId: 'xdai'
  },
  [ChainsID.Ethereum]: {
    chainId: ChainsID.Ethereum,
    chainName: 'Ethereum',
    logo: EthereumLogo,
    nativeCurrency: ETH,
    rpcUrl: 'https://rpc.ankr.com/eth',
    blockExplorerUrl: 'https://etherscan.io/',
    isTestnet: false,
    graphPrefixes: {
      yam: 'yamEth',
      realtoken: 'realTokenEth',
    },
    contracts: {
      [ContractsID.realTokenYamUpgradeable]: {
        abi: realTokenYamUpgradeableABI,
        address: '0xc759aa7f9dd9720a1502c104dae4f9852bb17c14',
        metadata: { fromBlock: 16220000 },
      },
    },
    coingeckoNetworkId: 'eth'
  },

  [ChainsID.Sepolia]: {
    chainId: ChainsID.Sepolia,
    chainName: 'Sepolia',
    logo: EthereumLogo,
    nativeCurrency: ETH,
    rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    isTestnet: true,
    graphPrefixes: {
      yam: 'yamSepolia',
      realtoken: 'realTokenSepolia',
    },
    contracts: {
      [ContractsID.realTokenYamUpgradeable]: {
        abi: realTokenYamUpgradeableABI,
        address: '0x1d27e09C95422629A88b865026bfB270Eed7bc18'.toLowerCase(),
        metadata: { fromBlock: 5913460 },
      },
    },
    coingeckoNetworkId: 'eth'
  }
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

export const ALLOWED_CHAINS_ID = Object.keys(CHAINS);

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
