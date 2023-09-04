import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import { Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';

import { ContractsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { providerAtom } from 'src/states';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { getContract } from 'src/utils';
import { cleanNumber } from 'src/utils/number';
import { calcRem } from 'src/utils/style';

import { Erc20, Erc20ABI } from '../../../abis';
import { buy } from '../../../utils/tx/buy';
import { NumberInput } from '../../NumberInput';

type BuyModalWithPermitProps = {
  offer: Offer;
  triggerTableRefresh: Dispatch<SetStateAction<boolean>>;
};

type BuyWithPermitFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
};

export const BuyModalWithPermit: FC<
  ContextModalProps<BuyModalWithPermitProps>
> = ({ context, id, innerProps: { offer, triggerTableRefresh } }) => {
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyWithPermitFormValues>({
      // eslint-disable-next-line object-shorthand
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: 0,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
      },
    });

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const activeChain = useActiveChain();

  const [offerTokenSellerBalance, setOfferTokenSellerBalance] = useState<
    string | undefined
  >('');
  const { name: offerTokenName, symbol: offerTokenSymbol } = useERC20TokenInfo(
    offer.offerTokenAddress
  );
  const { symbol: buyTokenSymbol, address: buyerTokenAddress } =
    useERC20TokenInfo(offer.buyerTokenAddress);

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );
  const offerToken = getContract<Erc20>(
    offer.offerTokenAddress,
    Erc20ABI,
    provider as Web3Provider,
    account
  );

  const getOfferTokenInfos = async () => {
    if (!offerToken) return;
    try {
      // console.log("offerToken: ", offerToken)
      // console.log("sellerAddress: ", sellerAddress)
      const balanceSeller = await offerToken.balanceOf(offer.sellerAddress);
      setOfferTokenSellerBalance((balanceSeller ?? BigNumber(0)).toString());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (offerToken) getOfferTokenInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerToken]);

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  const { balance, WalletERC20Balance } =
    useWalletERC20Balance(buyerTokenAddress);

  const total = values?.amount * values?.price;

  const connector = useAtomValue(providerAtom);

  const onHandleSubmit = useCallback(
    async (formValues: BuyWithPermitFormValues) => {
      const onFinished = () => {
        onClose();
        triggerTableRefresh(true);
      };

      buy(
        account,
        provider,
        activeChain,
        realTokenYamUpgradeable,
        offer,
        formValues.amount,
        connector,
        setSubmitting,
        onFinished
      );
    },
    [
      account,
      provider,
      activeChain,
      realTokenYamUpgradeable,
      offer,
      connector,
      onClose,
      triggerTableRefresh,
    ]
  );

  const maxTokenBuy: number | undefined = useMemo(() => {
    if (!balance || !offer.price) return undefined;

    const b = new BigNumber(balance);
    const max = b.eq(0) ? new BigNumber(0) : b.dividedBy(offer.price);

    return max.isGreaterThanOrEqualTo(new BigNumber(offer.amount))
      ? new BigNumber(offer.amount).toNumber()
      : parseFloat(max.toString());
  }, [balance, offer]);

  const priceTranslation: Map<OFFER_TYPE, string> = new Map<OFFER_TYPE, string>(
    [
      [OFFER_TYPE.BUY, t('buyOfferTypePrice')],
      [OFFER_TYPE.SELL, t('sellOfferTypePrice')],
      [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypePrice')],
    ]
  );

  const amountTranslation: Map<OFFER_TYPE, string> = new Map<
    OFFER_TYPE,
    string
  >([
    [OFFER_TYPE.BUY, t('buyOfferTypeAmount')],
    [OFFER_TYPE.SELL, t('sellOfferTypeAmount')],
    [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypeAmount')],
  ]);

  return (
    <form onSubmit={onSubmit(onHandleSubmit)} style={{ width: calcRem(500) }}>
      <Stack justify={'center'} align={'stretch'}>
        <Flex direction={'column'} gap={'sm'}>
          <Text size={'xl'}>{t('selectedOffer')}</Text>
          <Flex direction={'column'} gap={8}>
            <Flex direction={'column'}>
              <Text fw={700}>{t('offerId')}</Text>
              <Text>{offer.offerId}</Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>{t('offerTokenName')}</Text>
              <Text>{offerTokenName}</Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>{t('sellerAddress')}</Text>
              <Text>{offer.sellerAddress}</Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>
                {offer.type ? amountTranslation.get(offer.type) : ''}
              </Text>
              <Text>
                {BigNumber.minimum(
                  offer.amount,
                  offerTokenSellerBalance!
                ).toString()}
              </Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>
                {offer.type ? priceTranslation.get(offer.type) : ''}
              </Text>
              <Text>{`${offer.price} ${buyTokenSymbol}`}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider />

        <WalletERC20Balance
          tokenAddress={offer.buyerTokenAddress}
          tokenDecimals={offer.buyerTokenDecimals}
        />

        <Flex direction={'column'} gap={'sm'}>
          <Text size={'xl'}>{t1('sell')}</Text>
          <Flex direction={'column'} gap={8}>
            <NumberInput
              label={t('amount')}
              required={true}
              // disabled={maxTokenBuy == 0 || maxTokenBuy == undefined}
              min={0}
              max={maxTokenBuy}
              showMax={true}
              placeholder={t('amount')}
              sx={{ flexGrow: 1 }}
              groupMarginBottom={16}
              setFieldValue={setFieldValue}
              {...getInputProps('amount')}
            />

            <Text size={'xl'}>{t('summary')}</Text>
            <Text size={'md'} mb={10}>
              {` ${t('summaryText1')} ${values?.amount} ${offerTokenSymbol} ${t(
                'summaryText2'
              )} ${cleanNumber(values?.price)} ${buyTokenSymbol} ${t(
                'summaryText3'
              )} ${total} ${buyTokenSymbol}`}
            </Text>

            <Group grow={true}>
              <Button color={'red'} onClick={onClose} aria-label={t('cancel')}>
                {t('cancel')}
              </Button>
              <Button
                type={'submit'}
                loading={isSubmitting}
                aria-label={t('confirm')}
                disabled={
                  process.env.NEXT_PUBLIC_ENV == 'development'
                    ? false
                    : values?.amount == 0 || !values.amount
                }
              >
                {t('confirm')}
              </Button>
            </Group>
          </Flex>
        </Flex>
      </Stack>
    </form>
  );
};
