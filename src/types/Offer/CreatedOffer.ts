export interface CreatedOffer{
    offerTokenAddress: string;
    buyerTokenAddress: string;
    price: number|undefined;
    amount: number|undefined;
    buyerAddress: string;
    isPrivateOffer: boolean;
}