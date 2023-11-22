import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Tabs } from '@mantine/core';
import { IconClick, IconFileDollar, IconList } from '@tabler/icons';

import { AdminActions } from 'src/components/Admin/AdminActions';
import { MarketTableAdmin } from 'src/components/Market/MarketTable/MarketTableAdmin';
import AdminTransactionList from 'src/components/Transactions/AdminTransactionList';
import { ConnectedProvider } from 'src/providers/ConnectProvider';

export const Admin = () => {
  const { t } = useTranslation('menu', { keyPrefix: 'subMenuAdmin' });
  const transactionPanel = useMemo(() => <AdminTransactionList />, []);
  return (
    <ConnectedProvider>
      <Flex direction={'column'} py={'xl'} style={{ flexGrow: 1 }}>
        <Tabs
          color={'brand'}
          variant={'pills'}
          defaultValue={'adminTransactionActions'}
        >
          <Tabs.List>
            <Tabs.Tab
              value={'adminTransactionActions'}
              icon={<IconFileDollar size={18} />}
            >
              {'Transactions'}
            </Tabs.Tab>
            <Tabs.Tab value={'adminMarketTable'} icon={<IconList size={18} />}>
              {t('adminMarketTable')}
            </Tabs.Tab>
            <Tabs.Tab value={'adminActions'} icon={<IconClick size={18} />}>
              {t('adminActions')}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={'adminMarketTable'} pt={'xs'}>
            <MarketTableAdmin />
          </Tabs.Panel>

          <Tabs.Panel value={'adminActions'} pt={'xs'}>
            <AdminActions />
          </Tabs.Panel>
          <Tabs.Panel value={'adminTransactionActions'} pt={'xs'}>
            {transactionPanel}
            {/* <YamTransactionList /> */}
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </ConnectedProvider>
  );
};

export default Admin;
