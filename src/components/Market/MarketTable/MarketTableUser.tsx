import { FC, useState } from 'react';
import { Flex, MantineSize, TextInput, Text } from '@mantine/core';
import {
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
import { Table } from '../../Table';
import { MarketSubRow } from '../MarketSubRow';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { selectAddressOffers } from 'src/store/features/interface/interfaceSelector';
import { useSelector } from 'react-redux';
import { MarketSort } from '../MarketSort/MarketSort';
import { OFFERS_TYPE, useRightTableColumn } from 'src/hooks/useRightTableColumns';
import { useTypedOffers } from 'src/hooks/offers/useTypedOffers';
import { useTranslation } from 'react-i18next';

export const MarketTableUser: FC = () => {

  const { t } = useTranslation('table', { keyPrefix: 'filters' });

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
  const { offers, sellCount, buyCount, exchangeCount } = useTypedOffers(addressOffers);
  const columns = useRightTableColumn(OFFERS_TYPE.ADDRESS);

  const [globalFilter, setGlobalFilter] = useState<string>('');

  const table = useReactTable({
    data: offers,
    columns: columns,
    state: { 
      sorting, 
      pagination, 
      expanded,
      globalFilter: globalFilter, 
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
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: { colSpan: 16 },
  });

  return (
    <Flex direction={"column"} gap={"xl"} mt={30}>
      <Flex direction={"column"} gap={"sm"} align={"flex-start"}>
        <Text size={'xl'}>
          {t('title')}
        </Text>
        <TextInput 
            placeholder={t('nameFilterPlaceholder')}
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.currentTarget.value)}
        />
        <MarketSort 
          sellCount={sellCount}
          buyCount={buyCount}
          exchangeCount={exchangeCount}
        />
      </Flex>
      <Table
        tableProps={{
          highlightOnHover: true,
          verticalSpacing: 'sm',
          horizontalSpacing: 'xs',
          style: (theme) => ({
            border:theme.other.border(theme),
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
