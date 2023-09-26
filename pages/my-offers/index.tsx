import { useTranslation } from 'react-i18next';

import { Flex, Tabs } from '@mantine/core';
import { IconFingerprint, IconList, IconPlus } from '@tabler/icons';

import { BuyWithPermit } from 'src/components/Buy/BuyWithPermit';
import { CreateOffer } from 'src/components/CreateOffer/CreateOffers';
import {
  MarketTablePrivate,
  MarketTableUser,
} from 'src/components/Market/MarketTable';
import { useAppSelector } from 'src/hooks/react-hooks';
import { ConnectedProvider } from 'src/providers/ConnectProvider';
import {
  selectBuyOffer,
  selectIsBuyOfferOpened,
} from 'src/store/features/buyOffer/buyOfferSelector';

const TransfersPage = () => {
  const shallBuyInterfaceDisplay = useAppSelector(selectIsBuyOfferOpened);
  const offerToBuy = useAppSelector(selectBuyOffer);
  const menu = useTranslation('menu', { keyPrefix: 'subMenuMyOffer' });
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
              <MarketTableUser />
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
          <BuyWithPermit offer={offerToBuy}></BuyWithPermit>
        )}
      </Flex>
    </ConnectedProvider>
  );
};

export default TransfersPage;
