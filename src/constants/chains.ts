import { swapCatUpgradeableABI } from 'src/abis';
import { EthereumSVG, GnosisSVG } from 'src/assets';

import { Contracts, ContractsID } from './contracts';
import { Currency, DAI, ETH } from './currencies';

export enum ChainsID {
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
    rpcUrl: 'https://gnosischain-rpc.gateway.pokt.network/',
    blockExplorerUrl: 'https://blockscout.com/xdai/mainnet/',
    contracts: {
      [ContractsID.swapCatUpgradeable]: {
        abi: swapCatUpgradeableABI,
        address: '0xeaBE3576be937B6d2B40Bd58Da0a7e7f4FAa2632',
        // address: '0x9EC2D0A68e9F49B37e77C63Bc38E58B11D345b3b', // old contract
        metadata: { fromBlock: 7385668 },
      },
    },
  },
  [ChainsID.Goerli]: {
    chainId: ChainsID.Goerli,
    chainName: 'Goerli',
    logo: EthereumSVG.src,
    nativeCurrency: ETH,
    rpcUrl: 'https://goerli.poa.network/',
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    contracts: {
      [ContractsID.swapCatUpgradeable]: {
        abi: swapCatUpgradeableABI,
        address: '0xeaBE3576be937B6d2B40Bd58Da0a7e7f4FAa2632',
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
