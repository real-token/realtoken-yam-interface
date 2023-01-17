import { OFFER_TYPE } from "./Offer";

export interface CreatedOffer{
    offerType: OFFER_TYPE;
    offerId: number;
    offerTokenAddress: string;
    buyerTokenAddress: string;
    price: number|undefined;
    amount: number|undefined;
    buyerAddress: string;
    isPrivateOffer: boolean;
}