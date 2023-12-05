import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, Grid, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { OfferBadgeAbsolute } from 'src/components/Offer/components/OfferTypeBadge';
import { useOffer } from 'src/hooks/offers/useOffer';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { buyOfferOpen } from 'src/store/features/buyOffer/buyOfferSlice';
import { Offer } from 'src/types/offer';

import { LINK_ACCESS_KEY, SPOT_ACCESS_KEY } from '../Constants';
import { Columns, OfferData } from '../Types';
import { mapColumnLabels } from '../Utils';
import { SiteElement } from './SiteElement';
import { TokensTradedElement } from './TokensTradedElement';
import { OfferAmount } from './widgets/OfferAmount';
import { OfferDate } from './widgets/OfferDate';
import { OfferPrice } from './widgets/OfferPrice';
import { OfferSeller } from './widgets/OfferSeller';

interface ItemElementProps {
  offer: OfferData;
  isLastItem: boolean;
}
export const ItemElement: FC<ItemElementProps> = ({ offer, isLastItem }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const isLargeBk = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const isMobileBk = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const isLarge = isLargeBk ?? true;
  const isMobile = isMobileBk ?? false;
  //const isSmallMobile = useMediaQuery(`(max-width: 300px`);
  const { offer: offerAction } = useOffer(parseInt(offer.id));
  const { t } = useTranslation(offer.type.toLowerCase(), { keyPrefix: 'list' });
  const columnLabels = mapColumnLabels(t);
  //console.log('ITEM OFFER', JSON.stringify(offer, null, 4));

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
          {!isMobile && (
            <OfferSeller
              offer={offer}
              label={columnLabels[Columns.requesterName]}
              isLarge={isLarge}
              textAlignRight={false}
            ></OfferSeller>
          )}
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
          {!isMobile && (
            <OfferPrice
              offer={offer}
              label={columnLabels[Columns.requestedPrice]}
              isLarge={isLarge}
              textAlignRight={false}
            ></OfferPrice>
          )}
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
          {!isMobile && (
            <OfferDate
              offer={offer}
              label={columnLabels[Columns.createdAt]}
              isLarge={isLarge}
              textAlignRight={false}
            ></OfferDate>
          )}
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
          {!isMobile && (
            <OfferAmount
              offer={offer}
              label={columnLabels[Columns.requestedAmount]}
              isLarge={isLarge}
              textAlignRight={true}
            ></OfferAmount>
          )}
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
                {
                  <OfferSeller
                    offer={offer}
                    label={columnLabels[Columns.requesterName]}
                    isLarge={isLarge}
                    textAlignRight={true}
                  ></OfferSeller>
                }

                <OfferDate
                  offer={offer}
                  label={columnLabels[Columns.createdAt]}
                  isLarge={isLarge}
                  textAlignRight={true}
                ></OfferDate>
              </Group>
              <Group position={'apart'}>
                {
                  <OfferPrice
                    offer={offer}
                    label={columnLabels[Columns.requestedPrice]}
                    isLarge={isLarge}
                    textAlignRight={true}
                  ></OfferPrice>
                }
                {
                  <OfferAmount
                    offer={offer}
                    label={columnLabels[Columns.requestedAmount]}
                    isLarge={isLarge}
                    textAlignRight={true}
                  ></OfferAmount>
                }
              </Group>
            </Stack>
          )}
        </Grid.Col>
      </Grid>
    </Card>
  );
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
