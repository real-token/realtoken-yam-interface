import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { BigNumber } from 'bignumber.js';

import { Offer } from 'src/hooks/types';

type BuyActions = {
  buyOffer: Offer;
  triggerRefresh: Dispatch<SetStateAction<boolean>>;
};

export const BuyActions: FC<BuyActions> = ({ buyOffer, triggerRefresh }) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const { t } = useTranslation('modals');

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('buy', {
        title: <Title order={3}>{t('buy.title')}</Title>,
        innerProps: {
          offerId: offer.offerId,
          price: offer.price,
          amount: offer.amount,
          offerTokenDecimals: offer.offerTokenDecimals,
          buyerTokenDecimals: offer.buyerTokenDecimals,
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
          color={'green'}
          onClick={() =>
            account ? onOpenBuyModal(buyOffer) : onOpenWalletModal()
          }
        >
          <IconShoppingCart size={16} />
        </ActionIcon>
      }
    </Group>
  );
};
