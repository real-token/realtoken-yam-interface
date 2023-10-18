import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsOwnOffer } from 'src/store/features/interface/interfaceSelector';
import { RootState } from 'src/store/store';
import { Offer } from 'src/types/offer';

import { BuyWithPermit } from './Buy/BuyWithPermit';
import { EditOffer } from './Edit/EditOffer';
import { ViewOffer } from './View/ViewOffer';

type OfferProps = {
  offer: Offer;
};

export const DisplayOffer: FC<OfferProps> = ({ offer }) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const isOwner = useSelector((state: RootState) =>
    selectIsOwnOffer(state, offer)
  );

  const onEdit = useCallback(
    (open: boolean) => {
      setIsEdited(open);
    },
    [setIsEdited]
  );

  return (
    <>
      {isOwner ? (
        <ViewOffer offer={offer}></ViewOffer>
      ) : (
        <BuyWithPermit offer={offer}></BuyWithPermit>
      )}
    </>
  );
};
