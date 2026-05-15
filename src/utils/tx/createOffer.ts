import { encodeTransaction } from '@real-token/web3';
import type { Transaction } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import { Address, PublicClient } from 'viem';

import { coinBridgeTokenABI, realTokenYamUpgradeableABI } from '../../abis';
import { ExtendedChainConfig } from '../../config/aaConfig';
import { CreatedOffer } from '../../types/offer';

export type CreateOfferTransactionContext = {
  account?: Address;
  activeChain?: ExtendedChainConfig;
  transactionDeadline?: number;
  signature?: {
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
    signature: string;
  };
};

export const createOfferTransactions = async (
  isAA: boolean,
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  offer: CreatedOffer,
  amount: string
): Promise<Transaction<CreateOfferTransactionContext>[]> => {
  if (!publicClient || !amount || !activeChain || !offer.price) {
    return [];
  }

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const offerTokenType = await publicClient.readContract({
    address: realTokenYamUpgradeableAddress,
    abi: realTokenYamUpgradeableABI,
    functionName: 'getTokenType',
    args: [offer.offerTokenAddress as `0x${string}`],
  });
  const unsupportedPermitToken = offerTokenType == 3;

  const transactions: Transaction<CreateOfferTransactionContext>[] = [];

  if (unsupportedPermitToken || isAA) {
    // Approve offer token
    // We are additionning allowance because of how YAM is working (virtual allowance)
    transactions.push(
      {
        prepareTransaction: async (context) => {
          const { account } = context;
          if (!account) {
            throw new Error('Account is undefined');
          }

          const amountToApprove = new BigNumber(amount.toString());

          const oldAllowance = await publicClient.readContract({
            address: offer.offerTokenAddress as `0x${string}`,
            abi: coinBridgeTokenABI,
            functionName: 'allowance',
            args: [account as `0x${string}`, realTokenYamUpgradeableAddress],
          });

          const amountInWeiToPermit = amountToApprove
            .plus(new BigNumber(oldAllowance.toString()))
            .toString(10);
          return {
            type: 'onchain',
            to: offer.offerTokenAddress as `0x${string}`,
            data: encodeTransaction({
              abi: coinBridgeTokenABI,
              functionName: 'approve',
              args: [
                realTokenYamUpgradeableAddress,
                BigInt(amountInWeiToPermit),
              ],
            }),
          };
        },
        notifications: {
          id: 'approve-offer',
          onSent: {
            title: 'Approbation en cours',
            message: 'Approbation du token en cours...',
          },
          onComplete: {
            title: 'Approbation réussie',
            message: 'Le token a été approuvé avec succès',
          },
          onFail: {
            title: "Erreur d'approbation",
            message: "L'approbation du token a échoué",
          },
        },
      },
      {
        prepareTransaction: async () => {
          if (!offer.price) {
            throw new Error('Offer price is undefined');
          }
          return {
            type: 'onchain',
            to: realTokenYamUpgradeableAddress,
            data: encodeTransaction({
              abi: realTokenYamUpgradeableABI,
              functionName: 'createOffer',
              args: [
                offer.offerTokenAddress as `0x${string}`,
                offer.buyerTokenAddress as `0x${string}`,
                offer.buyerAddress as `0x${string}`,
                BigInt(new BigNumber(offer.price).toString(10)),
                BigInt(new BigNumber(amount).toString(10)),
              ],
            }),
          };
        },
        notifications: {
          id: 'create-offer',
          onSent: {
            title: "Création d'offre en cours",
            message: "Création de l'offre en cours...",
          },
          onComplete: {
            title: 'Offre créée',
            message: "L'offre a été créée avec succès",
          },
          onFail: {
            title: 'Erreur de création',
            message: "La création de l'offre a échoué",
          },
        },
      }
    );
  } else {
    // fake transaction deadline to make tx crash - will be set in prepareTransaction
    const transactionDeadline = Math.floor(Date.now() / 1000) - 3600;
    transactions.push(
      {
        prepareTransaction: async (context) => {
          const { account } = context;
          if (!account) {
            throw new Error('Account is undefined');
          }

          const realDeadline = Math.floor(Date.now() / 1000) + 3600; // 1h
          context.transactionDeadline = realDeadline;

          const signatureType =
            offerTokenType == 1
              ? 'signMessage-coinBridge'
              : 'signMessage-erc20';

          return {
            type: signatureType,
            owner: account as `0x${string}`,
            spender: realTokenYamUpgradeableAddress,
            amount: new BigNumber(amount).toString(10),
            deadline: realDeadline,
            contractAddress: offer.offerTokenAddress as `0x${string}`,
            signatureKey: 'signature',
          };
        },
      },
      {
        prepareTransaction: async (context) => {
          if (!offer.price || !amount) {
            throw new Error('Offer price or amount is undefined');
          }

          const { signature, transactionDeadline: deadline } = context;
          if (!signature) {
            throw new Error('Permit signature is undefined');
          }
          if (!deadline) {
            throw new Error('Transaction deadline is undefined');
          }

          const { v, r, s } = signature;

          return {
            type: 'onchain',
            to: realTokenYamUpgradeableAddress,
            data: encodeTransaction({
              abi: realTokenYamUpgradeableABI,
              functionName: 'createOfferWithPermit',
              args: [
                offer.offerTokenAddress as `0x${string}`,
                offer.buyerTokenAddress as `0x${string}`,
                offer.buyerAddress as `0x${string}`,
                BigInt(new BigNumber(offer.price).toString(10)),
                BigInt(new BigNumber(amount).toString(10)),
                BigInt(new BigNumber(amount).toString(10)),
                BigInt(deadline.toString()),
                v,
                r,
                s,
              ],
            }),
          };
        },
      }
    );
  }

  return transactions;
};

// Group approves for same token in unique approve tx to reduce gas consumption
const createApproves = (offers: CreatedOffer[]) => {
  const approves: { [key: string]: BigNumber } = {};
  offers.forEach((offer) => {
    if (!offer.amount) return;
    const approveForOfferToken = approves[offer.offerTokenAddress];
    if (approves[offer.offerTokenAddress]) {
      approves[offer.offerTokenAddress] = approveForOfferToken.plus(
        offer.amount
      );
    } else {
      approves[offer.offerTokenAddress] = new BigNumber(offer.amount);
    }
  });
  return approves;
};

export const createBatchOffersTransactions = async (
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  account: Address | undefined,
  offers: CreatedOffer[]
): Promise<Transaction[]> => {
  if (!publicClient || !activeChain || !account) {
    return [];
  }

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  console.log('realTokenYamUpgradeableAddress', realTokenYamUpgradeableAddress);

  const transactions: Transaction[] = [];
  const approves = createApproves(offers);

  // Ajouter les transactions d'approbation
  for (const approveContractAddress of Object.keys(approves)) {
    const amountToApprove = approves[approveContractAddress];
    const approveTxData = encodeTransaction({
      abi: coinBridgeTokenABI,
      functionName: 'approve',
      args: [
        realTokenYamUpgradeableAddress,
        BigInt(amountToApprove.toString(10)),
      ],
    });

    transactions.push({
      prepareTransaction: async () => ({
        type: 'onchain',
        to: approveContractAddress as `0x${string}`,
        data: approveTxData,
      }),
      notifications: {
        id: `approve-${approveContractAddress}`,
        onSent: {
          title: 'Approbation en cours',
          message: `Approbation du token ${approveContractAddress}...`,
        },
        onComplete: {
          title: 'Approbation réussie',
          message: 'Le token a été approuvé avec succès',
        },
        onFail: {
          title: "Erreur d'approbation",
          message: "L'approbation du token a échoué",
        },
      },
    });
  }

  // Ajouter les transactions de création d'offres
  for (const offer of offers) {
    if (!offer.amount || !offer.price) {
      continue;
    }

    const data = encodeTransaction({
      abi: realTokenYamUpgradeableABI,
      functionName: 'createOffer',
      args: [
        offer.offerTokenAddress as `0x${string}`,
        offer.buyerTokenAddress as `0x${string}`,
        offer.buyerAddress as `0x${string}`,
        BigInt(new BigNumber(offer.price).toString(10)),
        BigInt(new BigNumber(offer.amount).toString(10)),
      ],
    });

    transactions.push({
      prepareTransaction: async () => ({
        type: 'onchain',
        to: realTokenYamUpgradeableAddress,
        data,
      }),
      notifications: {
        id: `create-offer-${offer.offerTokenAddress}`,
        onSent: {
          title: "Création d'offre en cours",
          message: "Création de l'offre en cours...",
        },
        onComplete: {
          title: 'Offre créée',
          message: "L'offre a été créée avec succès",
        },
        onFail: {
          title: 'Erreur de création',
          message: "La création de l'offre a échoué",
        },
      },
    });
  }

  return transactions;
};
