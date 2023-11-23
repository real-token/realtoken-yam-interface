import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

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

import { useFilterOffers } from 'src/hooks/offers/useFilterOffers';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import {
  OFFERS_TYPE,
  useRightTableColumn,
} from 'src/hooks/useRightTableColumns';
import { selectAddressOffers } from 'src/store/features/interface/interfaceSelector';

import { Table } from '../../Table';
import { MarketSort } from '../MarketSort/MarketSort';
import { MarketSubRow } from '../MarketSubRow';

export const MarketTableUser: FC = () => {
  const { refreshOffers, offersIsLoading } = useRefreshOffers(false);

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'offer-id', desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const addressOffers = useSelector(selectAddressOffers);
  const { offers, sellCount, buyCount, exchangeCount } =
    useFilterOffers(addressOffers);
  const columns = useRightTableColumn(OFFERS_TYPE.ADDRESS);

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
    meta: { colSpan: 16 },
  });

  return (
    <Flex direction={'column'} gap={'sm'} mt={10}>
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
