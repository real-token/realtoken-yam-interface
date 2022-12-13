import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text, Title } from '@mantine/core';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useTokenInfo } from 'src/hooks';
import { Offer } from 'src/hooks/types';

import { Table, TableSubRowProps } from '../../Table';

type TokenInfoShow = {
  fullName: string;
  initialPrice: string;
  offerPrice: string;
  priceDifference: string;
};
export const MarketSubRow: FC<TableSubRowProps<Offer>> = ({
  row: {
    original: { offerTokenAddress, price },
  },
}) => {
  const { t } = useTranslation('buy', { keyPrefix: 'subRow' });

  console.count("test")

  const columns = useMemo<ColumnDef<TokenInfoShow>[]>(
    () => [
      {
        id: 'fullName',
        accessorKey: 'fullName',
        header: () => <Title order={6}>{t('offerTokenName')}</Title>,
        cell: ({ getValue }) => (
          <Text
            size={'sm'}
            sx={{
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {getValue()}
          </Text>
        ),
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'initialPrice',
        accessorKey: 'initialPrice',
        header: () => <Title order={6}>{t('initialPrice')}</Title>,
        cell: ({ getValue }) => (
          <Text
            size={'sm'}
            sx={{
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {getValue()}
          </Text>
        ),
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'offerPrice',
        accessorKey: 'offerPrice',
        header: () => <Title order={6}>{t('offerPrice')}</Title>,
        cell: ({ getValue }) => (
          <Text
            size={'sm'}
            sx={{
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {getValue()}
          </Text>
        ),
        enableSorting: false,
        meta: { colSpan: 1 },
      },
      {
        id: 'priceDifference',
        accessorKey: 'priceDifference',
        header: () => <Title order={6}>{t('priceDifference')}</Title>,
        cell: ({ getValue }) => (
          <Text
            size={'sm'}
            sx={{
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {getValue()}
          </Text>
        ),
        enableSorting: false,
        meta: { colSpan: 1 },
      },
    ],
    [t]
  );

  const { tokenInfo } = useTokenInfo(offerTokenAddress);

  const priceDifference = (
    ((Number(price) - tokenInfo.tokenPrice) / tokenInfo.tokenPrice) *
    100
  ).toFixed(2);

  const tokenInfoShow: TokenInfoShow[] = useMemo(() => {
    return [{
      fullName: tokenInfo.fullName,
      initialPrice: tokenInfo.tokenPrice.toString(),
      offerPrice: price,
      priceDifference: `${priceDifference} %`,
      // fullName: "",
      // initialPrice: "tokenInfo.tokenPrice.toString()",
      // offerPrice: price,
      // priceDifference: "`${priceDifference} %`",
    }]
  },[tokenInfo,price,priceDifference]);

  const table = useReactTable({
    data: tokenInfoShow,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { colSpan: 1 },
  });

  return (
    <Table
      tableProps={{
        verticalSpacing: 'xs',
        horizontalSpacing: 'xs',
        sx: { tableLayout: 'fixed' },
      }}
      table={table}
    />
  );
};
