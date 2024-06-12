import React from 'react';

import { ActionIcon, Flex, Group } from '@mantine/core';
import { SetFieldValue } from '@mantine/form/lib/types';
import { IconArrowDown } from '@tabler/icons-react';

import BigNumber from 'bignumber.js';

import { TokenInput } from 'src/components/Offer/Buy/components/TokenInput';
import { Offer } from 'src/types/offer';

/* eslint-disable */
interface TokenInputGroupProps {
  offer: Offer;
  price: number;
  maxTokenBuy: number;
  buyerTokenBalance: string;
  sellerTokenBalance: string;
  setFieldValue: SetFieldValue<any>;
  getInputProps: any;
}
/* eslint-enable */

const TokenExchange: React.FC<TokenInputGroupProps> = ({
  offer,
  price,
  maxTokenBuy,
  buyerTokenBalance,
  sellerTokenBalance,
  setFieldValue,
  getInputProps,
}) => {
  return (
    <Flex direction={'column'} gap={8}>
      <TokenInput
        offer={offer}
        price={price}
        maxCurrency={new BigNumber(maxTokenBuy ?? 0)
          .times(offer.price)
          .toNumber()}
        maxToken={maxTokenBuy ?? 0}
        mode={'buying'}
        buyerTokenBalance={buyerTokenBalance}
        required={true}
        min={0}
        max={
          maxTokenBuy
            ? new BigNumber(maxTokenBuy).times(offer.price).toNumber()
            : undefined
        }
        sx={{ flexGrow: 1 }}
        setFieldValue={setFieldValue}
        {...getInputProps('amountCurrency')}
      />
      <Group
        position={'center'}
        sx={{ marginTop: '20px', marginBottom: '0px' }}
      >
        <ActionIcon radius={'xl'}>
          <IconArrowDown size={'1.125rem'} />
        </ActionIcon>
      </Group>
      <TokenInput
        offer={offer}
        mode={'selling'}
        price={price}
        maxCurrency={new BigNumber(maxTokenBuy ?? 0)
          .times(offer.price)
          .toNumber()}
        maxToken={maxTokenBuy ?? 0}
        sellerTokenBalance={sellerTokenBalance}
        required={true}
        min={0}
        max={maxTokenBuy}
        sx={{ flexGrow: 1 }}
        setFieldValue={setFieldValue}
        {...getInputProps('amount')}
      />
    </Flex>
  );
};

export default TokenExchange;
