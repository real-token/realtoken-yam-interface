import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@mantine/core';

import { TransactionData } from 'src/components/Transactions/Types';

interface DownloadButtonProps {
  transactions: TransactionData[];
  label?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  transactions,
  label,
}) => {
  const { t } = useTranslation('transactions', { keyPrefix: 'loader' });

  const handleDownload = () => {
    downloadTransactionsAsCsv(transactions);
  };

  return (
    <Button onClick={handleDownload} variant={'outline'}>
      {label ? label : t('download')}
    </Button>
  );
};

export default DownloadButton;

export const downloadTransactionsAsCsv = (transactions: TransactionData[]) => {
  const csvContent = [
    'Block Number,Time Stamp,Hash,From,Is Error,Tx Receipt Status,Offer ID,Price (Gwei),Amount (Gwei),Price,Amount,Offer Type,Token For Sale,Token Buy With,Offer Timestamp,Initial Offer Amount,Initial Offer Amount (Gwei),Current Offer Amount',
  ];

  transactions.forEach((transaction) => {
    const row = [
      transaction.blockNumber,
      transaction.timeStamp,
      transaction.hash,
      transaction.from,
      transaction.isError,
      transaction.txreceipt_status,
      transaction.offerId,
      transaction.priceGwei,
      transaction.amountGwei,
      transaction.price,
      transaction.amount,
      transaction.offerType || '',
      transaction.tokenForSale?.name || '',
      transaction.tokenBuyWith?.name || '',
      transaction.offerTimestamp || '',
      transaction.initialOfferAmount || '',
      transaction.initialOfferAmountGwei || '',
      transaction.currentOfferAmount || '',
    ];

    const rowString = row
      .map((value) => (value === undefined ? '' : value))
      .join(',');

    csvContent.push(rowString);
  });

  const csvString = csvContent.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', 'transactions.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
