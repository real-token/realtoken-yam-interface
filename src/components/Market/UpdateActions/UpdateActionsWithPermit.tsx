import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconEdit } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { Offer } from 'src/types/offer/Offer';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';

type UpdateActions = {
  updateOffer: Offer;
};

export const UpdateActionsWithPermit: FC<UpdateActions> = ({
  updateOffer,
}) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const { refreshOffers } = useRefreshOffers(); 

  const { t } = useTranslation('modals');

  const onOpenUpdateModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('updatePermit', {
        title: <Title order={3}>{t('update.title')}</Title>,
        size: "lg",
        innerProps: {
          offer: offer,
          triggerTableRefresh: refreshOffers,
        },
      });
    },
    [modals, refreshOffers, t]
  );

  const onOpenWalletModal = useCallback(() => {
    modals.openContextModal('wallet', {
      title: <Title order={3}>{t('wallet.title')}</Title>,
      innerProps: {},
    });
  }, [modals, t]);

  return (
    <Group justify={'center'}>
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
