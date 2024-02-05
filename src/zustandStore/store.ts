import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools';
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

mountStoreDevtool('bridge', useRootStore);

useRootStore.subscribe((state) => state.chainId, async (newChainId, oldChainId) => {
    const { refreshInterface } = useRootStore.getState();
    if(oldChainId === newChainId) return;
    await refreshInterface();
})

useRootStore.subscribe((state) => state.account, async (newAccount, oldAccount) => {
    const { refreshInterface } = useRootStore.getState();
    if(newAccount === oldAccount) return;
    await refreshInterface();
})