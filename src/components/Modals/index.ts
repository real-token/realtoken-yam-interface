import { BuyModal, BuyModalWithPermit } from './BuyModal';
import { CreateOfferModal } from './CreateOfferModal';
import { ChooseOfferTypeModal } from './CreateOfferModal/ChooseOfferTypeModal';
import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';
import { UpdateModalWithPermit } from './UpdateModal/UpdateModalWithPermit';
import { WalletModal } from './WalletModal';

export const modals = {
  wallet: WalletModal,
  buy: BuyModal,
  buyPermit: BuyModalWithPermit,
  update: UpdateModal,
  updatePermit: UpdateModalWithPermit,
  delete: DeleteModal,
  createOffer: CreateOfferModal,
  chooseOfferType: ChooseOfferTypeModal
};
