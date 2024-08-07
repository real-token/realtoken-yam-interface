/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable */
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, Title, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { OpenContextModal } from '@mantine/modals/lib/context';

import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { PropertiesToken } from 'src/types';
import { OFFER_TYPE } from 'src/types/offer';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';
import { Offer } from 'src/types/offer/Offer';

const useStyle = createStyles((theme) => ({
  offerId: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.brand,
    borderRadius: theme.radius.md,
    height: '40px',
    padding: `0 ${10}px`,
    color: 'black',
    fontWeight: 700,
    fontSize: theme.fontSizes.xl,
  },
}));

type useModalsReturn = {
  openContextModal: (modal: string, props: OpenContextModal<any>) => string;
  openOfferModal: (offer: Offer) => string;
  openBuyModal: (offer: Offer, refreshOffers: () => void) => string;
  openWalletModal: () => string;
  openDeleteModal: (offer: Offer, refreshOffers: () => void) => string;
  openMultiDeleteModal: (offerIds: string[], onSuccess: () => void) => string;
  openCreateOfferModal: (
    offer?: CreatedOffer,
    offerType?: OFFER_TYPE,
  ) => string;
  openChooseOfferModal: () => string;
  openUpdateModal: (
    offer: Offer,
    triggerRefresh: Dispatch<SetStateAction<boolean>>,
  ) => string;
  openUpdatePermitModal: (offer: Offer, refreshOffers: () => void) => string;
  closeModal: (id: string, canceled?: boolean) => void;
};

export const useContextModals = (): useModalsReturn => {
  const { t } = useTranslation('modals');
  const modals = useModals();
  const { classes } = useStyle();

  const { propertiesToken, propertiesIsloading } = usePropertiesToken();

  const getPropertiesToken = (address: string): PropertiesToken | undefined => {
    return propertiesToken.find(
      (properties) =>
        properties.contractAddress.toLocaleLowerCase() == address.toLowerCase(),
    );
  };

  const openContextModal = (
    modal: string,
    props: OpenContextModal<any>,
  ): string => modals.openContextModal(modal, props);

  const openOfferModal = (offer: Offer): string => {
    const token = getToken();
    const imageUrl = getImageUrl(propertiesIsloading, token);

    return modals.openContextModal('offer', {
      title: (
        <Group
          position={'center'}
          sx={{
            width: '700px',
            height: '100px',
            backgroundSize: '700px 300px',
            backgroundPosition: 'center',
            backgroundImage: imageUrl,
          }}
        >
          <Title order={3} color={'white'}>
            {t('offer.title')}
          </Title>
          <div className={classes.offerId}>{offer.offerId}</div>
        </Group>
      ),
      size: 'lg',
      innerProps: {
        offerId: Number(offer.offerId),
      },
    });

    function getToken(): PropertiesToken | undefined {
      let token: PropertiesToken | undefined = undefined;
      if (!propertiesIsloading) {
        if (offer.buyerTokenType == 1) {
          token = getPropertiesToken(offer.buyerTokenAddress);
        }
        if (offer.offerTokenType == 1) {
          token = getPropertiesToken(offer.offerTokenAddress);
        }
      }
      return token;
    }
  };

  const openBuyModal = (offer: Offer, refreshOffers: () => void): string => {
    const token = getToken();
    const imageUrl = getImageUrl(propertiesIsloading, token);

    return modals.openContextModal('buyPermit', {
      title: (
        <Group
          position={'center'}
          sx={{
            width: '700px',
            height: '100px',
            backgroundSize: '700px 300px',
            backgroundPosition: 'center',
            backgroundImage: imageUrl,
          }}
        >
          <Title order={3} color={'white'}>
            {t('buy.title')}
          </Title>
          <div className={classes.offerId}>{offer.offerId}</div>
        </Group>
      ),
      size: 'lg',
      innerProps: {
        offer: offer,
        triggerTableRefresh: refreshOffers,
      },
    });

    function getToken(): PropertiesToken | undefined {
      let token: PropertiesToken | undefined = undefined;
      if (!propertiesIsloading) {
        if (offer.buyerTokenType == 1) {
          token = getPropertiesToken(offer.buyerTokenAddress);
        }
        if (offer.offerTokenType == 1) {
          token = getPropertiesToken(offer.offerTokenAddress);
        }
      }
      return token;
    }
  };

  const openWalletModal = (): string => {
    return modals.openContextModal('wallet', {
      title: (
        <Title order={3} sx={{ margin: '16px' }}>
          {t('wallet.title')}
        </Title>
      ),
      innerProps: {},
      withCloseButton: true,
    });
  };

  const openDeleteModal = (offer: Offer, refreshOffers: () => void): string => {
    return modals.openContextModal('delete', {
      title: (
        <Title order={3} sx={{ margin: '16px' }}>
          {t('delete.title')}
        </Title>
      ),
      size: 'lg',
      innerProps: {
        offerIds: [offer.offerId],
        onSuccess: refreshOffers,
      },
    });
  };

  const openMultiDeleteModal = (
    offerIds: string[],
    onSuccess: () => void,
  ): string => {
    return modals.openContextModal('delete', {
      title: (
        <Title order={3} sx={{ margin: '16px' }}>
          {t('delete.title')}
        </Title>
      ),
      size: 'lg',
      innerProps: {
        offerIds,
        onSuccess,
      },
    });
  };

  const openCreateOfferModal = (
    offer?: CreatedOffer,
    offerType?: OFFER_TYPE,
  ): string => {
    if (offerType) {
      return modals.openContextModal('createOffer', {
        innerProps: {
          offer: {
            offerType,
          },
        },
      });
    } else {
      return modals.openContextModal('createOffer', { innerProps: { offer } });
    }
  };

  const openChooseOfferModal = (): string => {
    return modals.openContextModal('chooseOfferType', { innerProps: {} });
  };
  const openUpdateModal = (
    offer: Offer,
    triggerRefresh: Dispatch<SetStateAction<boolean>>,
  ): string => {
    return modals.openContextModal('update', {
      title: (
        <Title order={3} sx={{ margin: '16px' }}>
          {t('update.title')}
        </Title>
      ),
      innerProps: {
        offerId: offer.offerId,
        price: offer.price,
        amount: offer.amount,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: offer.offerTokenDecimals,
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: offer.buyerTokenDecimals,
        triggerTableRefresh: triggerRefresh,
      },
    });
  };

  const openUpdatePermitModal = (
    offer: Offer,
    refreshOffers: () => void,
  ): string => {
    return modals.openContextModal('updatePermit', {
      title: (
        <Title order={3} sx={{ margin: '16px' }}>
          {t('update.title')}
        </Title>
      ),
      size: 'lg',
      innerProps: {
        offer: offer,
        triggerTableRefresh: refreshOffers,
      },
    });
  };

  const closeModal = (id: string, canceled?: boolean): void => {
    return modals.closeModal(id, canceled);
  };

  return {
    openContextModal,
    openOfferModal,
    openBuyModal,
    openWalletModal,
    openDeleteModal,
    openMultiDeleteModal,
    openCreateOfferModal,
    openChooseOfferModal,
    openUpdateModal,
    openUpdatePermitModal,
    closeModal,
  };
};

function getImageUrl(
  propertiesIsloading: boolean,
  token: PropertiesToken | undefined,
): string {
  return !propertiesIsloading && token
    ? "url('" + token?.imageLink[0] + "')"
    : 'url(https://cleansatmining.com/data/files/14504465-8050-4f38-a9be-0ff73271e4f4..jpg)';
}
