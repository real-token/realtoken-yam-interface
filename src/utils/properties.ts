import { PropertiesToken } from 'src/types';
import { OFFER_TYPE, Offer } from 'src/types/offer';

import { AllowedToken } from '../types/allowedTokens';

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
