import { Flex, NumberInput, Text, Input, SegmentedControl } from '@mantine/core';
import { CreatedOffer, OFFER_TYPE } from '../../../../../types/offer';
import { UseFormReturnType } from "@mantine/form";
import { SellFormValues } from '../../CreateOfferModal';
import { useTranslation } from 'react-i18next';
import { useShield } from '../../../../../hooks/useShield';
import { useChoosenPrice } from '../../../../../hooks/useChoosenPrice';
import { useEffect, useState } from 'react';
import { useCreateOfferContext } from '../CreateOfferContext';
import classes from './PriceComputingPane.module.css';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


type PriceUnit = 'dollar' | 'token';

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

    const { offerTokenPrice, buyerTokenPrice, buyTokenSymbol, setChoosedPrice } = useCreateOfferContext();
    console.log(offerTokenPrice, buyerTokenPrice)

    const [priceUnit, setPriceUnit] = useState<PriceUnit>('dollar');
    const [price, setPrice] = useState<number | undefined>(undefined);
    console.log('price: ', price)

    // Price in $ depending if 1:1 ratio is set
    const choosedPriceDollar = useChoosenPrice(
        price, 
        offer.offerType == OFFER_TYPE.BUY ? offerTokenPrice : buyerTokenPrice, 
        priceUnit, 
        offer.offerTokenDecimal ?? 6,
        values.useBuyTokenPrice
    );
    console.log('choosedPriceDollar: ', choosedPriceDollar)
    useEffect(() => {
        if(priceUnit == 'dollar'){
            console.log(choosedPriceDollar, buyerTokenPrice)
            const p = parseFloat(((choosedPriceDollar ?? 0)/(buyerTokenPrice ?? 1)).toFixed(offer.offerTokenDecimal ?? 6))
            console.log('p: ', p)
            setFieldValue('price', p)
        }else{
            console.log('price: ', price)
            setFieldValue('price', price)
        }
    },[choosedPriceDollar, priceUnit, price, buyerTokenPrice, offer.offerTokenDecimal])

    const { isError: shieldError, maxPriceDifference, priceDifference } = useShield(offer.offerType, choosedPriceDollar, offer.offerType == OFFER_TYPE.BUY ? buyerTokenPrice : offerTokenPrice );

    return(
        <>
            <Flex direction={'column'} gap={'md'}>
                <Flex direction={'column'} gap={'xs'}>
                    <Input.Label>{t('unit')}</Input.Label>
                    <SegmentedControl 
                        size="xs" 
                        radius="md" 
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
                      decimalScale={offer.offerTokenDecimal ?? 6}
                      value={price}
                      onChange={(value) => setPrice(value as number)}
                  />
                </Flex>
            </Flex>
            {shieldError ? (
              <Flex className={classes.priceComputingPaneError}>
                <Text>{t('shieldError.line1', { price: '10', difference: ((priceDifference ?? 0)*100).toFixed(2) })}</Text>
                <Text>{t('shieldError.line2', { difference: maxPriceDifference })}</Text>
              </Flex>
            ): choosedPriceDollar ? (
              <Flex className={classes.priceComputingPane}>
                  {t('priceInfo', { price: choosedPriceDollar?.toFixed(2), difference: ((priceDifference ?? 0)*100).toFixed(2) }) }
              </Flex>
            ) : undefined}
        </>
    )
}