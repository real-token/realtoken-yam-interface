import { Web3Provider } from '@ethersproject/providers';
import { createAction, createReducer } from '@reduxjs/toolkit';

import { ContractsID, TypedContract } from 'src/constants';
import { APIPropertiesToken, PropertiesToken } from 'src/types';
import { OFFER_LOADING, Offer } from 'src/types/Offer';
import { fetchOfferTheGraph } from 'src/utils/offers/fetchOffers';

interface InterfaceInitialStateType {
  offers: {
    isLoading: boolean;
    offers: Offer[];
  };
  privateOffers: Offer[];
  properties: {
    isloading: boolean;
    properties: APIPropertiesToken[];
  };
  chainProperties: PropertiesToken[];
}

const interfaceInitialState: InterfaceInitialStateType = {
  offers: {
    isLoading: true,
    offers: OFFER_LOADING,
  },
  privateOffers: [],
  properties: {
    properties: [],
    isloading: true,
  },
  chainProperties: [],
};

//DISPATCH TYPE
export const offersChangedDispatchType = 'interface/offersChanged';
export const offersIsLoadingDispatchType = 'interface/offersIsLoading';
export const offersResetDispatchType = 'interface/offersReset';
export const propertiesChangedDispatchType = 'interface/propertiesChanged';
export const propertiesIsLoadingDispatchType = 'interface/propertiesIsLoading';
export const chainPropertiesChangedDispatchType =
  'interface/chainPropertiesChanged';

//ACTIONS
export const offersChanged = createAction<Offer[]>(offersChangedDispatchType);
export const offersIsloading = createAction<boolean>(
  offersIsLoadingDispatchType
);
export const offersReset = createAction<undefined>(offersResetDispatchType);
export const propertiesChanged = createAction<APIPropertiesToken[]>(
  propertiesChangedDispatchType
);
export const propertiesIsLoading = createAction<boolean>(
  propertiesIsLoadingDispatchType
);
export const chainPropertiesChanged = createAction<PropertiesToken[]>(
  chainPropertiesChangedDispatchType
);

// THUNKS
export function fetchOffers(
  realTokenYamUpgradeable: TypedContract<ContractsID>,
  provider: Web3Provider,
  account: string,
  chainId: number,
  properties: PropertiesToken[]
) {
  // TODO: look for type
  return async function fetchOffersThunk(dispatch: any) {
    dispatch({ type: offersResetDispatchType });
    dispatch({ type: offersIsLoadingDispatchType, payload: true });

    let offersData;
    if (chainId == 1 || chainId == 100 || chainId == 5) {
      //offersData = await fetchOfferTheGraph(chainId,properties);
      offersData = await fetchOfferTheGraph(chainId);
    }
    // else{
    //   offersData = await fetchOffersBasic(realTokenYamUpgradeable,provider,account,properties);
    // }

    dispatch({ type: offersChangedDispatchType, payload: offersData });
    dispatch({ type: offersIsLoadingDispatchType, payload: false });
  };
}
export function fetchProperties() {
  return async function fetchPropertiesThunk(dispatch: any) {
    try {
      const response = await fetch('/api/properties');

      if (response.ok) {
        const responseJson: APIPropertiesToken[] = await response.json();
        dispatch({
          type: propertiesChangedDispatchType,
          payload: responseJson,
        });
        dispatch({ type: propertiesIsLoadingDispatchType, payload: false });
      }
    } catch (err) {
      console.log('Failed to load properties from API.');
    }
  };
}

export const interfaceReducers = createReducer(
  interfaceInitialState,
  (builder) => {
    builder
      .addCase(offersChanged, (state, action) => {
        state.offers.offers = action.payload;
      })
      .addCase(offersIsloading, (state, action) => {
        state.offers.isLoading = action.payload;
      })
      .addCase(propertiesChanged, (state, action) => {
        state.properties.properties = action.payload;
      })
      .addCase(chainPropertiesChanged, (state, action) => {
        state.chainProperties = action.payload;
      })
      .addCase(propertiesIsLoading, (state, action) => {
        state.properties.isloading = action.payload;
      })
      .addCase(offersReset, (state) => {
        state.offers.offers = OFFER_LOADING;
      });
  }
);
