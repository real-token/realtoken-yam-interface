import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Card,
  Flex,
  Group,
  Skeleton,
  Space,
  Text,
  createStyles,
  em,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons';

import BigNumber from 'bignumber.js';

import {
  getOfferPropertyAddress,
  getOfferType,
} from 'src/components/Offer/Utils';
import { OfferText } from 'src/components/Offer/components/OfferText';
import { TextUrl } from 'src/components/TextUrl/TextUrl';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { buyOfferClose } from 'src/store/features/buyOffer/buyOfferSlice';
import { PropertiesToken } from 'src/types';
import { Offer } from 'src/types/offer';
import { calcRem } from 'src/utils/style';

import { EditOffer } from '../Edit/EditOffer';
import { OfferHeader, OfferTitle } from '../components/Header';
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
    justifyContent: 'start',
    alignItems: 'center',
    textAlign: 'start',
    width: calcRem(500),
  },
  containerMobile: {
    width: '100%',
  },

  title: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
    fontWeight: 'bold',
  },

  textHeader: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
  textValue: {
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? undefined : theme.colors.gray[8],
  },
}));

type OfferProps = {
  offer: Offer;
};

export const ViewOffer: FC<OfferProps> = ({ offer }) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const onEdit = useCallback(
    (open: boolean) => {
      setIsEdited(open);
    },
    [setIsEdited]
  );

  return (
    <>
      {isEdited ? (
        <EditOffer offer={offer} onCloseEdit={() => onEdit(false)}></EditOffer>
      ) : (
        <ViewOfferComponent offer={offer} onEdit={onEdit}></ViewOfferComponent>
      )}
    </>
  );
};

type ComponentOfferProps = {
  offer: Offer;
  onEdit: (open: boolean) => void;
};

const ViewOfferComponent: FC<ComponentOfferProps> = ({ offer, onEdit }) => {
  const [propertyTokens, setPropertyTokens] = useState<PropertiesToken[]>([]);
  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();

  useEffect(() => {
    if (!offer || propertiesIsloading || propertyTokens.length > 0) {
      return;
    }

    if (offer.buyerTokenType === 1) {
      const token = getPropertyToken(offer.buyerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }

    if (offer.offerTokenType === 1) {
      const token = getPropertyToken(offer.offerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }
  }, [getPropertyToken, offer, propertiesIsloading, propertyTokens.length]);

  return (
    <OfferContainer offer={offer} withSeparatedHeader={false}>
      <ViewOfferForms offer={offer} onEdit={onEdit}></ViewOfferForms>
    </OfferContainer>
  );
};

const ViewOfferForms: FC<ComponentOfferProps> = ({ offer, onEdit }) => {
  const { classes } = useStyle();
  const theme = useMantineTheme();
  const { t } = useTranslation('modals', { keyPrefix: 'buy' });

  const [propertyTokens, setPropertyTokens] = useState<PropertiesToken[]>([]);
  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();

  useEffect(() => {
    if (!offer || propertiesIsloading || propertyTokens.length > 0) {
      return;
    }

    if (offer.buyerTokenType === 1) {
      const token = getPropertyToken(offer.buyerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }

    if (offer.offerTokenType === 1) {
      const token = getPropertyToken(offer.offerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }
  }, [getPropertyToken, offer, propertiesIsloading, propertyTokens.length]);

  return (
    <div>
      <Group>
        <Button
          leftIcon={<IconEdit size={'1rem'} />}
          radius={'xl'}
          color={'green'}
          style={{
            backgroundColor: `${theme.colors.brand[5]}0F`,
            color: theme.colors.brand[5],
          }}
          onClick={() => onEdit(true)}
        >
          {'Edit offer'}
        </Button>
        <Button
          leftIcon={<IconTrash size={'1rem'} />}
          radius={'xl'}
          color={'green'}
          style={{
            backgroundColor: `${theme.colors.brand[5]}0F`,
            color: theme.colors.brand[5],
          }}
        >
          {'Delete offer'}
        </Button>
      </Group>
      <Space h={'md'}></Space>
      <Flex direction={'column'} gap={'md'}>
        <div className={classes.title}>
          <TextUrl url={propertyTokens[0]?.marketplaceLink}>
            {propertyTokens[0]?.fullName}
          </TextUrl>
        </div>
        <OfferText title={t('offerTokenName')} value={offer?.offerTokenName} />
        <OfferText title={t('buyerTokenName')} value={offer?.buyerTokenName} />
        <OfferText title={t('sellerAddress')} value={offer?.sellerAddress} />
        <OfferText title={t('amount')} value={offer?.amount} />
        <Flex direction={'column'} gap={3}>
          <Text className={classes.textHeader}>{'Price'}</Text>
          {offer?.offerTokenName && offer.buyerTokenName && offer?.price ? (
            <Text className={classes.textValue}>
              {`1 "${offer?.offerTokenName}" = ${offer?.price} "${offer.buyerTokenName}"`}
            </Text>
          ) : (
            <Skeleton height={25} width={400} />
          )}
          {offer?.offerTokenName && offer.buyerTokenName && offer?.price ? (
            <Text className={classes.textValue}>
              {`1 "${offer.buyerTokenName}" = ${new BigNumber(1)
                .dividedBy(offer?.price)
                .toFixed(5)} "${offer?.offerTokenName}"`}
            </Text>
          ) : (
            <Skeleton height={25} width={400} />
          )}
        </Flex>
      </Flex>
    </div>
  );
};

const ViewOfferComponent_old: FC<ComponentOfferProps> = ({ offer, onEdit }) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const dispatch = useAppDispatch();
  const { classes, cx } = useStyle();
  const theme = useMantineTheme();
  const { t } = useTranslation('modals', { keyPrefix: 'buy' });

  const [propertyTokens, setPropertyTokens] = useState<PropertiesToken[]>([]);
  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();
  const offerProperty = getPropertyToken(getOfferPropertyAddress(offer));
  const backgroundImage = offerProperty ? offerProperty.imageLink[0] : '';

  useEffect(() => {
    if (!offer || propertiesIsloading || propertyTokens.length > 0) {
      return;
    }

    if (offer.buyerTokenType === 1) {
      const token = getPropertyToken(offer.buyerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }

    if (offer.offerTokenType === 1) {
      const token = getPropertyToken(offer.offerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }
  }, [getPropertyToken, offer, propertiesIsloading, propertyTokens.length]);

  const onClose = useCallback(() => {
    dispatch({ type: buyOfferClose, payload: offer });
  }, [dispatch, offer]);

  return (
    <div className={classes.center}>
      <div
        className={cx(
          classes.container,
          isMobile ? classes.containerMobile : undefined
        )}
      >
        <OfferTitle
          offerId={offer.offerId}
          offerType={getOfferType(offer)}
          onClose={onClose}
        ></OfferTitle>
        <Card radius={'lg'}>
          <OfferHeader
            image={backgroundImage}
            title={
              offerProperty
                ? offerProperty.location.aera
                : offer.sites.selling.miningSite
            }
            country={offerProperty ? offerProperty.location.country : ''}
            energy={offerProperty ? offerProperty.energy.join(', ') : ''}
          ></OfferHeader>
          <Group>
            <Button
              leftIcon={<IconEdit size={'1rem'} />}
              radius={'xl'}
              color={'green'}
              style={{
                backgroundColor: `${theme.colors.brand[5]}0F`,
                color: theme.colors.brand[5],
              }}
              onClick={() => onEdit(true)}
            >
              {'Edit offer'}
            </Button>
            <Button
              leftIcon={<IconTrash size={'1rem'} />}
              radius={'xl'}
              color={'green'}
              style={{
                backgroundColor: `${theme.colors.brand[5]}0F`,
                color: theme.colors.brand[5],
              }}
            >
              {'Delete offer'}
            </Button>
          </Group>
          <Space h={'md'}></Space>
          <Flex direction={'column'} gap={'md'}>
            <div className={classes.title}>
              <TextUrl url={propertyTokens[0]?.marketplaceLink}>
                {propertyTokens[0]?.fullName}
              </TextUrl>
            </div>
            <OfferText
              title={t('offerTokenName')}
              value={offer?.offerTokenName}
            />
            <OfferText
              title={t('buyerTokenName')}
              value={offer?.buyerTokenName}
            />
            <OfferText
              title={t('sellerAddress')}
              value={offer?.sellerAddress}
            />
            <OfferText title={t('amount')} value={offer?.amount} />
            <Flex direction={'column'} gap={3}>
              <Text className={classes.textHeader}>{'Price'}</Text>
              {offer?.offerTokenName && offer.buyerTokenName && offer?.price ? (
                <Text className={classes.textValue}>
                  {`1 "${offer?.offerTokenName}" = ${offer?.price} "${offer.buyerTokenName}"`}
                </Text>
              ) : (
                <Skeleton height={25} width={400} />
              )}
              {offer?.offerTokenName && offer.buyerTokenName && offer?.price ? (
                <Text className={classes.textValue}>
                  {`1 "${offer.buyerTokenName}" = ${new BigNumber(1)
                    .dividedBy(offer?.price)
                    .toFixed(5)} "${offer?.offerTokenName}"`}
                </Text>
              ) : (
                <Skeleton height={25} width={400} />
              )}
            </Flex>
          </Flex>
        </Card>
      </div>
    </div>
  );
};
