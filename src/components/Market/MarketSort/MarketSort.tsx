import { useState, useEffect } from 'react';
import { Button, Flex, Tabs, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { tableOfferTypeAtom } from 'src/states';
import { OFFER_TYPE } from 'src/types/offer';
import { use } from 'i18next';

interface MarketSortProps {
  sellCount?: number | undefined;
  buyCount?: number | undefined;
  exchangeCount?: number | undefined;
}
export const MarketSort = ({
  sellCount,
  buyCount,
  exchangeCount,
}: MarketSortProps) => {
  const [sorting, setSorting] = useAtom(tableOfferTypeAtom);

  const { t } = useTranslation('buy', { keyPrefix: 'grid' });

  return (
    <Flex gap={'xs'}>
      <Button
        variant={sorting == OFFER_TYPE.SELL ? 'filled' : 'outline'}
        onClick={() => setSorting(OFFER_TYPE.SELL)}
      >
        {!sellCount ? t('sell') : `${t('sell')} (${sellCount})`}
      </Button>
      <Button
        variant={sorting == OFFER_TYPE.BUY ? 'filled' : 'outline'}
        onClick={() => setSorting(OFFER_TYPE.BUY)}
      >
        {!buyCount ? t('buy') : `${t('buy')} (${buyCount})`}
      </Button>
      <Button
        variant={sorting == OFFER_TYPE.EXCHANGE ? 'filled' : 'outline'}
        onClick={() => setSorting(OFFER_TYPE.EXCHANGE)}
      >
        {!exchangeCount ? t('exchange') : `${t('exchange')} (${exchangeCount})`}
      </Button>
    </Flex>
  );
};

interface MarketSortViewProps {
  children: React.ReactNode;
  transactionChildren?: React.ReactNode;
}
export const MarketSortView = ({
  children,
  transactionChildren,
}: MarketSortViewProps) => {
  const [sorting, setSorting] = useAtom(tableOfferTypeAtom);
  const [activeTab, setActiveTab] = useState<string | null>(
    sorting === OFFER_TYPE.SELL
      ? 'sell'
      : sorting === OFFER_TYPE.BUY
        ? 'buy'
        : 'exchange',
  );

  const { t } = useTranslation('buy', { keyPrefix: 'grid' });

  useEffect(() => {
    if (activeTab === 'transactions') return;
    switch (sorting) {
      case OFFER_TYPE.SELL:
        setActiveTab('sell');

        break;
      case OFFER_TYPE.BUY:
        setActiveTab('buy');

        break;
      case OFFER_TYPE.EXCHANGE:
        setActiveTab('exchange');

        break;
    }
  }, [sorting, setActiveTab, activeTab]);

  return (
    <>
      <Tabs
        defaultValue={'sell'}
        mt={'xl'}
        onTabChange={(value) => {
          setActiveTab(value);
          switch (value) {
            case 'sell':
              setSorting(OFFER_TYPE.SELL);

              break;
            case 'buy':
              setSorting(OFFER_TYPE.BUY);

              break;
            case 'exchange':
              setSorting(OFFER_TYPE.EXCHANGE);

              break;
          }
        }}
        mb={'xl'}
      >
        <Tabs.List>
          <Tabs.Tab value={'sell'}>
            <Text fz={'lg'}>{t('sell')}</Text>
          </Tabs.Tab>
          <Tabs.Tab value={'buy'}>
            <Text fz={'lg'}>{t('buy')}</Text>
          </Tabs.Tab>
          <Tabs.Tab value={'exchange'}>
            <Text fz={'lg'}>{t('exchange')}</Text>
          </Tabs.Tab>
          <Tabs.Tab value={'transactions'} ml={'auto'} color={'blue'}>
            <Text fz={'lg'}>{'Transactions'}</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={'transactions'} pt={'xl'}>
          {transactionChildren}
        </Tabs.Panel>
      </Tabs>
      {activeTab !== 'transactions' && <>{children}</>}
    </>
  );
};
