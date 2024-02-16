import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons';

import {
  OfferBadgeAbsolute,
  OfferTextAbsolute,
} from 'src/components/Offer/components/OfferTypeBadge';
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
import { OfferPriceDelta } from './widgets/OfferPriceDelta';
import { OfferSeller } from './widgets/OfferSeller';
import { selectedOfferAtom } from 'src/states';
import { useAtom } from 'jotai';

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
  const [, setOfferSelected] = useAtom(selectedOfferAtom);

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
      setOfferSelected(offerAction.offerId);
      dispatch({ type: buyOfferOpen, payload: offerAction });
    },
    [dispatch, setOfferSelected],
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
      <Grid columns={isLarge ? 23 : 25}>
        <Grid.Col xl={4} lg={5}>
          <OfferBadgeAbsolute
            offerType={offer.type}
            id={offer.id}
          ></OfferBadgeAbsolute>

          {isLarge && (
            <>
              <TokensTradedElement offer={offer}></TokensTradedElement>
              {offer.removed && (
                <OfferTextAbsolute top={'100px'} left={'60px'}>
                  <Badge
                    color={'red'}
                    variant={'outline'}
                    pl={3}
                    leftSection={<IconTrash size={16}></IconTrash>}
                  >
                    {t('deleted')}
                  </Badge>
                </OfferTextAbsolute>
              )}
            </>
          )}

          {!isLarge && (
            <Group spacing={10} position={'left'}>
              <TokensTradedElement offer={offer}></TokensTradedElement>
              {offer.removed && (
                <OfferTextAbsolute top={'5px'} left={'150px'}>
                  <Badge
                    color={'red'}
                    variant={'outline'}
                    pl={3}
                    leftSection={<IconTrash size={16}></IconTrash>}
                  >
                    {offer.removed ? 'Offre supprimée' : ''}
                  </Badge>
                </OfferTextAbsolute>
              )}
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
            <OfferPriceDelta
              offer={offer}
              label={columnLabels[Columns.requestedPrice]}
              isLarge={isLarge}
              textAlignRight={false}
            ></OfferPriceDelta>
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
          md={4}
          sm={4}
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
                  <OfferPriceDelta
                    offer={offer}
                    label={columnLabels[Columns.priceDelta]}
                    isLarge={isLarge}
                    textAlignRight={true}
                  ></OfferPriceDelta>
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
