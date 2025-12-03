import { encodeTransaction } from '@real-token/web3';
import type { BaseTransactionContext, Transaction } from '@real-token/web3';

import { realTokenYamUpgradeableABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';

export const grantRoleTransaction = (
  activeChain: ExtendedChainConfig | undefined,
  role: `0x${string}`,
  address: `0x${string}`
): Transaction<BaseTransactionContext>[] => {
  if (!activeChain) {
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
          functionName: 'grantRole',
          args: [role, address],
        }),
      }),
      notifications: {
        id: 'grant-role',
        onSent: {
          title: 'Attribution du rôle en cours',
          message: 'Attribution du rôle en cours...',
        },
        onComplete: {
          title: 'Rôle attribué',
          message: 'Le rôle a été attribué avec succès',
        },
        onFail: {
          title: "Erreur d'attribution",
          message: "L'attribution du rôle a échoué",
        },
      },
    },
  ];
};
