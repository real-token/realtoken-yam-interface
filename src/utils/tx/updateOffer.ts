import { encodeTransaction } from '@real-token/web3';
import type { Transaction } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import { Address, PublicClient } from 'viem';
import { multicall } from 'viem/actions';
import { Config } from 'wagmi';

import { coinBridgeTokenABI, realTokenYamUpgradeableABI } from '../../abis';
import { UpdateFormValues } from '../../components/Modals/UpdateModal/type';
import { ExtendedChainConfig } from '../../config/aaConfig';
import { OFFER_TYPE } from '../../types/offer';
import { Offer } from '../../types/offer/Offer';

const getFormValues = (offer: Offer, rawValues: UpdateFormValues) => {
  const amountDecimals = parseInt(offer.offerTokenDecimals);
  const priceDecimals = parseInt(offer.buyerTokenDecimals);

  // Use choosedPrice if available, otherwise calculate from price
  const choosedPriceValue =
    rawValues.choosedPrice ??
    (offer.type == OFFER_TYPE.BUY ? 1 / rawValues.price : rawValues.price);

  const amount =
    offer.type == OFFER_TYPE.BUY
      ? new BigNumber(rawValues.amount ?? 1).multipliedBy(choosedPriceValue)
      : new BigNumber(rawValues.amount ?? 1);

  // Calculate price from choosedPrice if available
  let finalPrice = rawValues.price;
  if (rawValues.choosedPrice !== undefined) {
    if (offer.type == OFFER_TYPE.BUY) {
      finalPrice = 1 / rawValues.choosedPrice;
    } else {
      finalPrice = rawValues.choosedPrice;
    }
  }

  const formValues = {
    ...rawValues,
    amount: amount.shiftedBy(amountDecimals ?? 18).toFixed(0),
    price: new BigNumber(finalPrice ?? 1)
      .shiftedBy(priceDecimals ?? 18)
      .toFixed(0),
  };
  return formValues;
};

// Get old allowance and old amount for permit calculation
const getOldData = async (
  activeChain: ExtendedChainConfig | undefined,
  offer: Offer,
  account: Address,
  publicClient: PublicClient
) => {
  const realTokenYamUpgradeableAddress =
    activeChain?.contracts.realTokenYamUpgradeableAddress;

  const multicallResult = await multicall(publicClient, {
    contracts: [
      {
        abi: coinBridgeTokenABI,
        address: offer.offerTokenAddress as `0x${string}`,
        functionName: 'allowance',
        args: [account, realTokenYamUpgradeableAddress as `0x${string}`],
      },
      {
        abi: realTokenYamUpgradeableABI,
        address: realTokenYamUpgradeableAddress as `0x${string}`,
        functionName: 'getInitialOffer',
        args: [BigInt(offer.offerId)],
      },
    ],
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  });

  if (
    multicallResult[0].status !== 'success' ||
    multicallResult[1].status !== 'success'
  ) {
    throw new Error('Error getting old data');
  }

  const oldAllowance = multicallResult[0].result;
  const oldAmount = multicallResult[1].result?.[5] ?? 0n;

  return {
    oldAllowance: oldAllowance.toString(),
    oldAmount: oldAmount.toString(),
  };
};

export type UpdateOfferTransactionContext = {
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

export const updateOfferTransactions = async (
  account: Address | undefined,
  isAA: boolean,
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  config: Config,
  offer: Offer,
  values: UpdateFormValues
): Promise<Transaction<UpdateOfferTransactionContext>[]> => {
  if (
    !publicClient ||
    !values.amount ||
    !activeChain ||
    !values.price ||
    !values.offerId ||
    !account
  ) {
    throw new Error('Missing required values');
  }

  const { oldAllowance, oldAmount } = await getOldData(
    activeChain,
    offer,
    account,
    publicClient
  );
  const computedValues = getFormValues(offer, values);

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const offerTokenType = await publicClient.readContract({
    address: realTokenYamUpgradeableAddress,
    abi: realTokenYamUpgradeableABI,
    functionName: 'getTokenType',
    args: [offer.offerTokenAddress as `0x${string}`],
  });
  const unsupportedPermitToken = offerTokenType == 3;

  const transactions: Transaction<UpdateOfferTransactionContext>[] = [];

  // Calculate amount to permit based on old allowance and old amount
  const oldAmountInWei = new BigNumber(oldAmount);
  const oldAllowanceInWei = new BigNumber(oldAllowance);
  const newAmountInWei = new BigNumber(computedValues.amount);

  if (!oldAllowanceInWei || !oldAmountInWei || !newAmountInWei) {
    throw new Error('Error getting old allowance or amount');
  }

  const compare = oldAllowanceInWei.comparedTo(oldAmountInWei);
  if (compare == null) {
    throw new Error('oldAllowanceInWei or oldAmountInWei is NaN');
  }

  const amountInWeiToPermit =
    compare > 0
      ? oldAllowanceInWei.plus(newAmountInWei).minus(oldAmountInWei)
      : newAmountInWei;

  if (unsupportedPermitToken || isAA) {
    // Approve offer token
    transactions.push(
      {
        prepareTransaction: async (context) => {
          const { account } = context;
          if (!account) {
            throw new Error('Account is undefined');
          }

          return {
            type: 'onchain',
            to: offer.offerTokenAddress as `0x${string}`,
            data: encodeTransaction({
              abi: coinBridgeTokenABI,
              functionName: 'approve',
              args: [
                realTokenYamUpgradeableAddress,
                BigInt(amountInWeiToPermit.toString(10)),
              ],
            }),
          };
        },
        notifications: {
          id: 'approve-update-offer',
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
          return {
            type: 'onchain',
            to: realTokenYamUpgradeableAddress,
            data: encodeTransaction({
              abi: realTokenYamUpgradeableABI,
              functionName: 'updateOffer',
              args: [
                BigInt(values.offerId),
                BigInt(new BigNumber(computedValues.price).toString(10)),
                BigInt(new BigNumber(computedValues.amount).toString(10)),
              ],
            }),
          };
        },
        notifications: {
          id: 'update-offer',
          onSent: {
            title: 'Mise à jour en cours',
            message: "Mise à jour de l'offre en cours...",
          },
          onComplete: {
            title: 'Offre mise à jour',
            message: "L'offre a été mise à jour avec succès",
          },
          onFail: {
            title: 'Erreur de mise à jour',
            message: "La mise à jour de l'offre a échoué",
          },
        },
      }
    );
  } else {
    // Use permit
    // fake transaction deadline to make tx crash - will be set in prepareTransaction
    const transactionDeadline = Math.floor(Date.now() / 1000) - 3600;
    transactions.push(
      {
        prepareTransaction: async (context) => {
          const { account } = context;
          if (!account) {
            throw new Error('Account is undefined');
          }

          // Set real deadline in context
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
            amount: amountInWeiToPermit.toString(10),
            deadline: realDeadline,
            contractAddress: offer.offerTokenAddress as `0x${string}`,
            signatureKey: 'signature',
          };
        },
        notifications: {
          id: 'update-offer-permit',
          onSent: {
            title: 'Signature du permit en cours',
            message: "Mise à jour de l'offre avec permit en cours...",
          },
          onComplete: {
            title: 'Offre mise à jour',
            message: "L'offre a été mise à jour avec succès",
          },
          onFail: {
            title: 'Erreur de mise à jour',
            message: "La mise à jour de l'offre a échoué",
          },
        },
      },
      {
        prepareTransaction: async (context) => {
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
              functionName: 'updateOfferWithPermit',
              args: [
                BigInt(values.offerId),
                BigInt(new BigNumber(computedValues.price).toString(10)),
                BigInt(new BigNumber(computedValues.amount).toString(10)),
                BigInt(amountInWeiToPermit.toString(10)),
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
