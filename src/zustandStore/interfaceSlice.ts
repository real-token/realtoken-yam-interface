import { StateCreator } from "zustand";
import { RootStore } from "./store";
import { OFFER_LOADING, Offer } from "../types/offer";
import { PropertiesToken } from "../types";
import { Price } from "../types/price";
import { fetchOffersTheGraph } from "../utils/offers/fetchOffers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { CHAINS, ChainsID } from "../constants";
import { apiClient } from "../utils/offers/getClientURL";
import { gql } from "@apollo/client";
import { Historic } from "../types/historic";
import { getPurchases, getSales, parseHistoric } from "../utils/historic/historic";
import { UserBalances } from "../types/UserBalance";
import BigNumber from "bignumber.js";
import { mergeExtendedProperties } from "../utils/properties";
import { getExtendedTokens } from "../constants/GetPriceToken";

export interface InterfaceSlice {
  account: string;
  setAccount: (account: string) => void;
  chainId: number;
  setChainId: (chainId: number) => void;

  theGraphHasIssue: boolean;
  setTheGraphIssue: (theGraphHasIssue: boolean) => void;

  getProvider: () => JsonRpcProvider;

  interfaceIsLoading: boolean;
  setInterfaceIsLoading: (status: boolean) => void;

  abortController: AbortController;
  setAbortController: (abortController: AbortController) => void;

  refreshInterfaceDatas: () => Promise<void>;
  refreshOffers: () => Promise<void>;
  refreshInterface: () => void;

  userBalances: UserBalances;
  userBalancesAreLoading: boolean;
  fetchUserBalances: () => Promise<void>;

  //Offers
  fetchOffers: () => Promise<void>;
  // askForRefresh: boolean;
  // setAskForRefresh: (askForRefresh: boolean) => void;
  offersAreLoading: boolean;
  offers: Offer[];
  privateOffers: Offer[];

  // Properties
  fetchProperties: (chainId: number) => Promise<void>;
  propertiesAreLoading: boolean;
  properties: PropertiesToken[];

  // WL Properties
  fetchAddressWlProperties: (address: string, chainId: number) => Promise<void>;
  wlProperties: number[] | undefined;
  wlPropertiesAreLoading: boolean;

  // Prices
  fetchPrices: (chainId: number) => Promise<void>;
  prices: Price;
  pricesAreLoading: boolean;

  // HISTORIC
  historics: Historic[];
  historicsAreLoading: boolean;
  historicHasLoadingError: boolean;
  fetchHistorics: () => Promise<void>;
}

export const createInterfaceSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  InterfaceSlice
> = (set, get) => {
  return {
    account: "",
    setAccount: (account: string) => set({ account }),

    chainId: 1,
    setChainId: (chainId: number) => set({ chainId }),

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

    interfaceIsLoading: true,
    setInterfaceIsLoading: (interfaceIsLoading: boolean) => set({ interfaceIsLoading }),

    abortController: new AbortController(),
    setAbortController: (abortController) => set({ abortController }),

    refreshInterfaceDatas: (): Promise<void> => {
      return new Promise<void>(async (resolve, reject) => {
        try{
          // try{
            const { 
              chainId, account, abortController, setAbortController, setInterfaceIsLoading,
              fetchAddressWlProperties, fetchProperties, fetchPrices,  fetchUserBalances 
            } = get();
            setInterfaceIsLoading(true);
            
            abortController.abort('chain changed');
            setAbortController(new AbortController())
      
            await Promise.allSettled([
              fetchProperties(chainId),
              fetchAddressWlProperties(account, chainId),
              fetchPrices(chainId),
              fetchUserBalances()
            ]);
      
            // await fetchProperties(chainId);
            // await fetchAddressWlProperties(account, chainId);
            // await fetchPrices(chainId).catch(err => console.error('Failed to fetch prices: ', err));
            // await fetchUserBalances()

            setInterfaceIsLoading(false);
            resolve();

          // }catch(err){
          //   reject(err);
          // }
        }catch(err){
          reject(err); 
        }
      });
    },
    refreshInterface: async () => {
      try{

        const { fetchOffers, fetchHistorics, setInterfaceIsLoading, refreshInterfaceDatas, abortController } = get();

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

    userBalances: {},
    userBalancesAreLoading: true,
    fetchUserBalances: (): Promise<void> => {
      return new Promise<void>(async (resolve, reject) => {
        try{

          const { account } = get();

          const chainDatas = CHAINS[get().chainId as ChainsID];
          const prefix = chainDatas.graphPrefixes.realtoken;

          const res = await apiClient.query({
            query: gql`
            query getBalances{
                ${prefix}{
                  accountBalances(where: { account: "${account.toLowerCase()}" }, first: 1000){
                    token{
                      address
                    }
                    amount
                  }
                }
              }
            `
          });

          const balances = res.data[prefix].accountBalances;
          // console.log('USER BALANCES: ', balances);

          const userBalances: UserBalances = {};
          balances.forEach((balance: any) => {
            userBalances[balance.token.address.toLowerCase()] = new BigNumber(balance.amount);
          });

          set({ userBalances, userBalancesAreLoading: false });
          resolve();

        }catch(err){
          reject(err)
        }
      });
    },

    fetchOffers: async () => {
      set({ offersAreLoading: true });

      const { prices, properties, wlProperties, account, chainId, setTheGraphIssue } = get();

      let offersData;
      if ((chainId == 1 || chainId == 100 || chainId == 5) && wlProperties && prices) {
        //offersData = await fetchOfferTheGraph(chainId,properties);
        offersData = await fetchOffersTheGraph(account,chainId, properties, wlProperties, prices, setTheGraphIssue);
      }
  
      set({ offers: offersData, offersAreLoading: false });
    },
    // askForRefresh: false,
    // setAskForRefresh: (askForRefresh: boolean) => set({ askForRefresh}),
    offers: OFFER_LOADING,
    offersAreLoading: true,
    privateOffers: [],

    fetchProperties: async (chainId: number) => {
      const { abortController } = get(); 
      try {
        const response = await fetch(`/api/properties/${chainId}`, { signal: abortController.signal });
        if (response.ok) {
          const responseJson: PropertiesToken[] = await response.json();
          const tokens = mergeExtendedProperties(responseJson, getExtendedTokens(chainId));

          set({ properties: tokens, propertiesAreLoading: false });
        }
      } catch (err) {
        console.log('Failed to load properties from API: ', err);
      }
    },
    properties: [],
    propertiesAreLoading: true,

    fetchAddressWlProperties: async (address: string, chainId: number) => {
      const { abortController } = get(); 
      try{
     
        const prefix = CHAINS[chainId as ChainsID].graphPrefixes.realtoken;
        
        const { data } = await apiClient.query({
          query: gql`
            query getWlProperties{
              ${prefix}{
                account(id: "${address.toLowerCase()}") {
                  userIds{
                    userId
                    attributeKeys
                    trustedIntermediary{
                      address 
                      weight
                    }
                  }
                }
              }
            }
          `,
          context: {
            fetchOptions: {
              signal: abortController.signal
            }
          }
          });
  
        const userIds = data[prefix]?.account?.userIds;
  
        let wlTokenIds: string[] | undefined = undefined;
        if(userIds){
          wlTokenIds = userIds[0].attributeKeys;
        }

        set({ 
          wlProperties: wlTokenIds ? wlTokenIds.map(str => parseInt(str)) : [],
          wlPropertiesAreLoading: false
        });
        
        console.log('FINISH TO FETCH WL ADDRESSE PROPERTIES')
        
      } catch(err){
        console.log("Failed to fetch wl properties for connected address.", err)
      }
    },
    wlProperties: undefined,
    wlPropertiesAreLoading: true,

    fetchPrices: (chainId): Promise<void> => {
      return new Promise<void>(async (resolve, reject) => {
        try{

          const { abortController } = get(); 

          console.log('FETCH PRICES: ', chainId)

          const res = await fetch(
            '/api/prices/'+chainId,
            { ...(abortController ? { signal: abortController.signal } : {}) }
          );
          const prices: Price = await res.json();
  
          set({
            prices: prices,
            pricesAreLoading: false
          });

          resolve();
         
        }catch(err){
          console.error(err);
          reject(err);
        }
      });
    },
    prices: {},
    pricesAreLoading: true,

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