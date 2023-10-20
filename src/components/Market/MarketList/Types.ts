import { OFFER_TYPE } from 'src/types/offer/OfferType';

export type OfferData = {
  id: string;
  forSaleToken: string;
  forSaleTokenAddress: string;
  purchaseToken: string;
  purchaseTokenAddress: string;
  launchDate: string;
  balanceWallet?: number;
  creatorName: string;
  creatorAddress: string;
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
  Mobile = 413,
  Small = 319,
  Medium = 256,
  Large = 155,
}

export enum Columns {
  creatorName = 'creatorName',
  requestedSellingPrice = 'requestedSellingPrice',
  purchaseToken = 'purchaseToken',
  quantityAvailable = 'quantityAvailable',
}
