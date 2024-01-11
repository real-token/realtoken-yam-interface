import BigNumber from "bignumber.js";
import { OFFER_LOADING, Offer } from "../types/offer";
import { RootStore } from "./store";

export const selectAddress = (state: RootStore): string => state.account.toLowerCase();
export const selectOffers = (state: RootStore): Offer[] => state.offers;

export const selectOffersIsLoading = (state: RootStore) => state.offersAreLoading;
export const selectProperties = (state: RootStore) => state.properties;
export const selectPropertiesIsLoading = (state: RootStore) => state.propertiesAreLoading;

export const selectAddressOffers = (state: RootStore) => {
    const address = selectAddress(state);
    const offers = selectOffers(state);
  
    if (!address || !offers) return OFFER_LOADING;
    return offers.filter((offer: Offer) => offer.sellerAddress == address);
  };

export const selectPublicOffers = (state: RootStore) => {
    const offers = selectOffers(state);
    const offersIsLoading = selectOffersIsLoading(state);
    if (!offers || offersIsLoading) return OFFER_LOADING;
    return offers.filter(
      (offer: Offer) =>
        !offer.buyerAddress &&
        BigNumber(offer.amount).isPositive() &&
        !BigNumber(offer.amount).isZero()
    );
  };
  
  export const selectAllPublicOffers = (state: RootStore) => {
    const offers = selectOffers(state);
    const offersIsLoading = selectOffersIsLoading(state);
    if (!offers || offersIsLoading) return OFFER_LOADING;
    return offers.filter(
      (offer: Offer) =>
        !offer.buyerAddress && BigNumber(offer.amount).isPositive()
    );
  };
  
  export const selectPrivateOffers = (state: RootStore) => {
    const address = selectAddress(state);
    const offers = selectOffers(state);
    const offersIsLoading = selectOffersIsLoading(state);
  
    if (!address || !offers || offersIsLoading) return OFFER_LOADING;
    return offers.filter((offer: Offer) => offer.buyerAddress == address);
  };