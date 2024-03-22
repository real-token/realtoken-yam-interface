import React from 'react';

import { Stack, Text, Group, Space, Button } from '@mantine/core';

import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { OfferBadge } from 'src/components/Offer/components/OfferTypeBadge';
import { Transaction } from 'src/types/transaction/Transaction';
import { formatSmallToken, formatUsd } from 'src/utils/format';
import {
  UrlGnosisscanBlock,
  UrlGnosisscanAddress,
  UrlGnosisscanTransaction,
} from 'src/constants/urlExternal';
import { formatTimestamp } from '../utils/DataUtils';
import { FieldPaper } from './FieldPaper';

import {
  csmTokenAmount,
  csmTokenPrice,
  usdAmount,
  csmTokenSymbol,
  currencyTokenSymbol,
} from 'src/utils/transaction';
import { useTranslation } from 'react-i18next';

interface TransactionRowProps {
  transaction: Transaction;
  hideButton?: boolean;
}

const TransactionDetail: React.FC<TransactionRowProps> = ({
  transaction,
  hideButton,
}) => {
  const { t } = useTranslation('transactions', { keyPrefix: 'modal' });

  const theme = useMantineTheme();
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  if (!transaction) return null;

  return (
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
      {!hideButton && (
        <Group position={'center'} w={'100%'}>
          <a
            href={`/offers/${transaction.offerId}`}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            <Button>{t('seeOffer')}</Button>
          </a>
        </Group>
      )}
    </Stack>
  );
};

export default TransactionDetail;
