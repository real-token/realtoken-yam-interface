import { FC } from 'react';

import { ContextModalProps } from '@mantine/modals';

import { BuyModal, BuyModalWithPermit } from './BuyModal';
import { CreateOfferModal } from './CreateOfferModal';
import { ChooseOfferTypeModal } from './CreateOfferModal/ChooseOfferTypeModal';
import { DeleteModal } from './DeleteModal';
import { OfferModal } from './OfferModal';
import { UpdateModal } from './UpdateModal';
import { UpdateModalWithPermit } from './UpdateModal/UpdateModalWithPermit';

export const modals: Record<string, FC<ContextModalProps<any>>> = {
  buy: BuyModal,
  buyPermit: BuyModalWithPermit,
  offer: OfferModal,
  update: UpdateModal,
  updatePermit: UpdateModalWithPermit,
  delete: DeleteModal,
  createOffer: CreateOfferModal,
  chooseOfferType: ChooseOfferTypeModal,
};
