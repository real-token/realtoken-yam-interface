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
import { Offer } from 'src/types/offer/Offer';
import { Table } from '../../Table';
import { DeleteActions } from '../DeleteActions';
import { MarketSubRow } from '../MarketSubRow';
import { UpdateActionsWithPermit } from '../UpdateActions';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { selectAddressOffers } from 'src/store/features/interface/interfaceSelector';
import { useSelector } from 'react-redux';
import { ZERO_ADDRESS } from 'src/constants';
import { OfferTypeBadge } from 'src/components/Offer/OfferTypeBadge';

export const MarketTableUser: FC = () => {

  const { refreshOffers, offersIsLoading } = useRefreshOffers(false);

  const offers = useSelector(selectAddressOffers);
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
            id: "offerType",
            accessorKey: 'type',
            header: "Type",
            cell: ({ getValue }) => {
              return(<OfferTypeBadge offerType={getValue()} textSize={10}/>)
            },
            enableSorting: false,
          },
          {
            id: 'offerId',
            accessorKey: 'offerId',
            header: t('offerId'),
            cell: ({row, getValue }) => (
              <Group style={{position:'relative'}}>{
                /^0x[0-9a-fA-F]{40}/.test(row.original.buyerAddress) && row.original.buyerAddress != ZERO_ADDRESS ?
                  <Indicator  
                    label={t('privateTexte')} 
                    size={15} 
                    //position={'top-end'}
                    style={{ top:'10px',left:'50px'}}
                  >{ <Text
                    fz={'sm'}
                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                    style={{position:'relative', right:'20px', top:'-10px'}}
                  >{getValue()}</Text>}</Indicator> : 
                  <Text
                    fz={'sm'}
                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                    style={{position:'relative', left:'40px', top:'0px'}}
                  >
                    {getValue()}
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
            header: t('amount'),
            cell: ({ row, getValue }) => (
              <Tooltip multiline={true} label={`Wallet : ${row.original.balanceWallet} | Allowance : ${row.original.allowanceToken}`}>
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
                triggerRefresh={refreshOffers}
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
                triggerRefresh={refreshOffers}
              />
            ),
            enableSorting: false,
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
      tablecaptionOptions={{ refreshState: [offersIsLoading, refreshOffers], visible: true }}
      TableSubRow={MarketSubRow}
    />
  );
};
