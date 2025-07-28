import { FC } from "react";

export type GetPriceToken = {
    name: string;
    symbol: string;
    contractAddress: string;
    isBuyToken: boolean;
    logo?: FC<any>
    priceFnc: {
        type: 'coingecko-api';
    } | {
        type: 'chainlink';
        contractAddress: string;
    } | {
        type: 'custom-fnc';
        fnc: () => Promise<number>;
    }
}

export interface GetPriceTokenChainLink extends GetPriceToken {
    priceFnc: {
        type: 'chainlink';
        contractAddress: string;
    }
}

export interface GetPriceTokenCoingecko extends GetPriceToken {
    priceFnc: {
        type: 'coingecko-api';
        address?: string;
    }
}

export interface GetPriceCustomFnc extends GetPriceToken {
    priceFnc: {
        type: 'custom-fnc';
        fnc: () => Promise<number>;
    }
}