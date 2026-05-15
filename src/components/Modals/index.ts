import { FC } from 'react';

import { ContextModalProps } from '@mantine/modals';
import { AaModalRouter } from './AaModalRouter';
import { modals as uiModals } from '@real-token/ui-components';
import { modals as web3Modals } from '@real-token/web3';

import { BuyModalWithPermit } from './BuyModal';
import { CreateOfferModal } from './CreateOfferModal';
import { ChooseOfferTypeModal } from './CreateOfferModal/ChooseOfferTypeModal';
import { DeleteModal } from './DeleteModal';
import { UpdateModalWithPermit } from './UpdateModal/UpdateModalWithPermit';

export const modals: Record<string, FC<ContextModalProps<any>>> = {
  buyPermit: BuyModalWithPermit,
  updatePermit: UpdateModalWithPermit,
  delete: DeleteModal,
  createOffer: CreateOfferModal,
  chooseOfferType: ChooseOfferTypeModal,
  aaModal: AaModalRouter,
  wallet: AaModalRouter,
  ...uiModals,
  ...web3Modals,
};
