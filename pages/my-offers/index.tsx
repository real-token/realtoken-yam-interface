import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { Flex, Tabs } from '@mantine/core';
import { IconFingerprint, IconList, IconPlus } from '@tabler/icons';
import { selectedOfferAtom, statesFilterTokenAtom } from 'src/states';
import { CreateOffer } from 'src/components/CreateOffer/CreateOffers';
import { UserMarketList } from 'src/components/Market/MarketList/UserMarketList';
import { MarketTablePrivate } from 'src/components/Market/MarketTable';
import { DisplayOffer } from 'src/components/Offer/DisplayOffer';
import { useAppSelector } from 'src/hooks/react-hooks';
import { ConnectedProvider } from 'src/providers/ConnectProvider';
import {
  selectBuyOffer,
  selectIsBuyOfferOpened,
} from 'src/store/features/buyOffer/buyOfferSelector';
import { use } from 'i18next';
import { useEffect } from 'react';

const TransfersPage = () => {
  const [offerSelected] = useAtom(selectedOfferAtom);
  const shallBuyInterfaceDisplay = useAppSelector(selectIsBuyOfferOpened);
  const offerToBuy = useAppSelector(selectBuyOffer);
  const menu = useTranslation('menu', { keyPrefix: 'subMenuMyOffer' });
  const [, setTokenFilterStates] = useAtom(statesFilterTokenAtom);

  useEffect(() => {
    setTokenFilterStates(new Map());
  }, []);

  return (
    <ConnectedProvider>
      <Flex direction={'column'} my={'xl'}>
        {!shallBuyInterfaceDisplay && (
          <Tabs color={'brand'} variant={'pills'} defaultValue={'myOffers'}>
            <Tabs.List>
              <Tabs.Tab value={'myOffers'} icon={<IconList size={18} />}>
                {menu.t('myOffers')}
              </Tabs.Tab>
              <Tabs.Tab
                value={'privateOffers'}
                icon={<IconFingerprint size={18} />}
              >
                {menu.t('privateOffers')}
              </Tabs.Tab>
              <Tabs.Tab value={'addOffer'} icon={<IconPlus size={18} />}>
                {menu.t('addOffer')}
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={'myOffers'} pt={'xs'}>
              <UserMarketList></UserMarketList>
              {/* <MarketTableUser /> */}
            </Tabs.Panel>

            <Tabs.Panel value={'privateOffers'} pt={'xs'}>
              <MarketTablePrivate />
            </Tabs.Panel>

            <Tabs.Panel value={'addOffer'} pt={'xs'}>
              <CreateOffer />
            </Tabs.Panel>
          </Tabs>
        )}
        {shallBuyInterfaceDisplay && offerToBuy && (
          <>
            <DisplayOffer
              offerId={offerSelected}
              offer={offerToBuy}
            ></DisplayOffer>
          </>
        )}
      </Flex>
    </ConnectedProvider>
  );
};

export default TransfersPage;
