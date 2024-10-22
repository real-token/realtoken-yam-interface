import { OFFER_TYPE } from "./OfferType";

export interface CreatedOffer{
    offerType: OFFER_TYPE;
    offerId: number;
    offerTokenAddress: string;
    offerTokenDecimal: number |undefined;
    buyerTokenAddress: string;
    buyerTokenDecimal: number |undefined;
    price: string|undefined;
    amount: string|undefined;
    choosedPrice: number|undefined;
    buyerAddress: string;
    isPrivateOffer: boolean;
}