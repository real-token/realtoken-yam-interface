import { SelectItem } from "@mantine/core";
import { useMemo } from "react"
import { PropertiesToken } from "src/types";
import { AllowedToken } from "src/types/allowedTokens";
import { OFFER_TYPE } from "src/types/Offer"
import { useAllowedTokens } from "./useAllowedTokens";
import { usePropertiesToken } from "./usePropertiesToken";

type UseCreateOfferTokens = (
    offerType: OFFER_TYPE,
    choosedOfferTokenAddress: string,
    choosedBuyerTokenAddress: string,
) => {
    allowedTokens: SelectItem[],
    properties: SelectItem[],
    offerTokens: SelectItem[];
    buyerTokens: SelectItem[];
}

export const useCreateOfferTokens: UseCreateOfferTokens = (offerType, choosedOfferTokenAddress, choosedBuyerTokenAddress) => {

    const { propertiesToken } = usePropertiesToken(false);
    const { allowedTokens } = useAllowedTokens();

    const formatedPropetiesTokenForSelect: SelectItem[] = useMemo((): SelectItem[] => {
        if(!propertiesToken) return [];
        const formated: SelectItem[] = [];
        propertiesToken.map((propertyTokenInfo: PropertiesToken) => formated.push({value: propertyTokenInfo.contractAddress, label: propertyTokenInfo.shortName}))
        return formated;
      },[propertiesToken])
    
    const formatedAllowTokensForSelect: SelectItem[] = useMemo((): SelectItem[] => {
        if(!allowedTokens) return [];
        const formated: SelectItem[] = [];
        allowedTokens.map((allowedBuyToken: AllowedToken) => formated.push({value: allowedBuyToken.contractAddress, label: allowedBuyToken.symbol}))
        return formated;
    },[allowedTokens])
    
    const allowedBuyerTokensForSelect: SelectItem[] = useMemo((): SelectItem[] => {
        if(!formatedAllowTokensForSelect || !formatedPropetiesTokenForSelect) return [];

        if(offerType == OFFER_TYPE.SELL) return formatedAllowTokensForSelect;
        if(offerType == OFFER_TYPE.BUY) return formatedPropetiesTokenForSelect;

        return [];
    },[formatedAllowTokensForSelect, formatedPropetiesTokenForSelect, offerType])

    const allowedOfferTokensForSelect: SelectItem[] = useMemo((): SelectItem[] => {
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