import { createAction, createReducer } from '@reduxjs/toolkit';

import { Offer } from 'src/types/offer';

interface buyOfferInitialStateType {
  isOpened: boolean;
  offer: Offer | undefined;
}

const buyOfferInitialState: buyOfferInitialStateType = {
  // offers: [{
  //   offerType: OFFER_TYPE.BUY,
  //   offerId:0,
  //   offerTokenAddress:"0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
  //   buyerTokenAddress:"0xfe17c3c0b6f38cf3bd8ba872bee7a18ab16b43fb",
  //   price:1,
  //   amount:2,
  //   buyerAddress:"0x0000000000000000000000000000000000000000",
  //   isPrivateOffer:false,
  // }]
  isOpened: false,
  offer: undefined,
};

// DISPATCH TYPE
export const buyOfferOpenDispatchType = 'buyOffer/buyOfferOpen';
export const buyOfferCloseDispatchType = 'buyOffer/buyOfferClose';
export const buyOfferResetDispatchType = 'buyOffer/buyOfferReset';

// ACTIONS
export const buyOfferOpen = createAction<Offer>(buyOfferOpenDispatchType);
export const buyOfferClose = createAction<void>(buyOfferCloseDispatchType);
export const buyOfferReset = createAction<void>(buyOfferResetDispatchType);

export const buyOfferReducers = createReducer(
  buyOfferInitialState,
  (builder) => {
    builder
      .addCase(buyOfferOpen, (state, action) => {
        state.isOpened = true;
        state.offer = action.payload;
      })
      .addCase(buyOfferClose, (state, action) => {
        state.isOpened = false;
      })
      .addCase(buyOfferReset, (state) => {
        state.isOpened = false;
        state.offer = undefined;
      });
  }
);
