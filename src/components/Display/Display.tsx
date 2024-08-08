import React, { FC, useEffect, useMemo, useRef } from 'react';

import { Group, Space, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useAtom } from 'jotai';

import { MarketTableFilter } from 'src/components/Market/Filters';
import { TransactionStatsGrid } from 'src/components/Transactions/TransactionStatsGrid';
import { useAppSelector } from 'src/hooks/react-hooks';
import { displayChoosedAtom } from 'src/states';
import {
  selectBuyOffer,
  selectIsBuyOfferOpened,
} from 'src/store/features/buyOffer/buyOfferSelector';
import { Displays } from 'src/types/Displays';

import { PublicMarketList } from '../Market/MarketList/PublicMarketList';
import { MarketSortView } from '../Market/MarketSort/MarketSort';
import { BuyOffer } from '../Offer/Buy/BuyOffer';
import { useRouter } from 'next/router';
import { PublicTransactionList } from 'src/components/Transactions/usecases/PublicTransactionList';
import 'cleansatmining-simulator/dist/simulator.css';
import { Simulator } from 'cleansatmining-simulator';
import { ALPHA } from 'src/mocks/products';

interface Display {
  display: Displays;
  title: string;
  component: React.ReactElement;
}
const Display: FC = () => {
  const router = useRouter();
  const baseUrl = `${router.basePath}`;
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const shallBuyInterfaceDisplay = useAppSelector(selectIsBuyOfferOpened);
  const offerToBuy = useAppSelector(selectBuyOffer);
  const [choosenDisplay, setChoosenDisplay] = useAtom(displayChoosedAtom);
  const displayRef = useRef<HTMLDivElement | null>(null);
  setChoosenDisplay(Displays.LIST);

  //console.log('DISPLAY', JSON.stringify(offerToBuy, null, 4));

  const availableDisplays = useMemo(() => {
    return new Map<Displays, Display>([
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

  const getDisplay = (): Display | undefined => {
    if (isMobile) {
      setChoosenDisplay(Displays.LIST);
    }

    return [...availableDisplays.values()].find(
      (display) => display.display == Displays.LIST, //choosenDisplay
    );
  };

  // Scroll to the top when the component is loaded
  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollIntoView();
    }
  }, [shallBuyInterfaceDisplay, offerToBuy]);

  return (
    <>
      <div>
        <Simulator productData={ALPHA} />
      </div>
      {shallBuyInterfaceDisplay && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: '-10%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            marginTop: '-25px', // -20 Tailwind units, assuming 1 unit = 0.25rem

            zIndex: '-10',
            width: '100%',
            height: 'calc(100vh - 150px)',
            backgroundImage: `url(${baseUrl}/Degrade_Homepage_CSM.svg)`,
            backgroundSize: 'cover',
          }}
          aria-hidden={'true'}
        ></div>
      )}

      <div ref={displayRef}>
        {(!shallBuyInterfaceDisplay ||
          !offerToBuy ||
          offerToBuy.offerId === '') && (
          <>
            <TransactionStatsGrid></TransactionStatsGrid>
            <Space h={'sm'}></Space>
            <Group>
              {choosenDisplay !== Displays.LIST ? (
                <MarketTableFilter />
              ) : (
                <div></div>
              )}
            </Group>

            <MarketSortView
              transactionChildren={
                <PublicTransactionList></PublicTransactionList>
              }
            >
              {getDisplay() ? getDisplay()?.component : undefined}
            </MarketSortView>
          </>
        )}
        {shallBuyInterfaceDisplay &&
          offerToBuy &&
          offerToBuy.offerId !== '' && <BuyOffer offer={offerToBuy}></BuyOffer>}
      </div>
    </>
  );
};
export default Display;
