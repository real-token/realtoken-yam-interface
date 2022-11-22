import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MantineSize, Text, Title } from '@mantine/core';
import {
  ColumnDef,
  ExpandedState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useOffers } from 'src/hooks';
import { Offer } from 'src/hooks/types';

import { Table } from '../../Table';
import { DeleteActions } from '../DeleteActions';
import { MarketSubRow } from '../MarketSubRow';
import { UpdateActionsWithPermit } from '../UpdateActions';

export const MarketTableUser: FC = () => {
  const { offers, refreshState } = useOffers(true, false, false); // filter offers by seller

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'offerId', desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { t } = useTranslation('buy', { keyPrefix: 'table' });

  const columns = useMemo<ColumnDef<Offer>[]>(
    () => [
      {
        id: 'title',
        header: () => (
          <Title order={4} align={"center"}>
            {t('title')}
          </Title>
        ),
        meta: { colSpan: 13 },
        columns: [
          {
            id: 'offerId',
            accessorKey: 'offerId',
            header: t('offerId'),
            cell: ({ getValue }) => (
                <Text
                  fz={'sm'}
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                  ta={"center"}
                >
                  {getValue()}
                </Text>
            ),
            enableSorting: true,
            meta: { colSpan: 1 },
          },
          {
            id: 'offerTokenName',
            accessorKey: 'offerTokenName',
            header: t('offerTokenName'),
            cell: ({ getValue }) => (
                <Text
                  fz={'sm'}
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {getValue()}
                </Text>
            ),
            enableSorting: true,
            meta: { colSpan: 3 },
          },
          {
            id: 'buyerTokenName',
            accessorKey: 'buyerTokenName',
            header: t('buyerTokenName'),
            cell: ({ getValue }) => (
                <Text
                  fz={'sm'}
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {getValue()}
                </Text>
            ),
            enableSorting: true,
            meta: { colSpan: 3 },
          },
          {
            id: 'price',
            accessorKey: 'price',
            header: t('price'),
            cell: ({ getValue }) => (
              <Text
                fz={'sm'}
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
                ta={"right"}
              >
                {getValue()}
              </Text>
            ),
            enableSorting: true,
            meta: { colSpan: 2 },
          },
          {
            id: 'amount',
            accessorKey: 'amount',
            header: t('amount'),
            cell: ({ getValue }) => (
              <Text
                fz={'sm'}
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
                ta={"right"}
              >
                {getValue()}
              </Text>
            ),
            enableSorting: true,
            meta: { colSpan: 2 },
          },
          {
            id: 'update',
            header: t('actionEdit'),
            cell: ({ row }) => (
              <UpdateActionsWithPermit
                updateOffer={row.original}
                triggerRefresh={refreshState[1]}
              />
            ),
            enableSorting: false,
            meta: { colSpan: 1 },
          },
          {
            id: 'delete',
            header: t('actionDelete'),
            cell: ({ row }) => (
              <DeleteActions
                deleteOffer={row.original}
                triggerRefresh={refreshState[1]}
              />
            ),
            enableSorting: false,
            meta: { colSpan: 1 },
          },
        ],
      },
    ],
    [refreshState, t]
  );

  const table = useReactTable({
    data: offers,
    columns: columns,
    state: { sorting, pagination, expanded },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: { colSpan: 13 },
  });

  return (
    <Table
      tableProps={{
        highlightOnHover: true,
        verticalSpacing: 'sm',
        horizontalSpacing: 'xs',
        sx: (theme) => ({
          tableLayout: 'fixed',
          border: theme.other.border(theme),
          borderRadius: theme.radius[theme.defaultRadius as MantineSize],
          borderCollapse: 'separate',
          borderSpacing: 0,
        }),
      }}
      table={table}
      tablecaptionOptions={{ refreshState: refreshState, visible: true }}
      TableSubRow={MarketSubRow}
    />
  );
};
