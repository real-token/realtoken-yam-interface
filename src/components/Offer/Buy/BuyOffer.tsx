import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import { Button, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';

import { Erc20, Erc20ABI } from 'src/abis';
import { ContractsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { providerAtom } from 'src/states';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { getContract } from 'src/utils';
import { formatBigDecimals } from 'src/utils/format';
import { cleanNumber } from 'src/utils/number';
import { buy } from 'src/utils/tx/buy';

import { OfferContainer } from '../components/OfferContainer';
import { ModalSuccess } from './ModalSuccess';
import OfferSummary from './OfferSummary';
import TokenExchange from './components/TokenExchange';
import { OfferTransactionList } from 'src/components/Transactions/usecases/OfferTransactionList';
import { TransactionView } from './components/TransactionTableAccordion';

interface BuyOffertProps {
  offer: Offer;
  backArrow?: boolean;
}

type BuyOfferFormValues = {
  offerId: string;
  price: number;
  amount: number;
  amountCurrency: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
};

export const BuyOffer: FC<BuyOffertProps> = ({ offer, backArrow }) => {
  const { t } = useTranslation('list');
  return (
    <OfferContainer
      offer={offer}
      backArrow={backArrow}
      action={
        offer.type === OFFER_TYPE.EXCHANGE
          ? t('toExchange')
          : offer.type === OFFER_TYPE.BUY
            ? t('toSell')
            : t('toBuy')
      }
    >
      <BuyOfferForms offer={offer}></BuyOfferForms>
    </OfferContainer>
  );
};

export const BuyOfferForms: FC<BuyOffertProps> = ({ offer }) => {
  const { t: tswap } = useTranslation('swap');
  const { t: tswapSell } = useTranslation('swap', { keyPrefix: 'sell' });
  const { t: tswapBuy } = useTranslation('swap', { keyPrefix: 'buy' });
  const [
    modalFinishOpened,
    { open: modalFinishOpen, close: modalFinishClose },
  ] = useDisclosure(false);
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, setFieldValue, values } =
    useForm<BuyOfferFormValues>({
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: 0,
        amountCurrency: 0,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
      },
    });
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const activeChain = useActiveChain();
  const [offerTokenSellerBalance, setOfferTokenSellerBalance] = useState<
    string | undefined
  >('');
  const summaryText1 =
    offer.type === OFFER_TYPE.BUY
      ? tswapBuy('summaryText1')
      : tswapSell('summaryText1');
  const {
    symbol: offerTokenSymbol,
    logoUrl: offerTokenLogo,
    decimals: offerTokenDecimals,
  } = useERC20TokenInfo(offer.offerTokenAddress);
  const { symbol: buyTokenSymbol, address: buyerTokenAddress } =
    useERC20TokenInfo(offer.buyerTokenAddress);

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable,
  );
  const offerToken = getContract<Erc20>(
    offer.offerTokenAddress,
    Erc20ABI,
    provider as Web3Provider,
    account,
  );

  useEffect(() => {
    const getOfferTokenInfos = async () => {
      if (!offerToken) return;
      try {
        const balanceSeller = await offerToken.balanceOf(offer.sellerAddress);
        setOfferTokenSellerBalance((balanceSeller ?? BigNumber(0)).toString());
      } catch (err) {
        console.error(err);
      }
    };

    if (offerToken) getOfferTokenInfos();
  }, [offerToken]);

  const { balance } = useWalletERC20Balance(buyerTokenAddress);
  const connector = useAtomValue(providerAtom);

  const totalAmountCurrency =
    offer.type === OFFER_TYPE.BUY
      ? values?.amount
      : values?.amount * values?.price;
  const totalAmountToken =
    offer.type === OFFER_TYPE.BUY
      ? values?.amount * values?.price
      : values?.amount;

  const currencySymbol =
    offer.type === OFFER_TYPE.BUY
      ? offer.offerTokenSymbol
      : offer.buyerTokenSymbol;
  const tokenSymbol =
    offer.type === OFFER_TYPE.BUY
      ? offer.buyerTokenSymbol
      : offer.offerTokenSymbol;

  const exchangeRate =
    offer.type === OFFER_TYPE.BUY
      ? new BigNumber(1).dividedBy(values?.price).toNumber()
      : values?.price;

  //console.log('connector', connector);

  const onHandleSubmit = useCallback(
    async (formValues: BuyOfferFormValues) => {
      setBuyAmount(formValues.amount);
      console.log('setBuyAmount', formValues.amount);
      const onFinished = () => {
        setSubmitting(false);
        formValues.amount = 0;
        modalFinishOpen();
      };
      setSubmitting(true);

      buy(
        account,
        provider,
        activeChain,
        realTokenYamUpgradeable,
        offer,
        formValues.amount,
        connector,
        setSubmitting,
        onFinished,
      );
    },
    [account, provider, activeChain, realTokenYamUpgradeable, offer, connector],
  );

  const maxTokenBuy: number | undefined = useMemo(() => {
    if (!balance || !offer.price) return undefined;

    const b = new BigNumber(balance);
    const max = b.eq(0) ? new BigNumber(0) : b.dividedBy(offer.price);

    return max.isGreaterThanOrEqualTo(new BigNumber(offer.amount))
      ? new BigNumber(offer.amount).toNumber()
      : parseFloat(max.toString());
  }, [balance, offer]);

  return (
    <>
      <ModalSuccess
        buyAmount={buyAmount}
        offerTokenAddress={offer.offerTokenAddress}
        offerTokenDecimals={
          offerTokenDecimals
            ? parseInt(offerTokenDecimals)
            : parseInt(offer.offerTokenDecimals)
        }
        offerTokenSymbol={offerTokenSymbol ?? offer.offerTokenName}
        offerTokenLogoUrl={offerTokenLogo ?? ''}
        modalFinishClose={modalFinishClose}
        modalFinishOpened={modalFinishOpened}
      ></ModalSuccess>
      <form onSubmit={onSubmit(onHandleSubmit)}>
        <Stack justify={'center'} align={'stretch'} spacing={5}>
          <Flex direction={'column'} gap={'sm'}>
            <TokenExchange
              buyerTokenBalance={balance ?? '0'}
              sellerTokenBalance={offerTokenSellerBalance ?? '0'}
              getInputProps={getInputProps}
              maxTokenBuy={maxTokenBuy ?? 0}
              offer={offer}
              price={values?.price ?? 0}
              setFieldValue={setFieldValue}
            ></TokenExchange>
            <OfferSummary
              offer={offer}
              sellerTokenBalance={offerTokenSellerBalance ?? '0'}
            ></OfferSummary>
          </Flex>
          <TransactionView offerId={offer.offerId}></TransactionView>
          <Flex direction={'column'} gap={'xs'}>
            <Flex direction={'column'} gap={8} ml={20} mr={20}>
              <Title order={5}>{tswap('summary')}</Title>
              <Text mb={10}>
                {` ${summaryText1} ${formatBigDecimals(
                  totalAmountToken,
                )} ${tokenSymbol} ${tswap('summaryText2')} ${cleanNumber(
                  formatBigDecimals(exchangeRate),
                )} ${currencySymbol} ${tswap(
                  'summaryText3',
                )} ${formatBigDecimals(totalAmountCurrency)} ${currencySymbol}`}
              </Text>

              <Group grow={true} sx={{ padding: '0 50px 0 50px' }}>
                <Button
                  type={'submit'}
                  radius={'xl'}
                  loading={isSubmitting}
                  aria-label={tswap('confirm')}
                  disabled={
                    process.env.NEXT_PUBLIC_ENV === 'development'
                      ? false
                      : values?.amount == 0 || !values.amount
                  }
                >
                  {tswap('confirm')}
                </Button>
              </Group>
            </Flex>
          </Flex>
        </Stack>
      </form>
    </>
  );
};
