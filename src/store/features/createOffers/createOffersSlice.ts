import { createAction, createReducer } from "@reduxjs/toolkit";
import { CreatedOffer } from "src/types/Offer/CreatedOffer";

interface createOffersInitialStateType{
    offers: CreatedOffer[]
}

const createOffersInitialState: createOffersInitialStateType = {
    offers: []
}

// DISPATCH TYPE
export const createOfferAddedDispatchType = "createOffer/createOfferAdded";
export const createOfferRemovedDispatchType = "createOffer/createOfferRemoved";

// ACTIONS
export const createOfferAdded = createAction<CreatedOffer>(createOfferAddedDispatchType);
export const createOfferRemoved = createAction<number>(createOfferRemovedDispatchType);

export const createOffersReducers = createReducer(
    createOffersInitialState,
    (builder) => {
      builder.addCase(createOfferAdded, (state,action) => {
        state.offers.push(action.payload);
      })
      builder.addCase(createOfferRemoved, (state,action) => {
        state.offers.splice(state.offers.findIndex((offer) => offer.offerId === action.payload), 1);
      })
    }
  );