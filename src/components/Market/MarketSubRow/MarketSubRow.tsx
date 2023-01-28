import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text, Title } from '@mantine/core';
import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useTokenInfo } from 'src/hooks';
import { Offer } from 'src/types/offer/Offer';

import { Table, TableSubRowProps } from '../../Table';

type TokenInfoShow = {
  fullName: string;
  initialPrice: string;
  offerPrice: string;
  priceDifference: string;
};
export const MarketSubRow: FC<TableSubRowProps<Offer>> = ({
  row: {
    original: offer,
  },
}) => {
  const { t } = useTranslation('buy', { keyPrefix: 'subRow' });

  const columns = useMemo<ColumnDef<Offer,string>[]>(
    () => [
      {
        id: 'sellerAddress',
        accessorKey: 'sellerAddress',
        header: () => <Title order={6}>{t("sellerAddress")}</Title>,
        cell: ({ getValue }: CellContext<Offer,string>) => (
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

  const table = useReactTable({
    data: [offer],
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
