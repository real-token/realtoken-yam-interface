import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { coinbaseWallet, hooks as coinbaseWalletHooks } from './coinbaseWallet';
import { gnosisSafe, hooks as gnosisSafeHooks } from './gnosisSafe';
import { metaMask, hooks as metaMaskHooks } from './metaMask';
import { network, hooks as networkHooks } from './network';
import { walletConnect, hooks as walletConnectHooks } from './walletConnect';

const connectors: [Connector,Web3ReactHooks][] = [
  [gnosisSafe, gnosisSafeHooks],
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
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
