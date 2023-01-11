import { createAction, createReducer } from "@reduxjs/toolkit";

interface SettingsInitialStateType{
  address: string
}

const settingsInitialState: SettingsInitialStateType = {
  address: "",
} 

//DISPATCH TYPE
export const addressChangedDispatchType = "settings/addressChanged";

//ACTIONS
export const addressChanged = createAction<string>(addressChangedDispatchType);

export const settingsReducers = createReducer(settingsInitialState, (builder) => {
  builder.addCase(addressChanged, (state, action) => {
      state.address = action.payload;
  })
});