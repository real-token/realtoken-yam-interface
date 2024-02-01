import { TFunction } from 'i18next';

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
  usdAmount?: number;
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

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum Arrow {
  None = 0,
  Up = 1,
  Down = 2,
}

export enum Columns {
  timeStamp = 'timeStamp',
  amount = 'amount',
  usdAmount = 'usdAmount',
  offerTimestamp = 'offerTimestamp',
  price = 'price',
  currentOfferAmount = 'currentOfferAmount',
}

export function mapColumnLabels(t: TFunction<'transactions', 'list'>): {
  [key: string]: string;
} {
  // si rename => renommer aussi la column dans Types Columns
  // si rename => renommer aussi la column dans Types OfferData
  return {
    timeStamp: t('buyingDate'),
    amount: t('tokenAmount'),
    usdAmount: t('usdAmount'),
    offerTimestamp: t('offerDate'),
    price: t('offerPrice'),
    currentOfferAmount: t('amountLeft'),
  };
}
