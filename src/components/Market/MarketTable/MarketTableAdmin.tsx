import { FC, HTMLProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, MantineSize, TextInput } from '@mantine/core';
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
import { adminActionsColumn, adminHeader, allowanceColumn, amountColumn, buyerTokenNameColumn, idColumn, offerDateColumn, offerShortTokenNameColumn, offerYieldColumn, officialPriceColumn, originalYieldColumn, priceColumn, sellerAddressColumn, walletBalanceColumn } from 'src/hooks/column';
import React from 'react';
import { Offer } from 'src/types/offer';

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

  const [rowSelection, setRowSelection] = useState({})

  const adminColumns: ColumnDef<Offer>[] = useMemo(() => [
      {
          id: 'title',
          header: ({ table }) => adminHeader(table, rowSelection, { title: t('title') }),
          meta: { colSpan: 13 },
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
            idColumn(t,1),
            offerShortTokenNameColumn(t,2),
            buyerTokenNameColumn(t,2),
            sellerAddressColumn(t,1),
            priceColumn(t,1),
            amountColumn(t,1),
            allowanceColumn(t,1),
            walletBalanceColumn(t,1),
            offerDateColumn(t,1),
            adminActionsColumn(t,1)
          ]
  }],[rowSelection, t]);

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
    meta: { colSpan: 13 },
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
