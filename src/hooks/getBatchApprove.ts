import BigNumber from "bignumber.js";
import { useRootStore } from "../zustandStore/store";
import { useMemo } from "react";

type GetBatchApprove = () => {
    approves: { [key: string]: BigNumber }
}
export const getBatchApprove: GetBatchApprove = () => {

    const [offers] = useRootStore(state => [state.offersToCreate]);

    const approves: { [key: string]: BigNumber } = useMemo(() => {
        const approves: { [key: string]: BigNumber } = {};
        offers.forEach((offer) => {
        if (!offer.amount) return;
        const approveForOfferToken = approves[offer.offerTokenAddress];
        if (approves[offer.offerTokenAddress]) {
            approves[offer.offerTokenAddress] = approveForOfferToken.plus(
            offer.amount
            );
        } else {
            approves[offer.offerTokenAddress] = new BigNumber(offer.amount);
        }
        });
        return approves;
    },[offers])

    return{
        approves: approves
    }
}