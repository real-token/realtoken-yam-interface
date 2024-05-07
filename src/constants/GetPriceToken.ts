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
  [ChainsID.Goerli, [
    {
      name: 'USDCRealT',
      symbol: 'USDCRealT',
      contractAddress: '0x3e7493506Bc350Ed7f5344196B1842185753bde1',
      logo: UsdcSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0x0d79df66BE487753B02D015Fb622DED7f0E9798d'
      }
    },
    {
      name: 'WETHRealT',
      symbol: 'WETHRealT',
      contractAddress: '0x292C5840EfE7C3282Ad2EB88a53cDBF2841F0917',
      logo: EthSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e'
      }
    },
    {
      name: 'WXDAIRealT',
      symbol: 'WXDAIRealT',
      contractAddress: '0x803029DB36f37D130d8A005A62c55D17383f6f15',
      logo: DaiSvg,
      isBuyToken: true,
      priceFnc: {
        type: 'chainlink',
        contractAddress: '0xAb5c49580294Aff77670F839ea425f5b78ab3Ae7'
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
      name: 'RMMv2 Xdai',
      symbol: 'armmWXDAI',
      contractAddress: '0x7349C9eaA538e118725a6130e0f8341509b9f8A0',
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
      isBuyToken: false,
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