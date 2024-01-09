import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Skeleton,
  Space,
  Text,
  clsx,
  createStyles,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import {
  IconCoins,
  IconEdit,
  IconPlus,
  IconTrash,
  IconTrendingUp,
} from '@tabler/icons';

import BigNumber from 'bignumber.js';

import { useAppDispatch } from 'src/hooks/react-hooks';
import { useCreatedOffer } from 'src/hooks/useCreatedOffer';
import { useContextModals } from 'src/hooks/useModals';
import { createOfferRemovedDispatchType } from 'src/store/features/createOffers/createOffersSlice';
import { OFFER_TYPE } from 'src/types/offer';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';
import { hexToRgb } from 'src/utils/color';
import { formatBigDecimals } from 'src/utils/format';

import { OfferTypeBadge } from '../Offer/components/OfferTypeBadge';

const useStyles = createStyles((theme) => ({
  offerContainer: {
    display: 'flex',
    width: '100%',
    borderColor: theme.colors.brand,
    borderWidth: '2px',
    borderRadius: theme.spacing.sm,
  },
  createOffer: {
    alignItems: 'center',
    borderStyle: 'dotted',
    '&:hover': {
      backgroundColor: theme.colors.brand,
      borderStyle: 'solid',
      cursor: 'pointer',
      color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5],
    },
  },
  offerCreated: {
    borderStyle: 'solid',
    position: 'relative',
    backgroundColor: theme.colors.brand,
    color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5],
    '&:hover': {
      cursor: 'pointer',
    },
  },
  offerActions: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xl,
    backgroundColor: `${hexToRgb(theme.colors.brand[9], 0.85)}`,
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing.sm,
    zIndex: 99,
  },
}));

interface CreateOfferPaneProps {
  isCreating: boolean;
  offer?: CreatedOffer;
}

export const CreateOfferPane: FC<CreateOfferPaneProps> = ({
  isCreating,
  offer,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const modals = useContextModals();

  const openChooseOfferModal = () => {
    modals.openChooseOfferModal();
  };

  const modifyCreateOffer = () => {
    modals.openCreateOfferModal(offer, undefined);
  };

  const deleteOffer = () => {
    if (offer)
      dispatch({
        type: createOfferRemovedDispatchType,
        payload: offer.offerId,
      });
  };

  const openConfirmDeleteModal = () =>
    openConfirmModal({
      title: 'Are you sure you want to delete this offer ?',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteOffer(),
    });

  const { offerTokenSymbol, buyTokenSymbol } = useCreatedOffer(offer);
  const { t } = useTranslation('modals', { keyPrefix: 'sell' });

  const offerTokenDecimal = offer?.offerTokenDecimal ?? 0;
  //const offerTokenDecimal = offer?.de ?? 0;

  const rate =
    offer?.offerType === OFFER_TYPE.BUY
      ? new BigNumber(1).div(offer?.price ?? 1).toNumber()
      : new BigNumber(offer?.price ?? 0).toNumber();

  const currencyAmount =
    offer?.offerType === OFFER_TYPE.BUY
      ? new BigNumber(offer.amount ?? 0)
          .shiftedBy(-offerTokenDecimal)
          .toNumber()
      : new BigNumber(offer?.amount ?? 0)
          .shiftedBy(-offerTokenDecimal)
          .times(offer?.price ?? 0)
          .toNumber();

  const tokenAmount =
    offer?.offerType === OFFER_TYPE.BUY
      ? new BigNumber(offer?.amount ?? 0)
          .shiftedBy(-offerTokenDecimal)
          .times(offer?.price ?? 1)
          .toNumber()
      : new BigNumber(offer?.amount ?? 0)
          .shiftedBy(-offerTokenDecimal)
          .toNumber();

  const currencySymbol =
    offer?.offerType === OFFER_TYPE.BUY ? offerTokenSymbol : buyTokenSymbol;

  const tokenSymbol =
    offer?.offerType === OFFER_TYPE.BUY ? buyTokenSymbol : offerTokenSymbol;

  return (
    <>
      {isCreating ? (
        <Flex
          className={clsx(classes.offerContainer, classes.createOffer)}
          gap={'sm'}
          onClick={() => openChooseOfferModal()}
          p={'sm'}
        >
          <IconPlus />
          {t('buttonCreateOffer')}
        </Flex>
      ) : offer ? (
        <Flex
          className={clsx(classes.offerContainer, classes.offerCreated)}
          direction={'column'}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? (
            <div className={classes.offerActions}>
              {/* <ActionIcon color={'green'} onClick={() => modifyCreateOffer()}>
                <IconEdit size={16} aria-label={'Buy'} />
              </ActionIcon> */}
              <ActionIcon
                color={'red'}
                onClick={() => openConfirmDeleteModal()}
              >
                <IconTrash size={16} aria-label={'Buy'} />
              </ActionIcon>
            </div>
          ) : undefined}
          <Flex direction={'column'} p={'sm'} align={'start'}>
            <Flex direction={'row'} p={0} align={'start'} gap={10}>
              <OfferTypeBadge offerType={offer.offerType} />
              <Space h={10}></Space>
              <Text fw={700}>
                {offerTokenSymbol ? (
                  offerTokenSymbol
                ) : (
                  <Skeleton height={35} width={'100%'} />
                )}
              </Text>
              <Avatar
                radius={'xl'}
                size={'sm'}
                variant={'filled'}
                color={'brand'}
              >
                {'VS'}
              </Avatar>
              <Text fs={'italic'} fw={500} color={'gray'}>
                {buyTokenSymbol ? (
                  buyTokenSymbol
                ) : (
                  <Skeleton height={35} width={'100%'} />
                )}
              </Text>
            </Flex>
            <Space h={15}></Space>
            <Flex direction={'column'} p={0} align={'start'}>
              <Group spacing={35}>
                <IconTrendingUp size={20}></IconTrendingUp>
                <Text fw={700}>
                  {offerTokenSymbol ? (
                    formatBigDecimals(1) +
                    ' ' +
                    tokenSymbol +
                    ' = ' +
                    formatBigDecimals(rate) +
                    ' ' +
                    currencySymbol
                  ) : (
                    <Skeleton height={35} width={'100%'} />
                  )}
                </Text>
              </Group>
              <Space h={5}></Space>
              <Group spacing={20}>
                <IconCoins size={34} />
                <Flex direction={'column'} p={0} align={'start'}>
                  <Text fw={700}>
                    {offerTokenSymbol ? (
                      formatBigDecimals(tokenAmount) + ' ' + tokenSymbol
                    ) : (
                      <Skeleton height={35} width={'100%'} />
                    )}
                  </Text>
                  <Text fs={'italic'} fw={500} color={'gray'} fz={'sm'}>
                    {buyTokenSymbol ? (
                      formatBigDecimals(currencyAmount) + ' ' + currencySymbol
                    ) : (
                      <Skeleton height={35} width={'100%'} />
                    )}
                  </Text>
                </Flex>
              </Group>
            </Flex>
          </Flex>
        </Flex>
      ) : undefined}
    </>
  );
};
