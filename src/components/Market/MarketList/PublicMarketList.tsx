import React, { FC } from 'react';

import { useFilterOffers } from 'src/hooks/offers/useFilterOffers';
import { useAppSelector } from 'src/hooks/react-hooks';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';

import { MarketList } from './MarketList';

export const PublicMarketList: FC = () => {
  const publicOffers = useAppSelector(selectPublicOffers);
  const { offers } = useFilterOffers(publicOffers);

  return <MarketList offers={offers}></MarketList>;
};
