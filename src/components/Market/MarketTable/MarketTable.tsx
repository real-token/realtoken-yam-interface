import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Flex, Group, MantineSize, Text, Title, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import {
  ColumnDef,
  ExpandedState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Offer } from 'src/types/Offer';
import { Table } from '../../Table';
import { BuyActionsWithPermit } from '../BuyActions';
import { MarketSubRow } from '../MarketSubRow';
import { useAtom } from 'jotai';
import { nameFilterValueAtom } from 'src/states';
import React from 'react';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { useAppSelector } from 'src/hooks/react-hooks';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';
import { BigNumber } from 'bignumber.js';

export const MarketTable: FC = () => {

  const { refreshOffers, offersIsLoading } = useRefreshOffers(false);
  const offers = useAppSelector(selectPublicOffers)
  const [nameFilterValue,setNamefilterValue] = useAtom(nameFilterValueAtom);
  
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'offerId', desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { t } = useTranslation('buy', { keyPrefix: 'table' });
  const reverse = (value: number) => 1/value

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
            cell: ({ row, getValue }) => { 
              return (
                <Group noWrap={true} spacing={'xs'}>
                  { row.original.hasPropertyToken && process.env.NEXT_PUBLIC_ENV != "production" ?
                    <ActionIcon
                      variant={'transparent'}
                      color={'brand'}
                      onClick={() => row.toggleExpanded()}
                    >
                      {row.getIsExpanded() ? (
                        <IconChevronUp size={16} />
                      ) : (
                        <IconChevronDown size={16} />
                      )}
                    </ActionIcon>
                    :
                    <ActionIcon variant={'transparent'} color={'brand'} disabled={true}/>
                  }
                  <Text
                      size={'sm'}
                      sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {getValue()}
                    </Text>
                </Group>
              )
            },
            enableSorting: true,
            meta: { colSpan: 2 },
          },
          {
            id: 'offerTokenName',
            accessorKey: 'offerTokenName',
            header: t('offerTokenName'),
            cell: ({ getValue }) => (
              <Group noWrap={true} spacing={'xs'}>
                <Text
                  size={'sm'}
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {getValue()}
                </Text>
              </Group>
            ),
            enableSorting: true,
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
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {getValue()}
                </Text>
              </Group>
            ),
            enableSorting: true,
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
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {getValue()}
                </Text>
              </Group>
            ),
            enableSorting: true,
            meta: { colSpan: 4 },
          },
          {
            id: 'price',
            accessorKey: 'price',
            header: t('price'),
            cell: ({ getValue }) => (
              <Tooltip label={`${reverse(getValue())}`}>
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
              </Tooltip>
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
                size={'sm'}
                sx={{
                  textAlign: 'center',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {BigNumber(getValue()).toString(10)}
              </Text>
            ),
            enableSorting: true,
            meta: { colSpan: 2 },
          },
          {
            id: 'actions',
            header: undefined,
            cell: ({ row }) => (
              <Flex gap={"md"}>
                <BuyActionsWithPermit
                  buyOffer={row.original}
                  triggerRefresh={refreshOffers}
                />
                {/* //TODO: ADD SHOW OFFER BUTTON  */}
                {/* <ShowOfferAction offer={row.original}/> */}
              </Flex>
            ),
            meta: { colSpan: 1 },
          },
        ],
      },
    ],
    [refreshOffers, t]
  );

  useEffect(() => {
    if(nameFilterValue !== ""){
      setSorting([
        { id: "buyerTokenName", desc: true },
        { id: "price", desc: false }
      ])
    }else{
      setSorting([{ id: 'offerId', desc: false }])
    }
  },[nameFilterValue])

  const table = useReactTable({
    data: offers,
    columns: columns,
    state: { sorting: sorting, pagination: pagination, expanded: expanded, globalFilter: nameFilterValue },
    globalFilterFn: 'includesString',
    onSortingChange: setSorting,
    onGlobalFilterChange: setNamefilterValue,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
          border: theme.other.border(theme),
          borderRadius: theme.radius[theme.defaultRadius as MantineSize],
          borderCollapse: 'separate',
          borderSpacing: 0,
        }),
      }}
      table={table}
      tablecaptionOptions={{ refreshState: [offersIsLoading,refreshOffers], visible: true }}
      TableSubRow={MarketSubRow}
    />
  );
};