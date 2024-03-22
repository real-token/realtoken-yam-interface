import React, { FC, useEffect, useRef, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

import { Container, Group, Loader, Space } from '@mantine/core';

import {
  Columns,
  SortDirection,
} from 'src/components/Transactions/utils/Types';
import { Transaction } from 'src/types/transaction/Transaction';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';

import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import TransactionRow from './components/TransactionAmountRow';

const ROW_HEIGHT = 90;
const CONTENT_RATIO = 0.8;
const SMALL_ROW_HEIGHT = 70;
const PAGE_SIZE = 10;

interface TransactionListProps {
  transactions: Transaction[];
  isSmallLine?: boolean;
}

export const TransactionList: FC<TransactionListProps> = ({
  transactions,
  isSmallLine = false,
}) => {
  const theme = useMantineTheme();
  const isSmall =
    useMediaQuery(`(max-width: ${theme.breakpoints.sm})`) || isSmallLine;
  const isMobile =
    useMediaQuery(`(max-width: ${theme.breakpoints.xs})`) || isSmallLine;
  const [rowHeight, setRowHeight] = useState<number>(
    isSmall || isMobile ? SMALL_ROW_HEIGHT : ROW_HEIGHT,
  );
  const { propertiesToken } = usePropertiesToken();
  const [transactionsDisplayed, setTransactionsDisplayed] =
    useState<number>(PAGE_SIZE);
  const endListRef = useRef<HTMLDivElement>(null);
  const [tokenFilterStates] = useState<Map<string, boolean>>(
    new Map(propertiesToken.map((token) => [token.contractAddress, false])),
  );

  const [filtedTransactions, setFilteredTransaction] = useState<Transaction[]>(
    getFilteredTransactions(),
  );

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
    setRowHeight(
      isSmall || isMobile || isSmallLine ? SMALL_ROW_HEIGHT : ROW_HEIGHT,
    );
  }, [isMobile, isSmall, setRowHeight]);

  useEffect(() => {
    setFilteredTransaction(getFilteredTransactions());
  }, [transactions.length, tokenFilterStates]);

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

    if (
      getDisplayedTransactions(filtedTransactions, transactionsDisplayed)
        .length === 0
    ) {
      return (
        <div style={{ ...style, textAlign: 'center', padding: 10 }}>
          {'Aucune transactions'}
        </div>
      );
    }

    const transaction = getDisplayedTransactions(
      filtedTransactions,
      transactionsDisplayed,
    )[index];

    return (
      <TransactionRow
        key={`Row${index}`}
        transaction={transaction}
        style={style}
        height={rowHeight * CONTENT_RATIO}
        isSmall={isSmall || isMobile || isSmallLine}
      />
    );
  };

  return (
    <Container
      style={{
        maxWidth: 'none',
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <List
        height={
          getTransactionsToDisplay()
            ? Math.max(getTransactionsToDisplay().length, 1) * rowHeight
            : rowHeight
        }
        itemCount={
          getTransactionsToDisplay().length > 0
            ? getTransactionsToDisplay().length
            : 1
        }
        itemSize={() => rowHeight}
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
    return getFilterElements(transactions);
  }
};

export default TransactionList;

function getDisplayedTransactions(
  filtedTransactions: Transaction[],
  transactionsDisplayed: number,
) {
  return filtedTransactions.slice(0, transactionsDisplayed);
}

function getFilterElements(transactions: Transaction[]): Transaction[] {
  const sorted = transactions.sort(
    sortColumn(Columns.timeStamp, SortDirection.Desc),
  );

  return sorted;
}

function sortColumn(
  column: keyof Transaction,
  sortDirection: SortDirection,
): ((a: Transaction, b: Transaction) => number) | undefined {
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
