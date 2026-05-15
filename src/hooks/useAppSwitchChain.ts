import { useCallback } from 'react';

import { switchChain as wagmiCoreSwitchChain } from '@wagmi/core';
import { useWeb3Auth } from '@web3auth/modal/react';
import { useAccount, useConfig } from 'wagmi';

import { gnosisChainId } from 'src/config/aaConfig';
import { useWalletGate } from 'src/wallet/useWalletGate';
import { parseChainId, toChainIdHex } from 'src/utils/chainId';
import { setStoredChainId } from 'src/utils/storedChainPreference';

export { AA_CORE_CHAIN_ID_STORAGE_KEY } from 'src/utils/storedChainPreference';

export const WEB3AUTH_CONNECTOR_ID = 'web3auth';

type Eip1193Provider = {
  request: (args: { method: string; params: unknown[] }) => Promise<unknown>;
};

async function switchChainViaProvider(
  provider: unknown,
  chainIdHex: `0x${string}`
): Promise<void> {
  const eth = provider as Eip1193Provider;
  if (typeof eth?.request !== 'function') {
    throw new Error('Provider does not support EIP-1193 request');
  }
  await eth.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainIdHex }],
  });
}

/**
 * Bascule de réseau : localStorage + extension (si possible) + wagmi (persistance au F5).
 */
export function useAppSwitchChain() {
  const wagmiConfig = useConfig();
  const { web3Auth } = useWeb3Auth();
  const { connector, isConnected } = useAccount();
  const { walletKind } = useWalletGate();

  const switchChain = useCallback(
    async ({
      chainId: chainIdInput,
      skipProviderSwitch = false,
    }: {
      chainId: number | string;
      skipProviderSwitch?: boolean;
    }) => {
      let chainId = parseChainId(chainIdInput);
      const gnosisChainIdNum = parseChainId(gnosisChainId);

      if (
        (walletKind === 'aa' || walletKind === 'watch') &&
        chainId !== gnosisChainIdNum
      ) {
        chainId = gnosisChainIdNum;
      }
      const chainIdHex = toChainIdHex(chainId);
      const isChainInWagmiConfig = wagmiConfig.chains.some((c) => c.id === chainId);

      setStoredChainId(chainId);

      if (!skipProviderSwitch && isConnected && connector) {
        try {
          const provider = await connector.getProvider();
          if (provider) {
            await switchChainViaProvider(provider, chainIdHex);
          }
        } catch {
          // L’extension peut refuser ; wagmi ci-dessous applique quand même le réseau côté app
        }
      } else if (!skipProviderSwitch && web3Auth?.provider) {
        try {
          await switchChainViaProvider(web3Auth.provider, chainIdHex);
        } catch {
          // ignore
        }
      } else if (web3Auth) {
        try {
          await web3Auth.switchChain({ chainId: chainIdHex });
        } catch {
          // ignore
        }
      }

      if (isChainInWagmiConfig) {
        await wagmiCoreSwitchChain(wagmiConfig, { chainId });
        return;
      }

      wagmiConfig.setState((state) => ({ ...state, chainId }));
    },
    [wagmiConfig, web3Auth, isConnected, connector, walletKind]
  );

  return { switchChain, isPending: false };
}
