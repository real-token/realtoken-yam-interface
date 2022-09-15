import { BuyModal, BuyModalWithPermit } from './BuyModal';
import { DeleteModal } from './DeleteModal';
import { WalletModal } from './WalletModal';

export const modals = {
  wallet: WalletModal,
  buy: BuyModal,
  buyPermit: BuyModalWithPermit,
  delete: DeleteModal,
};
