import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Flex,
  Group,
  Skeleton,
  Space,
  Text,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { selectIsOwnOffer } from 'src/store/features/interface/interfaceSelector';
import { OfferText } from 'src/components/Offer/components/OfferText';
import { TextUrl } from 'src/components/TextUrl/TextUrl';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { useContextModals } from 'src/hooks/useModals';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { PropertiesToken } from 'src/types';
import { Offer } from 'src/types/offer';
import { calcRem } from 'src/utils/style';
import { RootState } from 'src/store/store';
import { EditOffer } from '../Edit/EditOffer';
import { OfferContainer } from '../components/OfferContainer';
import { TransactionViewAccordion } from '../components/TransactionListView';

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
  backArrow?: boolean;
};

export const ViewOffer: FC<OfferProps> = ({ offer, backArrow }) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const onEdit = useCallback(
    (open: boolean) => {
      setIsEdited(open);
    },
    [setIsEdited],
  );

  window.scrollTo({ top: 0, left: 0 });

  return (
    <>
      {isEdited ? (
        <EditOffer
          offer={offer}
          onCloseEdit={() => onEdit(false)}
          backArrow={backArrow}
        ></EditOffer>
      ) : (
        <ViewOfferComponent
          offer={offer}
          onEdit={onEdit}
          backArrow={backArrow}
        ></ViewOfferComponent>
      )}
    </>
  );
};

type ComponentOfferProps = {
  offer: Offer;
  onEdit: (open: boolean) => void;
  backArrow?: boolean;
};

const ViewOfferComponent: FC<ComponentOfferProps> = ({
  offer,
  onEdit,
  backArrow,
}) => {
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
    <OfferContainer
      offer={offer}
      withSeparatedHeader={false}
      backArrow={backArrow}
    >
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
  const modals = useContextModals();
  const { refreshOffers } = useRefreshOffers(false);
  const isOwner = useSelector((state: RootState) =>
    offer ? selectIsOwnOffer(state, offer) : false,
  );
  const isEmpty = Number(offer.availableAmount) === 0 && !isOwner;

  const onOpenDeleteModal = useCallback(
    (offer: Offer) => {
      modals.openDeleteModal(offer, refreshOffers);
    },
    [modals, refreshOffers],
  );

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
      {offer.removed || isEmpty ? (
        <Group>
          <Button
            leftIcon={<IconTrash size={'1rem'} />}
            radius={'xl'}
            color={'red'}
            disabled={true}
            style={{
              backgroundColor: `${theme.colors.red[6]}1F`,
              color: theme.colors.red[7],
            }}
          >
            {t('deleted')}
          </Button>
        </Group>
      ) : (
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
            {t('edit')}
          </Button>
          <Button
            leftIcon={<IconTrash size={'1rem'} />}
            radius={'xl'}
            color={'green'}
            onClick={() => onOpenDeleteModal(offer)}
            style={{
              backgroundColor: `${theme.colors.brand[5]}0F`,
              color: theme.colors.brand[5],
            }}
          >
            {t('delete')}
          </Button>
        </Group>
      )}
      <Space h={'md'}></Space>
      <Flex direction={'column'} gap={'md'} mb={20}>
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
      <TransactionViewAccordion
        offerId={offer.offerId}
      ></TransactionViewAccordion>
    </div>
  );
};
