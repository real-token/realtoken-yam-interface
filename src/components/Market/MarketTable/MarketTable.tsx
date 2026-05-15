import { FC, useEffect, useState } from 'react';
import React from 'react';

import {
  ColumnFiltersState,
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

import { useAtom, useAtomValue } from 'jotai';

import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import {
  OFFERS_TYPE,
  useRightTableColumn,
} from 'src/hooks/useRightTableColumns';
import {
  hideDustAtom,
  hideDustValueAtom,
  nameFilterValueAtom,
  showOnlyWhitelistedAtom,
} from 'src/states';

import { usePublicOffers } from '../../../hooks/offers/usePublicOffers';
import { Table } from '../../Table';
import { MarketSubRow } from '../MarketSubRow';
import { DegradedModeOverlay } from '../../DegradedModeOverlay';

export const MarketTable: FC = () => {
  const {
    offers,
    offersAreLoading,
    refetch: refetchPublicOffers,
  } = usePublicOffers();

  const [nameFilterValue, setNamefilterValue] = useAtom(nameFilterValueAtom);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // FILTERS
  const hideDustValue = useAtomValue(hideDustValueAtom);
  const hideDust = useAtomValue(hideDustAtom);
  useEffect(() => {
    if (hideDust) {
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== 'amount'),
        { id: 'amount', value: [hideDustValue, null] },
      ]);
    } else {
      setColumnFilters((prev) =>
        [...prev].filter((filter) => filter.id !== 'amount')
      );
    }
  }, [hideDust, hideDustValue]);

  const showOnlyWhitelisted = useAtomValue(showOnlyWhitelistedAtom);
  useEffect(() => {
    if (showOnlyWhitelisted && !offersAreLoading) {
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== 'whitelisted'),
        { id: 'whitelisted', value: 'true' },
      ]);
    } else {
      setColumnFilters((prev) =>
        [...prev].filter((filter) => filter.id !== 'whitelisted')
      );
    }
  }, [showOnlyWhitelisted, offersAreLoading]);

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'offer-id', desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  // Sort offer by best price
  useEffect(() => {
    if (nameFilterValue !== '') {
      setSorting([
        { id: 'buyerTokenName', desc: true },
        { id: 'price', desc: false },
      ]);
    } else {
      setSorting([{ id: 'offer-id', desc: false }]);
    }
  }, [nameFilterValue]);

  const { offers: data } = useTypedOffers(offers, offersAreLoading);
  const columns = useRightTableColumn(OFFERS_TYPE.PUBLIC);

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting: sorting,
      pagination: pagination,
      expanded: expanded,
      globalFilter: nameFilterValue,
      columnFilters: columnFilters,
      columnVisibility: {
        whitelisted: false,
      },
    },
    //Trick to convert every value to string. Needed for comparison
    // globalFilterFn: (row, columnId, filterValue) => {
    //   const value = row.getValue(columnId);
    //   if (value == undefined) return false;
    //   const safeValue: string = (() => {
    //     return typeof value === 'number' ? String(value) : (value as string);
    //   })();
    //   return safeValue.toLowerCase().includes(filterValue.toLowerCase());
    // },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setNamefilterValue,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: { colSpan: 16 },
  });

  return (
    <DegradedModeOverlay blockInteraction={offers.length === 0}>
      <Table
        tableProps={{
          highlightOnHover: true,
          verticalSpacing: 'sm',
          horizontalSpacing: 'xs',
          style: () => ({
            overflow: 'hidden',
          }),
        }}
        table={table}
        tablecaptionOptions={{
          refreshState: [offersAreLoading, () => refetchPublicOffers()],
          visible: true,
        }}
        TableSubRow={MarketSubRow}
        isLoading={offersAreLoading}
      />
    </DegradedModeOverlay>
  );
};
