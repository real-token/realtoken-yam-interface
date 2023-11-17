import React, { FC, useEffect, useRef, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

import { Container, Space } from '@mantine/core';

import { TransactionData } from 'src/components/Transactions/Types';

import { GlobalStat } from './components/GlobalStat';
import HeaderCard from './components/HeaderCard';
import { TimeRange } from './components/TimeRange';
import TransactionRow from './components/TransactionRow';

const ROW_HEIGHT = 160;
const PAGE_SIZE = 10;
const MAX_TOKEN_AVAILABLE = 500000; //token max par site (pour filtré les valeur impossible)

interface TransactionListProps {
  transactions: TransactionData[];
  transactionsOffer?: TransactionData[];
  children?: React.ReactNode;
}

const TransactionList: FC<TransactionListProps> = ({
  transactions,
  transactionsOffer,
  children,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [transactionsDisplayed, setTransactionsDisplayed] =
    useState<number>(PAGE_SIZE);
  const endListRef = useRef<HTMLDivElement>(null);
  console.log('LOAD TransactionList', transactions.length);

  // const [sortedTransactions, setSortedTransaction] = useState<
  //   TransactionData[] | undefined
  // >(transactions);

  // useEffect(() => {
  //   if (transactions)
  //     setSortedTransaction(transactions.filter(filterByText(filterText)));
  // }, []);

  const handleReachEndList = (entries: IntersectionObserverEntry[]) => {
    const isEndListReached = entries[0].isIntersecting;
    console.log(
      'handleReachEndList',
      transactionsDisplayed,
      transactions.length,
      isEndListReached
    );
    if (isEndListReached && transactionsDisplayed < transactions.length) {
      console.log('handleReachEndList', 'update');
      setTransactionsDisplayed(transactionsDisplayed + PAGE_SIZE);
    }
  };

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
  const Row = ({ index, style }: { index: number; style: any }) => {
    if (!getFirstElements(transactions, searchText)) {
      return (
        <div style={{ ...style, textAlign: 'center', padding: 10 }}>
          {'Aucune donnée'}
        </div>
      );
    }
    const isLastRow =
      index === getFirstElements(transactions, searchText).length - 1;
    const transaction = getFirstElements(transactions, searchText)[index];

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
    setSearchText(event.target.value);
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
      <TimeRange
        transactions={transactions}
        createOffertransaction={transactionsOffer}
      >
        {children}
      </TimeRange>

      <Space h={'xs'}></Space>
      <GlobalStat
        transactions={getFilterElements(transactions, searchText)}
      ></GlobalStat>
      <Space h={10}></Space>
      <HeaderCard
        filterText={searchText}
        handleFilterChange={handleFilterChange}
      ></HeaderCard>
      <List
        height={
          getFirstElements(transactions, searchText)
            ? Math.max(getFirstElements(transactions, searchText).length, 1) *
              ROW_HEIGHT
            : ROW_HEIGHT
        }
        itemCount={
          getFirstElements(transactions, searchText)
            ? getFirstElements(transactions, searchText).length
            : 1
        }
        itemSize={() => ROW_HEIGHT}
        width={'100%'}
      >
        {Row}
      </List>
      <div ref={endListRef}></div>
    </Container>
  );

  function getFirstElements(
    transactions: TransactionData[],
    filterText: string
  ): TransactionData[] {
    return transactions
      .filter(filterByText(filterText))
      .slice(0, transactionsDisplayed);
  }
};

export default TransactionList;

function filterByText(
  filterText: string
): (
  value: TransactionData,
  index: number,
  array: TransactionData[]
) => unknown {
  return (transaction) => {
    const searchTerms = filterText.toLowerCase();

    return (
      transaction.amount < MAX_TOKEN_AVAILABLE ||
      transaction.offerId.toLowerCase().includes(searchTerms) ||
      // transaction.from.toLowerCase().includes(searchTerms.toLowerCase()) ||
      // transaction.offerType
      //   ?.toLowerCase()
      //   .includes(searchTerms.toLowerCase()) ||
      transaction.tokenBuyWith?.name.toLowerCase().includes(searchTerms) ||
      transaction.tokenForSale?.name.toLowerCase().includes(searchTerms) ||
      transaction.tokenBuyWith?.symbol?.toLowerCase().includes(searchTerms) ||
      transaction.tokenForSale?.symbol?.toLowerCase().includes(searchTerms)
    );
  };
}

function getFilterElements(
  transactions: TransactionData[],
  filterText: string
): TransactionData[] {
  return transactions.filter(filterByText(filterText));
}
