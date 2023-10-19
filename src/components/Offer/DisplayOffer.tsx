import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectIsOwnOffer } from 'src/store/features/interface/interfaceSelector';
import { RootState } from 'src/store/store';
import { Offer } from 'src/types/offer';

import { BuyOffer } from './Buy/BuyOffer';
import { ViewOffer } from './View/ViewOffer';

type OfferProps = {
  offer: Offer;
};

export const DisplayOffer: FC<OfferProps> = ({ offer }) => {
  const isOwner = useSelector((state: RootState) =>
    selectIsOwnOffer(state, offer)
  );

  return (
    <>
      {isOwner ? (
        <ViewOffer offer={offer}></ViewOffer>
      ) : (
        <BuyOffer offer={offer}></BuyOffer>
      )}
    </>
  );
};
