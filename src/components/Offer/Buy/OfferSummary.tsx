import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';

import {
  Accordion,
  ActionIcon,
  ColorScheme,
  CopyButton,
  Flex,
  Group,
  MantineTheme,
  Space,
  Stack,
  Text,
  Tooltip,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconCoins,
  IconCopy,
  IconTrendingUp,
} from '@tabler/icons';

import BigNumber from 'bignumber.js';

import { AddErc20ToWallet } from 'src/components/Wallet/AddTokenToWallet';
import { useAppSelector } from 'src/hooks/react-hooks';
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { selectPrices } from 'src/store/features/interface/interfaceSelector';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { Price } from 'src/types/price';
import {
  formatBigDecimals,
  formatPercent,
  formatSmallPercent,
  formatUsd,
} from 'src/utils/format';

const EMPHASIS_RATE = 0.2;

const descriptionsList = [
  {
    id: 'general',
    label: 'General swaap description',
  },
];

const useStyles = createStyles((theme) => ({
  container: {
    // subscribe to color scheme changes right in your styles
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    display: 'flex',
    width: '100%',
    gap: theme.radius.md,
    alignItems: 'center',
    borderRadius: theme.radius.md,
    padding: theme.radius.md,
  },
  wallet: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.brand[5],
    borderRadius: theme.radius.md,
    padding: 5,
  },
  balance: {
    flexGrow: 1,
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 0,
    width: '100%',
    textAlign: 'left',
  },
}));

interface AccordionLabelProps {
  offer: Offer;
  theme: MantineTheme;
  priceDelta?: string;
  priceColor?: string;
  t: TFunction;
}

function AccordionLabel({
  offer,
  theme,
  priceDelta,
  priceColor,
  t,
}: AccordionLabelProps) {
  const symbolCurrency =
    offer.type === OFFER_TYPE.BUY
      ? offer.offerTokenSymbol
      : offer.buyerTokenSymbol;
  const symbolToken =
    offer.type === OFFER_TYPE.BUY
      ? offer.buyerTokenSymbol
      : offer.offerTokenSymbol;

  const exchangeRate = new BigNumber(
    offer.type === OFFER_TYPE.BUY
      ? (1 / new BigNumber(offer.price).toNumber()).toString()
      : offer.price
  );

  const hexColor = priceColor
    ? theme.colorScheme === 'dark'
      ? theme.colors[priceColor][9]
      : theme.colors[priceColor][5]
    : undefined;

  const alertPrice =
    offer.priceDelta && Math.abs(offer.priceDelta) > EMPHASIS_RATE
      ? true
      : false;

  return (
    <Group noWrap={true} position={'apart'}>
      <Stack spacing={0}>
        <Group noWrap={true} m={0} spacing={3}>
          {alertPrice && (
            <Tooltip
              label={
                'Attention, le prix de vente est superieur à ' +
                formatSmallPercent(EMPHASIS_RATE)
              }
              withArrow={true}
              position={'right'}
            >
              <IconAlertCircle size={'1rem'} />
            </Tooltip>
          )}
          <Text size={'sm'} fw={500}>
            {'1 ' +
              symbolToken +
              ' = ' +
              formatBigDecimals(exchangeRate.toNumber(), 6) +
              ' ' +
              symbolCurrency}
          </Text>
        </Group>
        <Text size={'xs'} color={'dimmed'}>
          {t('offerPrice')}
        </Text>
      </Stack>
      <Stack spacing={0}>
        <Group noWrap={true} spacing={5}>
          <IconTrendingUp size={'1rem'} color={hexColor} />
          <Text size={'sm'} color={priceColor} fw={700}>
            {priceDelta}
          </Text>
        </Group>
        <Text size={'xs'} color={'dimmed'}>
          {t('deltaPrice')}
        </Text>
      </Stack>
    </Group>
  );
}

interface OfferSummaryProps {
  offer: Offer;
  sellerTokenBalance: string;
}

const OfferSummary: React.FC<OfferSummaryProps> = ({
  offer,
  sellerTokenBalance,
}) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { t } = useTranslation('swap');
  const prices: Price = useAppSelector(selectPrices);
  const { logoUrl: offerTokenLogo } = useERC20TokenInfo(
    offer.offerTokenAddress
  );
  const emphasis =
    offer.priceDelta && Math.abs(offer.priceDelta) > EMPHASIS_RATE
      ? true
      : false;

  const {
    priceDelta,
    priceColor,
  }: {
    offerPrice: string | undefined;
    initialPrice: string | undefined;
    priceDelta: string | undefined;
    priceColor: string | undefined;
  } = offerPrices(offer, offer.buyerTokenSymbol, prices, theme.colorScheme);

  const borderColor = priceColor
    ? theme.colorScheme === 'dark'
      ? theme.colors[priceColor][9]
      : theme.colors[priceColor][5]
    : undefined;

  const symbolCurrency =
    offer.type === OFFER_TYPE.BUY
      ? offer.offerTokenSymbol
      : offer.buyerTokenSymbol;
  const symbolToken =
    offer.type === OFFER_TYPE.BUY
      ? offer.buyerTokenSymbol
      : offer.offerTokenSymbol;

  const availableAmount = BigNumber.minimum(
    offer.amount,
    sellerTokenBalance
  ).toNumber();

  const availableAmountPayable = new BigNumber(availableAmount)
    .times(offer.price)
    .toNumber();

  const tokenStock =
    offer.type === OFFER_TYPE.BUY ? availableAmountPayable : availableAmount;
  const tokenStockPrice =
    offer.type === OFFER_TYPE.BUY ? availableAmount : availableAmountPayable;

  const items = descriptionsList.map((item) => (
    <Accordion.Item
      value={item.id}
      key={item.label}
      style={{
        borderColor: emphasis ? borderColor : undefined,
      }}
    >
      <Accordion.Control>
        <AccordionLabel
          offer={offer}
          theme={theme}
          priceColor={priceColor}
          priceDelta={priceDelta}
          t={t}
        />
      </Accordion.Control>
      <Accordion.Panel>
        <Flex direction={'row'} gap={16}>
          <Text color={'dimmed'}>{t('tokenForSale')}</Text>
          <Group spacing={5}>
            <Text>{offer.offerTokenName}</Text>
            <CopyButton value={offer.offerTokenAddress} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? t('copySuccessfully') : t('copyAddress')}
                  withArrow={true}
                  position={'right'}
                >
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    onClick={copy}
                    size={'sm'}
                  >
                    {copied ? (
                      <IconCheck size={'1rem'} />
                    ) : (
                      <IconCopy size={'1rem'} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
            <AddErc20ToWallet
              erc20TokenAddress={offer.offerTokenAddress}
              erc20TokenSymbol={offer.offerTokenSymbol}
              erc20TokenImage={offerTokenLogo}
              erc20TokenDecimal={parseInt(offer.offerTokenDecimals)}
            ></AddErc20ToWallet>
          </Group>
        </Flex>
        {offer.sellerName !== 'UNKNOWN' && (
          <Flex direction={'row'} gap={16}>
            <Text color={'dimmed'}>{t('sellerName')}</Text>
            <Text>{t(offer.sellerName)}</Text>
          </Flex>
        )}
        <Flex direction={'row'} gap={16} align={'center'}>
          <Text color={'dimmed'} style={{ whiteSpace: 'nowrap' }}>
            {t('sellerAddress')}
          </Text>
          <Group spacing={5}>
            <Text>{formatEthereumAddress(offer.sellerAddress)}</Text>
            <CopyButton value={offer.sellerAddress} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? t('copySuccessfully') : t('copyAddress')}
                  withArrow={true}
                  position={'right'}
                >
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    onClick={copy}
                    size={'sm'}
                  >
                    {copied ? (
                      <IconCheck size={'1rem'} />
                    ) : (
                      <IconCopy size={'1rem'} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        </Flex>

        <Flex direction={'row'} gap={16}>
          <Text color={'dimmed'}>{t('initialPrice')}</Text>
          <Text color={theme.colors.brand[5]}>
            {'1 ' + symbolToken + ' = $' + offer.officialPrice}
          </Text>
        </Flex>

        <Space h={20}></Space>
        <Group noWrap={true}>
          <Text style={{ whiteSpace: 'nowrap' }} color={'dimmed'}>
            {t('stock')}
          </Text>
        </Group>
        <Flex direction={'column'} gap={'xs'}>
          <div className={classes.container}>
            <div className={classes.wallet}>
              <IconCoins
                color={
                  theme.colorScheme === 'dark' ? theme.colors.brand[5] : 'white'
                }
                size={24}
              />
            </div>
            <div className={classes.balanceContainer}>
              <Group noWrap={true} spacing={5} m={0}>
                <Text fz={'md'} fw={700}>
                  {formatBigDecimals(tokenStock)}
                </Text>
                <Text fz={'md'} fw={700}>
                  {symbolToken}
                </Text>
              </Group>

              <Group noWrap={true} spacing={5} m={0}>
                <Text fz={'xs'} color={'dimmed'}>
                  {formatBigDecimals(tokenStockPrice, 6)}
                </Text>
                <Text fz={'xs'} color={'dimmed'}>
                  {symbolCurrency}
                </Text>
              </Group>
            </div>
          </div>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion
      chevronPosition={'right'}
      variant={'contained'}
      defaultValue={emphasis ? 'general' : undefined}
    >
      {items}
    </Accordion>
  );
};

export default OfferSummary;

function offerPrices(
  offer: Offer,
  buyTokenSymbol: string | undefined,
  prices: Price,
  scheme: ColorScheme
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
        priceColor = scheme === 'dark' ? 'teal' : 'green';
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
        priceColor = priceColor = scheme === 'dark' ? 'teal' : 'green';
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
          priceColor = scheme === 'dark' ? 'teal' : 'green';
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
          priceColor = scheme === 'dark' ? 'teal' : 'green';
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

function formatEthereumAddress(address: string) {
  return address.slice(0, 7) + '...' + address.slice(-5);
}
