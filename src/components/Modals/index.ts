import { FC } from 'react';

import { ContextModalProps } from '@mantine/modals';
import { AaModal } from '@real-token/aa-modal';
import { modals as uiModals } from '@real-token/ui-components';
import { modals as web3Modals } from '@real-token/web3';

import { BuyModal, BuyModalWithPermit } from './BuyModal';
import { CreateOfferModal } from './CreateOfferModal';
import { ChooseOfferTypeModal } from './CreateOfferModal/ChooseOfferTypeModal';
import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';
import { UpdateModalWithPermit } from './UpdateModal/UpdateModalWithPermit';

export const modals: Record<string, FC<ContextModalProps<any>>> = {
  buy: BuyModal,
  buyPermit: BuyModalWithPermit,
  update: UpdateModal,
  updatePermit: UpdateModalWithPermit,
  delete: DeleteModal,
  createOffer: CreateOfferModal,
  chooseOfferType: ChooseOfferTypeModal,
  aaModal: AaModal,
  ...uiModals,
  ...web3Modals,
};
