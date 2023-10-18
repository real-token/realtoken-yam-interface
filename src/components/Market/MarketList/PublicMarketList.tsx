import React, { FC } from 'react';

import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useAppSelector } from 'src/hooks/react-hooks';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';

import { MarketList } from './MarketList';

export const PublicMarketList: FC = () => {
  const publicOffers = useAppSelector(selectPublicOffers);
  const { offers } = useTypedOffers(publicOffers);

  return <MarketList offers={offers}></MarketList>;
};
