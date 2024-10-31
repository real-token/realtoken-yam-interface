import BigNumber from "bignumber.js";
import { OFFER_LOADING, Offer } from "../types/offer";
import { RootStore } from "./store";

export const selectOffers = (state: RootStore): Offer[] => state.offers;

export const selectAddressOffers = (state: RootStore, address: string | undefined) => {
  const offers = selectOffers(state);
  if (!address || !offers) return OFFER_LOADING;
  return offers.filter((offer: Offer) => offer.sellerAddress == address);
};

// export const selectPublicOffers = (state: RootStore) => {
//     const offers = selectOffers(state);
//     if (!offers) return OFFER_LOADING;
//     return [...offers.filter(
//       (offer: Offer) =>
//         !offer.buyerAddress &&
//         BigNumber(offer.amount).isPositive() &&
//         !BigNumber(offer.amount).isZero()
//     )];
//   };
  
//   export const selectAllPublicOffers = (state: RootStore) => {
//     const offers = selectOffers(state);
//     if (!offers) return OFFER_LOADING;
//     return [...offers.filter(
//       (offer: Offer) =>
//         !offer.buyerAddress && BigNumber(offer.amount).isPositive()
//     )];
//   };
  
//   export const selectPrivateOffers = (state: RootStore, address: string | undefined) => {
//     const offers = selectOffers(state);
//     if (!address || !offers) return OFFER_LOADING;
//     return offers.filter((offer: Offer) => offer.buyerAddress == address);
//   };