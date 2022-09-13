import { Dispatch, SetStateAction } from 'react';

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
  buyerTokenAddress: string;
  buyerTokenName: string;
  sellerAddress: string;
  price: string;
  amount: string;
};

export type UseOffers = () => {
  offers: Offer[];
  refreshState: [boolean, Dispatch<SetStateAction<boolean>>];
};
