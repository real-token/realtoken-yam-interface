export const DEFAULT_WL_TOKEN: WLToken = {
    type: "1",
    address: ""
}

export interface WLToken{
    type: string;
    address: string;
}