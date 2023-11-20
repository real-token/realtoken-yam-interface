import React, { FC, useEffect, useRef, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

import { Container, Group, Loader, Space } from '@mantine/core';

import { TransactionData } from 'src/components/Transactions/Types';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';

import { PRICE_PERIOD } from './Types';
import { Filters } from './components/Filters';
import { GlobalStat } from './components/GlobalStat';
import HeaderCard from './components/HeaderCard';
import { TimeRange } from './components/TimeRange';
import TransactionRow from './components/TransactionRow';

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

        startDate?.getTime(),
        endDate?.getTime()
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

        startDate?.getTime(),
        endDate?.getTime()
      ).length -
        1;
    const transaction = getFirstElements(
      transactions,
      searchText,
      tokenFilterStates,

      startDate?.getTime(),
      endDate?.getTime()
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
    setTransactionsDisplayed(PAGE_SIZE);
    setSearchText(event.target.value);
  };

  const handleTokenFilter = (contractAddress: string) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setTokenFilterStates((prev) => {
      const newFilterStates = new Map(prev);
      newFilterStates.set(contractAddress, !prev.get(contractAddress));
      return newFilterStates;
    });
  };

  const handleStartDateFilter = (newDate: Date | null) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setStartDate(newDate);
  };

  const handleEndDateFilter = (newDate: Date | null) => {
    setTransactionsDisplayed(PAGE_SIZE);
    setEndDate(newDate);
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
        transactions={getFilterElements(
          transactions,
          searchText,
          tokenFilterStates,

          startDate?.getTime(),
          endDate?.getTime()
        )}
        daysPeriod={parseInt(pricePeriod)}
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

            startDate?.getTime(),
            endDate?.getTime()
          )
            ? Math.max(
                getFirstElements(
                  transactions,
                  searchText,
                  tokenFilterStates,

                  startDate?.getTime(),
                  endDate?.getTime()
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

            startDate?.getTime(),
            endDate?.getTime()
          )
            ? getFirstElements(
                transactions,
                searchText,
                tokenFilterStates,

                startDate?.getTime(),
                endDate?.getTime()
              ).length
            : 1
        }
        itemSize={() => ROW_HEIGHT}
        width={'100%'}
      >
        {Row}
      </List>
      <div ref={endListRef}></div>
      {transactionsDisplayed <
        getFilterElements(
          transactions,
          searchText,
          tokenFilterStates,
          startDate?.getTime(),
          endDate?.getTime()
        ).length && (
        <div>
          <Space h={'xl'}></Space>
          <Group position={'center'}>
            <Loader></Loader>
          </Group>
        </div>
      )}
    </Container>
  );

  function getFirstElements(
    transactions: TransactionData[],
    filterText: string,
    filterToken: Map<string, boolean>,
    filterStartDate: number | undefined,
    filterEndDate: number | undefined
  ): TransactionData[] {
    return transactions
      .filter(
        filterTransaction(
          filterText,
          filterToken,
          filterStartDate,
          filterEndDate
        )
      )
      .slice(0, transactionsDisplayed);
  }
};

export default TransactionList;

function filterTransaction(
  filterText: string,
  filterToken: Map<string, boolean>,

  filterStartDate: number | undefined,
  filterEndDate: number | undefined
): (
  value: TransactionData,
  index: number,
  array: TransactionData[]
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
                address.toLowerCase())
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
  filterEndDate: number | undefined
): TransactionData[] {
  return transactions.filter(
    filterTransaction(
      filterText,
      filterToken,

      filterStartDate,
      filterEndDate
    )
  );
}
