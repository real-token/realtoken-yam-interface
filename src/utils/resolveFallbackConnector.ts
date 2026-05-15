import { injected, walletConnect } from '@wagmi/connectors';
import type { CreateConnectorFn } from 'wagmi';
import type { Connector } from 'wagmi';

type EthereumProvider = {
  isMetaMask?: boolean;
  isRabby?: boolean;
};

const getEthereum = (): EthereumProvider | undefined =>
  (window as Window & { ethereum?: EthereumProvider }).ethereum;

export type FallbackWalletId = 'metaMask' | 'rabby' | 'gnosis' | 'walletConnect';

export type FallbackWalletOption = {
  id: FallbackWalletId;
  name: string;
  logo: string;
  connectorId?: string;
  useWalletConnect?: boolean;
  detectInstalled?: () => boolean;
};

const getInjectedConnector = (walletId: 'metaMask' | 'rabby') => {
  if (walletId === 'rabby') {
    return injected({ target: 'rabby' });
  }
  return injected({ target: 'metaMask' });
};

export function resolveFallbackConnector(
  wallet: FallbackWalletOption,
  connectors: readonly Connector[]
): Connector | CreateConnectorFn {
  if (wallet.useWalletConnect) {
    return walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECTID,
      metadata: {
        name: 'YAM | You & Me',
        description: 'RealToken YAM interface',
        url: import.meta.env.VITE_WC_URL ?? window.location.origin,
        icons: ['https://avatars.githubusercontent.com/u/53057739'],
      },
    });
  }

  const fromWagmi = connectors.find((connector) => {
    if (wallet.connectorId && connector.id === wallet.connectorId) {
      return true;
    }
    if (wallet.id === 'rabby' && connector.id === 'injected') {
      return true;
    }
    return connector.name.toLowerCase().includes(wallet.name.toLowerCase());
  });

  if (fromWagmi) return fromWagmi;

  if (wallet.id === 'metaMask' || wallet.id === 'rabby') {
    return getInjectedConnector(wallet.id);
  }

  throw new Error(`Connecteur introuvable pour ${wallet.name}`);
}

export const getEthereumProvider = getEthereum;
