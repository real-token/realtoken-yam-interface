import { useRootStore } from "../../zustandStore/store";
import { Historic, HistoricToken } from "../../types/historic";
import React from "react";

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

    const [properties] = useRootStore((state) => [state.properties]);

    const findProperty = (address: string) => {
        return properties.find((p) => p.contractAddress.toLowerCase() === address.toLowerCase());
    }
    const property = findProperty(address);
    const iconUrl = isPropertyToken ? 'icons/realt-token.svg' : `icons/${tokenSymbolToImage.get(symbol ?? "default")}`

    return children({ token, property, name, symbol, iconUrl, isPropertyToken  })
   
}