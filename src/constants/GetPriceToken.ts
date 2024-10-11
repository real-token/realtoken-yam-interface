import { GetPriceTokenCoingecko, GetPriceTokenChainLink } from 'src/types/GetPriceTokens';

import { DaiSvg } from '../assets/currency/Dai';
import { EthSvg } from '../assets/currency/Eth';
import { UsdcSvg } from '../assets/currency/Usdc';
import { UsdtSvg } from '../assets/currency/usdt';
import { ChainsID } from './chains';
import { RegLogo } from '../assets/RegLogo';
import { AllowedToken } from '../types/allowedTokens';

// This is token which we want to get price because not given by TheGraph
export const tokenToGetPrice = new Map<number, (GetPriceTokenChainLink|GetPriceTokenCoingecko)[]>([

  [ChainsID.Sepolia, [
    {
      name: 'USDCRealT',
      symbol: 'USDCRealT',
      contractAddress: '0x803029DB36f37D130d8A005A62c55D17383f6f15',
      logo: UsdcSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E'
      }
    },
    {
      name: 'WETHRealT',
      symbol: 'WETHRealT',
      contractAddress: '0xBDAa060F27D00b9e135C005Ae5Ad0F51C8ba4FD9',
      logo: EthSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x694AA1769357215DE4FAC081bf1f309aDC325306'
      }
    },
    {
      name: 'WXDAIRealT',
      symbol: 'WXDAIRealT',
      contractAddress: '0x292C5840EfE7C3282Ad2EB88a53cDBF2841F0917',
      logo: DaiSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x14866185B1962B63C3Ea9E03Bc1da838bab34C19'
      }
    },
    {
      name: 'REG',
      symbol: 'REG',
      contractAddress: '0x79A55e21ac9332C21c4D190B418Ec0AEBE5916a1',
      logo: RegLogo,
      isBuyToken: true,
      priceFnc: {
        type: 'coingecko-api',
        address: '0x0aa1e96d2a46ec6beb2923de1e61addf5f5f1dce' // allow to get price on other chains
      }
    }
  ]],
  [ChainsID.Ethereum, [
    {
      name: 'USD Coin',
      symbol: 'USDC',
      contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      logo: UsdcSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6'
      }
    },
    {
      name: 'Dai',
      symbol: 'DAI',
      contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      logo: DaiSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9'
      }
    },
    {
      name: 'Tether USDT',
      symbol: 'USDT',
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      logo: UsdtSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D'
      }
    },
    {
      name: 'Liquity USD',
      symbol: 'LUSD',
      contractAddress: '0x5f98805a4e8be255a32880fdec7f6728c6568ba0',
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x3D7aE7E594f2f2091Ad8798313450130d0Aba3a0'
      }
    }
  ]],
  [ChainsID.Gnosis, [
    {
      name: 'USD Coin',
      symbol: 'USDC',
      contractAddress: '0xddafbb505ad214d7b80b1f830fccc89b60fb7a83',
      logo: UsdcSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x26C31ac71010aF62E6B486D1132E266D6298857D'
      }
    },
    {
      name: 'Wrapped XDAI',
      symbol: 'WXDAI',
      contractAddress: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
      logo: DaiSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x678df3415fc31947dA4324eC63212874be5a82f8'
      }
    },
    {
      name: 'RMMv3 Xdai',
      symbol: 'armmv3WXDAI',
      contractAddress: '0x0ca4f5554dd9da6217d62d8df2816c82bba4157b',
      logo: DaiSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x678df3415fc31947dA4324eC63212874be5a82f8'
      }
    },
    {
      name: 'RMMv3 USDC',
      symbol: 'armmv3USDC',
      contractAddress: '0xed56f76e9cbc6a64b821e9c016eafbd3db5436d1',
      logo: UsdcSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x26C31ac71010aF62E6B486D1132E266D6298857D'
      }
    },
    {
      name: 'REG',
      symbol: 'REG',
      contractAddress: '0x0aa1e96d2a46ec6beb2923de1e61addf5f5f1dce',
      logo: RegLogo,
      isBuyToken: true,
      priceFnc: {
        type: 'coingecko-api'
      }
    }
  ]]
])

export const getAllowedBuyTokens = (chainId: number): AllowedToken[] => {
  return tokenToGetPrice.get(chainId)?.filter(token => token.isBuyToken) ?? [] as AllowedToken[];
}

export const getExtendedTokens = (chainId: number): AllowedToken[] => {
  return tokenToGetPrice.get(chainId)?.filter(token => !token.isBuyToken) ?? [] as AllowedToken[];
}