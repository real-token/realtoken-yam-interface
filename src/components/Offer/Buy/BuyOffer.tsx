import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import { createStyles, em } from '@mantine/core';
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Group,
  Image,
  Modal,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { useAtomValue } from 'jotai';

import { Erc20, Erc20ABI } from 'src/abis';
import { NumberInput } from 'src/components/NumberInput';
import {
  AddErc20ToWallet,
  addErc20TokenToMetaMask,
} from 'src/components/Wallet/AddTokenToWallet';
import { ContractsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useAppSelector } from 'src/hooks/react-hooks';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { providerAtom } from 'src/states';
import { selectPrices } from 'src/store/features/interface/interfaceSelector';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { Price } from 'src/types/price';
import { getContract } from 'src/utils';
import {
  formatBigDecimals,
  formatPercent,
  formatToken,
  formatUsd,
} from 'src/utils/format';
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

export const BuyOffer: FC<BuyOffertProps> = ({ offer }) => {
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
      <BuyOfferForms offer={offer}></BuyOfferForms>
    </OfferContainer>
  );
};

export const BuyOfferForms: FC<BuyOffertProps> = ({ offer }) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { classes } = useStyle();
  const theme = useMantineTheme();
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
  const prices: Price = useAppSelector(selectPrices);
  const {
    name: offerTokenName,
    symbol: offerTokenSymbol,
    logoUrl: offerTokenLogo,
    decimals: offerTokenDecimals,
  } = useERC20TokenInfo(offer.offerTokenAddress);
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
  const { t: t4 } = useTranslation('notifications', {
    keyPrefix: 'buyOfferFinish',
  });

  const { balance, WalletERC20Balance } =
    useWalletERC20Balance(buyerTokenAddress);

  const total = values?.amount * values?.price;

  const connector = useAtomValue(providerAtom);

  console.log('connector', connector);

  const onHandleSubmit = useCallback(
    async (formValues: BuyOfferFormValues) => {
      setBuyAmount(formValues.amount);
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
        onFinished
      );
    },
    [account, provider, activeChain, realTokenYamUpgradeable, offer, connector]
  );

  const handleAddErc20ToWallet = (
    erc20TokenAddress: string,
    erc20TokenSymbol: string,
    erc20TokenDecimal: number,
    erc20TokenImage: string
  ) => {
    addErc20TokenToMetaMask(
      erc20TokenAddress,
      erc20TokenSymbol,
      erc20TokenDecimal,
      erc20TokenImage
    );
    modalFinishClose();
  };

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

  const deltaPriceTranslation: Map<OFFER_TYPE, string> = new Map<
    OFFER_TYPE,
    string
  >([
    [OFFER_TYPE.BUY, t('buyOfferTypeDeltaPrice')],
    [OFFER_TYPE.SELL, t('sellOfferTypeDeltaPrice')],
    [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypeDeltaPrice')],
  ]);

  const amountTranslation: Map<OFFER_TYPE, string> = new Map<
    OFFER_TYPE,
    string
  >([
    [OFFER_TYPE.BUY, t('buyOfferTypeAmount')],
    [OFFER_TYPE.SELL, t('sellOfferTypeAmount')],
    [OFFER_TYPE.EXCHANGE, t('exchangeOfferTypeAmount')],
  ]);

  const {
    offerPrice,
    initialPrice,
    priceDelta,
    priceColor,
  }: {
    offerPrice: string | undefined;
    initialPrice: string | undefined;
    priceDelta: string | undefined;
    priceColor: string | undefined;
  } = offerPrices(offer, buyTokenSymbol, prices);

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Modal
        opened={modalFinishOpened}
        onClose={modalFinishClose}
        title={<Title order={3}>{t4('title')}</Title>}
        centered={true}
        size={'auto'}
        radius={'lg'}
      >
        <Text fw={'400'}>
          {t4('message') +
            formatToken(buyAmount, offerTokenSymbol ?? offer.offerTokenName) +
            '.'}
        </Text>
        <Space h={5}></Space>
        <Text fw={'400'}>{t4('question')}</Text>
        <Space h={'xl'}></Space>
        <Group position={'center'}>
          <Button radius={'xl'} color={'red'} onClick={modalFinishClose}>
            {'Non merci'}
          </Button>
          <Button
            variant={'filled'}
            leftIcon={
              <ActionIcon size={16} variant={'transparent'}>
                <Image
                  src={
                    'https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg'
                  }
                  alt={'nft'}
                  height={16}
                ></Image>
              </ActionIcon>
            }
            radius={'xl'}
            onClick={() =>
              handleAddErc20ToWallet(
                offer.offerTokenAddress,
                offerTokenSymbol ?? offer.offerTokenName,
                offerTokenDecimals
                  ? parseInt(offerTokenDecimals)
                  : parseInt(offer.offerTokenDecimals),
                offerTokenLogo ?? ''
              )
            }
            style={{ backgroundColor: theme.colors.brand[5] }}
          >
            {'Ajouter'}
          </Button>
        </Group>
      </Modal>
      <Stack justify={'center'} align={'stretch'}>
        <Flex direction={'column'} gap={'sm'}>
          <Flex direction={'column'} gap={8}>
            <Flex direction={'row'} gap={16}>
              <Text className={classes.textLabel}>{t('offerTokenName')}</Text>
              <Group spacing={5}>
                <Text className={classes.textValue}>{offerTokenName}</Text>
                <AddErc20ToWallet
                  erc20TokenAddress={offer.offerTokenAddress}
                  erc20TokenSymbol={offerTokenSymbol ?? offer.offerTokenName}
                  erc20TokenImage={offerTokenLogo}
                  erc20TokenDecimal={
                    offerTokenDecimals
                      ? parseInt(offerTokenDecimals)
                      : parseInt(offer.offerTokenDecimals)
                  }
                ></AddErc20ToWallet>
              </Group>
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
                {offer.type ? priceTranslation.get(offer.type) : 'Price/token'}
              </Text>
              <Text className={classes.textValue}>{offerPrice}</Text>
            </Flex>
            {initialPrice && (
              <Flex direction={'row'} gap={16}>
                <Text className={classes.textLabel}>
                  {offer.type
                    ? initialPriceTranslation.get(offer.type)
                    : 'Initial price/token'}
                </Text>
                <Text className={classes.stressValue}>{initialPrice}</Text>
              </Flex>
            )}
            {priceDelta && (
              <Flex direction={'row'} gap={16}>
                <Text className={classes.textLabel}>
                  {offer.type
                    ? deltaPriceTranslation.get(offer.type)
                    : 'Delta price/token'}
                </Text>
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
function offerPrices(
  offer: Offer,
  buyTokenSymbol: string | undefined,
  prices: Price
) {
  let offerPrice: string | undefined = undefined;
  let initialPrice: string | undefined = undefined;
  let priceDelta: string | undefined = undefined;
  let priceColor: string | undefined = undefined;

  switch (offer.type) {
    case OFFER_TYPE.BUY: {
      const tokenInitialPricePerUsd = new BigNumber(1)
        .dividedBy(offer.officialPrice ?? 1)
        .toNumber();
      const tokenInitialUsdPrice = new BigNumber(
        offer.officialPrice ?? 1
      ).toNumber();

      if (offer.priceDelta && offer.priceDelta > 0) {
        priceColor = 'teal';
      } else if (offer.priceDelta && offer.priceDelta < 0) {
        priceColor = 'red';
      }
      const tokenUsdPrice = new BigNumber(
        prices[offer.offerTokenAddress.toLowerCase()]
      );
      const deltaUsdPrice = tokenUsdPrice
        .dividedBy(parseFloat(offer.price))
        .minus(tokenInitialUsdPrice)
        .toNumber();

      initialPrice =
        formatBigDecimals(tokenInitialPricePerUsd, 6) +
        (' ' + buyTokenSymbol ?? '');
      priceDelta = offer.priceDelta
        ? formatPercent(offer.priceDelta)
        : undefined;
      priceDelta = offer.priceDelta
        ? formatUsd(deltaUsdPrice) +
          ' (' +
          sign(offer.priceDelta) +
          formatPercent(offer.priceDelta) +
          ')'
        : undefined;
      offerPrice = offer.price + ' ' + buyTokenSymbol;

      break;
    }
    case OFFER_TYPE.SELL: {
      const tokenInitialUsdPrice =
        offer.officialPrice ?? parseFloat(offer.price) ?? 0;

      if (offer.priceDelta && offer.priceDelta > 0) {
        priceColor = 'red';
      } else if (offer.priceDelta && offer.priceDelta < 0) {
        priceColor = 'teal';
      }

      const tokenUsdPrice = new BigNumber(
        prices[offer.buyerTokenAddress.toLowerCase()]
      );

      const deltaUsdPrice = tokenUsdPrice
        .times(parseFloat(offer.price))
        .minus(tokenInitialUsdPrice)
        .toNumber();

      initialPrice = formatUsd(tokenInitialUsdPrice);
      offerPrice = offer.price + ' ' + buyTokenSymbol;
      priceDelta = offer.priceDelta
        ? formatUsd(deltaUsdPrice) +
          ' (' +
          sign(offer.priceDelta) +
          formatPercent(offer.priceDelta) +
          ')'
        : undefined;
      break;
    }
    case OFFER_TYPE.EXCHANGE: {
      if (offer.sites.buying.tokenOfficialPrice > 0) {
        const initalRate = new BigNumber(
          offer.sites.selling.tokenOfficialPrice
        ).dividedBy(offer.sites.buying.tokenOfficialPrice);

        const rate = exchangeRates(offer);

        if (rate.delta > 0) {
          priceColor = 'red';
        } else if (rate.delta < 0) {
          priceColor = 'teal';
        }

        initialPrice =
          formatBigDecimals(initalRate.toNumber(), 4) +
          ' ' +
          offer.buyerTokenName;
        priceDelta =
          formatUsd(rate.delta) +
          ' (' +
          sign(rate.delta) +
          formatPercent(rate.percent) +
          ')';
      } else {
        const p1 = new BigNumber(prices[offer.buyerTokenAddress.toLowerCase()]);

        const p2 = new BigNumber(prices[offer.offerTokenAddress.toLowerCase()]);

        const priceDeltaUsd = p1.times(parseFloat(offer.price)).minus(p2);

        if (priceDeltaUsd.toNumber() > 0) {
          priceColor = 'red';
        } else if (priceDeltaUsd.toNumber() < 0) {
          priceColor = 'teal';
        }

        initialPrice =
          formatBigDecimals(p2.dividedBy(p1).toNumber()) + ' ' + buyTokenSymbol;

        priceDelta =
          formatBigDecimals(priceDeltaUsd.toNumber()) +
          ' ' +
          buyTokenSymbol +
          ' (' +
          sign(priceDeltaUsd.toNumber()) +
          formatPercent(priceDeltaUsd.dividedBy(p1).toNumber()) +
          ')';
      }

      offerPrice = offer.price + ' ' + buyTokenSymbol;
      break;
    }
    default: {
      //statements;
      break;
    }
  }
  return { offerPrice, initialPrice, priceDelta, priceColor };
}

function sign(num: number): string {
  return num > 0 ? '+' : '';
}

function exchangeRates(offer: Offer): { delta: number; percent: number } {
  const usdInitPerTokenForSale = new BigNumber(
    offer.sites.selling.tokenOfficialPrice
    //offer.sites.transfered.tokenOfficialPrice
  );
  const usdInitPerTokenBuyWith = new BigNumber(
    offer.sites.buying.tokenOfficialPrice
  );

  const numberOfTokenForSalePerTokenBuyWith = new BigNumber(1).dividedBy(
    parseFloat(offer.price)
  );

  const usdPerTokenForSale = usdInitPerTokenBuyWith.dividedBy(
    numberOfTokenForSalePerTokenBuyWith
  );

  const usdDeltaPerTokenForSale = usdPerTokenForSale.minus(
    usdInitPerTokenForSale
  );

  return {
    delta: usdDeltaPerTokenForSale.toNumber(),
    percent: usdDeltaPerTokenForSale
      .dividedBy(usdInitPerTokenForSale)
      .toNumber(),
  };
}
