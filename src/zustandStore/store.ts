import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { InterfaceSlice, createInterfaceSlice } from './interfaceSlice';
import { subscribeWithSelector } from 'zustand/middleware'
import { CreateOffersSlice, createCreateOfferSlice } from './createOffersSlice';
import { JsonRpcProvider } from '@ethersproject/providers';
import { CHAINS } from '@realtoken/realt-commons';

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

useRootStore.subscribe((state) => state.chainId, async (newChainId) => {
    const { account, fetchAddressWlProperties, fetchProperties, fetchPrices } = useRootStore.getState();

    const rpcUrl = CHAINS[newChainId].rpcUrl;
    const provider = new JsonRpcProvider(rpcUrl);

    await fetchProperties(newChainId);
    await fetchAddressWlProperties(account, newChainId);
    await fetchPrices(newChainId,provider)

})