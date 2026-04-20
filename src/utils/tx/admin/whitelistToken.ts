import { encodeTransaction } from '@real-token/web3';
import type { BaseTransactionContext, Transaction } from '@real-token/web3';

import { realTokenYamUpgradeableABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';

export const whitelistTokenTransaction = (
  activeChain: ExtendedChainConfig | undefined,
  addresses: `0x${string}`[],
  types: number[]
): Transaction<BaseTransactionContext>[] => {
  if (!activeChain || addresses.length === 0) {
    return [];
  }

  const realTokenYamUpgradeableAddress = activeChain.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  return [
    {
      prepareTransaction: async () => ({
        type: 'onchain',
        to: realTokenYamUpgradeableAddress,
        data: encodeTransaction({
          abi: realTokenYamUpgradeableABI,
          functionName: 'toggleWhitelistWithType',
          args: [addresses, types],
        }),
      }),
      notifications: {
        id: 'whitelist-token',
        onSent: {
          title: 'Whitelist en cours',
          message: 'Ajout des tokens à la whitelist...',
        },
        onComplete: {
          title: 'Whitelist réussie',
          message: 'Les tokens ont été ajoutés à la whitelist',
        },
        onFail: {
          title: 'Erreur de whitelist',
          message: "L'ajout des tokens à la whitelist a échoué",
        },
      },
    },
  ];
};
