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

// ACTIONS
export const createOfferAdded = createAction<CreatedOffer>(createOfferAddedDispatchType);

export const createOffersReducers = createReducer(
    createOffersInitialState,
    (builder) => {
      builder.addCase(createOfferAdded, (state,action) => {
        state.offers.push(action.payload);
      })
    }
  );