import { OFFER_TYPE } from 'src/types/offer/OfferType';

export type OfferData = {
  id: string;
  forSaleToken: string;
  forSaleTokenAddress: string;
  purchaseToken: string;
  purchaseTokenAddress: string;
  launchDate: string;
  balanceWallet?: number;
  sellerName: string;
  siteLocation: string;
  electricityPrice: number;
  initialSellingPrice?: number;
  requestedSellingPrice?: number;
  quantityAvailable?: number;
  image: string;
  type: OFFER_TYPE;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum Arrow {
  None = 0,
  Up = 1,
  Down = 2,
}

export enum MaxHeight {
  Mobile = 411,
  Medium = 280,
  Large = 155,
}

export enum Columns {
  sellerName = 'sellerName',
  requestedSellingPrice = 'requestedSellingPrice',
  purchaseToken = 'purchaseToken',
  quantityAvailable = 'quantityAvailable',
}
