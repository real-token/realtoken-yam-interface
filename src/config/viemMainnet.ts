import { defineChain } from 'viem';

/**
 * Remplace la définition viem `mainnet` (RPC par défaut : https://eth.merkle.io).
 * Merkle ne renvoie pas les en-têtes CORS : les appels `fetch` depuis le navigateur échouent.
 */
const ethRpcUrl =
  import.meta.env.VITE_ETH_RPC_URL ?? 'https://ethereum-rpc.publicnode.com';

export const mainnet = defineChain({
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [ethRpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api',
    },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xce01f8eee7E479C928F8919abD53E553a36CeF67',
      blockCreated: 19_258_213,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14_353_601,
    },
  },
});
