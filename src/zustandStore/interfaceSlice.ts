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
import { fetchOffer } from "../utils/offers/fetchOffer";
import { Historic } from "../types/historic";
import { parseHistoric } from "../utils/historic/historic";

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

  refreshInterfaceDatas: () => Promise<void>;
  refreshOffers: () => Promise<void>;
  refreshInterface: () => void;

  //Offers
  fetchOffers: (provider: Web3Provider|JsonRpcProvider) => Promise<void>;
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
  fetchPrices: (chainId: number, provider: Web3Provider|JsonRpcProvider) => Promise<void>;
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

    refreshInterfaceDatas: async () => {
      const { chainId, account, fetchAddressWlProperties, fetchProperties, fetchPrices, getProvider, setInterfaceIsLoading } = get();
      setInterfaceIsLoading(true);

      const provider = getProvider()

            await fetchProperties(chainId);
      await fetchAddressWlProperties(account, chainId);
      await fetchPrices(chainId,provider);

    },
    refreshInterface: async () => {

      const { getProvider, fetchOffers, fetchHistorics, setInterfaceIsLoading, refreshInterfaceDatas } = get();
      setInterfaceIsLoading(true);

      const provider = getProvider();
      await refreshInterfaceDatas();

      await Promise.all([
        fetchOffers(provider),
        fetchHistorics()
      ]);
      setInterfaceIsLoading(false);
    },
    refreshOffers: async () => {
      const { getProvider, fetchOffers, setInterfaceIsLoading } = get();
      setInterfaceIsLoading(true);

      const provider = getProvider();
      await fetchOffers(provider);

      setInterfaceIsLoading(false);
    },

    fetchOffers: async (provider) => {
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

        console.log('FETCH PRICES')

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

    historics: [],
    historicsAreLoading: true,
    historicHasLoadingError: false,
    fetchHistorics: async () => {
      const { chainId, account } = get();
      try{

        const graphNetworkPrefix = CHAINS[chainId as ChainsID].graphPrefixes.yam;

        const { data } = await apiClient.query({query: gql`
          query getHistorics{
            ${graphNetworkPrefix} {
              purchases(where: { buyer: "${account.toLowerCase()}" }, orderBy: createdAtTimestamp, orderDirection: desc, first: 100){
                id
                offer{
                  id
                  offerToken{
                    address
                    tokenType
                    name
                    symbol
                  }
                  buyerToken{
                    address
                    tokenType
                    name
                    symbol
                  }
                }
                seller{
                  address
                }
                price
                quantity
                createdAtTimestamp
              }
            }
          }
        `});

        console.log('HISTORICS: ', data[graphNetworkPrefix].purchases);
        const historic: Historic[] | undefined = parseHistoric(data[graphNetworkPrefix].purchases);
        if(!historic) return;

        set({ 
          historics: historic,
          historicsAreLoading: false,
          historicHasLoadingError: false
        });

      }catch(err){
        console.error('Failed to fetch historics: ', err);
        set({ historicHasLoadingError: true })
      }
    }
  };
};