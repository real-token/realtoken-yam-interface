import React, { FC, useMemo } from 'react';

import { Flex, Group, Select, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useAtom } from 'jotai';

import { MarketTableFilter } from 'src/components/Market/Filters';
import { useAppSelector } from 'src/hooks/react-hooks';
import { displayChoosedAtom } from 'src/states';
import {
  selectBuyOffer,
  selectIsBuyOfferOpened,
} from 'src/store/features/buyOffer/buyOfferSelector';
import { Displays } from 'src/types/Displays';

import { MarketTable } from '../Market';
import { MarketGrid } from '../Market/MarketGrid/MarketGrid';
import { PublicMarketList } from '../Market/MarketList/PublicMarketList';
import { MarketSort } from '../Market/MarketSort/MarketSort';
import { BuyOffer } from '../Offer/Buy/BuyOffer';

interface Display {
  display: Displays;
  title: string;
  component: React.ReactElement;
}
const Display: FC = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const shallBuyInterfaceDisplay = useAppSelector(selectIsBuyOfferOpened);
  const offerToBuy = useAppSelector(selectBuyOffer);
  const [choosenDisplay, setChoosenDisplay] = useAtom(displayChoosedAtom);

  const availableDisplays = useMemo(() => {
    return new Map<Displays, Display>([
      [
        Displays.TABLE,
        {
          display: Displays.TABLE,
          title: 'Table',
          component: <MarketTable key={'table'} />,
        },
      ],
      [
        Displays.GRID,
        {
          display: Displays.GRID,
          title: 'Grid',
          component: <MarketGrid key={'grid'} />,
        },
      ],
      [
        Displays.LIST,
        {
          display: Displays.LIST,
          title: 'List',
          component: <PublicMarketList key={'list'} />,
        },
      ],
    ]);
  }, []);

  const datas = useMemo(() => {
    return [...availableDisplays].map(([, value]) => ({
      value: value.display,
      label: value.title,
    }));
  }, [availableDisplays]);

  const getDisplay = (): Display | undefined => {
    if (isMobile) {
      setChoosenDisplay(Displays.LIST);
    }

    return [...availableDisplays.values()].find(
      (display) => display.display == choosenDisplay
    );
  };

  return (
    <>
      {!shallBuyInterfaceDisplay && (
        <>
          <Group>
            {choosenDisplay !== Displays.LIST ? (
              <MarketTableFilter />
            ) : (
              <div></div>
            )}
          </Group>

          <Flex justify={'space-between'} mb={16}>
            <MarketSort />
            {!isMobile && (
              <Select
                data={datas}
                value={choosenDisplay}
                onChange={(value) => {
                  if (value) setChoosenDisplay(value);
                }}
              />
            )}
          </Flex>
          {getDisplay() ? getDisplay()?.component : undefined}
        </>
      )}
      {shallBuyInterfaceDisplay && offerToBuy && (
        <BuyOffer offer={offerToBuy}></BuyOffer>
      )}
    </>
  );
};
export default Display;
