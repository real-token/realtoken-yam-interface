import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ActionIcon, Flex, Title, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEye } from '@tabler/icons';

import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';
import { Offer } from 'src/types/offer/Offer';

const useStyle = createStyles((theme) => ({
  offerId: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.brand,
    borderRadius: theme.radius.md,
    height: '40px',
    padding: `0 ${10}px`,
    color: 'black',
    fontWeight: 700,
    fontSize: theme.fontSizes.xl,
  },
}));

interface ShowOfferActionProps {
  offer: Offer;
  className?: string;
}
export const ShowOfferAction: FC<ShowOfferActionProps> = ({
  offer,
  className,
}) => {
  const { t } = useTranslation('modals');
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const modals = useModals();
  const { classes } = useStyle();

  const ref = React.useRef(null);

  const onOpenOfferModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('offer', {
        title: (
          <Flex direction={'row'} gap={'md'}>
            <Title order={3}>{t('offer.title')}</Title>
            <div className={classes.offerId}>{offer.offerId}</div>
          </Flex>
        ),
        size: 'lg',
        innerProps: {
          offerId: Number(offer.offerId),
        },
        withCloseButton: true,
      });
    },
    [modals, t, classes.offerId]
  );

  return (
    <>
      {!offersIsLoading ? (
        <ActionIcon
          color={'brand'}
          onClick={() => onOpenOfferModal(offer)}
          className={className}
        >
          <IconEye size={16} aria-label={'Show Offer'} />
        </ActionIcon>
      ) : undefined}
    </>
  );
};
