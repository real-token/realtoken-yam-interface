import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { useContextModals } from 'src/hooks/useModals';
import { Offer } from 'src/types/offer/Offer';

type DeleteActions = {
  deleteOffer: Offer;
};

export const DeleteAdminAction: FC<DeleteActions> = ({ deleteOffer }) => {
  const { account } = useWeb3React();
  const modals = useContextModals();

  const { t } = useTranslation('modals');

  const { refreshOffers } = useRefreshOffers(false);

  const onOpenDeleteModal = useCallback(
    (offer: Offer) => {
      modals.openDeleteModal(offer, refreshOffers);
    },
    [modals, refreshOffers]
  );

  const onOpenWalletModal = useCallback(() => {
    modals.openWalletModal();
  }, [modals]);

  return (
    <Group position={'center'}>
      {
        <ActionIcon
          color={'red'}
          variant={'filled'}
          onClick={() =>
            account ? onOpenDeleteModal(deleteOffer) : onOpenWalletModal()
          }
        >
          <IconTrash size={16} />
        </ActionIcon>
      }
    </Group>
  );
};
