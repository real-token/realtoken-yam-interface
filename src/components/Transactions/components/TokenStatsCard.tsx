import React, { FC } from 'react';
import { TFunction, useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Image,
  Space,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import {
  IconEqual,
  IconReload,
  IconTriangle,
  IconTriangleInverted,
} from '@tabler/icons';

import { BigNumber } from 'bignumber.js';

import { PropertiesToken } from 'src/types';
import { Transaction } from 'src/types/transaction/Transaction';
import {
  formatPercent,
  formatSmallToken,
  formatToken,
  formatUsd,
} from 'src/utils/format';

import {
  calculateAveragePrice,
  countTransactionsLast7Days,
  getFirstsTransactions,
  getNextTransactions,
} from '../Utils';

interface TokenStatsCardProps {
  transactions: Transaction[];
  token: PropertiesToken;
}

const TRANSACTION_SIZE = 10;

export const TokenStatsCard: FC<TokenStatsCardProps> = ({
  transactions,
  token,
}) => {
  const theme = useMantineTheme();
  const { t } = useTranslation('transactions', { keyPrefix: 'loader' });

  const mostRecentsTransaction = getFirstsTransactions(
    transactions,
    TRANSACTION_SIZE
  );
  const nextTransactions: Transaction[] = getNextTransaction(
    mostRecentsTransaction,
    transactions
  );
  const numberOfTransaction = countTransactionsLast7Days(transactions);
  const currentPrice = calculateAveragePrice(mostRecentsTransaction);
  const formerPrice = calculateAveragePrice(nextTransactions);
  const { priceColor, priceDiff, priceDiffPercent, Icon } = getPriceEvolution(
    formerPrice,
    currentPrice
  );

  console.log(
    'getPriceEvolution',
    token.shortName,
    currentPrice,
    formerPrice,
    priceDiff,
    priceDiffPercent,
    priceColor
  );

  return (
    <Card
      key={token.contractAddress}
      shadow={'sm'}
      padding={'lg'}
      radius={'md'}
      withBorder={true}
    >
      <Card.Section>
        <Group position={'apart'} align={'start'}>
          <Image
            src={'https://yam.cleansatmining.com/logo.svg'}
            width={40}
            alt={'csm logo'}
            sx={{ margin: '5px' }}
          ></Image>
          <Tooltip label={'Reload'}>
            <ActionIcon variant={'transparent'}>
              <IconReload size={'1.5rem'} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card.Section>

      <Text weight={500} color={'dimmed'} size={'md'}>
        {token.shortName}
      </Text>

      <Space h={0}></Space>
      <Text weight={500} size={25}>
        {currentPrice ? formatUsd(currentPrice) : '-'}
      </Text>
      <Space h={5}></Space>
      <Card.Section>
        <Group align={'end'} sx={{ marginLeft: '15px', marginBottom: '15px' }}>
          <Badge
            color={priceColor}
            variant={'filled'}
            leftSection={
              <Group spacing={0} align={'end'}>
                <Icon size={'0.6rem'} />
              </Group>
            }
          >
            {priceDiff !== undefined
              ? formatUsd(priceDiff) +
                ' (' +
                formatPercent(priceDiffPercent) +
                ')'
              : '-'}
          </Badge>
        </Group>
        <Text size={'xs'} sx={{ marginLeft: '15px', marginBottom: '5px' }}>
          {numberOfTransaction + ' transactions sur 7 jours'}
        </Text>
      </Card.Section>
    </Card>
  );
};

function getNextTransaction(
  mostRecentsTransaction: Transaction[],
  transactions: Transaction[]
) {
  let nextTransactions: Transaction[] = [];
  if (mostRecentsTransaction.length === TRANSACTION_SIZE) {
    const lastTimestamp =
      mostRecentsTransaction[TRANSACTION_SIZE - 1].timeStamp;
    nextTransactions = getNextTransactions(
      transactions,
      lastTimestamp,
      TRANSACTION_SIZE
    );
  }
  return nextTransactions;
}

export function getPriceEvolution(
  formerPrice: number | undefined,
  currentPrice: number | undefined
) {
  let priceDiff = undefined;
  let priceDiffPercent = undefined;
  let priceColor = 'gray';
  let Icon = IconEqual;
  if (formerPrice && currentPrice && formerPrice !== currentPrice) {
    priceDiff = currentPrice - formerPrice;
    priceDiffPercent = new BigNumber(priceDiff)
      .dividedBy(formerPrice)
      .toNumber();
    priceColor = priceDiff > 0 ? 'green' : 'red';
    Icon = priceDiff > 0 ? IconTriangle : IconTriangleInverted;
  } else if (formerPrice && currentPrice && formerPrice === currentPrice) {
    priceDiff = 0;
    priceDiffPercent = 0;
    priceColor = 'blue';
    Icon = IconEqual;
  }
  return { priceColor, priceDiff, priceDiffPercent, Icon };
}
