import BigNumber from "bignumber.js";
import { OFFER_TYPE } from "./OfferType";

export interface CreatedOffer{
    offerType: OFFER_TYPE;
    offerId: number;
    offerTokenAddress: string;
    offerTokenDecimal: number |undefined;
    buyerTokenAddress: string;
    price: number|undefined;
    amount: string|undefined;
    buyerAddress: string;
    isPrivateOffer: boolean;
}