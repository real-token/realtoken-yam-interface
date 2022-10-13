import { swapCatUpgradeableABI } from 'src/abis';
import { EthereumSVG, GnosisSVG } from 'src/assets';

import { Contracts, ContractsID } from './contracts';
import { Currency, DAI, ETH } from './currencies';

export enum ChainsID {
  Ethereum = 0x01,
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
      [ContractsID.swapCatUpgradeable]: {
        abi: swapCatUpgradeableABI,
        address: '',
        metadata: { fromBlock: 24582116 },
      },
    },
  },
  [ChainsID.Ethereum]: {
    chainId: ChainsID.Ethereum,
    chainName: 'Ethereum',
    logo: EthereumSVG.src,
    nativeCurrency: ETH,
    rpcUrl: 'https://rpc.ankr.com/eth',
    blockExplorerUrl: 'https://etherscan.io/',
    contracts: {
      [ContractsID.swapCatUpgradeable]: {
        abi: swapCatUpgradeableABI,
        address: '',
        metadata: { fromBlock: 15741178 },
      },
    },
  },

  [ChainsID.Goerli]: {
    chainId: ChainsID.Goerli,
    chainName: 'Goerli',
    logo: EthereumSVG.src,
    nativeCurrency: ETH,
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    contracts: {
      [ContractsID.swapCatUpgradeable]: {
        abi: swapCatUpgradeableABI,
        address: '0x171A7f76E8a12aD217611A768968bAf8376ce726',
        // address: '0xeaBE3576be937B6d2B40Bd58Da0a7e7f4FAa2632', // v1 contract
        // address: '0x9EC2D0A68e9F49B37e77C63Bc38E58B11D345b3b', // old contract
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
