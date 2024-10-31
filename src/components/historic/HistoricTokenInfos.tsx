import { useRootStore } from "../../zustandStore/store";
import { Historic, HistoricToken } from "../../types/historic";
import React from "react";
import { useProperties } from "../../hooks/interface/useProperties";

export const tokenSymbolToImage = new Map<string, string>([
    ['WXDAIRealT', 'wxdai.svg'],
    ['WXDAI', 'wxdai.svg'],
    ['USDCRealT', 'usdc.svg'],
    ['USDC', 'usdc.svg'],
]);

interface HistoricTokenInfosProps{
    children: ({
        token,
        property,
        name,
        symbol,
        iconUrl,
        isPropertyToken
    }: {
        token: HistoricToken;
        property: any;
        name: string | undefined;
        symbol: string | undefined;
        iconUrl: string;
        isPropertyToken: boolean;
    }) => React.ReactElement;
    historic: Historic;
    token: HistoricToken;
    showTokenIcon?: boolean;
    isAmount?: boolean;
}
export const HistoricTokenInfos = ({ token, children }: HistoricTokenInfosProps) => {

    const { address, tokenType, name, symbol } = token;
    const isPropertyToken = tokenType == 1;

    const { properties } = useProperties();

    const findProperty = (address: string) => {
        if(!properties) return undefined
        return properties.find((p) => p.contractAddress.toLowerCase() === address.toLowerCase());
    }
    const property = findProperty(address);
    const iconUrl = isPropertyToken ? 'icons/realt-token.svg' : `icons/${tokenSymbolToImage.get(symbol ?? "default")}`

    return children({ token, property, name, symbol, iconUrl, isPropertyToken  })
   
}