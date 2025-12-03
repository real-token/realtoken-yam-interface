import { encodeTransaction } from '@real-token/web3';
import type { Transaction } from '@real-token/web3';

import { Address, PublicClient } from 'viem';

import { realTokenYamUpgradeableABI } from '../../abis';
import { ExtendedChainConfig } from '../../config/aaConfig';

export type DeleteOfferTransactionContext = {
  account?: Address;
  activeChain?: ExtendedChainConfig;
};

export const deleteOfferTransactions = async (
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  offerIds: string[],
  isAdminDelete: boolean = false
): Promise<Transaction<DeleteOfferTransactionContext>[]> => {
  if (!publicClient || !offerIds || offerIds.length === 0 || !activeChain) {
    return [];
  }

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const transactions: Transaction<DeleteOfferTransactionContext>[] = [];

  if (isAdminDelete) {
    // Admin delete: can delete multiple offers
    transactions.push({
      prepareTransaction: async () => ({
        type: 'onchain',
        to: realTokenYamUpgradeableAddress,
        data: encodeTransaction({
          abi: realTokenYamUpgradeableABI,
          functionName: 'deleteOfferByAdmin',
          args: [offerIds.map((id) => BigInt(id))],
        }),
      }),
      notifications: {
        id: 'delete-offer-admin',
        onSent: {
          title: 'Suppression en cours',
          message: 'Suppression des offres en cours...',
        },
        onComplete: {
          title: 'Offres supprimées',
          message: 'Les offres ont été supprimées avec succès',
        },
        onFail: {
          title: 'Erreur de suppression',
          message: 'La suppression des offres a échoué',
        },
      },
    });
  } else {
    // Regular delete: single offer
    if (offerIds.length === 1) {
      transactions.push({
        prepareTransaction: async () => ({
          type: 'onchain',
          to: realTokenYamUpgradeableAddress,
          data: encodeTransaction({
            abi: realTokenYamUpgradeableABI,
            functionName: 'deleteOffer',
            args: [BigInt(offerIds[0])],
          }),
        }),
        notifications: {
          id: 'delete-offer',
          onSent: {
            title: 'Suppression en cours',
            message: "Suppression de l'offre en cours...",
          },
          onComplete: {
            title: 'Offre supprimée',
            message: "L'offre a été supprimée avec succès",
          },
          onFail: {
            title: 'Erreur de suppression',
            message: "La suppression de l'offre a échoué",
          },
        },
      });
    } else {
      // Batch delete for multiple offers (regular user)
      transactions.push({
        prepareTransaction: async () => ({
          type: 'onchain',
          to: realTokenYamUpgradeableAddress,
          data: encodeTransaction({
            abi: realTokenYamUpgradeableABI,
            functionName: 'deleteOfferBatch',
            args: [offerIds.map((id) => BigInt(id))],
          }),
        }),
        notifications: {
          id: 'delete-offer-batch',
          onSent: {
            title: 'Suppression en cours',
            message: 'Suppression des offres en cours...',
          },
          onComplete: {
            title: 'Offres supprimées',
            message: 'Les offres ont été supprimées avec succès',
          },
          onFail: {
            title: 'Erreur de suppression',
            message: 'La suppression des offres a échoué',
          },
        },
      });
    }
  }

  return transactions;
};
