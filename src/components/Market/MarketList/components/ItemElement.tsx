import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  Badge,
  Card,
  Grid,
  Group,
  MantineTheme,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons';

import { BigNumber } from 'bignumber.js';

import { OfferBadge } from 'src/components/Offer/components/OfferTypeBadge';
import { TextUrl } from 'src/components/TextUrl/TextUrl';
import { useOffer } from 'src/hooks/offers/useOffer';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { buyOfferOpen } from 'src/store/features/buyOffer/buyOfferSlice';
import { Offer } from 'src/types/offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';
import { formatPercent, formatToken, formatUsd } from 'src/utils/format';

import { Columns, OfferData } from '../Types';
import { getSiteInfo, mapColumnLabels, truncateInMiddle } from '../Utils';

const LINK_ACCESS_KEY = 'TEXT_URL';

const avatarStyle = {
  width: '40px',
  height: '40px',
};

interface ItemElementProps {
  offer: OfferData;
  isLastItem: boolean;
}
export const ItemElement: FC<ItemElementProps> = ({ offer, isLastItem }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const isLarge = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const [image, setImage] = useState<string>('');
  const [sitesInfo, setSitesInfo] = useState<
    { image: string; info: string[] }[]
  >([]);
  const [siteUrl, setSiteUrl] = useState<string>('');
  const { offer: offerAction } = useOffer(parseInt(offer.id));
  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();
  const { t } = useTranslation('buy', { keyPrefix: 'list' });
  const { t: t2 } = useTranslation('list');
  const columnLabels = mapColumnLabels(t);

  useEffect(() => {
    if (!offer || propertiesIsloading) return undefined;
    const infos: { image: string; info: string[] }[] = [];

    const tokenRequest = getPropertyToken(offer.requestedTokenAddress);
    if (tokenRequest) {
      offer.image = tokenRequest.imageLink[0];
      setImage(tokenRequest.imageLink[0]);
      setSiteUrl(tokenRequest.marketplaceLink);
      infos.push({ image: tokenRequest.imageLink[0], info: [] });
    }

    const token = getPropertyToken(offer.transferedTokenAddress);
    if (token) {
      offer.image = token.imageLink[0];
      setImage(token.imageLink[0]);
      setSiteUrl(token.marketplaceLink);
      infos.push({ image: token.imageLink[0], info: [] });
    }
  }, [getPropertyToken, offer, propertiesIsloading]);

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

  const priceDelta = new BigNumber(
    offer.requestedPrice ?? offer.initialSellingPrice ?? 0
  )
    .minus(offer.initialSellingPrice ?? 0)
    .dividedBy(
      offer.initialSellingPrice && offer.initialSellingPrice !== 0
        ? offer.initialSellingPrice
        : 1
    )
    .toNumber();

  const priceDeltaColor =
    priceDelta === 0 ? 'dimmed' : priceDelta > 0 ? 'red' : 'teal';

  /*const siteInfo: string[] = offer.siteLocation
    .split('(') //.split(/\(| et /)
    .map((locationPart) => locationPart.replace(')', ''))
    .map((locationPart) => locationPart.replace(' et ', ', '));*/

  const siteInfo = getSiteInfo(offer);

  // Triez les valeurs de siteInfo et formatez-les
  const sortedSiteInfo = siteInfo.map((locationPart, index) => {
    const indexOrder = [0, 1, 2, 3]; // Ordre d'index souhaité
    return {
      text: locationPart,
      size: index === 0 ? 'md' : index > 1 ? 'sm' : 'sm',
      fontWeight: index <= 0 ? 'bold' : undefined,
      color: index > 1 ? 'dimmed' : undefined,
      order: indexOrder.indexOf(index),
    };
  });

  // Utilisation de map pour générer les balises Text
  const locationInfo = sortedSiteInfo
    .sort((a, b) => a.order - b.order)
    .map((info, index) => (
      <Text
        fz={info.size}
        fw={info.fontWeight}
        key={index}
        color={info.color}
        style={{ padding: 0, margin: '-5px 0 0 0' }}
      >
        {info.text}
      </Text>
    ));

  const tradeToken =
    offer.type === OFFER_TYPE.BUY
      ? offer.transferedToken
      : offer.type === OFFER_TYPE.SELL
      ? offer.requestedToken
      : offer.requestedToken;

  const onOpenOffer = useCallback(
    (offerAction: Offer) => {
      dispatch({ type: buyOfferOpen, payload: offerAction });
    },
    [dispatch]
  );

  const handleClickEvent = (event: React.PointerEvent<HTMLDivElement>) => {
    const target: HTMLDivElement = event.target as HTMLDivElement;
    if (target.accessKey !== LINK_ACCESS_KEY) {
      offerAction
        ? onOpenOffer(offerAction)
        : console.warn('Offer not loaded ' + offer.id);
    }
  };

  const LogoRequested = offer.requestedTokenLogo;
  const LogoOffer = offer.transferedTokenLogo;

  return (
    <Card
      withBorder={true}
      radius={0}
      style={lastCardStyle}
      onClick={handleClickEvent}
    >
      <Grid columns={20}>
        <Grid.Col xl={4} lg={5}>
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
            }}
          >
            <OfferBadge
              offerType={offer.type}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderBottomRightRadius: '10px',
              }}
              id={offer.id}
            ></OfferBadge>
          </div>
          {isLarge && tradeSummary(offer, LogoRequested, LogoOffer)}
          {!isLarge && (
            <Group spacing={0} position={'apart'}>
              {tradeSummary(offer, LogoRequested, LogoOffer)}
              <>{badgeList(offer, theme, image, locationInfo, false)}</>
            </Group>
          )}
        </Grid.Col>
        <Grid.Col xl={4} lg={4} style={{ padding: isMobile ? 0 : undefined }}>
          {isLarge && badgeList(offer, theme, image, locationInfo, true)}
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
          {!isMobile && stackTradeToken()}
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
          {!isMobile && stackAmountForSale()}
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
                {stackTradeToken(true)}
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
        justify={isLarge ? 'center' : 'flex-start'}
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
        <div>
          <Text
            fz={isLarge ? 'lg' : 'md'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
            fw={500}
          >
            {formatToken(offer.requestedAmount ?? 0)}
          </Text>
          <Text
            fz={isLarge ? 'xs' : 'xs'}
            color={'dimmed'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
          >
            {formatUsd(
              (offer.requestedAmount ?? 0) * (offer.requestedPrice ?? 0)
            )}
          </Text>
        </div>
      </Stack>
    );
  }

  function stackTradeToken(textAlignRight = false) {
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
            {columnLabels[Columns.requestedToken]}
          </Text>
        )}
        <div>
          <Text
            fz={'md'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
            fw={500}
          >
            {tradeToken}
          </Text>
          <Text
            fz={'xs'}
            color={'dimmed'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
          >
            {'Gnosis'}
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

function tradeSummary(
  offer: OfferData,
  LogoRequested: React.FC<any> | undefined,
  LogoOffer: React.FC<any> | undefined
) {
  return (
    <Stack spacing={5} h={'100%'} align={'stretch'} justify={'center'}>
      <Group sx={{ marginTop: '10px' }} spacing={8}>
        <Stack justify={'flex-start'} spacing={0}>
          <Text fz={'md'} fw={'bold'}>
            {offer.requestedToken}
          </Text>
          <div style={{ textAlign: 'center' }}>
            {LogoRequested
              ? React.cloneElement(<LogoRequested />, { width: '24' })
              : undefined}
          </div>
        </Stack>
        <Stack justify={'flex-start'} spacing={0}>
          <Text fz={'md'} fw={'bold'} sx={{ paddingBottom: '3px' }}>
            {' contre '}
          </Text>
          <div style={{ textAlign: 'center' }}>
            <IconArrowRight size={20} aria-label={'Arrow'} />
          </div>
        </Stack>
        <Stack justify={'flex-start'} spacing={0}>
          <Text fz={'md'} fw={'bold'}>
            {offer.transferedToken}
          </Text>
          <div style={{ textAlign: 'center' }}>
            {LogoOffer
              ? React.cloneElement(<LogoOffer />, { width: '24' })
              : undefined}
          </div>
        </Stack>
      </Group>
    </Stack>
  );
}

function badgeList(
  offer: OfferData,
  theme: MantineTheme,
  image: string,
  locationInfo: JSX.Element[],
  isStack: boolean
) {
  return (
    <Group position={'center'}>
      {!isStack && (
        <Group position={'left'}>
          <Avatar src={image} alt={offer.id} style={avatarStyle} radius={37} />
          <div style={{ padding: 0, margin: 0 }}>{locationInfo}</div>
        </Group>
      )}

      <Stack spacing={0} h={'100%'} align={'stretch'} justify={'flex-end'}>
        {isStack && (
          <Group position={'left'}>
            <Avatar
              src={image}
              alt={offer.id}
              style={avatarStyle}
              radius={37}
            />
            <div style={{ padding: 0, margin: 0 }}>{locationInfo}</div>
          </Group>
        )}
        <div>
          <Badge
            variant={'light'}
            color={'lime'}
            radius={'sm'}
            style={{
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? `${theme.colors.brand[5]}0F`
                  : `${theme.colors.brand[6]}0F`,
              color:
                theme.colorScheme === 'dark'
                  ? `${theme.colors.brand[5]}`
                  : `${theme.colors.brand[6]}`,
            }}
          >
            <Group>
              <Text>{'Initial Price '}</Text>
              <Text>{formatUsd(offer.initialSellingPrice ?? 0)}</Text>
            </Group>
          </Badge>
        </div>
        <div>
          <Badge
            variant={'light'}
            color={'yellow'}
            radius={'sm'}
            style={{
              backgroundColor: `${theme.colors.yellow[5]}0F`,
              color: theme.colors.yellow[5],
            }}
          >
            <Group>
              <Text>{'Electricity Price'}</Text>
              <Text>{formatUsd(offer.electricityPrice, 4)}</Text>
            </Group>
          </Badge>
        </div>
        <div>
          <Badge
            variant={'light'}
            color={'yellow'}
            radius={'sm'}
            style={{
              backgroundColor: `${theme.colors.yellow[5]}0F`,
              color: theme.colors.yellow[5],
            }}
          >
            <Group>
              <Text>{'Launch Date'}</Text>
              <Text>{offer.launchDate}</Text>
            </Group>
          </Badge>
        </div>
      </Stack>
    </Group>
  );
}
