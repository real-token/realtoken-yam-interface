import { ComboboxItem } from "@mantine/core";
import { useMemo } from "react"
import { PropertiesToken } from "src/types";
import { AllowedToken } from "src/types/allowedTokens";
import { OFFER_TYPE } from "src/types/offer"
import { useAllowedTokens } from "./useAllowedTokens";
import { usePropertiesToken } from "./usePropertiesToken";

type UseCreateOfferTokens = (
    offerType: OFFER_TYPE,
    choosedOfferTokenAddress: string,
    choosedBuyerTokenAddress: string,
) => {
    allowedTokens: ComboboxItem[],
    properties: ComboboxItem[],
    offerTokens: ComboboxItem[];
    buyerTokens: ComboboxItem[];
}

export const useCreateOfferTokens: UseCreateOfferTokens = (offerType) => {

    const { propertiesToken } = usePropertiesToken();
    const { allowedTokens } = useAllowedTokens();

    const formatedPropetiesTokenForSelect: ComboboxItem[] = useMemo((): ComboboxItem[] => {
        if(!propertiesToken) return [];
        return propertiesToken.map((propertyTokenInfo: PropertiesToken) => ({value: propertyTokenInfo.contractAddress.toLowerCase(), label: propertyTokenInfo.shortName}))
      },[propertiesToken])
    
    const formatedAllowTokensForSelect: ComboboxItem[] = useMemo((): ComboboxItem[] => {
        if(!allowedTokens) return [];
        return allowedTokens.map((allowedBuyToken: AllowedToken) => ({value: allowedBuyToken.contractAddress.toLowerCase(), label: allowedBuyToken.symbol}))
    },[allowedTokens])

    /** RealTokens + jetons autorisés, dédupliqués par adresse (offres EXCHANGE : les deux sens utilisent les deux listes). */
    const allExchangeTokensForSelect: ComboboxItem[] = useMemo(() => {
        const byAddress = new Map<string, ComboboxItem>();
        for (const item of formatedPropetiesTokenForSelect) {
            byAddress.set(item.value.toLowerCase(), item);
        }
        for (const item of formatedAllowTokensForSelect) {
            const key = item.value.toLowerCase();
            if (!byAddress.has(key)) {
                byAddress.set(key, item);
            }
        }
        return Array.from(byAddress.values());
    }, [formatedPropetiesTokenForSelect, formatedAllowTokensForSelect]);
    
    const allowedBuyerTokensForSelect: ComboboxItem[] = useMemo((): ComboboxItem[] => {
        if(offerType == OFFER_TYPE.SELL) return formatedAllowTokensForSelect;
        if(offerType == OFFER_TYPE.BUY) return formatedPropetiesTokenForSelect;
        if(offerType == OFFER_TYPE.EXCHANGE) return allExchangeTokensForSelect;

        return [];
    },[formatedAllowTokensForSelect, formatedPropetiesTokenForSelect, offerType, allExchangeTokensForSelect])

    const allowedOfferTokensForSelect: ComboboxItem[] = useMemo((): ComboboxItem[] => {
        if(offerType == OFFER_TYPE.SELL) return formatedPropetiesTokenForSelect;
        if(offerType == OFFER_TYPE.BUY) return formatedAllowTokensForSelect;
        if(offerType == OFFER_TYPE.EXCHANGE) return allExchangeTokensForSelect;

        return [];
    },[formatedAllowTokensForSelect, formatedPropetiesTokenForSelect, offerType, allExchangeTokensForSelect])

    return {
        allowedTokens: formatedAllowTokensForSelect,
        properties: formatedPropetiesTokenForSelect,
        offerTokens: allowedOfferTokensForSelect,
        buyerTokens: allowedBuyerTokensForSelect
    }
}