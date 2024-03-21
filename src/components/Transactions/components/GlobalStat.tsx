import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import { Card, Container, Group, SimpleGrid, Text } from '@mantine/core';

import { BigNumber } from 'bignumber.js';

import { TransactionData } from 'src/components/Transactions/utils/Types';
import { formatPercent, formatUsd } from 'src/utils/format';

import {
  calculateAverageExpense as calculateAverageExpensePerTransaction,
  calculateAveragePrice,
  calculateExpensesPer24Hours,
  calculatePricesPerPeriod,
  calculateTransactionsPerPeriod,
  sumSpendingValues,
} from '../utils/DataUtils';

interface GlobalStatProps {
  transactions: TransactionData[];
  daysPeriod: number;
}

export const GlobalStat: FC<GlobalStatProps> = ({
  transactions,
  daysPeriod,
}) => {
  const { t } = useTranslation('transactions', { keyPrefix: 'stats' });

  const { color, performance, volume, volumeBefore } = getPeriodVolume(
    transactions,
    daysPeriod,
  );
  const {
    color: transactionColor,
    performance: transactionPerformance,
    amount: transactionAmount,
    amountBefore,
  } = getPeriodTransaction(transactions, daysPeriod);

  const {
    color: expenseColor,
    expense,
    expenseBefore,
    performance: expensePerformance,
  } = getPeriodExpensePerTransaction(transactions, daysPeriod);

  const {
    color: priceColor,
    price,
    priceBefore,
    performance: pricePerformance,
  } = getPeriodPrice(transactions, daysPeriod);

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
              <Text weight={500}>{t('volume')}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {formatTotalVolume(transactions)}
          </Text>

          <Text fw={500} mt={'sm'} size={'lg'}>
            {formatUsd(volume ?? 0) + ' (' + formatPeriod(daysPeriod, t) + ')'}
          </Text>
          <Text color={color} size={'xs'}>
            {formatPeriodPerformance(
              performance,
              volume ?? 0,
              volumeBefore ?? 0,
            )}
          </Text>
        </Card>
        <Card withBorder={true} shadow={'sm'} radius={'md'}>
          <Card.Section withBorder={true} inheritPadding={true} py={'xs'}>
            <Group position={'apart'}>
              <Text weight={500}>{t('transactions')}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {transactions.length}
          </Text>

          <Text fw={500} mt={'sm'} size={'lg'}>
            {transactionAmount + ' (' + formatPeriod(daysPeriod, t) + ')'}
          </Text>
          <Text color={transactionColor} size={'xs'}>
            {formatPeriodPerformance(
              transactionPerformance,
              transactionAmount ?? 0,
              amountBefore ?? 0,
              false,
            )}
          </Text>
        </Card>

        <Card withBorder={true} shadow={'sm'} radius={'md'}>
          <Card.Section withBorder={true} inheritPadding={true} py={'xs'}>
            <Group position={'apart'}>
              <Text weight={500}>{t('expense')}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {formatAverageSpendingPertransaction(transactions)}
          </Text>

          <>
            <Text fw={500} mt={'sm'} size={'lg'}>
              {formatUsd(expense ?? 0) +
                ' (' +
                formatPeriod(daysPeriod, t) +
                ')'}
            </Text>

            <Text color={expenseColor} size={'xs'}>
              {formatPeriodPerformance(
                expensePerformance,
                expense ?? 0,
                expenseBefore ?? 0,
              )}
            </Text>
          </>
        </Card>
        <Card withBorder={true} shadow={'sm'} radius={'md'}>
          <Card.Section withBorder={true} inheritPadding={true} py={'xs'}>
            <Group position={'apart'}>
              <Text weight={500}>{t('price')}</Text>
            </Group>
          </Card.Section>
          <Text fw={700} mt={'xs'} color={'blue'} size={'xl'}>
            {formatUsd(averagePrice ?? 0)}
          </Text>

          <Text fw={500} mt={'sm'} size={'lg'}>
            {formatUsd(price ?? 0) + ' (' + formatPeriod(daysPeriod, t) + ')'}
          </Text>
          <Text color={priceColor} size={'xs'}>
            {formatPeriodPerformance(
              pricePerformance,
              price ?? 0,
              priceBefore ?? 0,
            )}
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

function formatPeriod(
  days: number,
  t: TFunction<'transactions', 'stats'>,
): string {
  return days === 1 ? '24h' : days + ' ' + t('day') + 's';
}

function formatPeriodPerformance(
  performance: number | undefined,
  value: number,
  valueBefore: number,
  isUsd = true,
): React.ReactNode {
  const gain = new BigNumber(value).minus(valueBefore).toNumber();
  const formatedGain = isUsd ? formatUsd(gain) : gain;
  const symbol = performance && performance > 0 ? '+' : '';
  const formatedPerformance =
    symbol +
    formatedGain +
    ' (' +
    formatPercent(performance ? performance / 100 : 0) +
    ')';
  return performance ? formatedPerformance : '-';
}

function formatAverageSpendingPertransaction(
  transactions: TransactionData[],
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

function getPeriodVolume(
  transactions: TransactionData[],
  days: number,
): {
  volume: number | undefined;
  volumeBefore: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const expensesPer24Hours = calculateExpensesPer24Hours(
    transactions,
    t0,
    days,
  );

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
    volumeBefore: secondLast24H,
    color: color,
    performance: performance,
  };
}

function getPeriodTransaction(
  transactions: TransactionData[],
  days: number,
): {
  amount: number | undefined;
  amountBefore: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const transactionsPer24Hours = calculateTransactionsPerPeriod(
    transactions,
    t0,
    days,
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

function getPeriodExpensePerTransaction(
  transactions: TransactionData[],
  days: number,
): {
  expense: number | undefined;
  expenseBefore: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const transactionsPer24Hours = calculateTransactionsPerPeriod(
    transactions,
    t0,
    days,
  );
  const expensesPer24Hours = calculateExpensesPer24Hours(
    transactions,
    t0,
    days,
  );

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

function getPeriodPrice(
  transactions: TransactionData[],
  days: number,
): {
  price: number | undefined;
  priceBefore: number | undefined;
  color: string | undefined;
  performance: number | undefined;
} {
  let color: string | undefined = undefined;

  let performance: number | undefined = undefined;
  const t0: number = new Date().getTime() / 1000;
  const pricePer24Hours = calculatePricesPerPeriod(transactions, t0, days);

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
