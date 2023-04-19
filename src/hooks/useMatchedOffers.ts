import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { multiPathMultiCurrencyAtom, shieldDisabledAtom, shieldValueAtom } from "../states";
import { selectPublicOffers } from "../store/features/interface/interfaceSelector";
import { Offer, OFFER_TYPE } from "../types/offer";
import { useAppSelector } from "./react-hooks";
import BigNumber from "bignumber.js";
import { getContract } from "../utils";
import { CoinBridgeToken, coinBridgeTokenABI } from "../abis";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useContract } from "./useContract";
import { ContractsID } from "../constants";
import { MultiPathOffer } from "../types/offer/MultiPathOffer";

const getReverseOfferType = (offerType: OFFER_TYPE) => {
    switch(offerType){
        case OFFER_TYPE.BUY:
            return OFFER_TYPE.SELL
        case OFFER_TYPE.SELL:
            return OFFER_TYPE.BUY
        default: 
            return OFFER_TYPE.EXCHANGE;
    }
}

type UseMatchedOffers = (
    offerType: OFFER_TYPE,
    offerTokenAddress: string,
    buyerTokenAddress: string,
    price: number|undefined,
    amount: number|undefined
) => {
    bestPrice: Offer|undefined,
    multiPath: MultiPathOffer[]|undefined,
    multiPathAmountFilled: number;
    multiPathAmountFilledPercentage: number;
    otherMatching: Offer[]|undefined;
}

export const useMatchedOffers: UseMatchedOffers = (offerType, offerTokenAddress, buyerTokenAddress, price, amount) => {

    const shieldDisabled = useAtomValue(shieldDisabledAtom);
    const shieldValue = useAtomValue(shieldValueAtom);
    const useMultiCurrencies = useAtomValue(multiPathMultiCurrencyAtom);

    const publicOffers = useAppSelector(selectPublicOffers);
    const revesedOfferType = getReverseOfferType(offerType);

    const { account, provider } = useWeb3React();
    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

    const matchedOffersWithType = useMemo(() => {
        if(publicOffers.length == 0) return [];
        if(!offerType || !offerTokenAddress || !buyerTokenAddress || !price) return undefined;

        const offersMatchingType = publicOffers.filter((offer) => offer.type == revesedOfferType);
        return offersMatchingType;

    },[buyerTokenAddress, offerTokenAddress, offerType, price, publicOffers, revesedOfferType]);
    
    const priceMinLimit = price ? price*(1-shieldValue) : 0;
    const priceMaxLimit = price ? price*(1+shieldValue) : 0;

    const matchedOffers = useMemo(() => {
        if(!matchedOffersWithType || !price) return undefined;
        if(offerType == OFFER_TYPE.BUY){
            return matchedOffersWithType
                .filter((offer) => 
                    offer.offerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                    offer.buyerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase() &&
                    (shieldDisabled && price >= priceMinLimit) && (shieldDisabled && price <= priceMaxLimit)
                );
        }else if(offerType == OFFER_TYPE.SELL) {
            return matchedOffersWithType
                .filter((offer) => 
                    offer.buyerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                    offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase() &&
                    (shieldDisabled && 1/price >= priceMinLimit) && (shieldDisabled && 1/price <= priceMaxLimit)
                );
        }else{
            return matchedOffersWithType
            .filter((offer) => 
                offer.buyerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase() &&
                offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase()
            );
        }
    },[buyerTokenAddress, matchedOffersWithType, offerTokenAddress, offerType, price, priceMaxLimit, priceMinLimit, shieldDisabled]);

    // Those are only filter by offerToken
    const matchedRawOffers = useMemo(() => {
        if(!matchedOffersWithType || !price) return [];
        if(offerType == OFFER_TYPE.BUY){
            return matchedOffersWithType.filter((offer) => offer.offerTokenAddress.toLowerCase() == buyerTokenAddress.toLowerCase());
        }else if(offerType == OFFER_TYPE.SELL) {
            return matchedOffersWithType.filter((offer) => offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase());
        }else{
            return matchedOffersWithType
            .filter((offer) => offer.offerTokenAddress.toLowerCase() == offerTokenAddress.toLowerCase());
        }
    },[buyerTokenAddress, matchedOffersWithType, offerTokenAddress, offerType, price]);

    const bestPrice = useMemo(() => {
        if(!matchedOffers) return undefined;
        const sortedBestPrice = matchedOffers.sort((a,b)=> Number(a.price)-Number(b.price));
        return sortedBestPrice.length > 0 ? sortedBestPrice[0] : undefined
    },[matchedOffers]);

    const sortedAmount = useMemo(() => {
        if(!matchedOffers) return undefined;
        const offers = useMultiCurrencies ? matchedRawOffers : matchedOffers;
        return offers.sort((a,b)=> Number(b.amount)-Number(a.amount));
    },[matchedOffers, matchedRawOffers, useMultiCurrencies]);

    const checkVirtualAllowance = async (virtualAllowances: Map<string,BigNumber>, offer: MultiPathOffer): Promise<boolean> => {
        return new Promise<boolean>(async (resolve,reject) => {
            try{
                if(!realTokenYamUpgradeable) return;

                if(!virtualAllowances.get(offer.sellerAddress)){
                    // We never get the allowance
                    const buyerToken = getContract<CoinBridgeToken>(
                        offer.offerTokenAddress,
                        coinBridgeTokenABI,
                        provider as Web3Provider,
                        account
                    );
                    if(!buyerToken) return;
            
                    const allowance = new BigNumber((await buyerToken.allowance(offer.sellerAddress,realTokenYamUpgradeable.address)).toString());
                    virtualAllowances.set(offer.sellerAddress,allowance.minus(offer.multiPathAmount));
                    resolve(true);
        
                }else{
                    // allowance already exist in virtualAllowances Map
                    const oldVirtualAllowance = virtualAllowances.get(offer.sellerAddress);
                    if(!oldVirtualAllowance) reject();

                    const newAllowance = oldVirtualAllowance?.minus(offer.multiPathAmount);
                    resolve(!newAllowance?.lt(0))
        
                }
            }catch(err){
                console.log(err);
                reject(err);
            }
        });
    }

    const [multiPath,setMultiPath] = useState<MultiPathOffer[]|undefined>(undefined);
    const getBestMultiPath = useCallback(async () => {
        if(!sortedAmount || !amount || !realTokenYamUpgradeable) return;

        // This map stored seller address -> current allowance
        const virtualAllowances: Map<string,BigNumber> = new Map<string,BigNumber>([]); 

        // const currentBuyAmount = path.reduce((accumulator,offer) => { return accumulator + parseFloat(offer.amount) },0);

        const path: MultiPathOffer[] = [];
        let currentBuyAmount = new BigNumber(0);

        for await (const offer of sortedAmount){

            const amountWanted = new BigNumber(parseInt(new BigNumber(amount).shiftedBy(Number(offer.offerTokenDecimals)).toString()));
            const offerAmount: BigNumber = new BigNumber(parseInt(new BigNumber(offer.amount.toString()).shiftedBy(Number(offer.offerTokenDecimals)).toString()));
            const priceInWei = new BigNumber(offer.price.toString()).shiftedBy(Number(offer.buyerTokenDecimals));

            // console.log("offerAmount: ", offerAmount.toString());
            // console.log("amountWanted: ", amountWanted.toString());

            let amountInWei: BigNumber;
            let amountToApprove: BigNumber;
            let hitLastOffer = false;
            if(currentBuyAmount.plus(offerAmount).lt(amountWanted)){
                // Take the entire offer's amount
                amountInWei = new BigNumber(parseInt(new BigNumber(offer.amount.toString()).shiftedBy(Number(offer.offerTokenDecimals)).toString()));
                amountToApprove = new BigNumber(parseInt(amountInWei.multipliedBy(priceInWei).shiftedBy(-offer.offerTokenDecimals).toString()));
            }else{
                // Take a part of the offer's amount
                const partialAmountInWei = amountWanted.minus(currentBuyAmount);
                amountInWei = partialAmountInWei;
                amountToApprove = new BigNumber(parseInt(partialAmountInWei.multipliedBy(priceInWei).shiftedBy(-offer.offerTokenDecimals).toString()));
                hitLastOffer = true;
            }

            const o: MultiPathOffer = {
                ...offer,
                multiPathAmount: amountInWei.toString(10),
                multiPathAmountToApprove: amountToApprove.toString(10)
            };

            if(await checkVirtualAllowance(virtualAllowances,o)){
                currentBuyAmount = currentBuyAmount.plus(amountInWei);
                path.push(o);
            }

            if(hitLastOffer) break;

        }
        setMultiPath(path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[amount, realTokenYamUpgradeable, sortedAmount]);
    useEffect(() => {
        if(sortedAmount && amount) getBestMultiPath();
    },[amount, getBestMultiPath, sortedAmount]);

    const multiPathAmountFilled = useMemo(() => {
        if(!multiPath) return 0;
        const sum = multiPath.reduce((accumulator,offer) => {
            const amount = parseFloat(new BigNumber(offer.multiPathAmount).shiftedBy(-offer.offerTokenDecimals).toString(10))
            return accumulator+amount
        },0)
        return sum;
    },[multiPath]);

    const multiPathAmountFilledPercentage = useMemo(() => {
        const perc = amount ? parseFloat((multiPathAmountFilled/amount).toFixed(4)) : 0;
        return perc >= 1 ? 1 : perc
    },[amount, multiPathAmountFilled]);

    return {
        bestPrice: bestPrice,
        multiPath: multiPath,
        multiPathAmountFilled: multiPathAmountFilled,
        multiPathAmountFilledPercentage: multiPathAmountFilledPercentage,
        otherMatching: matchedOffers ? matchedOffers.filter((offer) => ![bestPrice?.offerId].includes(offer.offerId)) : undefined
    }
}