import BigNumber from 'bignumber.js';

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

};

export const DEFAULT_OFFERS: Offer = {
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
}

export const OFFER_LOADING = [DEFAULT_OFFERS, DEFAULT_OFFERS, DEFAULT_OFFERS]