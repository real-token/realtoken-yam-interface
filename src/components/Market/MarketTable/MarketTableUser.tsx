import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, Indicator, MantineSize, Text, Title, Tooltip } from '@mantine/core';
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
import { ZERO_ADDRESS } from 'src/constants';

export const MarketTableUser: FC = () => {
  const { offers, refreshState } = useOffers(true, false, false, true); // filter offers by seller

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
            accessorFn: (row) => [row.offerId,row.buyerAddress],
            header: t('offerId'),
            cell: ({ getValue }) => (
              <Group style={{position:'relative'}}>{
                /^0x[0-9a-fA-F]{40}/.test(getValue()[1]) && getValue()[1] != ZERO_ADDRESS ?
                  <Indicator  
                    label={t('privateTexte')} 
                    size={15} 
                    //position={'top-end'}
                    style={{ top:'10px',left:'50px'}}
                  >{ <Text
                    fz={'sm'}
                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                    style={{position:'relative', right:'20px', top:'-10px'}}
                  >{getValue()[0]}</Text>}</Indicator> : 
                  <Text
                    fz={'sm'}
                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                    style={{position:'relative', left:'40px', top:'0px'}}
                  >
                    {getValue()[0]}
                  </Text>}
              </Group>
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
            accessorKey: 'availableAmount',
            accessorFn: (row) => [row.amount,row.availableAmount, row.allowanceToken],
            header: t('amount'),
            cell: ({ getValue }) => (
              <Tooltip multiline={true} label={`Wallet : ${getValue()[0]} | Allowance : ${getValue()[2]}`}>
                <Text
                  fz={'sm'}
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                  ta={"right"}
                >
                  {getValue()[1]}
                </Text>
              </Tooltip>
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
