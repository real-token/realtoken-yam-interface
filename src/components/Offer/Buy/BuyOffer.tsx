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
import { createStyles, em } from '@mantine/core';
import { Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';

import { Erc20, Erc20ABI } from 'src/abis';
import { NumberInput } from 'src/components/NumberInput';
import { getOfferPropertyAddress } from 'src/components/Offer/Utils';
import { ContractsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { providerAtom } from 'src/states';
import { buyOfferClose } from 'src/store/features/buyOffer/buyOfferSlice';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { getContract } from 'src/utils';
import { formatBigDecimals, formatPercent, formatUsd } from 'src/utils/format';
import { cleanNumber } from 'src/utils/number';
import { calcRem } from 'src/utils/style';
import { buy } from 'src/utils/tx/buy';

import { OfferContainer } from '../components/OfferContainer';

const useStyle = createStyles((theme) => ({
  center: {
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'center',
  },
  container: {
    fontSize: theme.fontSizes.sm,
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
    width: calcRem(500),
  },
  containerMobile: {
    width: '100%',
  },
  textLabel: {
    textAlign: 'left',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
  textValue: {
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? undefined : theme.colors.gray[7],
  },
  stressValue: {
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.brand[5]
        : theme.colors.brand[5],
  },
  header: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
  },
}));

interface BuyOffertProps {
  offer: Offer;
  triggerTableRefresh?: Dispatch<SetStateAction<boolean>>;
}

type BuyOfferFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
};

export const BuyOffer: FC<BuyOffertProps> = ({
  offer,
  triggerTableRefresh,
}) => {
  const { t } = useTranslation('list');
  return (
    <OfferContainer
      offer={offer}
      action={
        offer.type === OFFER_TYPE.EXCHANGE
          ? t('toExchange')
          : offer.type === OFFER_TYPE.BUY
          ? t('toSell')
          : t('toBuy')
      }
    >
      <BuyOfferForms
        offer={offer}
        triggerTableRefresh={triggerTableRefresh}
      ></BuyOfferForms>
    </OfferContainer>
  );
};

export const BuyOfferForms: FC<BuyOffertProps> = ({
  offer,
  triggerTableRefresh,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { classes } = useStyle();
  const { account, provider } = useWeb3React();
  const dispatch = useAppDispatch();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyOfferFormValues>({
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

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });
  const { t: t3 } = useTranslation('buy', { keyPrefix: 'table' });

  const { balance, WalletERC20Balance } =
    useWalletERC20Balance(buyerTokenAddress);

  const total = values?.amount * values?.price;

  const connector = useAtomValue(providerAtom);

  const onHandleSubmit = useCallback(
    async (formValues: BuyOfferFormValues) => {
      const onFinished = () => {
        if (triggerTableRefresh) triggerTableRefresh(true);
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

  const initialPriceTranslation: Map<OFFER_TYPE, string> = new Map<
    OFFER_TYPE,
    string
  >([
    [OFFER_TYPE.BUY, t('buyOfferTypeInitialPrice')],
    [OFFER_TYPE.SELL, t('sellOfferTypeInitialPrice')],
    [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypeInitialPrice')],
  ]);

  const amountTranslation: Map<OFFER_TYPE, string> = new Map<
    OFFER_TYPE,
    string
  >([
    [OFFER_TYPE.BUY, t('buyOfferTypeAmount')],
    [OFFER_TYPE.SELL, t('sellOfferTypeAmount')],
    [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypeAmount')],
  ]);

  const onClose = useCallback(() => {
    dispatch({ type: buyOfferClose, payload: offer });
    reset();
  }, [dispatch, offer, reset]);

  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();
  const offerProperty = getPropertyToken(getOfferPropertyAddress(offer));
  const [backgroundImage, setBackgroundImage] = useState<string>(
    offerProperty ? offerProperty.imageLink[0] : ''
  );

  let initialPrice: string | undefined = undefined;
  let priceDelta: string | undefined = undefined;
  let priceColor: string | undefined = undefined;

  switch (offer.type) {
    case OFFER_TYPE.BUY: {
      initialPrice =
        formatBigDecimals(
          new BigNumber(1).dividedBy(offer.officialPrice ?? 1).toNumber(),
          6
        ) + (' ' + buyTokenSymbol ?? '');
      if (offer.priceDelta && offer.priceDelta > 0) {
        priceColor = 'teal';
      } else if (offer.priceDelta && offer.priceDelta < 0) {
        priceColor = 'red';
      }

      priceDelta = offer.priceDelta
        ? formatPercent(offer.priceDelta)
        : undefined;
      break;
    }
    case OFFER_TYPE.SELL: {
      initialPrice = formatUsd(
        offer.officialPrice ?? parseFloat(offer.price) ?? 0
      );
      if (offer.priceDelta && offer.priceDelta > 0) {
        priceColor = 'red';
      } else if (offer.priceDelta && offer.priceDelta < 0) {
        priceColor = 'teal';
      }
      priceDelta = offer.priceDelta
        ? formatPercent(offer.priceDelta)
        : undefined;
      break;
    }
    case OFFER_TYPE.EXCHANGE: {
      if (offer.sites.buying.tokenOfficialPrice > 0) {
        const rate = new BigNumber(parseFloat(offer.price))
          .times(offer.sites.buying.tokenOfficialPrice)
          .dividedBy(offer.sites.selling.tokenOfficialPrice);

        const delta = rate.minus(parseFloat(offer.price));

        if (delta.toNumber() > 0) {
          priceColor = 'red';
        } else if (delta.toNumber() < 0) {
          priceColor = 'teal';
        }

        initialPrice =
          formatBigDecimals(rate.toNumber()) + ' ' + offer.buyerTokenName;
        priceDelta = formatPercent(delta.dividedBy(rate).toNumber());
      }

      break;
    }
    default: {
      //statements;
      break;
    }
  }

  useEffect(() => {
    if (!offer || propertiesIsloading) return;

    if (offer.buyerTokenType === 1) {
      const offerProperty = getPropertyToken(offer.buyerTokenAddress);
      if (offerProperty) {
        setBackgroundImage(offerProperty.imageLink[0]);
      }
    }

    if (offer.offerTokenType === 1) {
      const offerProperty = getPropertyToken(offer.offerTokenAddress);
      if (offerProperty) {
        setBackgroundImage(offerProperty.imageLink[0]);
      }
    }
  }, [getPropertyToken, offer, propertiesIsloading]);

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Flex direction={'column'} gap={'sm'}>
          <Flex direction={'column'} gap={8}>
            <Flex direction={'row'} gap={16}>
              <Text className={classes.textLabel}>{t('offerTokenName')}</Text>
              <Text className={classes.textValue}>{offerTokenName}</Text>
            </Flex>
            <Flex direction={'row'} gap={16}>
              <Text className={classes.textLabel}>{t3('sellerName')}</Text>
              <Text className={classes.textValue}>{t3(offer.sellerName)}</Text>
            </Flex>
            <Flex direction={'row'} gap={16} align={'center'}>
              <Text className={classes.textLabel}>{t('sellerAddress')}</Text>
              <Text
                fz={isMobile ? 11 : undefined}
                className={classes.textValue}
              >
                {offer.sellerAddress}
              </Text>
            </Flex>
            <Flex direction={'row'} gap={16}>
              <Text className={classes.textLabel}>
                {offer.type ? amountTranslation.get(offer.type) : ''}
              </Text>
              <Text className={classes.textValue}>
                {BigNumber.minimum(
                  offer.amount,
                  offerTokenSellerBalance!
                ).toString()}
              </Text>
            </Flex>
            <Flex direction={'row'} gap={16}>
              <Text className={classes.textLabel}>
                {offer.type ? priceTranslation.get(offer.type) : ''}
              </Text>
              <Text
                className={classes.textValue}
              >{`${offer.price} ${buyTokenSymbol}`}</Text>
            </Flex>
            {initialPrice && (
              <Flex direction={'row'} gap={16}>
                <Text className={classes.textLabel}>
                  {offer.type ? initialPriceTranslation.get(offer.type) : ''}
                </Text>
                <Text className={classes.stressValue}>{initialPrice}</Text>
              </Flex>
            )}
            {priceDelta && (
              <Flex direction={'row'} gap={16}>
                <Text className={classes.textLabel}>{'Delta'}</Text>
                <Text className={classes.textValue} color={priceColor}>
                  {priceDelta}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>

        <Divider />

        <WalletERC20Balance
          tokenAddress={offer.buyerTokenAddress}
          tokenDecimals={offer.buyerTokenDecimals}
        />

        <Flex direction={'column'} gap={'sm'}>
          <Text size={'md'} ta={'left'}>
            {t1('sell')}
          </Text>
          <Flex direction={'column'} gap={8}>
            <NumberInput
              label={t('amount')}
              required={true}
              min={0}
              max={maxTokenBuy}
              showMax={true}
              placeholder={t('amount')}
              sx={{ flexGrow: 1 }}
              groupMarginBottom={16}
              setFieldValue={setFieldValue}
              {...getInputProps('amount')}
            />

            <Text size={'md'}>{t('summary')}</Text>
            <Text mb={10}>
              {` ${t('summaryText1')} ${values?.amount} ${offerTokenSymbol} ${t(
                'summaryText2'
              )} ${cleanNumber(values?.price)} ${buyTokenSymbol} ${t(
                'summaryText3'
              )} ${total} ${buyTokenSymbol}`}
            </Text>

            <Group grow={true} sx={{ padding: '0 50px 0 50px' }}>
              <Button
                type={'submit'}
                radius={'xl'}
                loading={isSubmitting}
                aria-label={t('confirm')}
                disabled={
                  process.env.NEXT_PUBLIC_ENV === 'development'
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
