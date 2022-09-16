import { BuyModal, BuyModalWithPermit } from './BuyModal';
import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';
import { WalletModal } from './WalletModal';

export const modals = {
  wallet: WalletModal,
  buy: BuyModal,
  buyPermit: BuyModalWithPermit,
  update: UpdateModal,
  delete: DeleteModal,
};
