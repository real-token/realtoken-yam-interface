import { Offer } from "./Offer";

export interface MultiPathOffer extends Offer{
    multiPathAmount: string;
    multiPathAmountToApprove: string;
}