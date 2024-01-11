import { StateCreator } from "zustand";
import { RootStore } from "./store";
import { OFFER_LOADING, Offer } from "../types/offer";
import { PropertiesToken } from "../types";
import { Price } from "../types/price";
import { fetchOffersTheGraph } from "../utils/offers/fetchOffers";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { CHAINS, ChainsID } from "../constants";
import { apiClient } from "../utils/offers/getClientURL";
import { gql } from "@apollo/client";
import { getRightAllowBuyTokens } from "../hooks/useAllowedTokens";
import { AllowedToken } from "../types/allowedTokens";
import { getPrice } from "../utils/price";
import { Price as P } from "src/utils/price";

export interface InterfaceSlice {
  account: string;
  setAccount: (account: string) => void;
  chainId: number;
  setChainId: (chainId: number) => void;

  //Offers
  fetchOffers: (
    provider: Web3Provider,
    account: string,
    chainId: number,
    properties: PropertiesToken[],
    wlProperties: number[]
  ) => Promise<void>;
  askForRefresh: boolean;
  setAskForRefresh: (askForRefresh: boolean) => void;
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
  fetchPrices: (chainId: number, provider: Web3Provider|JsonRpcProvider) => Promise<void>;
  prices: Price;
  pricesAreLoading: boolean;
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

    fetchOffers: async (provider, account, chainId) => {
      set({ offersAreLoading: true });
  
      const prices = get().prices;
      const properties = get().properties;
      const wlProperties = get().wlProperties;
  
      let offersData;
      if ((chainId == 1 || chainId == 100 || chainId == 5) && wlProperties && prices) {
        //offersData = await fetchOfferTheGraph(chainId,properties);
        offersData = await fetchOffersTheGraph(provider,account,chainId, properties, wlProperties, prices);
      }
  
      set({ offers: offersData, offersAreLoading: false });
    },
    askForRefresh: false,
    setAskForRefresh: (askForRefresh: boolean) => set({ askForRefresh}),
    offers: OFFER_LOADING,
    offersAreLoading: true,
    privateOffers: [],

    fetchProperties: async (chainId: number) => {
      try {
        const response = await fetch(`/api/properties/${chainId}`);
        if (response.ok) {
          const responseJson: PropertiesToken[] = await response.json();
          set({ properties: responseJson, propertiesAreLoading: false });
        }
      } catch (err) {
        console.log('Failed to load properties from API.');
      }
    },
    properties: [],
    propertiesAreLoading: true,

    fetchAddressWlProperties: async (address: string, chainId: number) => {
      try{
     
        const prefix = CHAINS[chainId as ChainsID].graphPrefixes.realtoken;
        
        const { data } = await apiClient.query({query: gql`
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
        `});
  
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

    fetchPrices: async (chainId, provider) => {
      try{

        const tokens = getRightAllowBuyTokens(chainId);
        const p = await Promise.all(tokens.map((allowedToken: AllowedToken) => getPrice(provider,allowedToken)));
  
        const prices: Price = {};
        p.forEach((p: P) => prices[p.contractAddress.toLowerCase()] = p.price);

        set({
          prices: prices,
          pricesAreLoading: false
        })
       
      }catch(err){
        console.log()
      }
    },
    prices: {},
    pricesAreLoading: true,

  };
};