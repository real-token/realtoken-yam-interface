import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VariableSizeList as List } from 'react-window';

import { Container, Group, Loader, Space } from '@mantine/core';

import {
  Columns,
  SortDirection,
  TransactionData,
} from 'src/components/Transactions/utils/Types';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';

import { PRICE_PERIOD } from './utils/Types';
import { Filters } from './components/Filters';
import { GlobalStat } from './components/GlobalStat';
import HeaderCard from './components/HeaderCard';
import { TimeRange } from './components/TimeRange';
import TransactionRow from './components/TransactionDataRow';

const ROW_HEIGHT = 160;
const PAGE_SIZE = 10;

interface TransactionListProps {
  transactions: TransactionData[];
  children?: React.ReactNode;
}

const TransactionList: FC<TransactionListProps> = ({
  transactions,
  children,
}) => {
  const { t } = useTranslation('transactions', { keyPrefix: 'list' });
  const { propertiesToken } = usePropertiesToken();

  const [searchText, setSearchText] = useState<string>('');
  const [transactionsDisplayed, setTransactionsDisplayed] =
    useState<number>(PAGE_SIZE);
  const endListRef = useRef<HTMLDivElement>(null);
  const [tokenFilterStates, setTokenFilterStates] = useState<
    Map<string, boolean>
  >(new Map(propertiesToken.map((token) => [token.contractAddress, false])));

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pricePeriod, setPricePeriod] = useState<string>(PRICE_PERIOD['7d']);
  const [selectedHeader, setSelectedHeader] = useState<Columns | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Asc,
  );
  const [filtedTransactions, setFilteredTransaction] = useState<
    TransactionData[]
  >(getFilteredTransactions());

  const handleReachEndList = (entries: IntersectionObserverEntry[]) => {
    const isEndListReached = entries[0].isIntersecting;
    const totalItems = transactions.length;

    if (isEndListReached && transactionsDisplayed < totalItems) {
      setTransactionsDisplayed(
        Math.min(transactionsDisplayed + PAGE_SIZE, totalItems),
      );
    }
  };

  useEffect(() => {
    setFilteredTransaction(getFilteredTransactions());
  }, [
    transactions.length,
    searchText,
    tokenFilterStates,
    startDate,
    endDate,
    selectedHeader,
    sortDirection,
  ]);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the div is visible
    };

    const observer = new IntersectionObserver(handleReachEndList, options);

    if (endListRef.current) {
      observer.observe(endListRef.current);
    }

    return () => {
      // Clean up the observer on component unmount
      observer.disconnect();
    };
  }, [transactionsDisplayed, transactions.length]);

  /* eslint-disable */
  const Row = ({ index, style }: { index: number; style: any }) => {
    /* eslint-enable */
    if (!getDisplayedTransactions(filtedTransactions, transactionsDisplayed)) {
      return (
        <div style={{ ...style, textAlign: 'center', padding: 10 }}>
          {'Aucune donnée'}
        </div>
      );
    }
    const isLastRow =
      index ===
      getDisplayedTransactions(filtedTransactions, transactionsDisplayed)
        .length -
        1;
    const transaction = selectedHeader
      ? getDisplayedTransactions(
          filtedTransactions.sort(sortColumn(selectedHeader, sortDirection)),
          transactionsDisplayed,
        )[index]
      : getDisplayedTransactions(filtedTransactions, transactionsDisplayed)[
          index
        ];

    return (
      <TransactionRow
        key={`Row${index}`}
        transaction={transaction}
        isLastRow={isLastRow}
        style={style}
      />
    );
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setSearchText(event.target.value);
    setFilteredTransaction(getFilteredTransactions());
  };

  const handleTokenFilter = (contractAddress: string) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setTokenFilterStates((prev) => {
      const newFilterStates = new Map(prev);
      newFilterStates.set(contractAddress, !prev.get(contractAddress));
      return newFilterStates;
    });
    setFilteredTransaction(getFilteredTransactions());
  };

  const handleStartDateFilter = (newDate: Date | null) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setStartDate(newDate);
    setFilteredTransaction(getFilteredTransactions());
  };

  const handleEndDateFilter = (newDate: Date | null) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setEndDate(newDate);
    setFilteredTransaction(getFilteredTransactions());
  };

  const handleSortChange = (sortDirection: SortDirection) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setSortDirection(sortDirection);
    setFilteredTransaction(getFilteredTransactions());
  };

  return (
    <Container
      style={{
        maxWidth: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <TimeRange transactions={transactions}>{children}</TimeRange>
      <Space h={'xs'}></Space>
      <Filters
        tokenFilterStates={tokenFilterStates}
        startDate={startDate}
        endDate={endDate}
        pricePeriod={pricePeriod} //{pricePeriod}
        propertiesToken={propertiesToken}
        handleTokenFilter={handleTokenFilter}
        handlePricePeriodFilter={setPricePeriod}
        handleStartDateFilter={handleStartDateFilter}
        handleEndDateFilter={handleEndDateFilter}
      ></Filters>

      <Space h={'xs'}></Space>
      <GlobalStat
        transactions={filtedTransactions}
        daysPeriod={parseInt(pricePeriod)}
      ></GlobalStat>
      <Space h={10}></Space>
      <HeaderCard
        filterText={searchText}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        setSelectedHeader={setSelectedHeader}
        selectedHeader={selectedHeader}
      ></HeaderCard>
      <List
        height={
          getTransactionsToDisplay()
            ? Math.max(getTransactionsToDisplay().length, 1) * ROW_HEIGHT
            : ROW_HEIGHT
        }
        itemCount={
          getTransactionsToDisplay() ? getTransactionsToDisplay().length : 1
        }
        itemSize={() => ROW_HEIGHT}
        width={'100%'}
      >
        {Row}
      </List>
      <div ref={endListRef}></div>
      {transactionsDisplayed < getFilteredTransactions().length && (
        <div>
          <Space h={'xl'}></Space>
          <Group position={'center'}>
            <Loader variant={'dots'}></Loader>
          </Group>
        </div>
      )}
    </Container>
  );

  function getTransactionsToDisplay() {
    return filtedTransactions.slice(0, transactionsDisplayed);
  }

  function getFilteredTransactions() {
    return getFilterElements(
      transactions,
      searchText,
      tokenFilterStates,
      startDate?.getTime(),
      endDate?.getTime(),
      selectedHeader,
      sortDirection,
    );
  }
};

export default TransactionList;

function getDisplayedTransactions(
  filtedTransactions: TransactionData[],
  transactionsDisplayed: number,
) {
  return filtedTransactions.slice(0, transactionsDisplayed);
}

function filterTransaction(
  filterText: string,
  filterToken: Map<string, boolean>,
  filterStartDate: number | undefined,
  filterEndDate: number | undefined,
): (
  value: TransactionData,
  index: number,
  array: TransactionData[],
) => unknown {
  return (transaction) => {
    const searchTerms = filterText.toLowerCase();
    //console.log('FILTER TRANSACTION', filterStartDate, transaction.timeStamp);

    return (
      (!filterStartDate || transaction.timeStamp > filterStartDate / 1000) &&
      (!filterEndDate ||
        transaction.timeStamp < filterEndDate / 1000 + 86400) &&
      (Array.from(filterToken).every(([address, active]) => !active) ||
        Array.from(filterToken).some(
          ([address, active]) =>
            active &&
            (transaction.tokenForSale?.address.toLowerCase() ===
              address.toLowerCase() ||
              transaction.tokenBuyWith?.address.toLowerCase() ===
                address.toLowerCase()),
        )) &&
      (transaction.offerId.toLowerCase().includes(searchTerms) ||
        transaction.tokenBuyWith?.name.toLowerCase().includes(searchTerms) ||
        transaction.tokenForSale?.name.toLowerCase().includes(searchTerms) ||
        transaction.tokenBuyWith?.symbol?.toLowerCase().includes(searchTerms) ||
        transaction.tokenForSale?.symbol?.toLowerCase().includes(searchTerms))
    );
  };
}

function getFilterElements(
  transactions: TransactionData[],
  filterText: string,
  filterToken: Map<string, boolean>,
  filterStartDate: number | undefined,
  filterEndDate: number | undefined,
  sortedColumn: Columns | null,
  sortDirection: SortDirection,
): TransactionData[] {
  if (sortedColumn) {
    const sorted = transactions
      .filter(
        filterTransaction(
          filterText,
          filterToken,
          filterStartDate,
          filterEndDate,
        ),
      )
      .sort(sortColumn(sortedColumn, sortDirection));

    return sorted;
  } else {
    return transactions.filter(
      filterTransaction(
        filterText,
        filterToken,
        filterStartDate,
        filterEndDate,
      ),
    );
  }
}

function sortColumn(
  column: keyof TransactionData,
  sortDirection: SortDirection,
): ((a: TransactionData, b: TransactionData) => number) | undefined {
  return (a, b) => {
    const columnA = a[column];
    const columnB = b[column];

    if (typeof columnA === 'number' && typeof columnB === 'number') {
      if (sortDirection === SortDirection.Asc) {
        return columnA - columnB;
      } else {
        return columnB - columnA;
      }
    }

    if (sortDirection === SortDirection.Asc) {
      return String(columnA).localeCompare(String(columnB));
    } else {
      return String(columnB).localeCompare(String(columnA));
    }
  };
}
