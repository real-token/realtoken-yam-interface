import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Image,
  Overlay,
  Space,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconEqual,
  IconReload,
  IconTriangle,
  IconTriangleInverted,
} from '@tabler/icons';

import { BigNumber } from 'bignumber.js';

import { PropertiesToken } from 'src/types';
import { Transaction } from 'src/types/transaction/Transaction';
import { formatPercent, formatUsd } from 'src/utils/format';

import {
  calculateAveragePrice,
  countTransactionsOfLastDays,
  formatPeriod,
  getFirstsTransactions,
  getNextTransactions,
} from '../Utils';

interface TokenStatsCardProps {
  transactions: Transaction[];
  token: PropertiesToken;
  tokenFilterStates?: Map<string, boolean>;
  handleTokenFilter?: (contractAddress: string) => void;
  refreshTransactions?: () => void;
}

const TRANSACTION_STATS_SIZE = 10;
const TRANSACTION_STATS_DAYS = 7;

export const TokenStatsCard: FC<TokenStatsCardProps> = ({
  transactions,
  token,
  tokenFilterStates,
  handleTokenFilter,
  refreshTransactions,
}) => {
  const { t } = useTranslation('transactions', { keyPrefix: 'stats' });
  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const [isHovered, setIsHovered] = useState<boolean>(
    (tokenFilterStates &&
    tokenFilterStates.has(token.contractAddress.toLowerCase())
      ? tokenFilterStates.get(token.contractAddress.toLowerCase())
      : true) ?? true,
  );

  const mostRecentsTransaction = getFirstsTransactions(
    transactions,
    TRANSACTION_STATS_SIZE,
  );
  const nextTransactions: Transaction[] = getNextTransaction(
    mostRecentsTransaction,
    transactions,
  );
  const numberOfTransaction = countTransactionsOfLastDays(
    transactions,
    TRANSACTION_STATS_DAYS,
  );
  const currentPrice = calculateAveragePrice(mostRecentsTransaction);
  const formerPrice = calculateAveragePrice(nextTransactions);
  const { priceColor, priceDiff, priceDiffPercent, Icon } = getPriceEvolution(
    formerPrice,
    currentPrice,
  );

  // const tokenEnabled =
  //   tokenFilterStates &&
  //   tokenFilterStates.has(token.contractAddress.toLowerCase())
  //     ? tokenFilterStates.get(token.contractAddress.toLowerCase())
  //     : true;

  useEffect(() => {
    setIsHovered(
      (tokenFilterStates &&
      tokenFilterStates.has(token.contractAddress.toLowerCase())
        ? tokenFilterStates.get(token.contractAddress.toLowerCase())
        : true) ?? true,
    );
  }, [tokenFilterStates, token.contractAddress]);

  //console.log('Token filter display', token.contractAddress, tokenEnabled);

  return (
    <Card
      key={token.contractAddress}
      shadow={'sm'}
      padding={isMobile ? 0 : isSmall ? 'xs' : 'lg'}
      radius={'md'}
      withBorder={true}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        if (handleTokenFilter && tokenFilterStates) {
          handleTokenFilter(token.contractAddress.toLowerCase());
        }
      }}
    >
      <Card.Section>
        <Group position={'apart'} align={'start'} spacing={0}>
          <Image
            src={'https://yam.cleansatmining.net/logo.svg'}
            width={isMobile ? 20 : 40}
            alt={'csm logo'}
            sx={{ margin: '5px' }}
          ></Image>
          <Group spacing={0}>
            <Text
              weight={500}
              color={'dimmed'}
              size={isMobile ? 10 : 'sm'}
              mr={isMobile ? 5 : 10}
              mt={isMobile ? 5 : 10}
            >
              {token.shortName}
            </Text>
            {refreshTransactions && (
              <Tooltip label={t('update')}>
                <ActionIcon
                  variant={'transparent'}
                  onClick={() => refreshTransactions()}
                >
                  <IconReload size={isMobile ? '1.5rem' : '1.5rem'} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Group>
      </Card.Section>
      {!isHovered && (
        <Overlay
          color={
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[3]
          }
          opacity={0.9}
        />
      )}

      <Text weight={500} size={isMobile ? 15 : 25}>
        {currentPrice ? formatUsd(currentPrice) : '-'}
      </Text>

      <Space h={5}></Space>
      <Card.Section>
        <Group
          align={'end'}
          sx={{
            marginLeft: isMobile ? '5px' : '15px',
            marginBottom: isMobile ? '5px' : '15px',
            marginRight: isMobile ? '5px' : '15px',
          }}
        >
          <Badge
            color={priceColor}
            variant={'filled'}
            leftSection={
              <Group spacing={0} align={'end'}>
                <Icon size={'0.6rem'} />
              </Group>
            }
            fz={isMobile ? 10 : 'sm'}
            sx={{ padding: isMobile ? 2 : undefined }}
            styles={() => ({
              leftSection: {
                marginRight: isMobile ? '2px' : undefined,
                marginBottom: '-2px',
              },
            })}
          >
            <div style={{ marginLeft: isMobile ? '0px' : undefined }}>
              {priceDiff !== undefined
                ? formatUsd(priceDiff) +
                  ' (' +
                  formatPercent(priceDiffPercent) +
                  ')'
                : '-'}
            </div>
          </Badge>
        </Group>
        <Text
          size={isMobile ? 10 : 'xs'}
          sx={{
            marginLeft: isMobile ? '5px' : '15px',
            marginBottom: '5px',
            marginRight: isMobile ? '5px' : '15px',
          }}
        >
          {numberOfTransaction +
            t('numberOfTransaction') +
            formatPeriod(TRANSACTION_STATS_DAYS, t)}
        </Text>
      </Card.Section>
    </Card>
  );
};

function getNextTransaction(
  mostRecentsTransaction: Transaction[],
  transactions: Transaction[],
) {
  let nextTransactions: Transaction[] = [];
  if (mostRecentsTransaction.length === TRANSACTION_STATS_SIZE) {
    const lastTimestamp =
      mostRecentsTransaction[TRANSACTION_STATS_SIZE - 1].timeStamp;
    nextTransactions = getNextTransactions(
      transactions,
      lastTimestamp,
      TRANSACTION_STATS_SIZE,
    );
  }
  return nextTransactions;
}

export function getPriceEvolution(
  formerPrice: number | undefined,
  currentPrice: number | undefined,
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
    priceColor = priceDiff > 0 ? 'teal' : 'red';
    Icon = priceDiff > 0 ? IconTriangle : IconTriangleInverted;
  } else if (formerPrice && currentPrice && formerPrice === currentPrice) {
    priceDiff = 0;
    priceDiffPercent = 0;
    priceColor = 'blue';
    Icon = IconEqual;
  }
  return { priceColor, priceDiff, priceDiffPercent, Icon };
}
