import { FC, HTMLProps, useCallback, useMemo, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, MantineSize, TextInput, Title } from '@mantine/core';
import {
  ColumnDef,
  ExpandedState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useAtomValue } from 'jotai';

import {
  adminActionsColumn,
  adminAmount,
  adminHeader,
  buyShortTokenNameColumn,
  buyerTokenNameColumn,
  electricityPriceColumn,
  exchangeBuyShortTokenNameColumn,
  exchangeOfferShortTokenNameColumn,
  idColumn,
  offerDateColumn,
  offerShortTokenNameColumn,
  offerTokenNameColumn,
  priceColumn,
  priceDeltaColumn,
  sellerAddressColumn,
} from 'src/hooks/column';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useAppSelector } from 'src/hooks/react-hooks';
import { useContextModals } from 'src/hooks/useModals';
import { useRole } from 'src/hooks/useRole';
import { tableOfferTypeAtom } from 'src/states';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';
import { USER_ROLE } from 'src/types/admin';
import { OFFER_TYPE, Offer } from 'src/types/offer';

import { Table } from '../../Table';
import { MarketSort } from '../MarketSort/MarketSort';
import { MarketSubRow } from '../MarketSubRow';

export const MarketTableAdmin: FC = () => {
  const { refreshOffers, offersIsLoading } = useRefreshOffers(false);

  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'offer-id', desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { t } = useTranslation('buy', { keyPrefix: 'table' });
  const { t: t2 } = useTranslation('table', { keyPrefix: 'filters' });

  const [rowSelection, setRowSelection] = useState<{ [key: number]: boolean }>(
    {}
  );

  const publicOffers = useAppSelector(selectPublicOffers);
  const { offers } = useTypedOffers(publicOffers);

  const { role } = useRole();

  const modals = useContextModals();
  const { t: t3 } = useTranslation('modals');

  const deleteSelectedOffers = useCallback(() => {
    const offerIds: string[] = [];
    const selectedId: string[] = Array.from(Object.keys(rowSelection));
    selectedId.forEach((id: string) => {
      offerIds.push(offers[parseInt(id)].offerId);
    });

    modals.openMultiDeleteModal(offerIds, () => setRowSelection({}));
  }, [modals, offers, rowSelection]);

  const checkboxColumn: ColumnDef<Offer> = useMemo(
    () => ({
      id: 'select',
      header: ({ table }) => (
        <>
          {role == USER_ROLE.ADMIN ? (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ) : undefined}
        </>
      ),
      cell: ({ row }) => (
        <div className={'px-1'}>
          {role == USER_ROLE.ADMIN ? (
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ) : undefined}
        </div>
      ),
      size: 20,
    }),
    [role]
  );

  const sellAdminColumns: ColumnDef<Offer>[] = useMemo(
    () => [
      {
        id: 'title',
        header: ({ table }) =>
          adminHeader(
            role == USER_ROLE.ADMIN,
            table,
            rowSelection,
            deleteSelectedOffers,
            { title: t('title') }
          ),
        meta: { colSpan: 15 },
        columns: [
          checkboxColumn,
          idColumn(t, 1),
          offerShortTokenNameColumn(t, 2),
          buyerTokenNameColumn(t, 2),
          electricityPriceColumn(t, 1),
          sellerAddressColumn(t, 1),
          priceColumn(t, 1),
          priceDeltaColumn(t, 1),
          adminAmount(t, 1),
          offerDateColumn(t, 1),
          adminActionsColumn(t, 1),
        ],
      },
    ],
    [checkboxColumn, t, role, rowSelection, deleteSelectedOffers]
  );

  const buyAdminColumns: ColumnDef<Offer>[] = useMemo(
    () => [
      {
        id: 'title',
        header: ({ table }) =>
          adminHeader(
            role == USER_ROLE.ADMIN,
            table,
            rowSelection,
            deleteSelectedOffers,
            { title: t('title') }
          ),
        meta: { colSpan: 15 },
        columns: [
          checkboxColumn,
          idColumn(t, 1),
          offerTokenNameColumn(t, 2),
          buyShortTokenNameColumn(t, 2),
          electricityPriceColumn(t, 1),
          sellerAddressColumn(t, 1),
          priceColumn(t, 1),
          priceDeltaColumn(t, 1),
          adminAmount(t, 1),
          offerDateColumn(t, 1),
          adminActionsColumn(t, 1),
        ],
      },
    ],
    [checkboxColumn, t, role, rowSelection, deleteSelectedOffers]
  );

  const exchangeAdminColumns: ColumnDef<Offer>[] = useMemo(
    () => [
      {
        id: 'title',
        header: ({ table }) =>
          adminHeader(
            role == USER_ROLE.ADMIN,
            table,
            rowSelection,
            deleteSelectedOffers,
            { title: t('title') }
          ),
        meta: { colSpan: 15 },
        columns: [
          checkboxColumn,
          idColumn(t, 1),
          exchangeOfferShortTokenNameColumn(t, 2),
          exchangeBuyShortTokenNameColumn(t, 2),
          sellerAddressColumn(t, 1),
          priceColumn(t, 1),
          adminAmount(t, 1),
          offerDateColumn(t, 1),
          adminActionsColumn(t, 1),
        ],
      },
    ],
    [checkboxColumn, t, role, rowSelection, deleteSelectedOffers]
  );

  const sortingType = useAtomValue(tableOfferTypeAtom);

  // const
  const rightColumn: ColumnDef<Offer>[] = useMemo(() => {
    switch (sortingType) {
      case OFFER_TYPE.SELL:
        return sellAdminColumns;
      case OFFER_TYPE.BUY:
        return buyAdminColumns;
      case OFFER_TYPE.EXCHANGE:
        return exchangeAdminColumns;
      default:
        return sellAdminColumns;
    }
  }, [sortingType, sellAdminColumns, buyAdminColumns, exchangeAdminColumns]);

  const table = useReactTable({
    data: offers,
    columns: rightColumn,
    state: { sorting, pagination, expanded, rowSelection, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    meta: { colSpan: 15 },
  });

  return (
    <Flex direction={'column'} gap={'sm'} align={'flex-start'} mt={20}>
      <TextInput
        placeholder={t2('nameFilterPlaceholder')}
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.currentTarget.value)}
      />
      <MarketSort />
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
        tablecaptionOptions={{
          refreshState: [offersIsLoading, refreshOffers],
          visible: true,
        }}
        TableSubRow={MarketSubRow}
      />
    </Flex>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type={'checkbox'}
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
