import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  APIPropertiesToken,
  RmmPropertiesToken,
} from '../../src/types/PropertiesToken';

const getTokenFromCommunityAPI = new Promise<APIPropertiesToken[]>(
  async (resolve, reject) => {
    try {
      const response = await fetch('https://api.realtoken.community/v1/token', {
        method: 'GET',
        headers: {
          'X-AUTH-REALT-TOKEN': process.env.COMMUNITY_API_KEY ?? '',
        },
      });
      const tokens: APIPropertiesToken[] = await response.json();
      resolve(tokens);
    } catch (err) {
      console.error('Failed to fetch properties from community');
      reject(err);
    }
  }
);

const getContractAddressFromChainId = (
  propertyToken: APIPropertiesToken,
  chainId: number
): string | undefined => {
  switch (chainId) {
    case 1:
      propertyToken.ethereumContract;
    case 100:
      return propertyToken.gnosisContract
        ? propertyToken.gnosisContract
        : propertyToken.xDaiContract;
    default:
      return undefined;
  }
};

const getTokens = (
  chainId: number,
  communityProperties: APIPropertiesToken[]
): RmmPropertiesToken[] => {
  const propertiesNonFiltered: RmmPropertiesToken[] = [];
  if (chainId == 5) {
    // Goerli testnet - commented out test data
  } else {
    communityProperties.forEach((propertyToken: APIPropertiesToken) => {
      const contractAddress = getContractAddressFromChainId(
        propertyToken,
        chainId
      );
      propertiesNonFiltered.push({
        uuid: propertyToken.uuid,
        shortName: propertyToken.shortName,
        symbol: propertyToken.symbol,
        fullName: propertyToken.fullName,
        contractAddress: contractAddress?.toLowerCase() ?? '',
        marketplaceLink: propertyToken.marketplaceLink,
        imageLink: propertyToken.imageLink,
        tokenIdRules: propertyToken.tokenIdRules,
      });
    });
  }

  return propertiesNonFiltered;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { chainId: id } = req.query;
    const chainId: string = id as string;

    if (!chainId) {
      return res.status(400).json({ error: 'ChainId is missing.' });
    }

    const [communityApiToken] = await Promise.all([getTokenFromCommunityAPI]);

    const tokens = getTokens(parseInt(chainId), communityApiToken);

    return res.status(200).json(tokens);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
}
