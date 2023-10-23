import { OFFER_TYPE } from "./OfferType";

export type Offer = {
  offerId: string;
  offerTokenAddress: string;
  offerTokenName: string;
  offerTokenDecimals: string;
  offerTokenType:number;
  buyerTokenAddress: string;
  buyerTokenName: string;
  buyerTokenDecimals: string;
  buyerTokenType: number;
  sellerAddress: string;
  sellerName: string;
  buyerAddress: string;
  price: string;
  amount: string;
  hasPropertyToken: boolean;
  removed: boolean;
  availableAmount: string;
  balanceWallet?: string;
  allowanceToken?: string;
  type?: OFFER_TYPE|undefined;
  createdAtTimestamp: number;
  officialPrice: number|undefined;
  offerPrice: number|undefined;
  priceDelta: number|undefined;
  officialYield: number|undefined;
  offerYield: number|undefined;
  yieldDelta: number|undefined;
  buyCurrency: string;
  //
  electricityPrice: number
  sellDate: string
  sites:{
    selling:{
      miningSite: string;
      name: string;
      location:{
        aera: string;
        country: string;
      };
      energy:string[];
    };
    buying:{
      miningSite: string;
      name: string;
      location:{
        aera: string;
        country: string;
      };
      energy:string[];
    };
    
  }
  
};

export const DEFAULT_OFFER: Offer = {
  offerId: "",
  offerTokenAddress: "",
  offerTokenName: "",
  offerTokenDecimals: "",
  offerTokenType: 0,
  buyerTokenAddress: "",
  buyerTokenName: "",
  buyerTokenDecimals: "",
  buyerTokenType: 0,
  sellerAddress: "",
  sellerName: "",
  buyerAddress: "",
  price: "",
  amount: "",
  hasPropertyToken: false,
  removed: false,
  availableAmount: "",
  balanceWallet: "",
  type: undefined,
  createdAtTimestamp: 0,
  officialPrice: undefined,
  offerPrice: undefined,
  priceDelta: undefined,
  officialYield: undefined,
  offerYield: undefined,
  yieldDelta: undefined,
  buyCurrency: "",
  //
  electricityPrice: 0,
  sellDate: "",
  sites:{
    selling: {
      miningSite: "",
      name: "",
      location:{
        aera: "",
        country: "",
      },
      energy:[],},
    buying: {
      miningSite: "",
      name: "",
      location:{
        aera: "",
        country: "",
      },
      energy:[],},
      }
}

export const OFFER_LOADING = [DEFAULT_OFFER, DEFAULT_OFFER, DEFAULT_OFFER]