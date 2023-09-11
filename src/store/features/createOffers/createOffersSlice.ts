import { createAction, createReducer } from '@reduxjs/toolkit';

import { CreatedOffer } from 'src/types/offer/CreatedOffer';

interface createOffersInitialStateType {
  offers: CreatedOffer[];
}

const createOffersInitialState: createOffersInitialStateType = {
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
  offers: [],
};

// DISPATCH TYPE
export const createOfferAddedDispatchType = 'createOffer/createOfferAdded';
export const createOfferRemovedDispatchType = 'createOffer/createOfferRemoved';
export const createOfferResetDispatchType = 'createOffer/createOfferReset';

// ACTIONS
export const createOfferAdded = createAction<CreatedOffer>(
  createOfferAddedDispatchType
);
export const createOfferRemoved = createAction<number>(
  createOfferRemovedDispatchType
);
export const createOfferReset = createAction<void>(
  createOfferResetDispatchType
);

export const createOffersReducers = createReducer(
  createOffersInitialState,
  (builder) => {
    builder
      .addCase(createOfferAdded, (state, action) => {
        console.log('createOfferAdded');
        state.offers.push(action.payload);
      })
      .addCase(createOfferRemoved, (state, action) => {
        state.offers.splice(
          state.offers.findIndex((offer) => offer.offerId === action.payload),
          1
        );
      })
      .addCase(createOfferReset, (state) => {
        state.offers = [];
      });
  }
);
