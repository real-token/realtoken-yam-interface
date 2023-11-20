import { OFFER_TYPE } from 'src/types/offer';

export interface TransactionData {
  blockNumber: number;
  timeStamp: number;
  hash: string;
  from: string;
  isError: string;
  txreceipt_status: string;
  offerId: string;
  priceGwei: number;
  amountGwei: number;
  price: number;
  amount: number;
  offerType?: OFFER_TYPE;
  tokenForSale?: TokenData;
  tokenBuyWith?: TokenData;
  offerTimestamp?: number;
  initialOfferAmount?: number;
  initialOfferAmountGwei?: number;
  currentOfferAmount?: number;
}

export interface TokenData {
  address: string;
  name: string;
  decimals: number;
  symbol?: string;
  Logo?: React.FC<any>;
}

export enum PRICE_PERIOD {
  '24h' = '1',
  '7d' = '7',
  '30d' = '30',
}
