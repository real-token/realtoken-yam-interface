import { Flex, NumberInput, Input, SegmentedControl, Checkbox, Text } from '@mantine/core';
import { CreatedOffer, OFFER_TYPE } from '../../../../../types/offer';
import { UseFormReturnType } from "@mantine/form";
import { SellFormValues } from '../../CreateOfferModal';
import { useTranslation } from 'react-i18next';
import { useChoosenPrice } from '../../../../../hooks/useChoosenPrice';
import { useEffect, useState } from 'react';
import { PriceUnit, useCreateOfferContext } from '../CreateOfferContext';
import BigNumber from 'bignumber.js';
import { sellPriceInBuyerTokens } from '../../../../../utils/offers/sellPriceInBuyerTokens';
import classes from './PriceComputingPane.module.css';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface PriceComputingPaneProps{
    offer: CreatedOffer
    form: UseFormReturnType<SellFormValues>
}

export const PriceComputingPane = ({ offer, form }: PriceComputingPaneProps) => {
    const { values, setFieldValue } = form;

    const { t } = useTranslation('modals', { 
        keyPrefix: `createOffer.${offer.offerType == OFFER_TYPE.BUY ? 'buy' : 'sell'}`
    });
    const { t: commonT } = useTranslation('modals', { keyPrefix: 'createOffer.common' });

    const {
        offerTokenPrice, buyerTokenPrice, buyTokenSymbol, offerTokenSymbol,
        priceUnit, setPriceUnit, price,
        shieldError, maxPriceDifference, priceDifference, setChoosedPrice
    } = useCreateOfferContext();

    const [internalPrice, setInternalPrice] = useState<string|undefined>(price);

    const priceDecimalsSell =
      offer.buyerTokenDecimal ?? offer.offerTokenDecimal ?? 18;
    const numberInputDecimals =
      offer.offerType === OFFER_TYPE.SELL && priceUnit === 'token'
        ? priceDecimalsSell
        : (offer.offerTokenDecimal ?? 6);

    // Price in $ depending  on "1:1 ratio" and "unitPrice"
    const choosedPriceDollar = useChoosenPrice(
        internalPrice, 
        offer.offerType == OFFER_TYPE.BUY ? offerTokenPrice : buyerTokenPrice, 
        buyerTokenPrice,
        priceUnit, 
        values.useBuyTokenPrice
    );

    useEffect(() => {
        setChoosedPrice(choosedPriceDollar);
        if(offer.offerType == OFFER_TYPE.BUY){
            if (choosedPriceDollar === undefined || choosedPriceDollar === null) {
              return;
            }
            const p = choosedPriceDollar ? 1/choosedPriceDollar : 0;
            setFieldValue('price', new BigNumber(p).toFixed(offer.offerTokenDecimal ?? 6))
            return;
        }
        const priceBn = sellPriceInBuyerTokens(
          priceUnit,
          values.useBuyTokenPrice,
          internalPrice,
          choosedPriceDollar,
          buyerTokenPrice
        );
        if (!priceBn) {
          return;
        }
        setFieldValue('price', priceBn.toFixed(priceDecimalsSell));
        // eslint-disable-next-line react-hooks/exhaustive-deps -- setChoosedPrice / setFieldValue non stables depuis le provider
    }, [
        buyerTokenPrice,
        choosedPriceDollar,
        internalPrice,
        offer.offerType,
        priceDecimalsSell,
        priceUnit,
        values.useBuyTokenPrice,
    ]);

    // SELL: when switching $ <-> token, keep the same economic price in the input
    useEffect(() => {
        if (offer.offerType !== OFFER_TYPE.SELL) return;
        const cp = values.choosedPrice;
        if (
          cp === undefined ||
          cp === null ||
          buyerTokenPrice === undefined ||
          buyerTokenPrice <= 0
        ) {
          return;
        }
        if (priceUnit === 'token') {
          setInternalPrice((cp / buyerTokenPrice).toString());
        } else {
          setInternalPrice(cp.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only when unit toggles
    }, [priceUnit]);

    return(
        <>
            <Flex direction={'column'} gap={'md'}>
                <Flex direction={'column'} gap={'xs'}>
                    <Input.Label>{t('unit')}</Input.Label>
                    <SegmentedControl 
                        size={"xs"} 
                        radius={"md"} 
                        fullWidth={true}
                        data={[
                            {label: '$', value: 'dollar'},
                            {label: capitalizeFirstLetter(commonT('token')), value: 'token'}
                        ]}
                        value={priceUnit}
                        onChange={(value) => setPriceUnit(value as PriceUnit)}
                    />
                </Flex>
                <Flex direction={'column'} gap={'xs'}>
                  <NumberInput
                      label={t('price', { unit: priceUnit == 'token' ? buyTokenSymbol : '' })}
                      hideControls={true}
                      required={true}
                      decimalScale={numberInputDecimals}
                      value={internalPrice}
                      onChange={(value) => setInternalPrice(value as string)}
                      error={form.errors.price}
                  />
                  {priceUnit == 'dollar' ? (
                    <Checkbox
                        label={commonT('useBuyTokenPrice', { 
                            token: offer.offerType == OFFER_TYPE.BUY ? offerTokenSymbol : buyTokenSymbol
                        })}
                        checked={values.useBuyTokenPrice}
                        onChange={(event) => setFieldValue('useBuyTokenPrice', event.currentTarget.checked)}
                    />
                  ): undefined}
                </Flex>
            </Flex>
            {shieldError ? (
              <Flex className={classes.priceComputingPaneError}>
                <Text>{t('shieldError.line1', { price: choosedPriceDollar?.toFixed(2), difference: ((priceDifference ?? 0)*100).toFixed(2) })}</Text>
                <Text>{t('shieldError.line2', { difference: (maxPriceDifference*100).toFixed(2) })}</Text>
              </Flex>
            ): choosedPriceDollar ? (
              <Flex className={classes.priceComputingPane}>
                  {t('priceInfo', { price: choosedPriceDollar?.toFixed(4), difference: ((priceDifference ?? 0)*100).toFixed(2) }) }
              </Flex>
            ) : undefined}
        </>
    )
}