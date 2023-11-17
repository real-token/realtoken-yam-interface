import React, { FC } from 'react';

import { Card, Container, Group, SimpleGrid, Text } from '@mantine/core';

import { BigNumber } from 'bignumber.js';

import { TransactionData } from 'src/components/Transactions/Types';
import { formatPercent, formatUsd } from 'src/utils/format';

import {
  calculateAverageExpense as calculateAverageExpensePerTransaction,
  calculateAveragePrice,
  calculateExpensesPer24Hours,
  calculatePricesPer24Hours,
  calculateTransactionsPer24Hours,
  sumSpendingValues,
} from '../Utils';

interface GlobalStatProps {
  transactions: TransactionData[];
}

export const GlobalStat: FC<GlobalStatProps> = ({ transactions }) => {
  const { color, performance, volume } = get24HVolume(transactions);
  const {
    color: transactionColor,
    performance: transactionPerformance,
    amount: transactionAmount,
  } = get24HTransaction(transactions);

  const {
    color: expenseColor,
    expense,
    performance: expensePerformance,
  } = get24HExpensePerTransaction(transactions);

  const {
    color: priceColor,
    price,
    performance: pricePerformance,
  } = get24HPrice(transactions);

  const averagePrice = calculateAveragePrice(transactions);

  return (
    <Container
      style={{
        maxWidth: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <SimpleGrid cols={4}>
        <Card withBorder={true} shadow={'sm'} radius={'md'}>
          <Card.Section withBorder={true} inheritPadding={true} py={'xs'}>
            <Group position={'apart'}>
              <Text weight={500}>{'Volume'}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {formatTotalVolume(transactions)}
          </Text>
          {volume && (
            <>
              <Text fw={500} mt={'sm'} size={'lg'}>
                {formatUsd(volume) + ' (24h)'}
              </Text>
              <Text color={color} size={'xs'}>
                {(performance && performance > 0 ? '+' : '') +
                  formatPercent(performance)}
              </Text>
            </>
          )}
        </Card>
        <Card withBorder={true} shadow={'sm'} radius={'md'}>
          <Card.Section withBorder={true} inheritPadding={true} py={'xs'}>
            <Group position={'apart'}>
              <Text weight={500}>{'Transactions'}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {transactions.length}
          </Text>
          {transactionAmount && (
            <>
              <Text fw={500} mt={'sm'} size={'lg'}>
                {transactionAmount + ' (24h)'}
              </Text>
              <Text color={transactionColor} size={'xs'}>
                {(transactionPerformance && transactionPerformance > 0
                  ? '+'
                  : '') + formatPercent(transactionPerformance)}
              </Text>
            </>
          )}
        </Card>

        <Card withBorder={true} shadow={'sm'} radius={'md'}>
          <Card.Section withBorder={true} inheritPadding={true} py={'xs'}>
            <Group position={'apart'}>
              <Text weight={500}>{'Dépense par Transactions'}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {formatAverageSpendingPertransaction(transactions)}
          </Text>
          {expense && (
            <>
              <Text fw={500} mt={'sm'} size={'lg'}>
                {formatUsd(expense) + ' (24h)'}
              </Text>
              <Text color={expenseColor} size={'xs'}>
                {(expensePerformance && expensePerformance > 0 ? '+' : '') +
                  formatPercent(expensePerformance)}
              </Text>
            </>
          )}
        </Card>
        <Card withBorder={true} shadow={'sm'} radius={'md'}>
          <Card.Section withBorder={true} inheritPadding={true} py={'xs'}>
            <Group position={'apart'}>
              <Text weight={500}>{'Prix'}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {formatUsd(averagePrice ?? 0)}
          </Text>
          {price && (
            <>
              <Text fw={500} mt={'sm'} size={'lg'}>
                {formatUsd(price) + ' (24h)'}
              </Text>
              <Text color={priceColor} size={'xs'}>
                {(pricePerformance && pricePerformance > 0 ? '+' : '') +
                  formatPercent(pricePerformance)}
              </Text>
            </>
          )}
        </Card>
      </SimpleGrid>
    </Container>
  );
};

function formatAverageSpendingPertransaction(
  transactions: TransactionData[]
): string {
  if (transactions.length === 0) {
    return '';
  }

  const averageSpending = calculateAverageExpensePerTransaction(transactions);

  if (!averageSpending) return '';

  return formatUsd(averageSpending);
}

function formatTotalVolume(transactions: TransactionData[]): string {
  return formatUsd(sumSpendingValues(transactions));
}

function get24HVolume(transactions: TransactionData[]): {
  volume: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const expensesPer24Hours = calculateExpensesPer24Hours(transactions, t0);

  const last24H = expensesPer24Hours.has(-1) ? expensesPer24Hours.get(-1) : 0;
  const secondLast24H = expensesPer24Hours.has(-2)
    ? expensesPer24Hours.get(-2)
    : undefined;

  if (last24H && secondLast24H && last24H > secondLast24H) {
    color = 'green';
    performance = new BigNumber(last24H)
      .minus(secondLast24H)
      .dividedBy(secondLast24H)
      .times(100)
      .toNumber();
  } else if (last24H && secondLast24H && last24H < secondLast24H) {
    color = 'red';
    performance = new BigNumber(last24H)
      .minus(secondLast24H)
      .dividedBy(secondLast24H)
      .times(100)
      .toNumber();
  }

  return {
    volume: last24H,
    color: color,
    performance: performance,
  };
}

function get24HTransaction(transactions: TransactionData[]): {
  amount: number | undefined;
  amountBefore: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const transactionsPer24Hours = calculateTransactionsPer24Hours(
    transactions,
    t0
  );

  const last24H = transactionsPer24Hours.has(-1)
    ? transactionsPer24Hours.get(-1)
    : 0;
  const secondLast24H = transactionsPer24Hours.has(-2)
    ? transactionsPer24Hours.get(-2)
    : undefined;

  if (last24H && secondLast24H && last24H > secondLast24H) {
    color = 'green';
    performance = new BigNumber(last24H)
      .minus(secondLast24H)
      .dividedBy(secondLast24H)
      .times(100)
      .toNumber();
  } else if (last24H && secondLast24H && last24H < secondLast24H) {
    color = 'red';
    performance = new BigNumber(last24H)
      .minus(secondLast24H)
      .dividedBy(secondLast24H)
      .times(100)
      .toNumber();
  } else if (last24H && secondLast24H && last24H === secondLast24H) {
    performance = 0;
  }

  return {
    amount: last24H,
    color: color,
    performance: performance,
    amountBefore: secondLast24H,
  };
}

function get24HExpensePerTransaction(transactions: TransactionData[]): {
  expense: number | undefined;
  expenseBefore: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const transactionsPer24Hours = calculateTransactionsPer24Hours(
    transactions,
    t0
  );
  const expensesPer24Hours = calculateExpensesPer24Hours(transactions, t0);

  const last24HTransaction = transactionsPer24Hours.has(-1)
    ? transactionsPer24Hours.get(-1)
    : 0;
  const secondLast24HTransaction = transactionsPer24Hours.has(-2)
    ? transactionsPer24Hours.get(-2)
    : undefined;

  const last24HExpense = expensesPer24Hours.has(-1)
    ? expensesPer24Hours.get(-1)
    : 0;
  const secondLast24HExpense = expensesPer24Hours.has(-2)
    ? expensesPer24Hours.get(-2)
    : undefined;

  let last24HAverageExpense = undefined;
  let secondLast24HAverageExpense = undefined;
  if (last24HExpense && last24HTransaction) {
    last24HAverageExpense = new BigNumber(last24HExpense)
      .dividedBy(last24HTransaction)
      .toNumber();
  }
  if (secondLast24HExpense && secondLast24HTransaction) {
    secondLast24HAverageExpense = new BigNumber(secondLast24HExpense)
      .dividedBy(secondLast24HTransaction)
      .toNumber();
  }

  if (
    secondLast24HAverageExpense &&
    last24HAverageExpense &&
    last24HAverageExpense > secondLast24HAverageExpense
  ) {
    color = 'green';
    performance = new BigNumber(last24HAverageExpense)
      .minus(secondLast24HAverageExpense)
      .dividedBy(secondLast24HAverageExpense)
      .times(100)
      .toNumber();
  } else if (
    last24HAverageExpense &&
    secondLast24HAverageExpense &&
    last24HAverageExpense < secondLast24HAverageExpense
  ) {
    color = 'red';
    performance = new BigNumber(last24HAverageExpense)
      .minus(secondLast24HAverageExpense)
      .dividedBy(secondLast24HAverageExpense)
      .times(100)
      .toNumber();
  } else if (
    last24HAverageExpense &&
    secondLast24HAverageExpense &&
    last24HAverageExpense === secondLast24HAverageExpense
  ) {
    performance = 0;
  }

  return {
    expense: last24HAverageExpense,
    color: color,
    performance: performance,
    expenseBefore: secondLast24HAverageExpense,
  };
}

function get24HPrice(transactions: TransactionData[]): {
  price: number | undefined;
  priceBefore: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const pricePer24Hours = calculatePricesPer24Hours(transactions, t0);

  const last24H = pricePer24Hours.has(-1) ? pricePer24Hours.get(-1) : 0;
  const secondLast24H = pricePer24Hours.has(-2)
    ? pricePer24Hours.get(-2)
    : undefined;

  if (last24H && secondLast24H && last24H > secondLast24H) {
    color = 'green';
    performance = new BigNumber(last24H)
      .minus(secondLast24H)
      .dividedBy(secondLast24H)
      .times(100)
      .toNumber();
  } else if (last24H && secondLast24H && last24H < secondLast24H) {
    color = 'red';
    performance = new BigNumber(last24H)
      .minus(secondLast24H)
      .dividedBy(secondLast24H)
      .times(100)
      .toNumber();
  } else if (last24H && secondLast24H && last24H === secondLast24H) {
    performance = 0;
  }

  return {
    price: last24H,
    color: color,
    performance: performance,
    priceBefore: secondLast24H,
  };
}
