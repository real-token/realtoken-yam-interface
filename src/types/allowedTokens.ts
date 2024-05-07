import { FC } from "react";

export type AllowedToken = {
    name: string;
    symbol: string;
    contractAddress: string;
    logo?: FC<any>
}
