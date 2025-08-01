import { useMemo } from 'react';

import { useCurrentNetwork } from '@real-token/core';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';

import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';
import { useAccount, useConfig } from 'wagmi';

import { coinBridgeTokenABI } from '../abis';
import { ExtendedChainConfig } from '../config/aaConfig';
import {
  multiPathMultiCurrencyAtom,
  shieldDisabledAtom,
  shieldValueAtom,
} from '../states';
import { OFFER_TYPE, Offer } from '../types/offer';
import { MultiPathOffer } from '../types/offer/MultiPathOffer';
import { usePublicOffers } from './offers/usePublicOffers';

const getReverseOfferType = (offerType: OFFER_TYPE) => {
  switch (offerType) {
    case OFFER_TYPE.BUY:
      return OFFER_TYPE.SELL;
    case OFFER_TYPE.SELL:
      return OFFER_TYPE.BUY;
    default:
      return OFFER_TYPE.EXCHANGE;
  }
};

type UseMatchedOffers = (
  offerType: OFFER_TYPE,
  offerTokenAddress: string,
  buyerTokenAddress: string,
  price: number | undefined,
  amount: number | undefined
) => {
  bestPrice: Offer | undefined;
  multiPath: MultiPathOffer[] | undefined;
  multiPathAmountFilled: number;
  multiPathAmountFilledPercentage: number;
  otherMatching: Offer[] | undefined;
};

export const useMatchedOffers: UseMatchedOffers = (
  offerType,
  offerTokenAddress,
  buyerTokenAddress,
  price,
  amount
) => {
  const shieldDisabled = useAtomValue(shieldDisabledAtom);
  const shieldValue = useAtomValue(shieldValueAtom);
  const useMultiCurrencies = useAtomValue(multiPathMultiCurrencyAtom);

  const { offers: publicOffers } = usePublicOffers();
  const revesedOfferType = getReverseOfferType(offerType);

  const config = useConfig();
  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();
  const realTokenYamUpgradeable =
    currentNetwork?.contracts.realTokenYamUpgradeableAddress;

  const { address: account } = useAccount();

  const matchedOffersWithType = useMemo(() => {
    if (publicOffers.length == 0) return [];
    if (!offerType || !offerTokenAddress || !buyerTokenAddress || !price)
      return undefined;

    const offersMatchingType = publicOffers.filter(
      (offer) => offer.type == revesedOfferType
    );
    return offersMatchingType;
  }, [
    buyerTokenAddress,
    offerTokenAddress,
    offerType,
    price,
    publicOffers,
    revesedOfferType,
  ]);

  const priceMinLimit = price ? price * (1 - shieldValue) : 0;
  const priceMaxLimit = price ? price * (1 + shieldValue) : 0;

  const matchedOffers = useMemo(() => {
    if (!matchedOffersWithType || !price) return undefined;
    if (offerType == OFFER_TYPE.BUY) {
      return matchedOffersWithType.filter(
        (offer) =>
          offer.offerTokenAddress.toLowerCase() ==
            buyerTokenAddress.toLowerCase() &&
          offer.buyerTokenAddress.toLowerCase() ==
            offerTokenAddress.toLowerCase() &&
          !(
            shieldDisabled &&
            1 / price >= priceMinLimit &&
            1 / price <= priceMaxLimit
          )
      );
    } else if (offerType == OFFER_TYPE.SELL) {
      return matchedOffersWithType.filter(
        (offer) =>
          offer.offerTokenAddress.toLowerCase() ==
            buyerTokenAddress.toLowerCase() &&
          offer.buyerTokenAddress.toLowerCase() ==
            offerTokenAddress.toLowerCase() &&
          !(
            shieldDisabled &&
            1 / price >= priceMinLimit &&
            1 / price <= priceMaxLimit
          )
      );
    } else {
      return matchedOffersWithType.filter(
        (offer) =>
          offer.buyerTokenAddress.toLowerCase() ==
            buyerTokenAddress.toLowerCase() &&
          offer.offerTokenAddress.toLowerCase() ==
            offerTokenAddress.toLowerCase()
      );
    }
  }, [
    buyerTokenAddress,
    matchedOffersWithType,
    offerTokenAddress,
    offerType,
    price,
    priceMaxLimit,
    priceMinLimit,
    shieldDisabled,
  ]);

  // Those are only filter by offerToken
  const matchedRawOffers = useMemo(() => {
    if (!matchedOffersWithType || !price) return [];
    if (offerType == OFFER_TYPE.BUY) {
      return matchedOffersWithType.filter(
        (offer) =>
          offer.offerTokenAddress.toLowerCase() ==
          buyerTokenAddress.toLowerCase()
      );
    } else if (offerType == OFFER_TYPE.SELL) {
      return matchedOffersWithType.filter(
        (offer) =>
          offer.offerTokenAddress.toLowerCase() ==
          offerTokenAddress.toLowerCase()
      );
    } else {
      return matchedOffersWithType.filter(
        (offer) =>
          offer.offerTokenAddress.toLowerCase() ==
          offerTokenAddress.toLowerCase()
      );
    }
  }, [
    buyerTokenAddress,
    matchedOffersWithType,
    offerTokenAddress,
    offerType,
    price,
  ]);

  const bestPrice = useMemo(() => {
    if (!matchedOffers) return undefined;
    const sortedBestPrice = matchedOffers.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
    return sortedBestPrice.length > 0 ? sortedBestPrice[0] : undefined;
  }, [matchedOffers]);

  const sortedAmount = useMemo(() => {
    if (!matchedOffers) return undefined;
    const offers = useMultiCurrencies ? matchedRawOffers : matchedOffers;
    return offers.sort((a, b) => Number(b.amount) - Number(a.amount));
  }, [matchedOffers, matchedRawOffers, useMultiCurrencies]);

  const checkVirtualAllowance = async (
    virtualAllowances: Map<string, BigNumber>,
    offer: MultiPathOffer
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        if (!realTokenYamUpgradeable) return;

        if (!virtualAllowances.get(offer.sellerAddress)) {
          const allowanceResponse = await readContract(config, {
            address: offer.offerTokenAddress as `0x${string}`,
            abi: coinBridgeTokenABI,
            functionName: 'allowance',
            args: [
              offer.sellerAddress as `0x${string}`,
              realTokenYamUpgradeable as `0x${string}`,
            ],
          });

          const allowance = new BigNumber(allowanceResponse.toString());

          virtualAllowances.set(
            offer.sellerAddress,
            allowance.minus(offer.multiPathAmount)
          );
          resolve(true);
        } else {
          // allowance already exist in virtualAllowances Map
          const oldVirtualAllowance = virtualAllowances.get(
            offer.sellerAddress
          );
          if (!oldVirtualAllowance) reject();

          const newAllowance = oldVirtualAllowance?.minus(
            offer.multiPathAmount
          );
          resolve(!newAllowance?.lt(0));
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  const getBestMultiPath = async (): Promise<MultiPathOffer[] | undefined> => {
    if (!sortedAmount || !amount) return;

    // This map stored seller address -> current allowance
    const virtualAllowances: Map<string, BigNumber> = new Map<
      string,
      BigNumber
    >([]);

    // const currentBuyAmount = path.reduce((accumulator,offer) => { return accumulator + parseFloat(offer.amount) },0);

    const path: MultiPathOffer[] = [];
    let currentBuyAmount = new BigNumber(0);

    for await (const offer of sortedAmount) {
      const amountWanted = new BigNumber(
        parseInt(
          new BigNumber(amount)
            .shiftedBy(Number(offer.offerTokenDecimals))
            .toString()
        )
      );
      const offerAmount: BigNumber = new BigNumber(
        parseInt(
          new BigNumber(offer.amount.toString())
            .shiftedBy(Number(offer.offerTokenDecimals))
            .toString()
        )
      );
      const priceInWei = new BigNumber(offer.price.toString()).shiftedBy(
        Number(offer.buyerTokenDecimals)
      );

      // console.log("offerAmount: ", offerAmount.toString());
      // console.log("amountWanted: ", amountWanted.toString());

      let amountInWei: BigNumber;
      let amountToApprove: BigNumber;
      let hitLastOffer = false;
      if (currentBuyAmount.plus(offerAmount).lt(amountWanted)) {
        // Take the entire offer's amount
        amountInWei = new BigNumber(
          parseInt(
            new BigNumber(offer.amount.toString())
              .shiftedBy(Number(offer.offerTokenDecimals))
              .toString()
          )
        );
        amountToApprove = new BigNumber(
          parseInt(
            amountInWei
              .multipliedBy(priceInWei)
              .shiftedBy(-offer.offerTokenDecimals)
              .toString()
          )
        );
      } else {
        // Take a part of the offer's amount
        const partialAmountInWei = amountWanted.minus(currentBuyAmount);
        amountInWei = partialAmountInWei;
        amountToApprove = new BigNumber(
          parseInt(
            partialAmountInWei
              .multipliedBy(priceInWei)
              .shiftedBy(-offer.offerTokenDecimals)
              .toString()
          )
        );
        hitLastOffer = true;
      }

      const o: MultiPathOffer = {
        ...offer,
        multiPathAmount: amountInWei.toString(10),
        multiPathAmountToApprove: amountToApprove.toString(10),
      };

      if (await checkVirtualAllowance(virtualAllowances, o)) {
        currentBuyAmount = currentBuyAmount.plus(amountInWei);
        path.push(o);
        if (hitLastOffer) break;
      }
    }
    return path.length > 0 ? path : undefined;
  };

  const { data: multiPath } = useQuery({
    queryKey: [
      'matched-offers',
      offerType,
      offerTokenAddress,
      buyerTokenAddress,
      price,
      amount,
    ],
    queryFn: getBestMultiPath,
    enabled: !!sortedAmount && !!amount,
  });

  const multiPathAmountFilled = useMemo(() => {
    if (!multiPath) return 0;
    const sum = multiPath.reduce((accumulator, offer) => {
      const amount = parseFloat(
        new BigNumber(offer.multiPathAmount)
          .shiftedBy(-offer.offerTokenDecimals)
          .toString(10)
      );
      return accumulator + amount;
    }, 0);
    return sum;
  }, [multiPath]);

  const multiPathAmountFilledPercentage = useMemo(() => {
    const perc = amount
      ? parseFloat((multiPathAmountFilled / amount).toFixed(4))
      : 0;
    return perc >= 1 ? 1 : perc;
  }, [amount, multiPathAmountFilled]);

  return {
    bestPrice: bestPrice,
    multiPath: multiPath,
    multiPathAmountFilled: multiPathAmountFilled,
    multiPathAmountFilledPercentage: multiPathAmountFilledPercentage,
    otherMatching: matchedOffers
      ? matchedOffers.filter(
          (offer) => ![bestPrice?.offerId].includes(offer.offerId)
        )
      : undefined,
  };
};
