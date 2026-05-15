import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';

import { Offer } from 'src/types/offer/Offer';

import { useCanSignTransactions } from '../../../hooks/useCanSignTransactions';
import { useOffers } from '../../../hooks/interface/useOffers';
import { useWalletGate } from 'src/wallet/useWalletGate';

type DeleteActions = {
  deleteOffer: Offer;
};

export const DeleteActions: FC<DeleteActions> = ({ deleteOffer }) => {
  const { isWalletReady } = useCanSignTransactions();
  const { isRestoring } = useWalletGate();
  const modals = useModals();

  const { refetch: refreshOffers } = useOffers();

  const { t } = useTranslation('modals');

  const onOpenDeleteModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('delete', {
        title: <Title order={3}>{t('delete.title')}</Title>,
        size: 'lg',
        innerProps: {
          offerIds: [offer.offerId],
          onSuccess: refreshOffers,
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
          color={'red'}
          variant={'filled'}
          disabled={isRestoring}
          onClick={() =>
            isWalletReady ? onOpenDeleteModal(deleteOffer) : onOpenWalletModal()
          }
        >
          <IconTrash size={16} />
        </ActionIcon>
      }
    </Group>
  );
};
