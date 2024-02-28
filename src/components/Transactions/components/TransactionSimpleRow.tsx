import React from 'react';

import {
  Card,
  Col,
  Grid,
  Modal,
  Stack,
  Text,
  createStyles,
  Group,
  Image,
  Tooltip,
  Space,
  Title,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BigNumber } from 'bignumber.js';

import { OfferBadge } from 'src/components/Offer/components/OfferTypeBadge';
import { Transaction } from 'src/types/transaction/Transaction';
import { formatSmallToken, formatToken, formatUsd } from 'src/utils/format';
import {
  UrlGnosisscanBlock,
  UrlGnosisscanAddress,
  UrlGnosisscanTransaction,
} from 'src/constants/urlExternal';
import {
  formatTimestamp,
  formatTimestampDay,
  formatTimestampHour,
} from '../DataUtils';
import { FieldPaper } from './FieldPaper';
import { OFFER_TYPE } from 'src/types/offer';
import { TriangleSVG, TriangleInvertedSVG } from 'src/assets/icons';
import {
  csmTokenAmount,
  csmTokenPrice,
  usdAmount,
  csmTokenSymbol,
  currencyTokenSymbol,
} from '../Utils';
import { useTranslation } from 'react-i18next';

const ROW_HEIGHT = 60;

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
  transaction: Transaction;
  isLastRow: boolean;
  style: React.CSSProperties;
  height?: number;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  isLastRow,
  style,
  height = ROW_HEIGHT,
}) => {
  const { classes } = useStyles();
  const { t } = useTranslation('transactions', { keyPrefix: 'modal' });

  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const [opened, { close, open }] = useDisclosure(false);

  if (!transaction) return null;

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={'auto'}
        title={<Title order={2}>{t('title')}</Title>}
        centered={true}
      >
        <Stack spacing={3} align={'flex-start'}>
          <Group pl={10} pr={10} position={'apart'} w={'100%'}>
            <OfferBadge
              offerType={transaction.offerType}
              id={transaction.offerId}
            ></OfferBadge>
            <Text fz={'sm'} fw={500}>
              {formatTimestamp(transaction.timeStamp)}
            </Text>
          </Group>

          <Space h={'xs'}></Space>
          <FieldPaper
            name={t('block')}
            value={transaction.blockNumber.toString()}
            link={UrlGnosisscanBlock.url(transaction.blockNumber.toString())}
            copyButton={true}
            truncate={false}
            shadow={false}
          ></FieldPaper>
          <FieldPaper
            name={t('txHash')}
            value={transaction.hash}
            link={UrlGnosisscanTransaction.url(transaction.hash)}
            copyButton={true}
            truncate={isSmall || isMobile ? true : false}
            shadow={false}
          ></FieldPaper>
          <FieldPaper
            name={'Buyer'}
            value={transaction.from}
            link={UrlGnosisscanAddress.url(transaction.from)}
            copyButton={true}
            truncate={isSmall || isMobile ? true : false}
            shadow={false}
          ></FieldPaper>
          <Space h={'xs'}></Space>
          <FieldPaper
            name={t('price')}
            value={formatUsd(csmTokenPrice(transaction))}
            copyButton={false}
            truncate={false}
            shadow={false}
          ></FieldPaper>
          <FieldPaper
            name={t('amount')}
            value={formatSmallToken(
              csmTokenAmount(transaction),
              csmTokenSymbol(transaction),
              6,
            )}
            copyButton={false}
            truncate={false}
            shadow={false}
          ></FieldPaper>
          <FieldPaper
            name={t('usdAmount')}
            value={`${formatUsd(usdAmount(transaction))} (${formatSmallToken(usdAmount(transaction), currencyTokenSymbol(transaction), 2)})`}
            copyButton={false}
            truncate={false}
            shadow={false}
          ></FieldPaper>
          <Space h={'xs'}></Space>
          <Group position={'center'} w={'100%'}>
            <a
              href={`/offers/${transaction.offerId}`}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <Button>{t('seeOffer')}</Button>
            </a>
          </Group>
        </Stack>
      </Modal>
      <div style={style} onClick={open}>
        <Card
          withBorder={true}
          pt={0}
          pb={0}
          radius={0}
          className={isLastRow ? classes.lastRow : classes.row}
          sx={{ height: `${height + 1}px` }}
        >
          <Grid columns={isMobile ? 9 : 13} mt={0}>
            <Col span={3}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
                p={0}
              >
                <Group spacing={isMobile ? 5 : undefined}>
                  <Tooltip
                    position={'right'}
                    label={
                      transaction.offerType === OFFER_TYPE.BUY
                        ? 'Achat'
                        : 'Vente'
                    }
                  >
                    <Image
                      src={
                        transaction.offerType === OFFER_TYPE.BUY
                          ? TriangleSVG.src
                          : TriangleInvertedSVG.src
                      }
                      alt={'Up'}
                      width={isMobile ? 8 : 12}
                    />
                  </Tooltip>
                  {transaction.tokenForSale && transaction.tokenBuyWith && (
                    <Text fz={isSmall || isMobile ? 'xs' : 'md'} fw={500}>
                      {csmTokenSymbol(transaction)}
                    </Text>
                  )}
                </Group>
              </Stack>
            </Col>
            {!isMobile && (
              <Col span={2}>
                <Stack
                  h={'100%'}
                  align={'stretch'}
                  justify={'center'}
                  spacing={0}
                >
                  <Text
                    fz={isSmall || isMobile ? 'xs' : 'md'}
                    ta={'left'}
                    fw={500}
                  >
                    {`#${transaction.offerId}`}
                  </Text>
                </Stack>
              </Col>
            )}
            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
                <div>
                  <Text
                    fz={isSmall || isMobile ? 'xs' : 'md'}
                    ta={'left'}
                    fw={500}
                  >
                    {formatUsd(
                      transaction.offerType === OFFER_TYPE.BUY
                        ? new BigNumber(1)
                            .dividedBy(transaction.price)
                            .toNumber()
                        : transaction.price,
                    )}
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
                  <Text
                    fz={isSmall || isMobile ? 'xs' : 'md'}
                    ta={'left'}
                    fw={500}
                  >
                    {formatSmallToken(csmTokenAmount(transaction), '', 6)}
                  </Text>
                  {/* <Text fz={'xs'} color={'dimmed'} ta={'left'}>
                    {transaction.offerType === OFFER_TYPE.BUY
                      ? transaction.tokenBuyWith?.symbol ??
                        transaction.tokenBuyWith?.name
                      : transaction.tokenForSale?.symbol ??
                        transaction.tokenForSale?.name}
                  </Text> */}
                </div>
              </Stack>
            </Col>
            {!isMobile && (
              <Col span={2}>
                <Stack
                  h={'100%'}
                  align={'stretch'}
                  justify={'center'}
                  spacing={0}
                >
                  <div>
                    <Tooltip
                      position={'left'}
                      label={formatToken(
                        usdAmount(transaction),
                        currencyTokenSymbol(transaction),
                      )}
                    >
                      <Text
                        fz={isSmall || isMobile ? 'xs' : 'md'}
                        ta={'left'}
                        fw={500}
                      >
                        {formatUsd(usdAmount(transaction))}
                      </Text>
                    </Tooltip>
                  </div>
                </Stack>
              </Col>
            )}

            <Col span={2}>
              <Stack
                h={'100%'}
                align={'stretch'}
                justify={'center'}
                spacing={0}
              >
                <div>
                  <Text
                    fz={isSmall || isMobile ? 'xs' : 'md'}
                    ta={'left'}
                    fw={500}
                  >
                    {formatTimestampDay(transaction.timeStamp)}
                  </Text>
                  <Text fz={'xs'} color={'dimmed'} ta={'left'}>
                    {formatTimestampHour(transaction.timeStamp)}
                  </Text>
                </div>
              </Stack>
            </Col>
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default TransactionRow;
