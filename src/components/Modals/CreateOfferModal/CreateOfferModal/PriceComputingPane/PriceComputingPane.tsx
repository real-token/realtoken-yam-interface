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

    const { offerTokenPrice, buyerTokenPrice, buyTokenSymbol, setShieldError, setChoosedPrice } = useCreateOfferContext();

    const [priceUnit, setPriceUnit] = useState<PriceUnit>('dollar');
    const [price, setPrice] = useState<number | undefined>(undefined);

    // Price in $ depending if 1:1 ratio is set
    const choosedPriceDollar = useChoosenPrice(
        price, 
        offer.offerType == OFFER_TYPE.BUY ? offerTokenPrice : buyerTokenPrice, 
        priceUnit, 
        offer.offerTokenDecimal ?? 6,
        values.useBuyTokenPrice
    );

    useEffect(() => {
        if(priceUnit == 'dollar'){
            const p = parseFloat(((choosedPriceDollar ?? 0)/(buyerTokenPrice ?? 1)).toFixed(offer.offerTokenDecimal ?? 6))
            console.log('pDollar:', p)
            setFieldValue('price', p)
            setChoosedPrice(p)
        }else{
            console.log('price: ', price)
            setFieldValue('price', price)
            setChoosedPrice(price)
        }
    },[choosedPriceDollar, priceUnit, price, buyerTokenPrice, offer.offerTokenDecimal])

    const { isError: shieldError, maxPriceDifference, priceDifference } = useShield(offer.offerType, choosedPriceDollar, offer.offerType == OFFER_TYPE.BUY ? buyerTokenPrice : offerTokenPrice );
    useEffect(() => {
        setShieldError(shieldError)
    },[shieldError])

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
                <Text>{t('shieldError.line1', { price: choosedPriceDollar?.toFixed(2), difference: ((priceDifference ?? 0)*100).toFixed(2) })}</Text>
                <Text>{t('shieldError.line2', { difference: (maxPriceDifference*100).toFixed(2) })}</Text>
              </Flex>
            ): choosedPriceDollar ? (
              <Flex className={classes.priceComputingPane}>
                  {t('priceInfo', { price: choosedPriceDollar?.toFixed(2), difference: ((priceDifference ?? 0)*100).toFixed(2) }) }
              </Flex>
            ) : undefined}
        </>
    )
}