import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { useCurrentNetwork } from '@real-token/core';
import { useIsAA, useSendTransactions } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import {
  useAccount,
  useConfig,
  usePublicClient,
  useReadContracts,
} from 'wagmi';

import { coinBridgeTokenABI } from 'src/abis';
import { Offer } from 'src/types/offer/Offer';
import { cleanNumber } from 'src/utils/number';

import { ExtendedChainConfig } from '../../../config/aaConfig';
import { useAssetPrice } from '../../../hooks/useAssetPrice';
import { useWalletERC20Balance } from '../../../hooks/useWalletERC20Balance';
import { OFFER_TYPE } from '../../../types/offer';
import {
  UpdateOfferTransactionContext,
  updateOfferTransactions,
} from '../../../utils/tx/updateOffer';
import { NumberInput } from '../../NumberInput';
import { WalletERC20Balance } from '../../WalletBalance/WalletERC20Balance';
import { PriceUnit, UpdateOfferProvider } from './UpdateOfferContext';
import { useUpdateOfferContext } from './UpdateOfferContext';
import { UpdatePriceComputingPane } from './UpdatePriceComputingPane';
import { UpdateFormValues } from './type';

type UpdateModalProps = {
  offer: Offer;
  triggerTableRefresh: Dispatch<SetStateAction<boolean>>;
};

export const UpdateModalWithPermit: FC<ContextModalProps<UpdateModalProps>> = ({
  context,
  id,
  innerProps: { offer, triggerTableRefresh },
}) => {
  const { address: account } = useAccount();
  const config = useConfig();
  const publicClient = usePublicClient();
  const isAA = useIsAA();

  // Get token prices
  const offerTokenPrice = useAssetPrice({
    tokenType: offer.type == OFFER_TYPE.SELL ? 'realtoken' : 'others',
    tokenAddress: offer.offerTokenAddress,
  });

  const buyerTokenPrice = useAssetPrice({
    tokenType: offer.type == OFFER_TYPE.SELL ? 'others' : 'realtoken',
    tokenAddress: offer.buyerTokenAddress,
  });

  // Calculate initial price in dollars
  const initialPriceInDollar = useMemo(() => {
    if (offer.offerPrice !== undefined) {
      return offer.offerPrice;
    }
    if (!buyerTokenPrice || !offer.price) return undefined;

    if (offer.type == OFFER_TYPE.SELL) {
      return parseFloat(offer.price) * buyerTokenPrice;
    } else if (offer.type == OFFER_TYPE.BUY) {
      return (1 / parseFloat(offer.price)) * (offerTokenPrice || 1);
    }
    return undefined;
  }, [
    offer.offerPrice,
    offer.price,
    offer.type,
    buyerTokenPrice,
    offerTokenPrice,
  ]);

  const form = useForm<UpdateFormValues>({
    initialValues: {
      offerId: offer.offerId,
      price: parseFloat(offer.price),
      amount: parseFloat(offer.amount),
      offerTokenAddress: offer.offerTokenAddress,
      offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
      buyerTokenAddress: offer.buyerTokenAddress,
      buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
      choosedPrice: initialPriceInDollar,
      useBuyTokenPrice: false,
      priceUnit: 'dollar' as PriceUnit,
    },
  });

  const { reset, setFieldValue, values } = form;

  const [amountMax, setAmountMax] = useState<number>();

  const activeChain = useCurrentNetwork<ExtendedChainConfig>();

  const { t } = useTranslation('modals', { keyPrefix: 'update' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  useEffect(() => {
    setAmountMax(Number(offer?.amount as string));
  }, [offer, values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountMax]);

  const { data: initialOffer } = useReadContracts({
    query: {
      enabled: !!account && !!offer.buyerTokenAddress,
    },
    contracts: [
      {
        abi: coinBridgeTokenABI,
        address: offer.buyerTokenAddress as `0x${string}`,
        functionName: 'symbol',
        args: [],
      },
      {
        abi: coinBridgeTokenABI,
        address: offer.offerTokenAddress as `0x${string}`,
        functionName: 'symbol',
        args: [],
      },
    ],
  });
  const buyTokenSymbol = initialOffer?.[0]?.result;
  const offerTokenSymbol = initialOffer?.[1]?.result;

  const { balance } = useWalletERC20Balance(values.offerTokenAddress);

  const { sendTransactions, isPending: isSubmitting } =
    useSendTransactions<UpdateOfferTransactionContext>({
      initialContext: {
        account: account,
        activeChain: activeChain,
      },
      onAllComplete() {
        triggerTableRefresh(true);
        context.closeModal(id);
      },
      onError(error) {
        console.error('Transaction error:', error);
      },
    });

  const handleSubmit = (values: UpdateFormValues) => {
    sendTransactions(
      updateOfferTransactions(
        account,
        isAA,
        publicClient,
        activeChain,
        config,
        offer,
        values
      )
    );
  };

  return (
    <UpdateOfferProvider
      values={{
        ...values,
        setFieldValue,
        offerTokenPrice,
        buyerTokenPrice,
        offer,
        offerTokenSymbol,
        buyTokenSymbol,
      }}
    >
      <UpdateModalContent
        form={form}
        offer={offer}
        buyTokenSymbol={buyTokenSymbol}
        offerTokenSymbol={offerTokenSymbol}
        balance={balance}
        onClose={onClose}
        mutate={handleSubmit}
        isSubmitting={isSubmitting}
        initialPriceInDollar={initialPriceInDollar}
      />
    </UpdateOfferProvider>
  );
};

type UpdateModalContentProps = {
  form: ReturnType<typeof useForm<UpdateFormValues>>;
  offer: Offer;
  buyTokenSymbol: string | undefined;
  offerTokenSymbol: string | undefined;
  balance: string | undefined;
  onClose: () => void;
  mutate: (values: UpdateFormValues) => void | Promise<void>;
  isSubmitting: boolean;
  initialPriceInDollar: number | undefined;
};

const UpdateModalContent: FC<UpdateModalContentProps> = ({
  form,
  offer,
  buyTokenSymbol,
  offerTokenSymbol,
  balance,
  onClose,
  mutate,
  isSubmitting,
  initialPriceInDollar,
}) => {
  const { getInputProps, onSubmit, values } = form;
  const { t } = useTranslation('modals', { keyPrefix: 'update' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });
  const { choosedPrice, buyerTokenPrice } = useUpdateOfferContext();

  // Calculate old price in dollars for display
  const oldPriceInDollar = initialPriceInDollar;
  const oldPriceInToken = useMemo(() => {
    if (!oldPriceInDollar || !buyerTokenPrice) return undefined;
    return oldPriceInDollar / buyerTokenPrice;
  }, [oldPriceInDollar, buyerTokenPrice]);

  // Calculate new price in token for display
  const newPriceInToken = useMemo(() => {
    if (!choosedPrice || !buyerTokenPrice) return undefined;
    return choosedPrice / buyerTokenPrice;
  }, [choosedPrice, buyerTokenPrice]);

  // Calculate total: amount * choosedPrice for BUY (in dollars), amount * price for SELL (in buyerToken)
  const total = useMemo(() => {
    if (!values.amount) return 0;
    if (offer.type == OFFER_TYPE.BUY) {
      // For BUY: total in buyerToken = amount * choosedPrice
      return new BigNumber(values.amount)
        .multipliedBy(choosedPrice || values.price || 0)
        .toNumber();
    } else {
      // For SELL: total in buyerToken = amount * price
      return new BigNumber(values.amount)
        .multipliedBy(values.price || 0)
        .toNumber();
    }
  }, [values.amount, values.price, choosedPrice, offer.type]);

  return (
    <form onSubmit={onSubmit(mutate)}>
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

        <UpdatePriceComputingPane form={form} />

        <Divider />

        <Flex direction={'column'} gap={'md'}>
          <WalletERC20Balance balance={balance} symbol={offerTokenSymbol} />
          <NumberInput
            label={t('amount')}
            required={true}
            min={0}
            placeholder={t('amount')}
            style={{ flexGrow: 1 }}
            decimalScale={parseInt(offer.offerTokenDecimals)}
            max={parseFloat(balance ?? '0')}
            {...getInputProps('amount')}
          />
        </Flex>

        <Text size={'xl'}>{t('summary')}</Text>
        {values.price > 0 && values.amount > 0 && (
          <Flex direction={'column'} gap={'xs'}>
            {oldPriceInDollar !== undefined && (
              <Text size={'sm'} c={"dimmed"}>
                {`Ancien prix: ${oldPriceInDollar.toFixed(2)} $ (${
                  oldPriceInToken?.toFixed(6) || 'N/A'
                } ${buyTokenSymbol || ''})`}
              </Text>
            )}
            {choosedPrice !== undefined && (
              <Text size={'md'}>
                {`Nouveau prix: ${choosedPrice.toFixed(2)} $ (${
                  newPriceInToken?.toFixed(6) || 'N/A'
                } ${buyTokenSymbol || ''})`}
              </Text>
            )}
            <Text size={'md'} mb={10}>
              {offer.type == OFFER_TYPE.BUY
                ? ` ${t1('summaryText1')} ${
                    values?.amount
                  } ${buyTokenSymbol} ${t1('summaryText2')} ${cleanNumber(
                    choosedPrice?.toString() || values?.price.toString()
                  )} ${offerTokenSymbol} ${t1('summaryText3')} ${total.toFixed(
                    6
                  )} ${offerTokenSymbol}`
                : ` ${t1('summaryText1')} ${
                    values?.amount
                  } ${offerTokenSymbol} ${t1('summaryText2')} ${cleanNumber(
                    values?.price.toString()
                  )} ${buyTokenSymbol} ${t1('summaryText3')} ${total.toFixed(
                    6
                  )} ${buyTokenSymbol}`}
            </Text>
          </Flex>
        )}

        <Group grow={true}>
          <Button color={'red'} onClick={onClose} aria-label={t('cancel')}>
            {t('cancel')}
          </Button>
          <Button
            type={'submit'}
            loading={isSubmitting}
            aria-label={t('confirm')}
            disabled={
              values.price == 0 ||
              values.amount == 0 ||
              values.price == undefined ||
              values.amount == undefined ||
              (choosedPrice !== undefined && choosedPrice <= 0)
            }
          >
            {t('confirm')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
