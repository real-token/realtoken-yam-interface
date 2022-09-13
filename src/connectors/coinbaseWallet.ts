import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';

import { URLS } from 'src/constants';

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions: actions,
      options: {
        url: URLS[0],
        appName: 'realtoken-marketplace',
        darkMode: true,
      },
    })
);
