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
        return propertiesToken.map((propertyTokenInfo: PropertiesToken) => ({value: propertyTokenInfo.contractAddress, label: propertyTokenInfo.shortName}))
      },[propertiesToken])
    
    const formatedAllowTokensForSelect: ComboboxItem[] = useMemo((): ComboboxItem[] => {
        if(!allowedTokens) return [];
        return allowedTokens.map((allowedBuyToken: AllowedToken) => ({value: allowedBuyToken.contractAddress, label: allowedBuyToken.symbol}))
    },[allowedTokens])
    
    const allowedBuyerTokensForSelect: ComboboxItem[] = useMemo((): ComboboxItem[] => {
        if(!formatedAllowTokensForSelect || !formatedPropetiesTokenForSelect) return [];

        if(offerType == OFFER_TYPE.SELL) return formatedAllowTokensForSelect;
        if(offerType == OFFER_TYPE.BUY) return formatedPropetiesTokenForSelect;

        return [];
    },[formatedAllowTokensForSelect, formatedPropetiesTokenForSelect, offerType])

    const allowedOfferTokensForSelect: ComboboxItem[] = useMemo((): ComboboxItem[] => {
        if(!formatedAllowTokensForSelect || !formatedPropetiesTokenForSelect) return [];

        if(offerType == OFFER_TYPE.SELL) return formatedPropetiesTokenForSelect;
        if(offerType == OFFER_TYPE.BUY) return formatedAllowTokensForSelect;
        
        return [];
    },[formatedAllowTokensForSelect, formatedPropetiesTokenForSelect, offerType])

    return {
        allowedTokens: formatedAllowTokensForSelect,
        properties: formatedPropetiesTokenForSelect,
        offerTokens: allowedOfferTokensForSelect,
        buyerTokens: allowedBuyerTokensForSelect
    }
}