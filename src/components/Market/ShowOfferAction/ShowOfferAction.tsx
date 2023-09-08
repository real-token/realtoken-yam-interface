import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ActionIcon } from '@mantine/core';
import { IconEye } from '@tabler/icons';

import { useContextModals } from 'src/hooks/useModals';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';
import { Offer } from 'src/types/offer/Offer';

interface ShowOfferActionProps {
  offer: Offer;
  className?: string;
}
export const ShowOfferAction: FC<ShowOfferActionProps> = ({
  offer,
  className,
}) => {
  const offersIsLoading = useSelector(selectOffersIsLoading);
  const useModals = useContextModals();

  const onOpenOfferModal = useCallback(
    (offer: Offer) => {
      useModals.openOfferModal(offer);
    },
    [useModals]
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
