import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group } from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { useContextModals } from 'src/hooks/useModals';
import { Offer } from 'src/types/offer/Offer';

type UpdateActions = {
  updateOffer: Offer;
  triggerRefresh: Dispatch<SetStateAction<boolean>>;
};

export const UpdateActions: FC<UpdateActions> = ({
  updateOffer,
  triggerRefresh,
}) => {
  const { account } = useWeb3React();
  const modals = useContextModals();

  const onOpenUpdateModal = useCallback(
    (offer: Offer) => {
      modals.openUpdateModal(offer, triggerRefresh);
    },
    [modals, triggerRefresh]
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
