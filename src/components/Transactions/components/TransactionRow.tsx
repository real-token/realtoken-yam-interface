import React, { useState } from 'react';

import {
  Badge,
  Card,
  Col,
  Grid,
  Modal,
  RingProgress,
  Stack,
  Text,
  createStyles,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BigNumber } from 'bignumber.js';

import {
  OfferBadgeAbsolute,
  OfferText,
} from 'src/components/Offer/components/OfferTypeBadge';
import { TokenExchangeElement } from 'src/components/Offer/components/TokenExchangeElement';
import { TransactionData } from 'src/components/Transactions/Types';
import { formatSmallToken, formatToken, formatUsd } from 'src/utils/format';

import { formatTimestampDay, formatTimestampHour } from '../DataUtils';
import { FieldPaper } from './FieldPaper';

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
  const initialAmount =
    transaction.initialOfferAmount && transaction.initialOfferAmount > 0
      ? formatToken(transaction.initialOfferAmount ?? 0)
      : '?';
  const [opened, { close, open }] = useDisclosure(false);

  if (!transaction) return null;

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={'auto'}
        title={
          <OfferText
            offerType={transaction.offerType}
            id={transaction.offerId}
          ></OfferText>
        }
        centered={true}
      >
        <Stack spacing={3} align={'flex-start'}>
          <FieldPaper
            name={'Block'}
            value={transaction.blockNumber.toString()}
            copyButton={true}
            truncate={false}
          ></FieldPaper>
          <FieldPaper
            name={'Hash'}
            value={transaction.hash}
            copyButton={true}
            truncate={false}
          ></FieldPaper>
          <FieldPaper
            name={'Buyer'}
            value={transaction.from}
            copyButton={true}
            truncate={false}
          ></FieldPaper>

          <Badge color={transaction.txreceipt_status === '1' ? 'green' : 'red'}>
            {'Status: ' + transaction.txreceipt_status}
          </Badge>
        </Stack>
      </Modal>
      <div style={style} onClick={open}>
        <Card
          withBorder={true}
          radius={0}
          className={isLastRow ? classes.lastRow : classes.row}
          sx={{ height: `${ROW_HEIGHT}px` }}
        >
          <Grid columns={15}>
            <Col span={3}>
              <OfferBadgeAbsolute
                offerType={transaction.offerType}
                id={transaction.offerId}
              ></OfferBadgeAbsolute>

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
            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
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
            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
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
            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
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
            {/* <Col span={3}>
              <Stack spacing={3} align={'flex-start'}>
                <FieldPaper
                  name={'Block'}
                  value={transaction.blockNumber.toString()}
                  copyButton={true}
                ></FieldPaper>
                <FieldPaper
                  name={'Hash'}
                  value={transaction.hash}
                  copyButton={true}
                ></FieldPaper>
                <FieldPaper
                  name={'Buyer'}
                  value={transaction.from}
                  copyButton={true}
                ></FieldPaper>

                <Badge
                  color={transaction.txreceipt_status === '1' ? 'green' : 'red'}
                >
                  {'Status: ' + transaction.txreceipt_status}
                </Badge>
              </Stack>
            </Col> */}
            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
                {transaction.offerTimestamp && (
                  <div>
                    {
                      <Text fz={'lg'} ta={'left'} fw={500}>
                        {formatTimestampDay(transaction.offerTimestamp)}
                      </Text>
                    }
                    <Text fz={'xs'} color={'dimmed'} ta={'left'}>
                      {formatTimestampHour(transaction.offerTimestamp)}
                    </Text>
                  </div>
                )}
              </Stack>
            </Col>
            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
                <div>
                  <Text fz={'lg'} ta={'left'} fw={500}>
                    {formatUsd(transaction.price)}
                  </Text>
                </div>
              </Stack>
            </Col>
            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
                {true && (
                  <div>
                    <RingProgress
                      size={100}
                      label={
                        <Text size={'xs'} align={'center'}>
                          {formatToken(transaction.currentOfferAmount ?? 0) +
                            ' / ' +
                            initialAmount}
                        </Text>
                      }
                      sections={[
                        {
                          value:
                            ((transaction.currentOfferAmount ?? 0) /
                              (transaction.initialOfferAmount ?? 1)) *
                            100,
                          color: 'yellow',
                        },
                      ]}
                    />
                  </div>
                )}
              </Stack>
            </Col>
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default TransactionRow;
