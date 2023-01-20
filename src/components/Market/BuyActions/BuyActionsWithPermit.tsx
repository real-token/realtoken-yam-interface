import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { Offer } from 'src/types/offer/Offer';
import { useSelector } from 'react-redux';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';

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
  const offersIsLoading = useSelector(selectOffersIsLoading);

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('buyPermit', {
        title: <Title order={3}>{t('buy.title')}</Title>,
        size: "lg",
        innerProps: {
          offerId: offer.offerId,
          price: offer.price,
          offerAmount: offer.amount,
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

  const isAccountOffer: boolean = useMemo(() => {
    if(!buyOffer || !account) return false;
    return buyOffer.sellerAddress == account || (isAccountOffer && buyOffer.buyerAddress == account)
  },[buyOffer, account])

  return (
    <>
      { !isAccountOffer && !offersIsLoading ? 
        (
          <Group position={'center'}>
            <ActionIcon
              color={'green'}
              onClick={() =>
                account ? onOpenBuyModal(buyOffer) : onOpenWalletModal()
              }
            >
              <IconShoppingCart size={16} aria-label={'Buy'} />
            </ActionIcon>
          </Group> 
        ): undefined }
    </>
  );
};
