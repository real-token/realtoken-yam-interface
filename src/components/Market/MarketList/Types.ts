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
  launchDate: string; // a deplacer dans site
  createdAt: number;
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
  initialAmount: number;
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

export enum SCREEN_BREAKPOINT {
  Small = 577,
  Medium = 632,
  Large = 1200,
}

export enum SCREEN_SIZE {
  Mobile,
  Small,
  Medium,
  Large,
}

export enum ROW_HEIGHT {
  Mobile = 356,
  Small = 294,
  Medium = 219,
  Large = 143,
}

export enum Columns {
  requesterName = 'requesterName',
  requestedPrice = 'requestedPrice',
  createdAt = 'createdAt',
  requestedAmount = 'requestedAmount',
}

export function getRowHeight(size: SCREEN_SIZE): number {
  let height = 0;

  switch (size) {
    case SCREEN_SIZE.Large:
      height = ROW_HEIGHT.Large;
      break;
    case SCREEN_SIZE.Medium:
      height = ROW_HEIGHT.Medium;
      break;
    case SCREEN_SIZE.Small:
      height = ROW_HEIGHT.Small;
      break;
    case SCREEN_SIZE.Mobile:
      height = ROW_HEIGHT.Mobile;
      break;
  }

  return height;
}

export function getScreenSize(width: number) {
  let size;

  if (width > SCREEN_BREAKPOINT.Large) {
    size = SCREEN_SIZE.Large;
  } else if (width > SCREEN_BREAKPOINT.Medium) {
    size = SCREEN_SIZE.Medium;
  } else if (width > SCREEN_BREAKPOINT.Small) {
    size = SCREEN_SIZE.Small;
  } else {
    size = SCREEN_SIZE.Mobile;
  }
  return size;
}
