import { FC } from 'react';

import { OFFER_TYPE } from 'src/types/offer/OfferType';

export type OfferData = {
  id: string;
  transferedToken: string;
  transferedTokenAddress: string;
  transferedTokenLogo?: FC<any>;
  requestedToken: string;
  requestedTokenAddress: string;
  requestedTokenLogo?: FC<any>;
  launchDate: string;
  balanceWallet?: number;
  requesterName: string;
  requesterAddress: string;
  sites: {
    requested: SiteData;
    transfered: SiteData;
  };

  electricityPrice: number;
  initialSellingPrice?: number; //USD
  priceDelta?: number;
  requestedRate: number;
  requestedPrice: number; //USD
  requestedAmount?: number;
  image: string;
  type: OFFER_TYPE;
};

export type SiteData = {
  name: string;
  shortName: string;
  image: string;
  country: string;
  aera: string;
  energy: string[];
  electricityPrice: number;
  tokenOfficialPrice: number;
  tokenSellDate: string;
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
  SmallMobile = 500,
  Mobile = 336,
  Small = 337,
  Medium = 233,
  Large = 161,
}

export enum Columns {
  requesterName = 'requesterName',
  requestedPrice = 'requestedPrice',
  requestedToken = 'requestedToken',
  requestedAmount = 'requestedAmount',
}
