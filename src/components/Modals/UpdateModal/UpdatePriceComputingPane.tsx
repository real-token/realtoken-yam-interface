import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  Flex,
  Input,
  NumberInput,
  SegmentedControl,
  Text,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import BigNumber from 'bignumber.js';

import { useChoosenPrice } from '../../../hooks/useChoosenPrice';
import { OFFER_TYPE } from '../../../types/offer';
import classes from '../CreateOfferModal/CreateOfferModal/PriceComputingPane/PriceComputingPane.module.css';
import { PriceUnit, useUpdateOfferContext } from './UpdateOfferContext';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

type UpdateFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
  choosedPrice?: number;
  useBuyTokenPrice?: boolean;
  priceUnit?: PriceUnit;
};

interface UpdatePriceComputingPaneProps {
  form: UseFormReturnType<UpdateFormValues>;
}

export const UpdatePriceComputingPane = ({
  form,
}: UpdatePriceComputingPaneProps) => {
  const { values, setFieldValue } = form;

  const { t } = useTranslation('modals', { keyPrefix: 'update' });
  const { t: commonT } = useTranslation('modals', {
    keyPrefix: 'createOffer.common',
  });

  const {
    offerTokenPrice,
    buyerTokenPrice,
    buyTokenSymbol,
    offerTokenSymbol,
    priceUnit,
    setPriceUnit,
    setChoosedPrice,
    shieldError,
    maxPriceDifference,
    priceDifference,
    offer,
    choosedPrice,
  } = useUpdateOfferContext();

  // Initialize internal price from choosedPrice or form price - only on mount
  const [internalPrice, setInternalPrice] = useState<string | undefined>(() => {
    if (choosedPrice !== undefined) {
      // If we have choosedPrice, convert it based on priceUnit
      if (priceUnit === 'dollar') {
        return choosedPrice.toString();
      } else if (buyerTokenPrice) {
        return (choosedPrice / buyerTokenPrice).toString();
      }
    }
    return values.price?.toString();
  });

  // Price in $ depending on "1:1 ratio" and "unitPrice"
  const choosedPriceDollar = useChoosenPrice(
    internalPrice,
    offer.type == OFFER_TYPE.BUY ? offerTokenPrice : buyerTokenPrice,
    buyerTokenPrice,
    priceUnit,
    values.useBuyTokenPrice || false
  );

  useEffect(() => {
    if (choosedPriceDollar === undefined || choosedPriceDollar === null) return;

    setChoosedPrice(choosedPriceDollar);

    let newPriceString: string;
    if (offer.type == OFFER_TYPE.BUY) {
      const p = choosedPriceDollar ? 1 / choosedPriceDollar : 0;
      newPriceString = new BigNumber(p).toFixed(values.offerTokenDecimals ?? 6);
    } else {
      newPriceString = new BigNumber(choosedPriceDollar ?? 0).toPrecision(
        values.offerTokenDecimals ?? 6
      );
    }

    const newPrice = parseFloat(newPriceString);
    // Only update if the value has actually changed to avoid infinite loops
    if (Math.abs(values.price - newPrice) > 0.000000001) {
      setFieldValue('price', newPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choosedPriceDollar]);

  // Initialize internal price if empty
  useEffect(() => {
    if (!internalPrice && values.price !== undefined) {
      setInternalPrice(values.price.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.price]);

  // Handle priceUnit change: convert internalPrice between dollar and token
  useEffect(() => {
    if (!choosedPrice || !buyerTokenPrice || !internalPrice) return;

    // When switching between dollar and token, convert the current value
    if (priceUnit === 'token') {
      // Convert from dollar to token
      const priceInToken = choosedPrice / buyerTokenPrice;
      setInternalPrice(priceInToken.toString());
    } else {
      // priceUnit === 'dollar'
      // Keep the dollar price
      setInternalPrice(choosedPrice.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceUnit]); // Only trigger when priceUnit changes

  return (
    <>
      <Flex direction={'column'} gap={'md'}>
        <Flex direction={'column'} gap={'xs'}>
          <Input.Label>{t('unit')}</Input.Label>
          <SegmentedControl
            size='xs'
            radius='md'
            fullWidth={true}
            data={[
              { label: '$', value: 'dollar' },
              {
                label: capitalizeFirstLetter(commonT('token')),
                value: 'token',
              },
            ]}
            value={priceUnit}
            onChange={(value) => setPriceUnit(value as PriceUnit)}
          />
        </Flex>
        <Flex direction={'column'} gap={'xs'}>
          <NumberInput
            label={
              priceUnit == 'token'
                ? `${t('price')} (${buyTokenSymbol})`
                : t('price')
            }
            hideControls={true}
            required={true}
            decimalScale={values.offerTokenDecimals ?? 18}
            value={internalPrice}
            onChange={(value) => setInternalPrice(value as string)}
            error={form.errors?.price}
          />
          {priceUnit == 'dollar' ? (
            <Checkbox
              label={commonT('useBuyTokenPrice', {
                token:
                  offer.type == OFFER_TYPE.BUY
                    ? offerTokenSymbol
                    : buyTokenSymbol,
              })}
              checked={values.useBuyTokenPrice || false}
              onChange={(event) =>
                setFieldValue('useBuyTokenPrice', event.currentTarget.checked)
              }
            />
          ) : undefined}
        </Flex>
      </Flex>
      {shieldError ? (
        <Flex className={classes.priceComputingPaneError}>
          <Text>
            {t('shieldError.line1', {
              price: choosedPriceDollar?.toFixed(2),
              difference: ((priceDifference ?? 0) * 100).toFixed(2),
            })}
          </Text>
          <Text>
            {t('shieldError.line2', {
              difference: (maxPriceDifference * 100).toFixed(2),
            })}
          </Text>
        </Flex>
      ) : choosedPriceDollar ? (
        <Flex className={classes.priceComputingPane}>
          {t('priceInfo', {
            price: choosedPriceDollar?.toFixed(4),
            difference: ((priceDifference ?? 0) * 100).toFixed(2),
          })}
        </Flex>
      ) : undefined}
    </>
  );
};
