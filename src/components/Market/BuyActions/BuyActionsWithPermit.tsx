import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';
import { Offer } from 'src/types/offer/Offer';

type BuyActions = {
  buyOffer: Offer;
  buttonClassName?: string;
  groupClassName?: string;
};

export const BuyActionsWithPermit: FC<BuyActions> = ({
  buyOffer,
  buttonClassName,
  groupClassName,
}) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const { t } = useTranslation('modals');
  const offersIsLoading = useSelector(selectOffersIsLoading);

  const { refreshOffers } = useRefreshOffers(false);

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('buyPermit', {
        title: <Title order={3}>{t('buy.title')}</Title>,
        size: 'lg',
        innerProps: {
          offer: offer,
          triggerTableRefresh: refreshOffers,
        },
        withCloseButton: true,
      });
    },
    [modals, refreshOffers, t]
  );

  const onOpenWalletModal = useCallback(() => {
    modals.openContextModal('wallet', {
      title: <Title order={3}>{t('wallet.title')}</Title>,
      innerProps: {},
      withCloseButton: true,
    });
  }, [modals, t]);

  const isAccountOffer: boolean = useMemo(() => {
    if (!buyOffer || !account) return false;
    return buyOffer.sellerAddress == account.toLowerCase();
  }, [buyOffer, account]);

  return (
    <>
      {!offersIsLoading ? (
        <Group position={'center'} className={groupClassName ?? ''}>
          {!isAccountOffer ? (
            <ActionIcon
              color={'green'}
              onClick={() =>
                account ? onOpenBuyModal(buyOffer) : onOpenWalletModal()
              }
              className={buttonClassName ?? ''}
            >
              <IconShoppingCart size={16} aria-label={'Buy'} />
            </ActionIcon>
          ) : (
            <ActionIcon disabled={true} variant={'transparent'} />
          )}
        </Group>
      ) : undefined}
    </>
  );
};
