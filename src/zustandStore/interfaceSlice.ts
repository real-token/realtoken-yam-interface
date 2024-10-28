import { StateCreator } from "zustand";
import { RootStore } from "./store";
import { Offer } from "../types/offer";
import { PropertiesToken } from "../types";
import { Price } from "../types/price";
import { JsonRpcProvider } from "@ethersproject/providers";
import { CHAINS, ChainsID } from "../constants";
import { Historic } from "../types/historic";
import { getPurchases, getSales } from "../utils/historic/historic";
import { UserBalances } from "../types/UserBalance";

export interface InterfaceSliceSetable{
  account: string | undefined;
  chainId: number;
  interfaceIsLoading: boolean;

  propertiesAreLoading: boolean;
  properties: PropertiesToken[];

  userBalancesAreLoading: boolean;
  userBalances: UserBalances;

  pricesAreLoading: boolean;
  prices: Price;

  offersAreLoading: boolean;
  offers: Offer[];

  wlProperties: number[] | undefined;
  wlPropertiesAreLoading: boolean;
}

export interface InterfaceSliceValues{
  theGraphHasIssue: boolean;
  setTheGraphIssue: (theGraphHasIssue: boolean) => void;

  getProvider: () => JsonRpcProvider;

  abortController: AbortController;
  setAbortController: (abortController: AbortController) => void;

  refreshOffers: () => Promise<void>;
  refreshInterface: () => void;

  // HISTORIC
  historics: Historic[];
  historicsAreLoading: boolean;
  historicHasLoadingError: boolean;
  fetchHistorics: () => Promise<void>;
}

export type InterfaceSlice = InterfaceSliceSetable & InterfaceSliceValues;

export const createInterfaceSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  InterfaceSliceValues
> = (set, get) => {
  return {

    getProvider: (): JsonRpcProvider => {
      try{
        const { chainId } = get();
        const rpcUrl = CHAINS[chainId as ChainsID].rpcUrl;
        return new JsonRpcProvider(rpcUrl);
      }catch(err){
        console.log('Failed to get provider: ', err)
      }finally{
        return new JsonRpcProvider(CHAINS[ChainsID.Gnosis].rpcUrl);
      }
    },

    theGraphHasIssue: false,
    setTheGraphIssue: (theGraphHasIssue: boolean) => set({ theGraphHasIssue }),

    abortController: new AbortController(),
    setAbortController: (abortController) => set({ abortController }),

    refreshInterface: async () => {
      try{

        const { fetchOffers, fetchHistorics, setInterfaceIsLoading, refreshInterfaceDatas, abortController, chainId } = get();

        console.log('TESSTTTTTTT: ', chainId)

        abortController.abort();

        set({ abortController: new AbortController() })
        
        setInterfaceIsLoading(true);
  
        await refreshInterfaceDatas();
  
        await Promise.all([
          fetchOffers(),
          fetchHistorics()
        ]);
        setInterfaceIsLoading(false);
      }catch(err){
        console.error('Error while refreshing interface: ', err);
      }
    },
    refreshOffers: async () => {
      try{
        const { fetchOffers, setInterfaceIsLoading } = get();
        setInterfaceIsLoading(true);
  
        await fetchOffers();
  
        setInterfaceIsLoading(false);
      }catch(err){
        console.error(err)
      }
    },

    historics: [],
    historicsAreLoading: true,
    historicHasLoadingError: false,
    fetchHistorics: (): Promise<void> => {
      const { chainId, account, abortController } = get();
      return new Promise<void>(async (resolve, reject) => {
        try{

          const abortListener = ({ target }: { target: any }) => {
            abortController.signal.removeEventListener('abort', abortListener);
            reject(target.reason);
          }
          abortController.signal.addEventListener('abort', abortListener);

          console.log('FETCH HISTORICS')
  
          const graphNetworkPrefix = CHAINS[chainId as ChainsID].graphPrefixes.yam;
  
          const [buyerHistorics, sellerHistorics] = await Promise.all([
            getPurchases(account, graphNetworkPrefix),
            getSales(account, graphNetworkPrefix)
          ]);

          const historics = buyerHistorics.concat(sellerHistorics);

          // console.log('HISTORICS: ', historics);

          const sortedHistorics = historics.sort((a, b) => a.createdAtTimestamp > b.createdAtTimestamp ? -1 : 1);
  
          // console.log('FINISH TO FETCH HISTORICS: ', historics.length);
  
          set({ 
            historics: sortedHistorics,
            // historics: [],
            historicsAreLoading: false,
            historicHasLoadingError: false
          });

          resolve();
  
        }catch(err){
          console.error('Failed to fetch historics: ', err);
          set({ historicHasLoadingError: true })
        }
      });
    }
  };
};