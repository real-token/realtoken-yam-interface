import { create, createStore, useStore } from 'zustand';
import { devtools } from 'zustand/middleware'
import { InterfaceSlice, InterfaceSliceSetable, createInterfaceSlice } from './interfaceSlice';
import { subscribeWithSelector } from 'zustand/middleware'
import { CreateOffersSlice, createCreateOfferSlice } from './createOffersSlice';
import { ChainsID } from '../constants';
import { useContext } from 'react';
import { YamContext } from './context';
import { OFFER_LOADING } from '../types/offer';

// This contains all the type of the slices
export type RootStore = InterfaceSlice & CreateOffersSlice;

// This contains only the setable values of the slices (settables in the provider component)
export type SetableValues = InterfaceSliceSetable;

export type YamStore = ReturnType<typeof createYamStore>;

export const createYamStore = (initProps: SetableValues) => {
    const DEFAULT_PROPS: SetableValues = {
        account: undefined,
        chainId: ChainsID.Gnosis,
        interfaceIsLoading: true,
        offersAreLoading: true,
        propertiesAreLoading: true,
        userBalancesAreLoading: true,
        pricesAreLoading: true,
        offers: OFFER_LOADING,
        properties: [],
        userBalances: {},
        prices: {},
        wlProperties: [],
        wlPropertiesAreLoading: true
    }
    return createStore<RootStore>()(
        subscribeWithSelector(
            devtools((...args) => ({ 
                ...DEFAULT_PROPS,
                ...initProps,
                ...createInterfaceSlice(...args),
                ...createCreateOfferSlice(...args)
            }))
        )
    );
}

export function useRootStore<T>(selector: (state: RootStore) => T): T {
    const store = useContext(YamContext)
    if (!store) throw new Error('Missing YamContext.Provider in the tree')
    return useStore(store, selector)
}
  
// mountStoreDevtool('YAM', useRootStore);