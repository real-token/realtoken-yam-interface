import BigNumber from "bignumber.js";
import { useRootStore } from "../zustandStore/store";
import { useMemo } from "react";
import { CreatedOffer } from "../types/offer";

export type Approves = {
    amount: BigNumber,
    decimals: number
}

type GetBatchApprove = (
    offers: CreatedOffer[]
) => {
    approves: { [key: string]: Approves }
}
export const getBatchApprove: GetBatchApprove = (
    offers: CreatedOffer[]
) => {

    const approves: { [key: string]: Approves } = useMemo(() => {
        const approves: { [key: string]: Approves } = {};
        offers.forEach((offer) => {
        if (!offer.amount) return;
        const approveForOfferToken = approves[offer.offerTokenAddress]?.amount;
        if (approves[offer.offerTokenAddress]) {
            approves[offer.offerTokenAddress] = {
                amount: approveForOfferToken.plus(offer.amount),
                decimals: approves[offer.offerTokenAddress].decimals
            };
        } else {
            approves[offer.offerTokenAddress] = {
                amount: new BigNumber(offer.amount),
                decimals: offer.offerTokenDecimal ?? 18,
            }
        }
        });
        return approves;
    },[offers])

    return{
        approves: approves
    }
}