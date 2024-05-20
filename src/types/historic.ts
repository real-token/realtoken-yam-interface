import { OFFER_TYPE } from "./offer";

export interface HistoricToken{
    address: string;
    tokenType: number;
    name: string;
    symbol: string;
}

export interface Historic{
    type: OFFER_TYPE;
    purchaseId: string;
    offer: {
        id: string;
        offerToken: HistoricToken
        buyerToken: HistoricToken
    }
    seller: {
        address: string;
    }
    quantity: string;
    price: string;
    createdAtTimestamp: string;
}