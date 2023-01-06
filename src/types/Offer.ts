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
  buyerTokenAddress: string;
  buyerTokenName: string;
  buyerTokenDecimals: string;
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

export const DEFAULT_OFFER: Offer = {
  offerId: "",
  offerTokenAddress: "",
  offerTokenName: "",
  offerTokenDecimals: "",
  buyerTokenAddress: "",
  buyerTokenName: "",
  buyerTokenDecimals: "",
  sellerAddress: "",
  buyerAddress: "",
  price: "",
  amount: "",
  hasPropertyToken: false,
  removed: false,
  availableAmount: "",
  balanceWallet: ""
}

export const OFFER_LOADING = [DEFAULT_OFFER, DEFAULT_OFFER, DEFAULT_OFFER]