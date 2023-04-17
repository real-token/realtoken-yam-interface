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
  yieldDelta: number|undefined,
  buyCurrency: string;
  //
  electricityPrice: number
  sellDate: string
  miningSite: string
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
  miningSite: ""
}

export const OFFER_LOADING = [DEFAULT_OFFER, DEFAULT_OFFER, DEFAULT_OFFER]