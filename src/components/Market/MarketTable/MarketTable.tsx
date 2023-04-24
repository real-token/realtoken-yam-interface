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
} from '@tanstack/react-table';
import { Table } from '../../Table';
import { MarketSubRow } from '../MarketSubRow';
import { useAtom } from 'jotai';
import { nameFilterValueAtom } from 'src/states';
import React from 'react';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { OFFERS_TYPE, useRightTableColumn } from 'src/hooks/useRightTableColumns';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';
import { useAppSelector } from 'src/hooks/react-hooks';
import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';

export const MarketTable: FC = () => {

  const { refreshOffers, offersIsLoading } = useRefreshOffers(false);
  const [nameFilterValue,setNamefilterValue] = useAtom(nameFilterValueAtom);
  
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

  const publicOffers = useAppSelector(selectPublicOffers);
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