import { RootState } from 'src/store/store';
import { Offer } from 'src/types/offer';

export const selectBuyOffer = (state: RootState): Offer | undefined =>
  state.buyInterface.offer;
export const selectIsBuyOfferOpened = (state: RootState): boolean =>
  state.buyInterface.isOpened;
