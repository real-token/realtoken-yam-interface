import { FC, useState } from 'react';

import { Flex, MantineSize } from '@mantine/core';
import {
  ExpandedState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table } from '../../Table';
import { MarketSubRow } from '../MarketSubRow';
import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { OFFERS_TYPE, useRightTableColumn } from 'src/hooks/useRightTableColumns';
import { MarketSort } from '../MarketSort/MarketSort';
import { useOffers } from '../../../hooks/interface/useOffers';
import { usePrivateOffers } from '../../../hooks/offers/usePrivateOffers';

export const MarketTablePrivate: FC = () => {
  
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'offer-id', desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { offers: privateOffers, offersAreLoading, refetch } = usePrivateOffers();
  const { offers, sellCount, buyCount, exchangeCount } = useTypedOffers(privateOffers)
  const columns = useRightTableColumn(OFFERS_TYPE.PRIVATE);

  const table = useReactTable({
    data: offers,
    columns: columns,
    state: { 
      sorting, 
      pagination, 
      expanded, 
      columnVisibility: {
        whitelisted: false
      } 
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: { colSpan: 16 },
    
  });

  return (
    <Flex direction={"column"} gap={"sm"} mt={10}>
      <MarketSort 
        sellCount={sellCount}
        buyCount={buyCount}
        exchangeCount={exchangeCount}
      />
      <Table
        tableProps={{
          highlightOnHover: true,
          verticalSpacing: 'sm',
          horizontalSpacing: 'xs',
          style: (theme) => ({
            border: theme.other.border(theme),
            borderRadius: theme.radius[theme.defaultRadius as MantineSize],
            borderCollapse: 'separate',
            borderSpacing: 0,
          }),
        }}
        table={table}
        tablecaptionOptions={{ refreshState: [offersAreLoading, () => refetch()], visible: true }}
        TableSubRow={MarketSubRow}
      />
    </Flex>
  );
};