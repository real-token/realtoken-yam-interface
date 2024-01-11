import { FC, useEffect, useState } from 'react';
import { MantineSize } from '@mantine/core';
import {
  ExpandedState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Table } from '../../Table';
import { MarketSubRow } from '../MarketSubRow';
import { useAtom, useAtomValue } from 'jotai';
import { nameFilterValueAtom, showOnlyWhitelistedAtom } from 'src/states';
import React from 'react';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { OFFERS_TYPE, useRightTableColumn } from 'src/hooks/useRightTableColumns';
import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useRootStore } from '../../../zustandStore/store';
import { selectPublicOffers } from '../../../zustandStore/selectors';

export const MarketTable: FC = () => {

  // const { refreshOffers, offersIsLoading } = useRefreshOffers();
  const [nameFilterValue,setNamefilterValue] = useAtom(nameFilterValueAtom);

  const offersIsLoading = false;
  const refreshOffers = () => {};

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const showOnlyWhitelisted = useAtomValue(showOnlyWhitelistedAtom);
  useEffect(() => {
    if(showOnlyWhitelisted && !offersIsLoading){
      setColumnFilters([{
        id: 'whitelisted',
        value: 'true'
      }]);
    }else{
      setColumnFilters([])
    }
  }, [showOnlyWhitelisted, offersIsLoading])
  
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
    if(nameFilterValue !== ""){
      setSorting([
        { id: "buyerTokenName", desc: true },
        { id: "price", desc: false }
      ])
    }else{
      setSorting([{ id: 'offer-id', desc: false }])
    }
  },[nameFilterValue])

  const publicOffers = useRootStore(selectPublicOffers);
  const { offers: data } = useTypedOffers(publicOffers);
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
        offerId: false,
        whitelisted: false
      }
    },
    //Trick to convert every value to string. Needed for comparison
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if(value == undefined) return false;
      const safeValue: string = (() => {
        return typeof value === 'number' ? String(value) : value as string;
      })();
      return safeValue.toLowerCase().includes(filterValue.toLowerCase());
    },
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
    <Table
      tableProps={{
        highlightOnHover: true,
        verticalSpacing: 'sm',
        horizontalSpacing: 'xs',
        style: (theme) => ({
          // border: theme.other.border(theme),
          // borderRadius: theme.radius[theme.defaultRadius as MantineSize],
          // borderCollapse: 'separate',
          overflow: 'hidden',
          // borderSpacing: 0,
        }),
      }}
      table={table}
      tablecaptionOptions={{ refreshState: [offersIsLoading,refreshOffers], visible: true }}
      TableSubRow={MarketSubRow}
    />
  );
};