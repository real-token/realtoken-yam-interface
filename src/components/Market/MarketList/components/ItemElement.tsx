import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Card,
  Grid,
  Group,
  Progress,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { BigNumber } from 'bignumber.js';

import { OfferBadgeAbsolute } from 'src/components/Offer/components/OfferTypeBadge';
import { useOffer } from 'src/hooks/offers/useOffer';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { useAppSelector } from 'src/hooks/react-hooks';
import { buyOfferOpen } from 'src/store/features/buyOffer/buyOfferSlice';
import { selectPrices } from 'src/store/features/interface/interfaceSelector';
import { Offer } from 'src/types/offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';
import { Price } from 'src/types/price';
import {
  formatPercent,
  formatSmallToken,
  formatTimestamp,
  formatTimestampDay,
  formatTimestampHour,
  formatToken,
  formatUsd,
} from 'src/utils/format';

import { LINK_ACCESS_KEY, SPOT_ACCESS_KEY } from '../Constants';
import { Columns, OfferData } from '../Types';
import { mapColumnLabels, truncateInMiddle } from '../Utils';
import { SiteElement } from './SiteElement';
import { TokensTradedElement } from './TokensTradedElement';

interface ItemElementProps {
  offer: OfferData;
  isLastItem: boolean;
}
export const ItemElement: FC<ItemElementProps> = ({ offer, isLastItem }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const isLarge = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  //const isSmallMobile = useMediaQuery(`(max-width: 300px`);
  const { offer: offerAction } = useOffer(parseInt(offer.id));
  const { t } = useTranslation(offer.type.toLowerCase(), { keyPrefix: 'list' });
  const { t: t2 } = useTranslation('list');
  const columnLabels = mapColumnLabels(t);
  //console.log('ITEM OFFER', JSON.stringify(offer, null, 4));
  const prices: Price = useAppSelector(selectPrices);
  const lastCardStyle = isLastItem
    ? {
        marginTop: '-1px',
        borderRadius: '0 0 10px 10px',
        cursor: 'pointer',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      }
    : {
        marginTop: '-1px',
        cursor: 'pointer',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      };

  const priceDelta = calculatePriceDelta(offer, prices);

  const priceDeltaColor =
    priceDelta === 0
      ? 'dimmed'
      : (priceDelta < 0 && offer.type === OFFER_TYPE.BUY) ||
        (priceDelta > 0 && offer.type !== OFFER_TYPE.BUY)
      ? 'red'
      : 'teal';

  const tokenPerSellingToken = formatSmallToken(
    new BigNumber(1).dividedBy(offer.requestedRate).toNumber(),
    offer.requestedToken
  );
  const perOfferToken = t2('per') + offer.transferedToken;

  const onOpenOffer = useCallback(
    (offerAction: Offer) => {
      dispatch({ type: buyOfferOpen, payload: offerAction });
    },
    [dispatch]
  );

  const handleClickEvent = (event: React.PointerEvent<HTMLDivElement>) => {
    const target: HTMLDivElement = event.target as HTMLDivElement;
    if (
      target.accessKey !== LINK_ACCESS_KEY &&
      target.accessKey !== SPOT_ACCESS_KEY
    ) {
      offerAction
        ? onOpenOffer(offerAction)
        : console.warn('Offer not loaded ' + offer.id);
    }
  };

  return (
    <Card
      withBorder={true}
      radius={0}
      style={lastCardStyle}
      onClick={handleClickEvent}
    >
      <Grid columns={20}>
        <Grid.Col xl={4} lg={5}>
          <OfferBadgeAbsolute
            offerType={offer.type}
            id={offer.id}
          ></OfferBadgeAbsolute>

          {isLarge && <TokensTradedElement offer={offer}></TokensTradedElement>}
          {!isLarge && (
            <Group spacing={10} position={'left'}>
              <TokensTradedElement offer={offer}></TokensTradedElement>
              <SiteElement offer={offer}></SiteElement>
            </Group>
          )}
        </Grid.Col>
        <Grid.Col xl={4} lg={4} style={{ padding: isMobile ? 0 : undefined }}>
          {isLarge && <SiteElement offer={offer}></SiteElement>}
        </Grid.Col>
        <Grid.Col
          xl={3}
          lg={2}
          md={5}
          sm={5}
          xs={5}
          style={{
            paddingTop: isMobile ? 0 : undefined,
            paddingBottom: isMobile ? 0 : undefined,
          }}
        >
          {!isMobile && stackSeller()}
        </Grid.Col>
        <Grid.Col
          xl={3}
          lg={3}
          md={5}
          sm={5}
          xs={5}
          style={{
            paddingTop: isMobile ? 0 : undefined,
            paddingBottom: isMobile ? 0 : undefined,
          }}
        >
          {!isMobile && stackTokenPrice()}
        </Grid.Col>
        <Grid.Col
          xl={3}
          lg={3}
          md={5}
          sm={5}
          xs={5}
          style={{
            paddingTop: isMobile ? 0 : undefined,
            paddingBottom: isMobile ? 0 : undefined,
          }}
        >
          {!isMobile && stackOfferDate()}
        </Grid.Col>
        <Grid.Col
          xl={3}
          lg={3}
          md={5}
          sm={5}
          xs={5}
          style={{
            paddingTop: isMobile ? 0 : undefined,
            paddingBottom: isMobile ? 0 : undefined,
          }}
        >
          {!isMobile && stackAmountForSale(true)}
        </Grid.Col>

        <Grid.Col
          style={{
            paddingTop: isMobile ? 5 : 0,
            paddingBottom: isMobile ? 5 : 0,
          }}
        >
          {isMobile && (
            <Stack>
              <Group position={'apart'}>
                {stackSeller()}
                {stackOfferDate(true)}
              </Group>
              <Group position={'apart'}>
                {stackTokenPrice()}
                {stackAmountForSale(true)}
              </Group>
            </Stack>
          )}
        </Grid.Col>
      </Grid>
    </Card>
  );

  function stackAmountForSale(textAlignRight = false) {
    return (
      <Stack
        h={'100%'}
        align={'stretch'}
        justify={isLarge ? 'flex-end' : 'flex-start'}
        spacing={0}
      >
        {!isLarge && (
          <Text
            fz={'md'}
            ta={textAlignRight ? 'right' : 'left'}
            color={'dimmed'}
          >
            {columnLabels[Columns.requestedAmount]}
          </Text>
        )}
        {!isLarge && (
          <div>
            <Group position={'right'}>
              <Text size={'xs'} align={'center'}>
                {formatToken(offer.requestedAmount ?? 0) +
                  ' / ' +
                  formatToken(offer.initialAmount)}
              </Text>
            </Group>
            <Progress
              color={'yellow'}
              value={((offer.requestedAmount ?? 0) / offer.initialAmount) * 100}
            />
            <Group position={'right'}>
              <Text size={'xs'} align={'center'}>
                {formatPercent(
                  (offer.requestedAmount ?? 0) / offer.initialAmount
                )}
              </Text>
            </Group>
          </div>
        )}

        {isLarge && (
          <Group w={'100%'} position={textAlignRight ? 'right' : 'left'}>
            <div>
              <RingProgress
                size={100}
                label={
                  <Text size={'xs'} align={'center'}>
                    {formatToken(offer.requestedAmount ?? 0) +
                      ' / ' +
                      formatToken(offer.initialAmount)}
                  </Text>
                }
                sections={[
                  {
                    value:
                      ((offer.requestedAmount ?? 0) / offer.initialAmount) *
                      100,
                    color: 'yellow',
                  },
                ]}
              />
              <Text
                fz={isLarge ? 'xs' : 'xs'}
                color={'dimmed'}
                ta={isLarge || textAlignRight ? 'center' : 'left'}
                sx={{ marginTop: '-10px' }}
              >
                {formatUsd(
                  (offer.requestedAmount ?? 0) * (offer.requestedPrice ?? 0)
                )}
              </Text>
            </div>
          </Group>
        )}
      </Stack>
    );
  }

  function stackOfferDate(textAlignRight = false) {
    return (
      <Stack
        h={'100%'}
        align={'stretch'}
        justify={isLarge ? 'center' : 'flex-start'}
        spacing={0}
      >
        {!isLarge && (
          <Text
            fz={'md'}
            ta={textAlignRight ? 'right' : 'left'}
            color={'dimmed'}
          >
            {columnLabels[Columns.createdAt]}
          </Text>
        )}
        <div>
          <Text
            fz={'md'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
            fw={500}
          >
            {formatTimestampDay(offer.createdAt)}
          </Text>
          <Text
            fz={'xs'}
            color={'dimmed'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
          >
            {formatTimestampHour(offer.createdAt)}
          </Text>
        </div>
      </Stack>
    );
  }

  function stackTokenPrice() {
    return (
      <Stack
        h={'100%'}
        align={'stretch'}
        justify={isLarge ? 'center' : 'flex-start'}
        spacing={0}
      >
        {!isLarge && (
          <Text fz={'md'} ta={'left'} color={'dimmed'}>
            {columnLabels[Columns.requestedPrice]}
          </Text>
        )}
        <div>
          <Text
            fz={isLarge ? 'md' : 'md'}
            ta={isLarge ? 'right' : 'left'}
            fw={500}
          >
            {formatUsd(offer.requestedPrice ?? offer.initialSellingPrice ?? 0)}
          </Text>
          <Text
            fz={isLarge ? 'xs' : 'xs'}
            color={priceDeltaColor}
            ta={isLarge ? 'right' : 'left'}
          >
            {(priceDelta > 0 ? '+' : '') + formatPercent(priceDelta)}
          </Text>
        </div>
      </Stack>
    );
  }

  function stackSeller() {
    return (
      <Stack
        h={'100%'}
        align={'stretch'}
        justify={isLarge ? 'center' : 'flex-start'}
        spacing={0}
      >
        {!isLarge && (
          <Text fz={'md'} ta={'left'} color={'dimmed'}>
            {columnLabels[Columns.requesterName]}
          </Text>
        )}
        <div>
          <Text fz={'md'} ta={isLarge ? 'right' : 'left'}>
            {t2(offer.requesterName)}
          </Text>
          <Text
            fz={isLarge ? 'xs' : 'xs'}
            color={'dimmed'}
            ta={isLarge ? 'right' : 'left'}
            //truncate={'start'}
            //style={{ color: 'rgba(0, 0, 0, 0)' }}
          >
            {truncateInMiddle(offer.requesterAddress)}
          </Text>
        </div>
      </Stack>
    );
  }
};

export const ItemEmptyElement: FC = () => {
  const theme = useMantineTheme();
  const { t } = useTranslation('list');
  return (
    <Card
      withBorder={true}
      radius={0}
      style={{
        marginTop: '-1px',
        borderRadius: '0 0 10px 10px',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      }}
    >
      <Text ta={'center'}>{t('noData')}</Text>
    </Card>
  );
};
function calculatePriceDelta(offer: OfferData, prices: Price) {
  let priceDelta = offer.priceDelta;

  if (!priceDelta) {
    if (offer.initialSellingPrice) {
      const usdInitPerTokenForSale = new BigNumber(
        offer.sites.transfered.tokenOfficialPrice
      );
      const usdInitPerTokenBuyWith = new BigNumber(
        offer.sites.requested.tokenOfficialPrice
      );

      const numberOfTokenForSalePerTokenBuyWith = new BigNumber(1).dividedBy(
        offer.requestedRate
      );

      const usdPerTokenForSale = usdInitPerTokenBuyWith.dividedBy(
        numberOfTokenForSalePerTokenBuyWith
      );

      const usdDeltaPerTokenForSale = usdPerTokenForSale.minus(
        usdInitPerTokenForSale
      );

      priceDelta = usdDeltaPerTokenForSale
        .dividedBy(usdInitPerTokenForSale)
        .toNumber();

      // console.log(
      //   'WARNING CALC',
      //   offer.id,
      //   'numberOfTokenForSalePerTokenBuyWith',
      //   numberOfTokenForSalePerTokenBuyWith.toNumber()
      // );
      // console.log(
      //   'WARNING CALC',
      //   offer.id,
      //   'usdPerTokenForSale',
      //   usdPerTokenForSale.toNumber()
      // );
      // console.log(
      //   'WARNING CALC',
      //   offer.id,
      //   'usdInitPerTokenForSale',
      //   usdInitPerTokenForSale.toNumber()
      // );
    } else {
      const p1 = new BigNumber(
        prices[offer.requestedTokenAddress.toLowerCase()]
      );

      const p2 = new BigNumber(
        prices[offer.transferedTokenAddress.toLowerCase()]
      );

      priceDelta = p2
        .times(offer.requestedPrice)
        .minus(p1)
        .dividedBy(p2)
        .toNumber();
    }
  }

  return priceDelta;
}
