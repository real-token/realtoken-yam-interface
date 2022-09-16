import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MaxUint256 } from '@ethersproject/constants';
import { ActionIcon, Group, MantineSize, Text, Title } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
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

import BigNumber from 'bignumber.js';

import { useOffers, useOffersUser } from 'src/hooks';
import { Offer } from 'src/hooks/types';

import { Table } from '../../Table';
import { DeleteActions } from '../DeleteActions';
import { MarketSubRow } from '../MarketSubRow';
import { UpdateActions } from '../UpdateActions';

type OfferTable = {
  offerId: BigNumber;
  offerToken: string;
  buyerToken: string;
  price: BigNumber;
  amount: BigNumber;
};

export const MarketTableRowUser: FC = () => {
  const { offers, refreshState } = useOffersUser();

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
        meta: { colSpan: 5 },
        columns: [
          {
            id: 'offerId',
            accessorKey: 'offerId',
            header: t('offerId'),
            cell: ({ row, getValue }) => (
              <Group noWrap={true} spacing={'xs'}>
                {/* <ActionIcon
                  variant={'transparent'}
                  color={'brand'}
                  onClick={() => row.toggleExpanded()}
                >
                  {row.getIsExpanded() ? (
                    <IconChevronUp size={16} />
                  ) : (
                    <IconChevronDown size={16} />
                  )}
                </ActionIcon> */}
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
            cell: ({ row, getValue }) => (
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
            cell: ({ row, getValue }) => (
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
            cell: ({ row, getValue }) => (
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
            cell: ({ row, getValue }) => (
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
            id: 'amount',
            accessorKey: 'amount',
            header: t('amount'),
            cell: ({ row, getValue }) => (
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
            id: 'update',
            header: undefined,
            cell: ({ row }) => (
              <UpdateActions
                updateOffer={row.original}
                triggerRefresh={refreshState[1]}
              />
            ),
            meta: { colSpan: 0 },
          },
          {
            id: 'delete',
            header: undefined,
            cell: ({ row }) => (
              <DeleteActions
                deleteOffer={row.original}
                triggerRefresh={refreshState[1]}
              />
            ),
            meta: { colSpan: 0 },
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
