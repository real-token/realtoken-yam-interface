import { FC, HTMLProps, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, MantineSize, TextInput, Title } from '@mantine/core';
import {
  ExpandedState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Table } from '../../Table';
import { MarketSubRow } from '../MarketSubRow';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { selectOffers } from 'src/store/features/interface/interfaceSelector';
import { useSelector } from 'react-redux';
import { adminActionsColumn, adminAmount, adminBuyerTokenNameColumn, adminHeader, adminOfferTokenNameColumn, allowanceColumn, amountColumn, buyerTokenNameColumn, idColumn, offerDateColumn, offerShortTokenNameColumn, priceColumn, sellerAddressColumn, typeColumn, walletBalanceColumn } from 'src/hooks/column';
import React from 'react';
import { Offer } from 'src/types/offer';
import { useModals } from '@mantine/modals';

export const MarketTableAdmin: FC = () => {

  const { refreshOffers, offersIsLoading } = useRefreshOffers(false);
  const offers = useSelector(selectOffers);

  const [globalFilter,setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'offerId', desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { t } = useTranslation('buy', { keyPrefix: 'table' });
  const { t: t2 } = useTranslation('table', { keyPrefix: 'filters' });

  const [rowSelection, setRowSelection] = useState<{ [key: number]: boolean }>({});

  const modals = useModals();
  const { t: t3 } = useTranslation('modals');

  const deleteSelectedOffers = useCallback(() => {
    const offerIds: string[] = [];
    const selectedId: string[] = Array.from(Object.keys(rowSelection));
    selectedId.forEach( (id: string) => {
      offerIds.push(offers[parseInt(id)].offerId)
    });

    modals.openContextModal('delete', {
      title: <Title order={3}>{t3('delete.title')}</Title>,
      size: "lg",
      innerProps: {
        offerIds: offerIds,
        onSuccess: () => setRowSelection({}),
        isAdminDelete: true
      }
    });
  },[modals, offers, rowSelection, t3]);
 
  const adminColumns: ColumnDef<Offer>[] = useMemo(() => [
      {
          id: 'title',
          header: ({ table }) => adminHeader(table, rowSelection, deleteSelectedOffers, { title: t('title') }),
          meta: { colSpan: 15 },
          columns: [
            {
              id: 'select',
              header: ({ table }) => (
                <IndeterminateCheckbox
                  {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                  }}
                />
              ),
              cell: ({ row }) => (
                <div className={"px-1"}>
                  <IndeterminateCheckbox
                    {...{
                      checked: row.getIsSelected(),
                      disabled: !row.getCanSelect(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                    }}
                  />
                </div>
              ),
              size: '20'
            },
            typeColumn,
            idColumn(t,1),
            adminOfferTokenNameColumn(t,2),
            adminBuyerTokenNameColumn(t,2),
            sellerAddressColumn(t,1),
            priceColumn(t,1),
            adminAmount(t,1),
            offerDateColumn(t,1),
            adminActionsColumn(t,1)
          ]
  }],[deleteSelectedOffers, rowSelection, t]);

  const table = useReactTable({
    data: offers,
    columns: adminColumns,
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
    <Flex direction={"column"} gap={"sm"} align={"flex-start"} mt={20}>
      <TextInput placeholder={t2("nameFilterPlaceholder")} value={globalFilter} onChange={(event) => setGlobalFilter(event.currentTarget.value)}/>
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
        tablecaptionOptions={{ refreshState: [offersIsLoading, refreshOffers], visible: true }}
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
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <input
      type={"checkbox"}
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}
