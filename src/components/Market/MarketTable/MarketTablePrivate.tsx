import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, MantineSize, Text, Title } from '@mantine/core';
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

import { Offer } from 'src/types/Offer';
import { Table } from '../../Table';
import { BuyActionsWithPermit } from '../BuyActions';
import { MarketSubRow } from '../MarketSubRow';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { selectPrivateOffers } from 'src/store/features/interface/interfaceSelector';
import { useSelector } from 'react-redux';

export const MarketTablePrivate: FC = () => {
  
  const { refreshOffers, offersIsLoading } = useRefreshOffers(false);
  const offers = useSelector(selectPrivateOffers);

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
          <Title order={4} style={{ textAlign: 'center' }}>
            {t('title')}
          </Title>
        ),
        meta: { colSpan: 15 },
        columns: [
          {
            id: 'offerId',
            accessorKey: 'offerId',
            header: t('offerId'),
            cell: ({ getValue }) => (
              <Group noWrap={true} spacing={'xs'}>
                <Text
                  size={'sm'}
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {getValue()}
                </Text>
              </Group>
            ),
            enableSorting: false,
            meta: { colSpan: 1 },
          },
          {
            id: 'offerTokenName',
            accessorKey: 'offerTokenName',
            header: t('offerTokenName'),
            cell: ({ getValue }) => (
              <Group noWrap={true} spacing={'xs'}>
                <Text
                  size={'sm'}
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {getValue()}
                </Text>
              </Group>
            ),
            enableSorting: false,
            meta: { colSpan: 2 },
          },
          {
            id: 'buyerTokenName',
            accessorKey: 'buyerTokenName',
            header: t('buyerTokenName'),
            cell: ({ getValue }) => (
              <Group noWrap={true} spacing={'xs'}>
                <Text
                  size={'sm'}
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {getValue()}
                </Text>
              </Group>
            ),
            enableSorting: false,
            meta: { colSpan: 2 },
          },
          {
            id: 'sellerAddress',
            accessorKey: 'sellerAddress',
            header: t('sellerAddress'),
            cell: ({ getValue }) => (
              <Group noWrap={true} spacing={'xs'}>
                <Text
                  size={'sm'}
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {getValue()}
                </Text>
              </Group>
            ),
            enableSorting: false,
            meta: { colSpan: 4 },
          },
          {
            id: 'price',
            accessorKey: 'price',
            header: t('price'),
            cell: ({ getValue }) => (
              <Text
                size={'sm'}
                sx={{
                  textAlign: 'center',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {getValue()}
              </Text>
            ),
            enableSorting: false,
            meta: { colSpan: 2 },
          },
          {
            id: 'amount',
            accessorKey: 'amount',
            header: t('amount'),
            cell: ({ getValue }) => (
              <Text
                size={'sm'}
                sx={{
                  textAlign: 'center',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {getValue()}
              </Text>
            ),
            enableSorting: false,
            meta: { colSpan: 2 },
          },
          {
            id: 'actions',
            header: undefined,
            cell: ({ row }) => (
              <BuyActionsWithPermit
                buyOffer={row.original}
                triggerRefresh={refreshOffers}
              />
            ),
            meta: { colSpan: 1 },
          },
        ],
      },
    ],
    [refreshOffers, t]
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
    meta: { colSpan: 15 },
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
      tablecaptionOptions={{ refreshState: [offersIsLoading, refreshOffers], visible: true }}
      TableSubRow={MarketSubRow}
    />
  );
};
