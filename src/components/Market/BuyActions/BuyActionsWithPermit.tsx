import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionIcon, Group, Title, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { Offer } from 'src/types/offer/Offer';
import { useSelector } from 'react-redux';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';

type BuyActions = {
  buyOffer: Offer;
  buttonClassName?: string;
  groupClassName?: string;
};

export const BuyActionsWithPermit: FC<BuyActions> = ({
  buyOffer,
  buttonClassName,
  groupClassName
}) => {
  const { account } = useWeb3React();
  const modals = useModals();

  const { t } = useTranslation('modals');
  const offersIsLoading = useSelector(selectOffersIsLoading);

  const { refreshOffers } = useRefreshOffers(false);

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      modals.openContextModal('buyPermit', {
        title: <Text>{t('buy.title')}</Text>,
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
      title: <Text>{t('wallet.title')}</Text>,
      innerProps: {},
    });
  }, [modals, t]);

  const isAccountOffer: boolean = useMemo(() => {
    if(!buyOffer || !account) return false;
    return buyOffer.sellerAddress == account.toLowerCase()
  },[buyOffer, account])

  return (
    <>
      { !offersIsLoading ? 
        (
          <Group position={'center'} className={groupClassName ?? ""}>
            { !isAccountOffer ?
              <ActionIcon
                color={'green'}
                onClick={() =>
                  account ? onOpenBuyModal(buyOffer) : onOpenWalletModal()
                }
                className={buttonClassName ?? ""}
              >
                <IconShoppingCart size={16} aria-label={'Buy'} />
              </ActionIcon>
              :
              <ActionIcon disabled={true} variant={"transparent"}/>
            }
          </Group> 
        ): undefined }
    </>
  );
};
