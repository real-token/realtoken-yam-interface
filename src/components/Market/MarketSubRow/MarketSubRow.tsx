import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Center, Loader, Text, Title } from '@mantine/core';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import BigNumber from 'bignumber.js';

import { useOffers } from 'src/hooks';
import { Offer } from 'src/hooks/types';

import { Table, TableSubRowProps } from '../../Table';

export const MarketSubRow: FC<TableSubRowProps<Offer>> = ({
  row: {
    original: { offerId },
  },
}) => {
  const {
    offers,
    refreshState: [isRefreshing],
  } = useOffers();

  const { t } = useTranslation('buy', { keyPrefix: 'subRow' });

  const columns = useMemo<ColumnDef<Offer>[]>(
    () => [
      {
        id: 'offerId',
        accessorKey: 'offerId',
        header: () => <Title order={6}>{t('name')}</Title>,
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'offerTokenName',
        accessorKey: 'offerTokenName',
        header: () => <Title order={6}>{t('name')}</Title>,
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'buyerTokenName',
        accessorKey: 'buyerTokenName',
        header: () => <Title order={6}>{t('name')}</Title>,
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'sellerAddress',
        accessorKey: 'sellerAddress',
        header: () => <Title order={6}>{t('name')}</Title>,
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'price',
        accessorKey: 'price',
        header: () => <Title order={6}>{t('name')}</Title>,
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: () => <Title order={6}>{t('name')}</Title>,
        enableSorting: false,
        meta: { colSpan: 1 },
      },
    ],
    [t]
  );

  const data = useMemo(() => {
    return [...offers];
  }, [offers]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { colSpan: 3 },
  });

  return (
    <>
      {isRefreshing ? (
        <Center py={'md'}>
          <Loader size={'sm'} />
        </Center>
      ) : (
        <>
          <Table
            tableProps={{
              verticalSpacing: 'xs',
              horizontalSpacing: 'xs',
              sx: { tableLayout: 'fixed' },
            }}
            table={table}
          />
        </>
      )}
    </>
  );
};
