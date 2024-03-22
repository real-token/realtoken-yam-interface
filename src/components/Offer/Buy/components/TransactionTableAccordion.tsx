import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Accordion } from '@mantine/core';

import { OfferTransactionTable } from 'src/components/Transactions/usecases/OfferTransactionTable';

interface TransactionViewProps {
  offerId: string;
}

export const TransactionView: React.FC<TransactionViewProps> = ({
  offerId,
}) => {
  const { t } = useTranslation('swap');
  const [transactionCount, setTransactionCount] = useState<number | undefined>(
    undefined,
  );

  return (
    <Accordion
      chevronPosition={'left'}
      variant={'default'}
      defaultValue={undefined}
    >
      <Accordion.Item value={'Transactions'}>
        <Accordion.Control>
          {transactionCount
            ? transactionCount + ' transaction(s)'
            : 'Transactions'}
        </Accordion.Control>
        <Accordion.Panel>
          <OfferTransactionTable
            offerId={offerId}
            setTransactionCount={setTransactionCount}
          ></OfferTransactionTable>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default TransactionView;
