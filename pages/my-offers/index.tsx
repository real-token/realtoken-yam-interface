import { Fragment } from 'react';
import { SellActions } from 'src/components/Market';

import { MarketTableUser } from 'src/components/Market/MarketTable';

import { Tabs } from '@mantine/core';
import { IconList, IconPlus, IconFingerprint } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

const TransfersPage = () => {
  const menu = useTranslation('menu', { keyPrefix: 'subMenuMyOffer' });
  const  common = useTranslation('common', { keyPrefix: 'general' });
  return (
    <Fragment>
      <Tabs color={"orange"} defaultValue={"myOffers"}>
        <Tabs.List>
          <Tabs.Tab value={"myOffers"} icon={<IconList size={18} />}>{menu.t('myOffers')}</Tabs.Tab>
          <Tabs.Tab value={"addOffer"} icon={<IconPlus size={18} />}>{menu.t('addOffer')}</Tabs.Tab>
          <Tabs.Tab value={"privateOffers"} icon={<IconFingerprint size={18} />}>{menu.t('privateOffers')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={"myOffers"} pt={"xs"}>
          <MarketTableUser />
        </Tabs.Panel>

        <Tabs.Panel value={"addOffer"} pt={"xs"}>
          <SellActions />
        </Tabs.Panel>

        <Tabs.Panel value={"privateOffers"} pt={"xs"}>
          <div>{common.t("comingSoon")}</div>
        </Tabs.Panel>

      </Tabs>
      
    </Fragment>
  );
};

export default TransfersPage;
