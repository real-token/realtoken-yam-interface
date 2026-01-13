import { AAClientConfig, TorusConfig } from '@real-token/aa-core';
import { RealTokenUiNetworkConfig } from '@real-token/core';
import { LogoProps } from '@real-token/types';
import { EthereumLogo, GnosisLogo } from '@real-token/ui-components';

import { Address } from 'viem';

const env = process.env.NEXT_PUBLIC_NODE_ENV ?? 'production';

const sepoliaWssUrl = process.env.NEXT_PUBLIC_SEPOLIA_WSS_URL;
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
if (!sepoliaWssUrl || !sepoliaRpcUrl) {
  throw new Error('SEPOLIA_WSS_URL and SEPOLIA_RPC_URL env var must be set');
}

const gnosisWssUrl = process.env.NEXT_PUBLIC_GNOSIS_WSS_URL;
const gnosisRpcUrl = process.env.NEXT_PUBLIC_GNOSIS_RPC_URL;
if (!gnosisWssUrl || !gnosisRpcUrl) {
  throw new Error('GNOSIS_WSS_URL and GNOSIS_RPC_URL env var must be set');
}

const ethWssUrl = process.env.NEXT_PUBLIC_ETH_WSS_URL;
const ethRpcUrl = process.env.NEXT_PUBLIC_ETH_RPC_URL;
if (!ethWssUrl || !ethRpcUrl) {
  throw new Error('ETH_WSS_URL and ETH_RPC_URL env var must be set');
}

const web3AuthApiKey = process.env.NEXT_PUBLIC_WEB3_AUTH_API_KEY;
if (!web3AuthApiKey) {
  throw new Error('NEXT_PUBLIC_WEB3_AUTH_API_KEY env var must be set');
}

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECTID;
if (!wcProjectId) {
  throw new Error('NEXT_PUBLIC_WC_PROJECTID env var must be set');
}

export const gnosisChainId = '0x64';

export interface ExtendedChainConfig extends RealTokenUiNetworkConfig {
  blockExplorerUrl: string;
  isTestnet: boolean;
  graphPrefix: {
    realToken: string;
    yam: string;
    aaEtherspot?: string;
  };
  contracts: {
    realTokenYamUpgradeableAddress: Address;
  };
  isVisibleOnInterface: boolean;
  v2Logo?: (props: LogoProps) => React.ReactNode;
  logoUrlNetworkId?: string; // for logo
  color?: string;
  coingeckoNetworkId: string;
  serverChainId: string;
}

export const networks: ExtendedChainConfig[] = [
  {
    wsTarget: sepoliaWssUrl,
    rpcTarget: sepoliaRpcUrl,
    fallbackRpcTargets: [],
    fallbackWsTargets: [],
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    isTestnet: true,
    decimals: 18,
    logo: '',
    chainLogo: EthereumLogo,
    chainId: '0xaa36a7',
    serverChainId: 'sepolia',
    displayName: 'Sepolia',
    chainNamespace: 'eip155',
    ticker: 'ETH',
    tickerName: 'Sepolia ETH',
    graphPrefix: {
      realToken: 'realTokenSepolia',
      yam: 'yamSepolia',
    },
    contracts: {
      realTokenYamUpgradeableAddress:
        '0x1d27e09c95422629a88b865026bfb270eed7bc18',
    },
    coingeckoNetworkId: 'xdai',
    // nativeToken: {
    //   name: 'Sepolia ETH',
    //   symbol: 'ETH',
    //   address: ZERO_ADDRESS,
    //   logo: '/tokens/eth.svg',
    //   decimals: 18,
    //   priceFnc: {
    //     type: 'chainlink',
    //     contractAddress: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
    //   },
    // },
    // tokens: [
    //   {
    //     name: 'USDCRealT',
    //     symbol: 'USDCRealT',
    //     address: '0x803029DB36f37D130d8A005A62c55D17383f6f15',
    //     decimals: 6,
    //     logo: '/tokens/usdc.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E',
    //     },
    //   },
    //   {
    //     name: 'WETHRealT',
    //     symbol: 'WETHRealT',
    //     address: '0xBDAa060F27D00b9e135C005Ae5Ad0F51C8ba4FD9',
    //     decimals: 18,
    //     logo: '/tokens/weth.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
    //     },
    //   },
    //   {
    //     name: 'WXDAIRealT',
    //     symbol: 'WXDAIRealT',
    //     address: '0x292C5840EfE7C3282Ad2EB88a53cDBF2841F0917',
    //     decimals: 18,
    //     logo: '/tokens/wxdai.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x14866185B1962B63C3Ea9E03Bc1da838bab34C19',
    //     },
    //   },
    //   {
    //     name: 'REG',
    //     symbol: 'REG',
    //     address: '0x79A55e21ac9332C21c4D190B418Ec0AEBE5916a1',
    //     decimals: 18,
    //     logo: '/tokens/reg.jpg',
    //     priceFnc: {
    //       type: 'coingecko-api',
    //     },
    //   },
    // ],
    isVisibleOnInterface: true,
    v2Logo: EthereumLogo,
    color: '#444971',
  },
  {
    wsTarget: gnosisWssUrl,
    rpcTarget: gnosisRpcUrl,
    fallbackRpcTargets: [],
    fallbackWsTargets: [],
    blockExplorerUrl: 'https://gnosisscan.io/',
    isTestnet: false,
    decimals: 18,
    logo: '',
    chainLogo: GnosisLogo,
    chainId: gnosisChainId,
    serverChainId: 'xdai',
    displayName: 'Gnosis',
    chainNamespace: 'eip155',
    ticker: 'xDai',
    tickerName: 'xDai',
    graphPrefix: {
      realToken: 'realTokenGnosis',
      yam: 'yamGnosis',
      aaEtherspot: 'aaEtherspotGnosis',
    },
    contracts: {
      realTokenYamUpgradeableAddress:
        '0xc759aa7f9dd9720a1502c104dae4f9852bb17c14',
    },
    // nativeToken: {
    //   name: 'xDai',
    //   symbol: 'xDAI',
    //   address: ZERO_ADDRESS,
    //   decimals: 18,
    //   logo: '/tokens/xdai.svg',
    //   priceFnc: {
    //     type: 'chainlink',
    //     contractAddress: '0x678df3415fc31947dA4324eC63212874be5a82f8',
    //   },
    // },
    // tokens: [
    //   {
    //     address: '0x0AA1e96D2a46Ec6beB2923dE1E61Addf5F5f1dce',
    //     name: 'RealToken Ecosystem Governance',
    //     symbol: 'REG',
    //     decimals: 18,
    //     logo: '/tokens/reg.jpg',
    //     priceFnc: {
    //       type: 'coingecko-api',
    //     },
    //   },
    //   {
    //     name: 'RealToken Ecosystem USD',
    //     symbol: 'REUSD',
    //     address: '0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9',
    //     logo: '/tokens/realt-token.svg',
    //     decimals: 18,
    //     priceFnc: {
    //       type: 'custom-fnc',
    //       fnc: () => Promise.resolve(1.0),
    //     },
    //   },
    //   {
    //     address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    //     name: 'USD//C on xDai',
    //     symbol: 'USDC',
    //     decimals: 6,
    //     logo: '/tokens/usdc.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x26C31ac71010aF62E6B486D1132E266D6298857D',
    //     },
    //   },
    //   {
    //     address: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
    //     name: 'Wrapped XDAI',
    //     symbol: 'WXDAI',
    //     decimals: 18,
    //     logo: '/tokens/wxdai.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x678df3415fc31947dA4324eC63212874be5a82f8',
    //     },
    //   },
    //   {
    //     address: '0x0cA4f5554Dd9Da6217d62D8df2816c82bba4157b',
    //     name: 'RealT RMM V3 WXDAI',
    //     symbol: 'armmv3WXDAI',
    //     decimals: 18,
    //     logo: '/tokens/armmwxdai.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x678df3415fc31947dA4324eC63212874be5a82f8',
    //     },
    //   },
    //   {
    //     address: '0xeD56F76E9cBC6A64b821e9c016eAFbd3db5436D1',
    //     name: 'RealT RMM V3 USDC',
    //     symbol: 'armmv3USDC',
    //     decimals: 6,
    //     logo: '/tokens/usdc.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x26C31ac71010aF62E6B486D1132E266D6298857D',
    //     },
    //   },
    // ],
    isVisibleOnInterface: true,
    v2Logo: GnosisLogo,
    color: '#81D48A',
    coingeckoNetworkId: 'xdai',
    logoUrlNetworkId: 'gnosis-chain',
  },
  {
    wsTarget: ethWssUrl,
    rpcTarget: ethRpcUrl,
    fallbackRpcTargets: [],
    fallbackWsTargets: [],
    blockExplorerUrl: 'https://etherscan.io/',
    isTestnet: false,
    decimals: 18,
    logo: '',
    chainLogo: EthereumLogo,
    chainId: '0x1',
    serverChainId: 'eth',
    displayName: 'Ethereum',
    chainNamespace: 'eip155',
    ticker: 'eth',
    tickerName: 'ETH',
    graphPrefix: {
      realToken: 'realTokenEth',
      yam: 'yamEth',
    },
    contracts: {
      realTokenYamUpgradeableAddress:
        '0xc759aa7f9dd9720a1502c104dae4f9852bb17c14',
    },
    // nativeToken: {
    //   name: 'eth',
    //   symbol: 'ETH',
    //   address: ZERO_ADDRESS,
    //   logo: '/tokens/eth.svg',
    //   decimals: 18,
    //   priceFnc: {
    //     type: 'chainlink',
    //     contractAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    //   },
    // },
    // tokens: [
    //   {
    //     address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    //     name: 'USDC',
    //     symbol: 'USDC',
    //     decimals: 6,
    //     logo: '/tokens/usdc.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
    //     },
    //   },
    //   {
    //     name: 'RealToken Ecosystem USD',
    //     symbol: 'REUSD',
    //     address: '0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9',
    //     logo: '/tokens/realt-token.svg',
    //     decimals: 18,
    //     priceFnc: {
    //       type: 'custom-fnc',
    //       fnc: () => Promise.resolve(1.0),
    //     },
    //   },
    //   {
    //     address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    //     name: 'DAI',
    //     symbol: 'DAI',
    //     decimals: 18,
    //     logo: '/tokens/dai.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
    //     },
    //   },
    //   {
    //     address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    //     name: 'Wrapped BTC',
    //     symbol: 'WBTC',
    //     decimals: 8,
    //     logo: '/tokens/wbtc.svg',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    //     },
    //   },
    //   {
    //     name: 'Tether USDT',
    //     symbol: 'USDT',
    //     address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    //     decimals: 6,
    //     logo: '',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
    //     },
    //   },
    //   {
    //     name: 'Liquity USD',
    //     symbol: 'LUSD',
    //     address: '0x5f98805a4e8be255a32880fdec7f6728c6568ba0',
    //     decimals: 18,
    //     logo: '',
    //     priceFnc: {
    //       type: 'chainlink',
    //       contractAddress: '0x3D7aE7E594f2f2091Ad8798313450130d0Aba3a0',
    //     },
    //   },
    // ],
    isVisibleOnInterface: true,
    v2Logo: EthereumLogo,
    logoUrlNetworkId: 'ethereum',
    coingeckoNetworkId: 'eth',
  },
];

const torusConfig: TorusConfig = {
  mfaLevel: 'optional',
  networks:
    env === 'development' || env == 'local' || env == 'testnet'
      ? networks
      : networks.filter((network) => !network.isTestnet),
  enableLogging: true,
  ...(env == 'production' || env == 'staging'
    ? {
        loginConfig: {
          facebook: {
            name: 'facebook',
            authConnectionId: 'realt-facebook',
            authConnection: 'facebook',
            showOnModal: true,
          },
          twitch: {
            name: 'twitch',
            authConnectionId: 'realt-twitchtv',
            authConnection: 'twitch',
            showOnModal: true,
          },
          discord: {
            name: 'discord',
            authConnectionId: 'realt-discord',
            authConnection: 'discord',
            showOnModal: true,
          },
          google: {
            name: 'google',
            authConnectionId: 'realt-google',
            authConnection: 'google',
          },
          email_passwordless: {
            name: 'email_passwordless',
            authConnectionId: 'realt-passwordless',
            authConnection: 'email_passwordless',
          },
        },
      }
    : {}),
};

export const aaClient: AAClientConfig = {
  uiConfig: {
    appName: 'Yam | You & Me',
    appUrl: 'https://yam.realtoken.network',
    defaultLanguage: 'en',
    mode: 'dark',
    logoLight: 'https://realt.co/wp-content/uploads/2019/04/RealT_Logo.svg',
    logoDark: 'https://realt.co/wp-content/uploads/2019/04/RealT_Logo.svg',
    theme: {
      primary: '#512376',
      onPrimary: '#FFFFFF',
    },
  },
  web3auth: {
    apiKey: web3AuthApiKey,
    network:
      env === 'development' || env == 'local' || env == 'testnet'
        ? 'sapphire_devnet'
        : 'sapphire_mainnet' /* Network of your web3auth project */,
    uxMode: 'redirect',
  },
  // chainIdHex: env === "local" || env === "testnet" ? "0xaa36a7" : "0x64",
  chainId: 0x64,
  etherspotApiKey:
    process.env.NEXT_PUBLIC_ETHERSPOT_KEY ??
    '' /* Etherspot api key - currently not needed */,
  torusConfig: torusConfig,
  guardians: [
    // RealT guardians
    '0x8422207d24321c9d753c6806ca6b8448bb3dd465',
    '0x4fedcd237908287d0c4f9ad36ec2c9252196edb1',
    '0xa463bba1a71b7ed9dec676bad3b887e26c591db1',
  ], // optional array of guardians addresses to use within the initializeGuardians function
  walletconnect: {
    projectId: wcProjectId /* WalletConnect Project Id */,
    relayUrl: 'wss://relay.walletconnect.com',
    name: 'RealToken Wallet',
    description: 'RealToken account abstraction wallet',
    icons: ['https://avatars.githubusercontent.com/u/53057739'],
    url: process.env.NEXT_PUBLIC_WC_URL ?? '',
  },
};
