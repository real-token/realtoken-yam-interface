import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { InterfaceSlice, createInterfaceSlice } from './interfaceSlice';
import { subscribeWithSelector } from 'zustand/middleware'
import { CreateOffersSlice, createCreateOfferSlice } from './createOffersSlice';

export type RootStore = InterfaceSlice & CreateOffersSlice;

export const useRootStore = create<RootStore>()(
    subscribeWithSelector(
        devtools((...args) => ({ 
            ...createInterfaceSlice(...args),
            ...createCreateOfferSlice(...args)
        }))
    )
);

// mountStoreDevtool('bridge', useRootStore);
  
// mountStoreDevtool('YAM', useRootStore);