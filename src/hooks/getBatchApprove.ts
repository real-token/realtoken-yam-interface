import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { CreatedOffer } from "../types/offer";

export type Approves = {
    amount: BigNumber,
    decimals: number
}

type UseGetBatchApprove = (
    offers: CreatedOffer[]
) => {
    approves: { [key: string]: Approves }
}
export const useGetBatchApprove: UseGetBatchApprove = (
    offers: CreatedOffer[]
) => {

    const approves: { [key: string]: Approves } = useMemo(() => {
        const approvesMap: { [key: string]: Approves } = {};
        offers.forEach((offer) => {
        if (!offer.amount) return;
        const approveForOfferToken = approvesMap[offer.offerTokenAddress]?.amount;
        if (approvesMap[offer.offerTokenAddress]) {
            approvesMap[offer.offerTokenAddress] = {
                amount: approveForOfferToken.plus(offer.amount),
                decimals: approvesMap[offer.offerTokenAddress].decimals
            };
        } else {
            approvesMap[offer.offerTokenAddress] = {
                amount: new BigNumber(offer.amount),
                decimals: offer.offerTokenDecimal ?? 18,
            }
        }
        });
        return approvesMap;
    },[offers])

    return{
        approves: approves
    }
}