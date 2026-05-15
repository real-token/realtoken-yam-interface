import { Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Divider,
  Flex,
  SegmentedControl,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { updateNotification } from '@mantine/notifications';
import { useAA } from '@real-token/aa-core';
import { useCurrentNetwork } from '@real-token/core';
import { useIsAA, useSendTransactions } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import { usePublicClient, useReadContract } from 'wagmi';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { cleanNumber } from 'src/utils/number';
import { calcRem } from 'src/utils/style';

import { Erc20ABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';
import {
  BUY_METHODS,
  BuyTransactionContext,
  buyTransactions,
} from '../../../utils/tx/buy';
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
  buyMethod?: BUY_METHODS;
};

export const BuyModalWithPermit: FC<
  ContextModalProps<BuyModalWithPermitProps>
> = ({ context, id, innerProps: { offer, triggerTableRefresh } }) => {
  const { walletAddress: account } = useAA();

  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyWithPermitFormValues>({
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: 0,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
        buyMethod: BUY_METHODS.buyWithApprove,
      },
    });

  const isAA = useIsAA();

  const { name: offerTokenName, symbol: offerTokenSymbol } = useERC20TokenInfo(
    offer.offerTokenAddress
  );
  const {
    symbol: buyTokenSymbol,
    address: buyerTokenAddress,
    isLoading: isBuyTokenLoading,
  } = useERC20TokenInfo(offer.buyerTokenAddress);

  const { data: offerTokenSellerBalance } = useReadContract({
    address: offer.offerTokenAddress as `0x${string}`,
    abi: Erc20ABI,
    functionName: 'balanceOf',
    args: [offer.sellerAddress as `0x${string}`],
  });

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  const { balance, WalletERC20Balance, isLoading } =
    useWalletERC20Balance(buyerTokenAddress);

  const total = values?.amount * values?.price;

  const publicClient = usePublicClient();
  const activeChain = useCurrentNetwork<ExtendedChainConfig>();

  const { sendTransactions, isPending: isSubmitting } =
    useSendTransactions<BuyTransactionContext>({
      initialContext: {
        account: account as `0x${string}`,
      },
      onAllComplete: () => {
        triggerTableRefresh(true);
        onClose();
      },
      onError: (error) => {
        console.error('Transaction error:', error);
        updateNotification(
          NOTIFICATIONS[NotificationsID.buyOfferError]({
            key: 'buy',
            hash: 'error',
            href: 'error',
          })
        );
      },
    });

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

  const handleSubmit = useCallback(
    (formValues: BuyWithPermitFormValues) => {
      if (
        !account ||
        !formValues.amount ||
        !publicClient ||
        !activeChain ||
        !formValues.buyMethod
      ) {
        return;
      }

      sendTransactions(
        buyTransactions(
          publicClient,
          activeChain,
          offer,
          formValues.amount,
          formValues.buyMethod
        )
      );
    },
    [account, publicClient, activeChain, offer, sendTransactions]
  );

  return (
    <form
      onSubmit={onSubmit(handleSubmit)}
      style={{ paddingBottom: calcRem(40) }}
    >
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
                  offerTokenSellerBalance?.toString() ?? '0'
                ).toString()}
              </Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>
                {offer.type && priceTranslation ? (
                  priceTranslation.get(offer.type)
                ) : (
                  <Skeleton width={'100%'} height={20} color={'brand'} />
                )}
              </Text>
              <Text>
                {isBuyTokenLoading ? (
                  <Skeleton width={'100%'} height={20} color={'brand'} />
                ) : (
                  `${offer.price} ${buyTokenSymbol}`
                )}
              </Text>
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
              style={{ flexGrow: 1 }}
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

            {values.amount > 0 ? (
              <Flex
                direction={'column'}
                gap={'md'}
                style={(theme) => ({ marginBottom: theme.spacing.sm })}
              >
                {!isAA ? (
                  <Flex direction={'column'} gap={5}>
                    <Text size={"sm"} fw={500} mt={"md"}>
                      {'Buy method'}
                    </Text>
                    <SegmentedControl
                      data={[
                        {
                          value: BUY_METHODS.buyWithApprove,
                          label: (
                            <Tooltip
                              label={t('buyButtons.approve.details')}
                              multiline={true}
                              w={200}
                            >
                              <span>{t('buyButtons.approve.options')}</span>
                            </Tooltip>
                          ),
                        },
                        {
                          value: BUY_METHODS.buyWithPermit,
                          disabled: isAA,
                          label: (
                            <Tooltip
                              label={t('buyButtons.permit.details')}
                              multiline={true}
                              w={200}
                            >
                              <span>{t('buyButtons.permit.options')}</span>
                            </Tooltip>
                          ),
                        },
                      ]}
                      {...getInputProps('buyMethod')}
                    />
                  </Flex>
                ) : undefined}
              </Flex>
            ) : null}

            <Flex gap={'sm'} mt={'xs'} wrap={'nowrap'} align={'stretch'} w={'100%'}>
              {values.amount > 0 ? (
                <Button
                  type={'submit'}
                  loading={isSubmitting}
                  aria-label={t('confirm')}
                  disabled={values?.amount == 0 || !values.amount}
                  style={{ flex: '2 1 0%', minWidth: 0 }}
                >
                  {values.buyMethod == BUY_METHODS.buyWithPermit
                    ? t('buyButtons.permit.text')
                    : t('buyButtons.approve.text')}
                </Button>
              ) : null}
              <Button
                color={'red'}
                onClick={onClose}
                aria-label={t('cancel')}
                style={
                  values.amount > 0
                    ? { flex: '1 1 0%', minWidth: 0 }
                    : { width: '100%' }
                }
              >
                {t('cancel')}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </form>
  );
};
