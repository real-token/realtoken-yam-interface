import { WHITLISTED_ON_ALL_ID_RULE } from "../constants/whitelist";
import { PropertiesToken } from "../types";
import { OFFER_TYPE, Offer } from "../types/offer";

export const getNotWhitelistedTokens = (
    wlTokenId: number[],
    offer: Offer,
    properties: PropertiesToken[]
): PropertiesToken[] => {

    // Bypass 
    if(wlTokenId.some(r=> WHITLISTED_ON_ALL_ID_RULE.includes(r))) return [];

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

    const tokenNoWlNeeded = [100508];

    const notWlTokens: PropertiesToken[] = [];
    tokenAddressToCheck.forEach((tokenAddress: string) => {
        const token = properties.find((token: PropertiesToken) => token.contractAddress.toLowerCase() == tokenAddress.toLowerCase());
        
        if (token && !wlTokenId.includes(token.tokenIdRules) && !tokenNoWlNeeded.includes(token?.tokenIdRules)) {
            notWlTokens.push(token);
        }
    });

    return notWlTokens;
}