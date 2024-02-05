
export interface HistoricToken{
    address: string;
    tokenType: number;
    name: string;
    symbol: string;
}

export interface Historic{
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