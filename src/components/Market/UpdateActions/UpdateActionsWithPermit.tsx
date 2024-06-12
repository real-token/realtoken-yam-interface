import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit } from '@tabler/icons-react';
import { useWeb3React } from '@web3-react/core';

import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { useContextModals } from 'src/hooks/useModals';
import { Offer } from 'src/types/offer/Offer';

type UpdateActions = {
  updateOffer: Offer;
};

export const UpdateActionsWithPermit: FC<UpdateActions> = ({ updateOffer }) => {
  const { account } = useWeb3React();
  const modals = useContextModals();

  const { refreshOffers } = useRefreshOffers(false);

  const onOpenUpdateModal = useCallback(
    (offer: Offer) => {
      modals.openUpdatePermitModal(offer, refreshOffers);
    },
    [modals, refreshOffers],
  );

  const onOpenWalletModal = useCallback(() => {
    modals.openWalletModal();
  }, [modals]);

  return (
    <Group position={'center'}>
      {
        <ActionIcon
          color={'green'}
          onClick={() =>
            account ? onOpenUpdateModal(updateOffer) : onOpenWalletModal()
          }
        >
          <IconEdit size={16} />
        </ActionIcon>
      }
    </Group>
  );
};
