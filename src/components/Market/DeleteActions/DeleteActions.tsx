import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { Offer } from 'src/types/offer/Offer';

type DeleteActions = {
  deleteOffer: Offer;
  triggerRefresh: Dispatch<SetStateAction<boolean>>;
};

export const DeleteActions: FC<DeleteActions> = ({
  deleteOffer,
  triggerRefresh,
}) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const { t } = useTranslation('modals');

  const onOpenDeleteModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('delete', {
        title: <Title order={3}>{t('delete.title')}</Title>,
        size: "lg",
        innerProps: {
          offerId: offer.offerId,
          triggerTableRefresh: triggerRefresh,
        },
      });
    },
    [modals, triggerRefresh, t]
  );

  const onOpenWalletModal = useCallback(() => {
    modals.openContextModal('wallet', {
      title: <Title order={3}>{t('wallet.title')}</Title>,
      innerProps: {},
    });
  }, [modals, t]);

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
