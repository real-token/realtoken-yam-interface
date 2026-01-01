import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { APIPropertiesToken, PropertiesToken, ShortProperty } from 'src/types';

import { ChainsID } from '../../../src/constants';
import { createLogger } from '../../../src/utils/logger';

const logger = createLogger('API /properties/[chainId]');

const getTokenFromCommunityAPI = new Promise<APIPropertiesToken[]>(
  async (resolve, reject) => {
    try {
      const apiKey = process.env.COMMUNITY_API_KEY;

      if (!apiKey) {
        logger.error('COMMUNITY_API_KEY is missing in environment variables');
        reject(
          new Error(
            'COMMUNITY_API_KEY environment variable is required. Please add it to your .env file.'
          )
        );
        return;
      }

      if (apiKey.trim() === '') {
        logger.error('COMMUNITY_API_KEY is empty (whitespace only)');
        reject(
          new Error(
            'COMMUNITY_API_KEY is empty. Please set a valid API key in your .env file.'
          )
        );
        return;
      }

      const response = await axios.get<APIPropertiesToken[]>(
        'https://api.realtoken.community/v1/token',
        {
          headers: {
            'X-AUTH-REALT-TOKEN': apiKey.trim(),
          },
        }
      );

      const tokens: APIPropertiesToken[] = response.data;
      resolve(tokens);
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { status?: number; statusText?: string };
      };
      logger.error(
        'Failed to fetch properties from community API:',
        axiosError?.response?.status,
        axiosError?.response?.statusText
      );
      if (axiosError?.response?.status === 401) {
        reject(
          new Error('Invalid COMMUNITY_API_KEY. Please check your .env file.')
        );
      } else {
        reject(err);
      }
    }
  }
);

const getContractAddressFromChainId = (chainId: number): string | undefined => {
  let addressKey;
  switch (chainId) {
    case ChainsID.Ethereum:
      addressKey = 'ethereum';
      break;
    case ChainsID.Gnosis:
      addressKey = 'xDai';
      break;
    case ChainsID.Sepolia:
      addressKey = 'sepolia';
      break;
  }
  return addressKey;
};

const getTokens = async (
  chainId: number,
  communityProperties: APIPropertiesToken[],
  wlProperties: ShortProperty[]
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
    const contractAddress =
      propertyToken.blockchainAddresses[
        contractKey as keyof typeof propertyToken.blockchainAddresses
      ]?.contract;
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

  const onlyWLProperties = propertiesNonFiltered.filter(
    (property) =>
      !!wlProperties.find(
        (wlProperty) =>
          wlProperty.contractAddress.toLowerCase() ==
          property.contractAddress.toLowerCase()
      )
  );

  return onlyWLProperties;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { chainId: id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ChainId is missing or invalid.' });
    }

    const chainId = parseInt(id, 10);
    if (isNaN(chainId)) {
      return res.status(400).json({ error: 'ChainId must be a valid number.' });
    }

    // Vérifier que le chainId est supporté
    const supportedChains = [
      ChainsID.Gnosis,
      ChainsID.Ethereum,
      ChainsID.Sepolia,
    ];
    if (!supportedChains.includes(chainId)) {
      return res.status(400).json({
        error: `ChainId ${chainId} is not supported. Supported chains: ${supportedChains.join(
          ', '
        )}`,
      });
    }

    const communityApiToken = await getTokenFromCommunityAPI;
    if (!Array.isArray(communityApiToken)) {
      logger.error('communityApiToken is not an array:', typeof communityApiToken, communityApiToken);
      return res.status(500).json({ error: 'Invalid response from community API' });
    }
    const tokens = await getTokens(chainId, communityApiToken, []);

    // const extendedTokens = tokenToGetPrice.get(parseInt(chainId))?.filter(token => !token.isBuyToken) ?? [] as PropertiesToken[];

    return res
      .setHeader(
        'cache-control',
        'public, s-maxage=1200, stale-while-revalidate=600'
      )
      .status(200)
      .json(tokens);
  } catch (err) {
    logger.error('Failed to fetch properties:', err);
    return res.status(500).json({ error: 'Failed to fetch properties' });
  }
};
export default handler;
