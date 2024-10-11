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