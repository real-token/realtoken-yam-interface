import React, { FC, useEffect, useRef, useState } from 'react';

import {
  Container,
  Group,
  Loader,
  Space,
  Table,
  ScrollArea,
  Stack,
  Text,
  Modal,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import {
  Columns,
  SortDirection,
  mapColumnLabels,
} from 'src/components/Transactions/utils/Types';
import { Transaction } from 'src/types/transaction/Transaction';

import {
  formatTimestampDay,
  formatTimestampHour,
  formatUsd,
  formatBigDecimals,
} from 'src/utils/format';
import TransactionDetail from './components/TransactionDetail';
import { HeaderElement } from 'src/components/List/HeaderElement';

const PAGE_SIZE = 10;

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
}) => {
  const { t } = useTranslation('transactions', { keyPrefix: 'list' });
  const { t: tModal } = useTranslation('transactions', { keyPrefix: 'modal' });

  const columnLabels = mapColumnLabels(t);

  const [transactionsDisplayed, setTransactionsDisplayed] =
    useState<number>(PAGE_SIZE);
  const endListRef = useRef<HTMLDivElement>(null);

  const [selectedHeader, setSelectedHeader] = useState<Columns | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Asc,
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

  const [transaction, setTransaction] = useState<Transaction | undefined>(
    undefined,
  );
  const [opened, { close, open }] = useDisclosure(false);

  useEffect(() => {
    setFilteredTransaction(getFilteredTransactions());
  }, [transactions.length, selectedHeader, sortDirection]);

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

  const rows = getTransactionsToDisplay().map((element) => (
    <tr
      key={element.hash}
      onClick={() => {
        setTransaction(element);
        open();
      }}
      style={{ cursor: 'pointer' }}
    >
      <td>
        <Stack h={'100%'} align={'stretch'} justify={'center'} spacing={0}>
          <div>
            <Text fz={'xs'} ta={'left'} fw={500}>
              {formatTimestampDay(element.timeStamp)}
            </Text>
            <Text fz={'xs'} color={'dimmed'} ta={'left'}>
              {formatTimestampHour(element.timeStamp)}
            </Text>
          </div>
        </Stack>
      </td>
      <td>{formatBigDecimals(element.amount)}</td>
      <td>{formatUsd(element.usdAmount ?? 0)}</td>
    </tr>
  ));

  const columnOrder = [Columns.timeStamp, Columns.amount, Columns.usdAmount];

  const header = columnOrder
    .filter((c) => c !== Columns.offerId && c !== Columns.price)
    .map((column, index) => (
      <th key={index}>
        <HeaderElement
          label={columnLabels[column]}
          sortByColumn={(sortDirection: SortDirection) => {
            handleSortChange(sortDirection);
            console.log(column, sortDirection);
          }}
          selected={selectedHeader !== null && selectedHeader === column}
          setSelectedHeader={() => setSelectedHeader(column)}
          justify={'left'}
        ></HeaderElement>
      </th>
    ));

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
      <Modal
        opened={opened}
        onClose={close}
        size={'auto'}
        title={<Title order={2}>{tModal('title')}</Title>}
        centered={true}
      >
        {transaction !== undefined && (
          <TransactionDetail
            transaction={transaction}
            hideButton={true}
          ></TransactionDetail>
        )}
      </Modal>
      <ScrollArea h={250} type={'never'}>
        <Table highlightOnHover={true}>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

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
    return getSortedElements(transactions, selectedHeader, sortDirection);
  }
};

function getSortedElements(
  transactions: Transaction[],
  sortedColumn: Columns | null,
  sortDirection: SortDirection,
): Transaction[] {
  if (sortedColumn) {
    const sorted = transactions.sort(sortColumn(sortedColumn, sortDirection));

    return sorted;
  } else {
    return transactions;
  }
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
