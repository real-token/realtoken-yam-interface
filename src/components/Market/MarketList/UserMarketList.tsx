import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Flex } from '@mantine/core';

import { useFilterOffers } from 'src/hooks/offers/useFilterOffers';
import { selectAddressOffers } from 'src/store/features/interface/interfaceSelector';
import { Offer } from 'src/types/offer/Offer';
import { MarketSortView } from '../MarketSort/MarketSort';
import { MarketList } from './MarketList';
import { UserTransactionList } from 'src/components/Transactions/UserTransactionList';

export const UserMarketList: FC = () => {
  const addressOffers: Offer[] = useSelector(selectAddressOffers);
  const { offers, sellCount, buyCount, exchangeCount } = useFilterOffers(
    addressOffers,
    false,
  );
  const [transactionCount, setTransactionCount] = useState<number | undefined>(
    undefined,
  );

  return (
    <Flex direction={'column'} gap={'sm'} mt={10}>
      <MarketSortView
        sellCount={sellCount}
        buyCount={buyCount}
        exchangeCount={exchangeCount}
        transactionCount={transactionCount}
        transactionChildren={
          <UserTransactionList
            setTransactionCount={setTransactionCount}
          ></UserTransactionList>
        }
      >
        <MarketList offers={offers}></MarketList>
      </MarketSortView>
    </Flex>
  );
};
