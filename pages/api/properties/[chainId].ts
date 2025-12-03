import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { NetworkId } from '@real-token/core';

import { gql } from '@apollo/client';
import { apiClient } from 'src/utils/offers/getClientURL';

import { APIPropertiesToken, PropertiesToken } from 'src/types';

interface BlockchainAddress {
  networkId: number;
  addressToken: string;
}

interface GraphQLToken {
  fullName: string;
  shortName: string;
  symbol: string;
  tokenIdRules: number;
  price: number;
  decimal: number;
  product?: {
    currency: string;
    marketplaceLink: string;
    imageLink: string[];
    rentsValue?: {
      netRentYearlyPerToken: number;
    };
  };
  blockchainAddresses?: BlockchainAddress[];
}

const GET_PROPERTIES_QUERY = gql`
  query getProperties {
    privateApi {
      tokens {
        fullName
        shortName
        symbol
        tokenIdRules
        price
        decimal
        product {
          currency
          marketplaceLink
          imageLink
          rentsValue {
            netRentYearlyPerToken
          }
        }
        blockchainAddresses {
          networkId
          addressToken
        }
      }
    }
  }
`;

const getTokenFromCommunityAPI = new Promise<APIPropertiesToken[]>(
  async (resolve, reject) => {
    try {
      const response = await apiClient.query({
        query: GET_PROPERTIES_QUERY,
      });

      const tokens: GraphQLToken[] = response.data.privateApi.tokens;

      // Transform GraphQL response to APIPropertiesToken format
      const transformedTokens: APIPropertiesToken[] = tokens.map((token) => ({
        fullName: token.fullName,
        shortName: token.shortName,
        symbol: token.symbol,
        tokenPrice: token.price,
        currency: token.product?.currency ?? '',
        uuid: token.tokenIdRules?.toString() ?? '',
        ethereumContract: token.blockchainAddresses?.find((addr: BlockchainAddress) => addr.networkId === 1)?.addressToken ?? '',
        xDaiContract: token.blockchainAddresses?.find((addr: BlockchainAddress) => addr.networkId === 100)?.addressToken ?? '',
        gnosisContract: token.blockchainAddresses?.find((addr: BlockchainAddress) => addr.networkId === 100)?.addressToken ?? '',
        marketplaceLink: token.product?.marketplaceLink ?? '',
        imageLink: token.product?.imageLink ?? [],
        netRentYearPerToken: token.product?.rentsValue?.netRentYearlyPerToken ?? 0,
        tokenIdRules: token.tokenIdRules ?? 0,
        blockchainAddresses: {
          ethereum: {
            chainName: 'ethereum',
            chainId: 1,
            contract: token.blockchainAddresses?.find((addr: BlockchainAddress) => addr.networkId === 1)?.addressToken ?? '',
            distributor: '',
            maintenance: '',
          },
          xDai: {
            chainName: 'xDai',
            chainId: 100,
            contract: token.blockchainAddresses?.find((addr: BlockchainAddress) => addr.networkId === 100)?.addressToken ?? '',
            distributor: '',
            maintenance: '',
          },
          gnosis: {
            chainName: 'gnosis',
            chainId: 100,
            contract: token.blockchainAddresses?.find((addr: BlockchainAddress) => addr.networkId === 100)?.addressToken ?? '',
            distributor: '',
            maintenance: '',
          },
          sepolia: {
            chainName: 'sepolia',
            chainId: 11155111,
            contract: token.blockchainAddresses?.find((addr: BlockchainAddress) => addr.networkId === 11155111)?.addressToken ?? '',
            distributor: '',
            maintenance: '',
          },
        },
      }));

      resolve(transformedTokens);
    } catch (err) {
      console.error('Failed to fetch properties from GraphQL API');
      reject(err);
    }
  }
);

const getContractAddressFromChainId = (chainId: number): string | undefined => {
  let addressKey;
  switch (chainId) {
    case Number(NetworkId.ethereum):
      addressKey = 'ethereum';
      break;
    case Number(NetworkId.gnosis):
      addressKey = 'xDai';
      break;
    case Number(NetworkId.sepolia):
      addressKey = 'sepolia';
      break;
  }
  return addressKey;
};

const getTokens = async (
  chainId: number,
  communityProperties: APIPropertiesToken[]
): Promise<PropertiesToken[]> => {
  const propertiesNonFiltered: PropertiesToken[] = [];

  const contractKey = getContractAddressFromChainId(chainId);

  // if(chainId == ChainsID.Sepolia){

  //     const chainConfig = CHAINS[ChainsID.Sepolia];
  //     const { graphPrefixes } = chainConfig;

  //     //
  //     const res = await apiClient.query({
  //         query: gql`
  //             query getTokens{
  //                 ${graphPrefixes.realtoken}{
  //                     tokens{
  //                         tokenId
  //                         address
  //                     }
  //                 }
  //             }
  //         `
  //     })
  //     const properties: any[] = res.data[graphPrefixes.realtoken].tokens;

  //     properties.forEach((propertie) => {
  //         const propertiesCommunity = communityProperties.find((token) => token.tokenIdRules == propertie.tokenId);
  //         if(propertiesCommunity){
  //             propertiesNonFiltered.push({
  //                 ...propertiesCommunity,
  //                 contractAddress: propertie.address,
  //                 officialPrice: propertiesCommunity.tokenPrice,
  //                 annualYield: propertiesCommunity.tokenPrice ? propertiesCommunity.netRentYearPerToken/propertiesCommunity.tokenPrice : 0
  //             })
  //         }
  //     })

  // }else{

  communityProperties.forEach((propertyToken: APIPropertiesToken) => {
    // console.log(propertyToken.blockchainAddresses);
    const contractAddress =
      propertyToken.blockchainAddresses[
        contractKey as keyof typeof propertyToken.blockchainAddresses
      ]?.contract;
    // console.log(contractAddress);
    if (contractAddress) {
      propertiesNonFiltered.push({
        uuid: propertyToken.uuid,
        shortName: propertyToken.shortName,
        fullName: propertyToken.fullName,
        contractAddress: contractAddress.toLowerCase(),
        officialPrice: propertyToken.tokenPrice,
        currency: propertyToken.currency,
        marketplaceLink: propertyToken.marketplaceLink,
        imageLink: propertyToken.imageLink,
        netRentYearPerToken: propertyToken.netRentYearPerToken ?? 0,
        annualYield:
          propertyToken.netRentYearPerToken && propertyToken.tokenPrice
            ? propertyToken.netRentYearPerToken / propertyToken.tokenPrice
            : 0,
        tokenIdRules: propertyToken.tokenIdRules,
      });
    }
  });
  // }

  return propertiesNonFiltered;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { chainId: id } = req.query;
    const chainId: string = id as string;

    if (!chainId) {
      return res.status(400).json({ error: 'ChainId is missing.' });
    }

    // const [communityApiToken,wlTokens] = await Promise.all([getTokenFromCommunityAPI,getWhitelistedProperties(parseInt(chainId))]);
    const [communityApiToken] = await Promise.all([getTokenFromCommunityAPI]);
    const tokens = await getTokens(parseInt(chainId), communityApiToken);

    // const extendedTokens = tokenToGetPrice.get(parseInt(chainId))?.filter(token => !token.isBuyToken) ?? [] as PropertiesToken[];
    // console.log(extendedTokens);

    return res
      .setHeader(
        'cache-control',
        'public, s-maxage=1200, stale-while-revalidate=600'
      )
      .status(200)
      .json(tokens);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to fetch properties' });
  }
};
export default handler;
