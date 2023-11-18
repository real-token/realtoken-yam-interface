import React, { FC, useEffect, useRef, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

import { Button, Container, Space } from '@mantine/core';

import { TransactionData } from 'src/components/Transactions/Types';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';

import { GlobalStat } from './components/GlobalStat';
import HeaderCard from './components/HeaderCard';
import { TimeRange } from './components/TimeRange';
import TransactionRow from './components/TransactionRow';

const ROW_HEIGHT = 160;
const PAGE_SIZE = 10;

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
  const { propertiesToken } = usePropertiesToken();

  const [searchText, setSearchText] = useState<string>('');
  const [transactionsDisplayed, setTransactionsDisplayed] =
    useState<number>(PAGE_SIZE);
  const endListRef = useRef<HTMLDivElement>(null);
  const [tokenFilterStates, setTokenFilterStates] = useState<
    Map<string, boolean>
  >(new Map(propertiesToken.map((token) => [token.contractAddress, false])));
  const [unknownTokenFilterStates, setUnknownTokenFilterStates] =
    useState(false);

  console.log('LOAD TransactionList', transactions.length);

  const handleReachEndList = (entries: IntersectionObserverEntry[]) => {
    const isEndListReached = entries[0].isIntersecting;
    const totalItems = transactions.length;

    console.log(
      'handleReachEndList',
      transactionsDisplayed,
      totalItems,
      isEndListReached
    );

    if (isEndListReached && transactionsDisplayed < totalItems) {
      console.log('handleReachEndList', 'update');
      setTransactionsDisplayed(
        Math.min(transactionsDisplayed + PAGE_SIZE, totalItems)
      );
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
    if (
      !getFirstElements(
        transactions,
        searchText,
        tokenFilterStates,
        unknownTokenFilterStates
      )
    ) {
      return (
        <div style={{ ...style, textAlign: 'center', padding: 10 }}>
          {'Aucune donnée'}
        </div>
      );
    }
    const isLastRow =
      index ===
      getFirstElements(
        transactions,
        searchText,
        tokenFilterStates,
        unknownTokenFilterStates
      ).length -
        1;
    const transaction = getFirstElements(
      transactions,
      searchText,
      tokenFilterStates,
      unknownTokenFilterStates
    )[index];

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

  const handleTokenFilter = (contractAddress: string) => {
    setTokenFilterStates((prev) => {
      const newFilterStates = new Map(prev);
      newFilterStates.set(contractAddress, !prev.get(contractAddress));
      return newFilterStates;
    });
  };

  const handleUnknownTokenFilter = () => {
    setUnknownTokenFilterStates((prev) => {
      return !prev;
    });
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
      <div>
        {propertiesToken.map((token) => (
          <Button
            key={token.contractAddress}
            style={{ marginRight: 10 }}
            onClick={() => handleTokenFilter(token.contractAddress)}
            color={
              tokenFilterStates.get(token.contractAddress) ? 'blue' : 'gray'
            }
          >
            {token.shortName}
          </Button>
        ))}
        <Button
          style={{ marginRight: 10 }}
          onClick={() => handleUnknownTokenFilter()}
          color={unknownTokenFilterStates ? 'blue' : 'gray'}
        >
          {'Autres'}
        </Button>
      </div>
      <Space h={'xs'}></Space>
      <GlobalStat
        transactions={getFilterElements(
          transactions,
          searchText,
          tokenFilterStates,
          unknownTokenFilterStates
        )}
      ></GlobalStat>
      <Space h={10}></Space>
      <HeaderCard
        filterText={searchText}
        handleFilterChange={handleFilterChange}
      ></HeaderCard>
      <List
        height={
          getFirstElements(
            transactions,
            searchText,
            tokenFilterStates,
            unknownTokenFilterStates
          )
            ? Math.max(
                getFirstElements(
                  transactions,
                  searchText,
                  tokenFilterStates,
                  unknownTokenFilterStates
                ).length,
                1
              ) * ROW_HEIGHT
            : ROW_HEIGHT
        }
        itemCount={
          getFirstElements(
            transactions,
            searchText,
            tokenFilterStates,
            unknownTokenFilterStates
          )
            ? getFirstElements(
                transactions,
                searchText,
                tokenFilterStates,
                unknownTokenFilterStates
              ).length
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
    filterText: string,
    filterToken: Map<string, boolean>,
    filterUnknownToken: boolean
  ): TransactionData[] {
    return transactions
      .filter(filterByText(filterText, filterToken, filterUnknownToken))
      .slice(0, transactionsDisplayed);
  }
};

export default TransactionList;

function filterByText(
  filterText: string,
  filterToken: Map<string, boolean>,
  filterUnknownToken: boolean
): (
  value: TransactionData,
  index: number,
  array: TransactionData[]
) => unknown {
  return (transaction) => {
    const searchTerms = filterText.toLowerCase();

    return (
      (((!filterUnknownToken || transaction.offerType === undefined) &&
        Array.from(filterToken).every(([address, active]) => !active)) ||
        Array.from(filterToken).some(
          ([address, active]) =>
            active &&
            transaction.tokenForSale?.address.toLowerCase() ===
              address.toLowerCase()
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
  filterUnknownToken: boolean
): TransactionData[] {
  return transactions.filter(
    filterByText(filterText, filterToken, filterUnknownToken)
  );
}
