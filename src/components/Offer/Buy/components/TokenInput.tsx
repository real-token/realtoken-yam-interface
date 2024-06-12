import React, { forwardRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Flex,
  Group,
  NumberInput as MantineInput,
  NumberInputProps as MantineNumberInputProps,
  NumberInputHandlers,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { SetFieldValue } from '@mantine/form/lib/types';
import { IconCoins, IconWallet } from '@tabler/icons-react';

import BigNumber from 'bignumber.js';

import { CsmSvg } from 'src/assets/currency/Csm';
import { useAllowedTokens } from 'src/hooks/useAllowedTokens';
import { FRC } from 'src/types';
import { AllowedToken } from 'src/types/allowedTokens';
import { Offer } from 'src/types/offer';

export const truncDigits = (inputNumber: number, digits: number): number => {
  const fact = 10 ** digits;
  return Math.floor(inputNumber * fact) / fact;
};

/* eslint-disable */
type TokenInputProps = {
  offer: Offer;
  mode: 'buying' | 'selling';
  price: number;
  maxToken: number;
  maxCurrency: number;
  buyerTokenBalance?: string;
  sellerTokenBalance?: string;
  setFieldValue?: SetFieldValue<any>;
} & MantineNumberInputProps;
/* eslint-enable */

export const TokenInput: FRC<TokenInputProps, HTMLInputElement> = forwardRef(
  (
    {
      offer,
      mode,
      price,
      maxToken,
      maxCurrency,
      buyerTokenBalance,
      sellerTokenBalance,
      disabled,
      setFieldValue,
      ...props
    },
    ref,
  ) => {
    const { t: tswap } = useTranslation('swap');
    const handlers = useRef<NumberInputHandlers>();
    const theme = useMantineTheme();
    const [isInputClicked, setInputClicked] = useState(false);
    const { getTokenOffer, getTokenToBuyWith } = useAllowedTokens();
    const token: AllowedToken =
      mode === 'selling'
        ? getTokenOffer(offer) ?? {
            contractAddress: offer.offerTokenAddress,
            name: offer.offerTokenName,
            symbol: offer.offerTokenSymbol,
            logo: CsmSvg,
          }
        : getTokenToBuyWith(offer) ?? {
            contractAddress: offer.buyerTokenAddress,
            name: offer.buyerTokenName,
            symbol: offer.buyerTokenSymbol,
            logo: CsmSvg,
          };

    const tokenAmount =
      mode === 'buying'
        ? buyerTokenBalance ?? '0'
        : BigNumber.minimum(offer.amount, sellerTokenBalance ?? '0').toString();

    const action = mode === 'buying' ? tswap('pay') : tswap('receive');

    const setMax = () => {
      //console.log('handleInputChange', props.max);
      if (!props.max) return;
      if (setFieldValue && mode === 'selling') {
        if (price > 0) {
          setFieldValue('amountCurrency', maxCurrency);
        }
        setFieldValue('amount', maxToken);
      }
      if (setFieldValue && mode === 'buying') {
        if (price > 0) {
          setFieldValue('amount', maxToken);
        }
        setFieldValue('amountCurrency', maxCurrency);
      }
    };

    const handleInputChange = (amount: number) => {
      //console.log('handleInputChange', amount, setFieldValue);
      if (setFieldValue && mode === 'selling' && price > 0) {
        if (amount > 0) {
          const amountCurrency = new BigNumber(amount)
            .multipliedBy(price)
            .toNumber();
          console.log('amount currency', amountCurrency);
          setFieldValue('amountCurrency', amountCurrency);
        } else {
          setFieldValue('amountCurrency', 0);
        }
        console.log('setFieldValue');
        setFieldValue('amount', amount);
      }
      if (setFieldValue && mode === 'buying' && price > 0) {
        if (amount > 0) {
          const tokenAmount = new BigNumber(amount).dividedBy(price).toNumber();
          console.log('amount token', tokenAmount);
          setFieldValue('amount', tokenAmount);
        } else {
          setFieldValue('amount', 0);
        }
        setFieldValue('amountCurrency', amount);
      }
    };

    return (
      <>
        <Group position={'apart'}>
          <Text color={'dimmed'} fz={'xs'}>
            {action}
          </Text>
          <Group spacing={2}>
            {mode === 'buying' ? (
              <IconWallet size={17} color={theme.colors.gray[6]}></IconWallet>
            ) : (
              <IconCoins size={17} color={theme.colors.gray[6]}></IconCoins>
            )}
            <Text color={'dimmed'} fz={'xs'}>
              {tokenAmount + ' ' + token.symbol}
            </Text>
          </Group>
        </Group>
        <Paper
          withBorder={true}
          w={'100%'}
          style={{
            padding: '5px 10px 5px 10px',
            borderColor: isInputClicked ? theme.colors.brand[6] : undefined,
          }}
        >
          <Flex direction={'row'} gap={16} w={'100%'} align={'center'}>
            <MantineInput
              hideControls={true}
              handlersRef={handlers}
              precision={6}
              disabled={disabled}
              {...props}
              ref={ref}
              placeholder={'0'}
              w={'100%'}
              variant={'unstyled'}
              onFocus={() => setInputClicked(true)}
              onBlur={() => setInputClicked(false)}
              style={{ fontWeight: 'bold' }}
              onChange={handleInputChange}
            ></MantineInput>
            <Button
              size={'xs'}
              compact={true}
              color={'gray'}
              onClick={() => setMax()}
            >
              {'MAX'}
            </Button>
            <Paper withBorder={true} style={{ backgroundColor: 'transparent' }}>
              <Flex
                direction={'row'}
                gap={5}
                align={'center'}
                sx={{ padding: '5px 5px 5px 5px' }}
              >
                {token.logo
                  ? React.cloneElement(<token.logo />, { width: '24' })
                  : undefined}
                <Text style={{ whiteSpace: 'nowrap' }}>{token.symbol}</Text>
              </Flex>
            </Paper>
          </Flex>
        </Paper>
      </>
    );
  },
);
TokenInput.displayName = 'NumberInput';
