import { useEffect, useMemo, useState } from "react";
import { Offer } from "../types/offer";
import BigNumber from "bignumber.js";
import { getContract } from "@realtoken/realt-commons";
import { CoinBridgeToken, coinBridgeTokenABI } from "../abis";
import { useContract } from "./useContract";
import { ContractsID, NOTIFICATIONS, NotificationsID } from "../constants";
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import { useActiveChain } from "./useActiveChain";
import { showNotification, updateNotification } from "@mantine/notifications";

type UseOffersComputedDatas = (
    offer: Offer,
    amount: number
) => {
    amountInWei: BigNumber;
    buyerTokenAmount: BigNumber;
    priceInWei: BigNumber;
}
export const useOffersComputedDatas: UseOffersComputedDatas = (offer, amount) => {

    const price = parseFloat(offer.price);
    const priceInWei = new BigNumber(price.toString()).shiftedBy(Number(offer.buyerTokenDecimals));

    const amountInWei = new BigNumber(parseInt(new BigNumber(amount.toString()).shiftedBy(Number(offer.offerTokenDecimals)).toString()));
    const buyerTokenAmount = new BigNumber(parseInt(amountInWei.multipliedBy(priceInWei).shiftedBy(-offer.offerTokenDecimals).toString()));

    return{
        amountInWei,
        buyerTokenAmount,
        priceInWei
    }
}

type UseApproveOffer = (
    offer: Offer,
    amountToCheck: number
) => {
    approveNeeded: boolean;
    approve: () => Promise<void>;
    approveLoading: boolean;
}
export const useApproveOffer: UseApproveOffer = (offer, amount) => {

    const [approveNeeded, setApproveNeeded] = useState<boolean>(false);
    const [approveLoading, setApproveLoading] = useState<boolean>(false);

    const { buyerTokenAmount } = useOffersComputedDatas(offer, amount);
    const { account, provider } = useWeb3React();
    const activeChain = useActiveChain();

    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

    const buyerToken = useMemo(() => getContract<CoinBridgeToken>(
        offer.buyerTokenAddress,
        coinBridgeTokenABI,
        provider as Web3Provider,
        account
    ),[offer, account, provider]);

    const checkApproval = async () => {
        if(!buyerToken || !realTokenYamUpgradeable || !account || buyerTokenAmount.isNaN()) return;
        try{

            const allowance = await buyerToken.allowance(account, realTokenYamUpgradeable.address);
            console.log("ALLOWANCE: ", allowance.toString());
            console.log("buyerTokenAmount: ", buyerTokenAmount.toString(10));

            setApproveNeeded(allowance.lt(buyerTokenAmount.toString(10)));
        }catch(err){
            console.error('Cannot check approval: ', err);
        }
    }

    const approve = async () => {
        if(!buyerToken || !realTokenYamUpgradeable) return;
        try{

            setApproveLoading(true);

            const approveTx = await buyerToken.approve(
                realTokenYamUpgradeable.address,
                buyerTokenAmount.toString(10)
            );
  
            const notificationApprove = {
                key: approveTx.hash,
                href: `${activeChain?.blockExplorerUrl}tx/${approveTx.hash}`,
                hash: approveTx.hash,
            };

            showNotification(
                NOTIFICATIONS[NotificationsID.approveOfferLoading](
                    notificationApprove
                )
            );

            approveTx
                .wait()
                .then(({ status }) =>
                    updateNotification(
                    NOTIFICATIONS[
                        status === 1
                        ? NotificationsID.approveOfferSuccess
                        : NotificationsID.approveOfferError
                    ](notificationApprove)
                    )
                );

            approveTx.wait(1)
                .then(({ status }) => {
                    if(status == 1){
                        setApproveNeeded(false);
                        setApproveLoading(false)
                    }
                });

        }catch(err){
             console.error('Cannot approve: ', err);
             setApproveLoading(false);
        }
    }

    useEffect(() => {
        checkApproval();
    },[offer, amount]);

    return{
        approveNeeded: approveNeeded,
        approve,
        approveLoading
    }
}