import { OFFER_TYPE } from "./OfferType";

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