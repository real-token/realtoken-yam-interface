import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Flex } from '@mantine/core';

import { useFilterOffers } from 'src/hooks/offers/useFilterOffers';
import { selectAddressOffers } from 'src/store/features/interface/interfaceSelector';

import { MarketSort } from '../MarketSort/MarketSort';
import { MarketList } from './MarketList';

export const UserMarketList: FC = () => {
  const addressOffers = useSelector(selectAddressOffers);
  const { offers, sellCount, buyCount, exchangeCount } =
    useFilterOffers(addressOffers);

  return (
    <Flex direction={'column'} gap={'sm'} mt={10}>
      <MarketSort
        sellCount={sellCount}
        buyCount={buyCount}
        exchangeCount={exchangeCount}
      />
      <MarketList offers={offers}></MarketList>
    </Flex>
  );
};
