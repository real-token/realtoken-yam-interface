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

useRootStore.subscribe((state) => ({
    chainId: state.chainId,
    account: state.account
}), async (values, oldValues) => {
    if(
        (values.chainId == oldValues.chainId && values.account == oldValues.account) ||
        values.chainId == undefined ||
        values.account == undefined ||
        values.account == ''
    ) return;

    console.log(values, oldValues)

    const { refreshInterface, abortController } = useRootStore.getState();

    // ABORT ALL BEFORE CONTINUING
    abortController.abort('ABORTED: ChainId or account changed');

    await refreshInterface();
})

// useRootStore.subscribe((state) => state.account, async (newAccount, oldAccount) => {
//     const { refreshInterface } = useRootStore.getState();
//     if(newAccount === oldAccount) return;
//     await refreshInterface();
// })