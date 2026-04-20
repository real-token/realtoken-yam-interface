import { PriceUnit } from './UpdateOfferContext';

export type UpdateFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
  choosedPrice?: number;
  useBuyTokenPrice?: boolean;
  priceUnit?: PriceUnit;
};
