import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Tabs } from '@mantine/core';
import { IconFingerprint, IconList, IconPlus } from '@tabler/icons';

import { SellActions } from 'src/components/Market';
import {
  MarketTablePrivate,
  MarketTableUser,
} from 'src/components/Market/MarketTable';

const TransfersPage = () => {
  const menu = useTranslation('menu', { keyPrefix: 'subMenuMyOffer' });
  return (
    <Flex
      direction={"column"}
      p={"xl"}
      style={{ flexGrow: 1 }}
    >
      <Tabs color={'orange'} defaultValue={'myOffers'}>
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
          <SellActions />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};

export default TransfersPage;
