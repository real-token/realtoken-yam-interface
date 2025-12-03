import { encodeTransaction } from '@real-token/web3';
import type { BaseTransactionContext, Transaction } from '@real-token/web3';

import { realTokenYamUpgradeableABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';

export const pauseTransaction = (
  activeChain: ExtendedChainConfig | undefined,
  isPaused: boolean
): Transaction<BaseTransactionContext>[] => {
  if (!activeChain) {
    return [];
  }

  const realTokenYamUpgradeableAddress = activeChain.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const functionName = isPaused ? 'unpause' : 'pause';

  return [
    {
      prepareTransaction: async () => ({
        type: 'onchain',
        to: realTokenYamUpgradeableAddress,
        data: encodeTransaction({
          abi: realTokenYamUpgradeableABI,
          functionName,
          args: [],
        }),
      }),
      notifications: {
        id: isPaused ? 'unpause' : 'pause',
        onSent: {
          title: isPaused ? 'Reprise en cours' : 'Pause en cours',
          message: isPaused
            ? 'Reprise du contrat en cours...'
            : 'Mise en pause du contrat...',
        },
        onComplete: {
          title: isPaused ? 'Contrat repris' : 'Contrat en pause',
          message: isPaused
            ? 'Le contrat a été repris avec succès'
            : 'Le contrat a été mis en pause avec succès',
        },
        onFail: {
          title: 'Erreur',
          message: isPaused
            ? 'La reprise du contrat a échoué'
            : 'La mise en pause du contrat a échoué',
        },
      },
    },
  ];
};
