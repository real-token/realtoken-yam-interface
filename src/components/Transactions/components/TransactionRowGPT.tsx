import React from 'react';

import {
  Badge,
  Card,
  Col,
  Grid,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';

import { BigNumber } from 'bignumber.js';

import { OfferBadgeAbsolute } from 'src/components/Offer/components/OfferTypeBadge';
import { TokenExchangeElement } from 'src/components/Offer/components/TokenExchangeElement';
import { TransactionData } from 'src/components/Transactions/Types';
import { formatSmallToken, formatToken, formatUsd } from 'src/utils/format';

import {
  formatTimestamp,
  formatTimestampDay,
  formatTimestampHour,
} from '../Utils';

const ROW_HEIGHT = 160;

const useStyles = createStyles((theme) => ({
  row: {
    marginTop: '-1px',
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  lastRow: {
    marginTop: '-1px',
    borderRadius: '0 0 10px 10px',
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

interface TransactionRowProps {
  transaction: TransactionData;
  isLastRow: boolean;
  style: React.CSSProperties;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  isLastRow,
  style,
}) => {
  const { classes } = useStyles();

  return (
    <div style={style}>
      <Card
        withBorder={true}
        radius={0}
        className={isLastRow ? classes.lastRow : classes.row}
        sx={{ height: `${ROW_HEIGHT}px` }}
      >
        <Grid>
          <Col span={3}>
            {transaction.offerType && (
              <OfferBadgeAbsolute
                offerType={transaction.offerType}
                id={transaction.offerId}
              ></OfferBadgeAbsolute>
            )}
            {transaction.tokenForSale && transaction.tokenBuyWith && (
              <TokenExchangeElement
                token1={
                  transaction.tokenForSale?.symbol ??
                  transaction.tokenForSale.name
                }
                token2={
                  transaction.tokenBuyWith?.symbol ??
                  transaction.tokenBuyWith.name
                }
                LogoToken1={transaction.tokenForSale.Logo}
                LogoToken2={transaction.tokenBuyWith.Logo}
              ></TokenExchangeElement>
            )}
          </Col>
          <Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'} spacing={0}>
              <div>
                <Text fz={'lg'} ta={'left'} fw={500}>
                  {formatTimestampDay(transaction.timeStamp)}
                </Text>
                <Text fz={'xs'} color={'dimmed'} ta={'left'}>
                  {formatTimestampHour(transaction.timeStamp)}
                </Text>
              </div>
            </Stack>
          </Col>
          <Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'} spacing={0}>
              <div>
                <Text fz={'lg'} ta={'left'} fw={500}>
                  {formatSmallToken(transaction.amount, '', 6)}
                </Text>
                <Text fz={'xs'} color={'dimmed'} ta={'left'}>
                  {transaction.tokenForSale?.symbol ??
                    transaction.tokenForSale?.name}
                </Text>
              </div>
            </Stack>
          </Col>
          <Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'} spacing={0}>
              <div>
                <Text fz={'lg'} ta={'left'} fw={500}>
                  {formatUsd(
                    new BigNumber(transaction.price)
                      .times(transaction.amount)
                      .toNumber()
                  )}
                </Text>
              </div>
            </Stack>
          </Col>
          <Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'} spacing={0}>
              {transaction.offerTimestamp && (
                <div>
                  {
                    <Text fz={'lg'} ta={'left'} fw={500}>
                      {formatTimestampDay(transaction.offerTimestamp)}
                    </Text>
                  }
                  <Text fz={'xs'} color={'dimmed'} ta={'left'}>
                    {transaction.offerTimestamp}
                  </Text>
                </div>
              )}
            </Stack>
          </Col>
          <Col span={1}>
            <Stack h={'100%'} align={'stretch'} justify={'center'} spacing={0}>
              {transaction.initialOfferAmount && (
                <div>
                  {
                    <Text fz={'lg'} ta={'left'} fw={500}>
                      {transaction.currentOfferAmount}
                    </Text>
                  }
                  <Text fz={'xs'} color={'dimmed'} ta={'left'}>
                    {transaction.initialOfferAmount}
                  </Text>
                </div>
              )}
            </Stack>
          </Col>
          <Col span={4}>
            <Stack spacing={3} align={'flex-start'}>
              <Badge color={'blue'}>
                {'Block : ' + transaction.blockNumber}
              </Badge>
              <Badge color={'gray'}>{'Hash: ' + transaction.hash}</Badge>
              <Badge color={'orange'}>{'Buyer: ' + transaction.from}</Badge>
              <Badge
                color={transaction.txreceipt_status === '1' ? 'green' : 'red'}
              >
                {'Status: ' + transaction.txreceipt_status}
              </Badge>
            </Stack>
          </Col>
        </Grid>
      </Card>
    </div>
  );
};

export default TransactionRow;
