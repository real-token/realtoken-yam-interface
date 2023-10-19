import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import { Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useWeb3React } from '@web3-react/core';

import { CoinBridgeToken, Erc20, Erc20ABI, coinBridgeTokenABI } from 'src/abis';
import { NumberInput } from 'src/components/NumberInput/NumberInput';
import { ContractsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { buyOfferClose } from 'src/store/features/buyOffer/buyOfferSlice';
import { Offer } from 'src/types/offer/Offer';
import { getContract } from 'src/utils';
import { cleanNumber } from 'src/utils/number';

import { OfferContainer } from '../components/OfferContainer';
import { onHandleEditSubmit } from './SubmitHandler';
import { UpdateFormValues } from './Types';

type EditOfferProps = {
  offer: Offer;
  onCloseEdit?: () => void;
};

export const EditOffer: FC<EditOfferProps> = ({ offer, onCloseEdit }) => {
  return (
    <OfferContainer offer={offer} action={'Editer Offre'} onClose={onCloseEdit}>
      <EditOfferForms offer={offer} onCloseEdit={onCloseEdit}></EditOfferForms>
    </OfferContainer>
  );
};

export const EditOfferForms: FC<EditOfferProps> = ({ offer, onCloseEdit }) => {
  const dispatch = useAppDispatch();
  const { account, provider } = useWeb3React();

  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<UpdateFormValues>({
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: parseFloat(offer.amount),
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
      },
    });

  const [amountMax, setAmountMax] = useState<number>();

  const activeChain = useActiveChain();
  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );
  const { t } = useTranslation('modals', { keyPrefix: 'update' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    setAmountMax(Number(offer?.amount as string));
  }, [offer, values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
  }, [amountMax, setFieldValue]);

  const onHandleSubmit = useCallback(
    async (formValues: UpdateFormValues) => {
      try {
        isSubmittingRef.current = true;
        onHandleEditSubmit(
          formValues,
          account,
          provider,
          realTokenYamUpgradeable,
          offer,
          activeChain
        );
        isSubmittingRef.current = false;
      } catch (e) {
        console.error('Error UpdateModal', e);
        //isSubmitting = false;
        isSubmittingRef.current = false;
      }
    },
    [account, provider, realTokenYamUpgradeable, offer, activeChain]
  );

  let offerTokenSymbol: string | undefined = '';
  let buyTokenSymbol: string | undefined = '';

  const buyerToken = getContract<CoinBridgeToken>(
    offer.buyerTokenAddress,
    coinBridgeTokenABI,
    provider as Web3Provider,
    account
  );

  const offerToken = getContract<Erc20>(
    offer.offerTokenAddress,
    Erc20ABI,
    provider as Web3Provider,
    account
  );

  const getOfferTokenInfos = async () => {
    try {
      const tokenSymbol = await offerToken?.symbol();
      offerTokenSymbol = tokenSymbol;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (offerToken) getOfferTokenInfos();
  }, [offerToken]);

  const getBuyTokenInfos = async () => {
    try {
      const tokenSymbol = await buyerToken?.symbol();
      buyTokenSymbol = tokenSymbol;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (buyerToken) getBuyTokenInfos();
  }, [buyerToken]);

  const total = values?.amount * values?.price;

  const onClose = useCallback(() => {
    if (onCloseEdit) {
      onCloseEdit();
    } else {
      dispatch({ type: buyOfferClose, payload: offer });
      reset();
    }
  }, [reset, dispatch, offer, onCloseEdit]);

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Flex direction={'column'} gap={'sm'}>
          <Text size={'xl'}>{t('selectedOffer')}</Text>
          <Flex direction={'column'} gap={8}>
            <Flex direction={'column'}>
              <Text fw={700}>{t('offerId')}</Text>
              <Text>{offer.offerId ? offer.offerId : 'Offer not found'}</Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>{t('price')}</Text>
              <Text>{offer.price}</Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>{t('amount')}</Text>
              <Text>{offer.amount}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider />

        <NumberInput
          label={t('price')}
          required={true}
          min={0}
          placeholder={t('price')}
          sx={{ flexGrow: 1 }}
          {...getInputProps('price')}
        />
        <NumberInput
          label={t('amount')}
          required={true}
          min={0}
          placeholder={t('amount')}
          sx={{ flexGrow: 1 }}
          {...getInputProps('amount')}
        />

        <Text size={'xl'}>{t('summary')}</Text>
        {values.price > 0 && values.amount > 0 && (
          <Text size={'md'} mb={10}>
            {` ${t1('summaryText1')} ${values?.amount} ${offerTokenSymbol} ${t1(
              'summaryText2'
            )} ${cleanNumber(values?.price)} ${buyTokenSymbol} ${t1(
              'summaryText3'
            )} ${total} ${buyTokenSymbol}`}
          </Text>
        )}

        <Group grow={true} sx={{ padding: '0 50px 0 50px' }}>
          <Button
            type={'submit'}
            loading={isSubmittingRef.current}
            aria-label={t('confirm')}
            radius={'xl'}
            disabled={
              values.price == 0 ||
              values.amount == 0 ||
              values.price == undefined ||
              values.amount == undefined
            }
          >
            {t('confirm')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
