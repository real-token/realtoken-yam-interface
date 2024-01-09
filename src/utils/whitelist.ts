import { PropertiesToken } from "../types";
import { OFFER_TYPE, Offer } from "../types/offer";

export const getNotWhitelistedTokens = (
    wlTokenId: number[],
    offer: Offer,
    properties: PropertiesToken[]
): PropertiesToken[] => {

    let tokenAddressToCheck: string[] = [];
    switch(offer.type){
        case OFFER_TYPE.BUY:
            tokenAddressToCheck = [offer.buyerTokenAddress];
        break;
        case OFFER_TYPE.SELL:
            tokenAddressToCheck = [offer.offerTokenAddress];
        break;
        case OFFER_TYPE.EXCHANGE:
            tokenAddressToCheck = [offer.buyerTokenAddress, offer.offerTokenAddress];
        break;
    }

    const notWlTokens: PropertiesToken[] = [];
    tokenAddressToCheck.forEach((tokenAddress: string) => {
        const token = properties.find((token: PropertiesToken) => token.contractAddress.toLowerCase() == tokenAddress.toLowerCase());
        if (token) {
            if(!wlTokenId.includes(token.tokenIdRules)){
                notWlTokens.push(token);
            }
        }
    });

    return notWlTokens;
}