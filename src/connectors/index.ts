import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';

import { coinbaseWallet, hooks as coinbaseWalletHooks } from './coinbaseWallet';
import { gnosisSafe, hooks as gnosisSafeHooks } from './gnosisSafe';
import { metaMask, hooks as metaMaskHooks } from './metaMask';
import { network, hooks as networkHooks } from './network';
import { walletConnect, hooks as walletConnectHooks } from './walletConnect';

const connectors: [
  MetaMask | WalletConnect | CoinbaseWallet | GnosisSafe | Network,
  Web3ReactHooks
][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [gnosisSafe, gnosisSafeHooks],
  [network, networkHooks],
];

export {
  connectors,
  metaMask,
  metaMaskHooks,
  walletConnect,
  walletConnectHooks,
  coinbaseWallet,
  coinbaseWalletHooks,
  gnosisSafe,
  gnosisSafeHooks,
  network,
  networkHooks,
};
