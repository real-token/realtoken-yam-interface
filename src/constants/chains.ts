import { realTokenYamUpgradeableABI } from 'src/abis';
import { EthereumSVG, GnosisSVG } from 'src/assets';

import { Contracts, ContractsID } from './contracts';
import { Currency, DAI, ETH } from './currencies';

export enum ChainsID {
  // Ethereum = 0x01,
  Gnosis = 0x64,
  Goerli = 0x05,
}

export type Chain = {
  chainId: ChainsID;
  chainName: string;
  logo: string;
  nativeCurrency: Currency;
  rpcUrl: string;
  blockExplorerUrl: string;
  contracts: Contracts;
};

export const CHAINS: Record<ChainsID, Chain> = {
  [ChainsID.Gnosis]: {
    chainId: ChainsID.Gnosis,
    chainName: 'Gnosis Chain',
    logo: GnosisSVG.src,
    nativeCurrency: DAI,
    rpcUrl: 'https://rpc.ankr.com/gnosis',
    blockExplorerUrl: 'https://gnosisscan.io/',
    contracts: {
      [ContractsID.realTokenYamUpgradeable]: {
        abi: realTokenYamUpgradeableABI,
        address: '0x7ac028f8Fe6e7705292dC13E46a609DD95fc84ba',
        metadata: { fromBlock: 27516835 },
      },
    },
  },
  // [ChainsID.Ethereum]: {
  //   chainId: ChainsID.Ethereum,
  //   chainName: 'Ethereum',
  //   logo: EthereumSVG.src,
  //   nativeCurrency: ETH,
  //   rpcUrl: 'https://rpc.ankr.com/eth',
  //   blockExplorerUrl: 'https://etherscan.io/',
  //   contracts: {
  //     [ContractsID.realTokenYamUpgradeable]: {
  //       abi: realTokenYamUpgradeableABI,
  //       address: '0xc759aa7f9dd9720a1502c104dae4f9852bb17c14',
  //       metadata: { fromBlock: 16220000 },
  //     },
  //   },
  // },

  [ChainsID.Goerli]: {
    chainId: ChainsID.Goerli,
    chainName: 'Goerli',
    logo: EthereumSVG.src,
    nativeCurrency: ETH,
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    contracts: {
      [ContractsID.realTokenYamUpgradeable]: {
        abi: realTokenYamUpgradeableABI,
        address: '0xba2e37248804eb636cf4e0b0aba50cf48ab49e2b',
        //address: "0xBDAa060F27D00b9e135C005Ae5Ad0F51C8ba4FD9",
        metadata: { fromBlock: 7385668 },
      },
    },
  },
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
