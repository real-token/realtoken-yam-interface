import { OFFER_TYPE } from 'src/types/offer';
import {TRANSACTION_TYPE} from './TransactionType'

export type Transaction = {
  blockNumber: number;
  timeStamp: number;
  hash: string;
  from: string;
  offerId: string;
  amountGwei: number;
  amount: number;
  priceGwei: number;
  price: number;
  usdAmount?: number;
  offerType?: OFFER_TYPE;
  tokenForSale?: TokenData;
  tokenBuyWith?: TokenData;
  offerTimestamp?: number;
  initialOfferAmount?: number;
  currentOfferAmount?: number;
  type: TRANSACTION_TYPE;
};

export type TokenData = {
  address: string;
  name: string;
  decimals: number;
  symbol?: string;
  Logo?: React.FC<any>;
}
