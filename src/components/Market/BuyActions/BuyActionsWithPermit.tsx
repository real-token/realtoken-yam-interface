import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { Offer } from 'src/hooks/types';

type BuyActions = {
  buyOffer: Offer;
  triggerRefresh: Dispatch<SetStateAction<boolean>>;
};

export const BuyActionsWithPermit: FC<BuyActions> = ({
  buyOffer,
  triggerRefresh,
}) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const { t } = useTranslation('modals');

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('buyPermit', {
        title: <Title order={3}>{t('buy.title')}</Title>,
        innerProps: {
          offerId: offer.offerId,
          price: offer.price,
          amount: offer.amount,
          offerTokenAddress: offer.offerTokenAddress,
          offerTokenDecimals: offer.offerTokenDecimals,
          buyerTokenAddress: offer.buyerTokenAddress,
          buyerTokenDecimals: offer.buyerTokenDecimals,
          sellerAddress: offer.sellerAddress,
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
          <IconShoppingCart size={16} aria-label={'Buy'} />
        </ActionIcon>
      }
    </Group>
  );
};
