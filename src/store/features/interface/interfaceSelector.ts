import BigNumber from 'bignumber.js';
import { Offer, OFFER_LOADING } from 'src/types/offer/Offer';
import { RootState } from 'src/store/store';
import { selectAddress } from '../settings/settingsSelector';

export const selectOffersIsLoading = (state: RootState) =>
  state.interface.offers.isLoading;
export const selectProperties = (state: RootState) =>
  state.interface.properties.properties;
export const selectPropertiesIsLoading = (state: RootState) =>
  state.interface.properties.isloading;
export const selectChainProperties = (state: RootState) =>
  state.interface.chainProperties;

export const selectOffers = (state: RootState): Offer[] =>
  state.interface.offers.offers;

export const selectAddressOffers = (state: RootState) => {
  const address = selectAddress(state);
  const offers = selectOffers(state);

  if (!address || !offers)
    return OFFER_LOADING;
    return offers.filter(
      (offer: Offer) => offer.sellerAddress == address
    );
};

export const selectPublicOffers = (state: RootState) => {
  const offers = selectOffers(state);
  const offersIsLoading = selectOffersIsLoading(state);
  if (!offers || offersIsLoading) return OFFER_LOADING;
  return offers.filter(
    (offer: Offer) =>
      !offer.buyerAddress &&
      BigNumber(offer.amount).isPositive() &&
      !BigNumber(offer.amount).isZero()
  );
  return offers;
};

export const selectPrivateOffers = (state: RootState) => {
  const address = selectAddress(state);
  const offers = selectOffers(state);
  const offersIsLoading = selectOffersIsLoading(state);

  if (!address || !offers || offersIsLoading) return OFFER_LOADING;
  return offers.filter(
    (offer: Offer) => offer.buyerAddress == address
  );
};

export const selectSellRealTOffers = (state: RootState) => {
  return OFFER_LOADING;
};

// const condFiltreZeroAmount = filterZeroAmount ? !bnAmount.isZero() : true;
//         if(condFiltreZeroAmount){
//           if (filterSeller) {
//             //console.log("is seller", account, sellerAddress,buyerAddress)
//             if (offerData.sellerAddress === account) {
//               offersData.push(offerData);
//             }
//           } else if (filterBuyer) {
//             // Filter offer by buyer
//             //console.log("is buyer", account, buyerAddress,sellerAddress);
//             if (offerData.buyerAddress === account) {
//               offersData.push(offerData);
//             }
//           } else {
//             // No filter, show public offers
//             // console.log("is public", account, sellerAddress, buyerAddress);
//             if (offerData.buyerAddress === ZERO_ADDRESS) {
//               offersData.push(offerData);
//             }
//           }
//         }
