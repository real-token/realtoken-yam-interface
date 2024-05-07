import { gql } from '@apollo/client';

import { PropertiesToken, ShortProperty } from 'src/types';
import { OFFER_TYPE, Offer } from 'src/types/offer';

import { getYamClient } from './offers/getClientURL';
import { AllowedToken } from '../types/allowedTokens';

export const getWhitelistedProperties = async (
  chainId: number
): Promise<ShortProperty[]> => {
  return new Promise<ShortProperty[]>(async (resolove, reject) => {
    try {
      const client = getYamClient(chainId);
      await client
        .query({
          query: gql`
            query GetWLProperties {
              tokens(first: 1000, where: { tokenType: 1, name_not: null }) {
                name
                tokenType
                address
              }
            }
          `,
        })
        .then((data) => {
          // console.log(data)
          // if(data.tokens){
          //     const propertiesToken: ShortProperty[] = [];
          //     // console.log("lenght: ", data.tokens.length);
          //     data.tokens.forEach((token: Token) => {
          //         // if(token.name?.toLowerCase().includes('19003')){
          //         //     console.log(token)
          //         // }
          //         propertiesToken.push({
          //             contractAddress: token.address,
          //             name: token.name ?? ""
          //         })
          //     })
          //     resolove(propertiesToken);
          // }else{
          //     resolove([])
          // }
        });
    } catch (err) {
      console.log('Failed to get propertieqs from YAM TheGraph: ', err);
      reject(err);
    }
  });
};

export const getPropertyTokenAddress = (offer: Offer): string => {
  return offer.type == OFFER_TYPE.SELL
    ? offer.buyerTokenAddress
    : offer.offerTokenAddress;
};

export const mergeExtendedProperties = (
  propertiesToken: PropertiesToken[],
  extendedTokens: AllowedToken[]
): PropertiesToken[] => {

  const extendedTokenProperties: PropertiesToken[] = extendedTokens.map((token) => ({
    uuid: "0",
    shortName: "REG",
    fullName: "RealToken Ecosystem Governance",
    contractAddress: token.contractAddress,
    officialPrice: 0,
    currency: "",
    marketplaceLink: "https://medium.com/realtplatform/token-economy-f0b935fe2777",
    imageLink: ["/icons/REG.png"],
    tokenIdRules: 0,
    netRentYearPerToken: 0,
  } as PropertiesToken));
  
  propertiesToken.push(...extendedTokenProperties)
  return propertiesToken;
}