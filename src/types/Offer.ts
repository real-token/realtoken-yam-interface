import BigNumber from 'bignumber.js';

export enum OFFER_TYPE{
  BUY = "BUY",
  SELL = "SELL",
  EXCHANGE = "EXCHANGE"
}

export type CreatedOffer = {
  offerToken: string;
  buyerToken: string;
  price: BigNumber;
  offerId: BigNumber;
};

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
  type?: OFFER_TYPE|undefined
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
  type: undefined
}

export const OFFER_LOADING = [DEFAULT_OFFER, DEFAULT_OFFER, DEFAULT_OFFER]