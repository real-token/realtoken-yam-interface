import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';

import { URLS } from 'src/constants';

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions: actions,
      options: { qrcode: true, rpc: URLS },
    })
);
