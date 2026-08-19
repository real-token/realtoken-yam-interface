import { encodeTransaction } from '@real-token/web3';
import type { Transaction } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import { Address, PublicClient } from 'viem';
import { readContract } from 'viem/actions';

// notifications are handled by callers of useSendTransactions
import { coinBridgeTokenABI, realTokenYamUpgradeableABI } from '../../abis';
import { ExtendedChainConfig } from '../../config/aaConfig';
// signature is produced by useSendTransactions signature step, no direct hook here
import { Offer } from '../../types/offer';

export enum BUY_METHODS {
  buyWithApprove = 'buyWithApprove',
  buyWithPermit = 'buyWithPermit',
}

export type BuyTransactionContext = {
  account: Address;
  transactionDeadline?: number;
  signature?: {
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
    signature: string;
  };
};

export const buyTransactions = async (
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  offer: Offer,
  amount: number,
  method?: string
): Promise<Transaction<BuyTransactionContext>[]> => {
  if (!publicClient || !amount || !activeChain) {
    return [];
  }

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const buyMethod = method ?? BUY_METHODS.buyWithApprove;

  const price = parseFloat(offer.price);

  const offerDecimals = Number(offer.offerTokenDecimals);
  const buyerDecimals = Number(offer.buyerTokenDecimals);

  // Rester en BigNumber tout au long pour éviter la perte de précision JS.
  // parseInt() tronque les entiers > 2^53 en notation scientifique (ex: 3.88e+21)
  // ce qui rend BigInt() incompatible — utiliser .integerValue() à la place.
  const amountInWei = new BigNumber(amount)
    .shiftedBy(offerDecimals)
    .integerValue(BigNumber.ROUND_DOWN);

  const priceInWei = new BigNumber(price.toString()).shiftedBy(buyerDecimals);

  // account type (EOA/AA) will be checked at execution time if needed

  const buyerTokenAmount = amountInWei
    .multipliedBy(priceInWei)
    .shiftedBy(-offerDecimals)
    .integerValue(BigNumber.ROUND_DOWN);
  const transactions: Transaction<BuyTransactionContext>[] = [];
  const transactionDeadline = Math.floor(Date.now() / 1000) + 3600; // 1h

  const buyerTokenType = await readContract(publicClient, {
    address: realTokenYamUpgradeableAddress,
    abi: realTokenYamUpgradeableABI,
    functionName: 'getTokenType',
    args: [offer.buyerTokenAddress as `0x${string}`],
  });

  const unsupportedTokenPermit = buyerTokenType === 3;

  if (
    buyMethod == BUY_METHODS.buyWithApprove ||
    (buyMethod == BUY_METHODS.buyWithPermit && unsupportedTokenPermit)
  ) {
    // Approve if needed (checked at execution time)
    transactions.push(
      {
        skipCondition: async ({ context }) => {
          const { account } = context;
          if (!account) throw new Error('Account is undefined');
          const allowance = await readContract(publicClient, {
            address: offer.buyerTokenAddress as `0x${string}`,
            abi: coinBridgeTokenABI,
            functionName: 'allowance',
            args: [account as `0x${string}`, realTokenYamUpgradeableAddress],
          });
          const allowanceBN = new BigNumber(allowance.toString());
          return allowanceBN.gte(buyerTokenAmount.toFixed(0));
        },
        prepareTransaction: async () => ({
          type: 'erc20-approve',
          tokenAddress: offer.buyerTokenAddress as `0x${string}`,
          spenderAddress: realTokenYamUpgradeableAddress,
          amount: buyerTokenAmount.toFixed(0),
        }),
      },
      {
          prepareTransaction: async () => ({
          type: 'onchain',
          to: realTokenYamUpgradeableAddress,
          data: encodeTransaction({
            abi: realTokenYamUpgradeableABI,
            functionName: 'buy',
            args: [
              BigInt(offer.offerId),
              BigInt(priceInWei.toFixed(0)),
              BigInt(amountInWei.toFixed(0)),
            ],
          }),
        }),
      }
    );
  } else {
    // Permit sign step
    const signatureType =
      buyerTokenType === 1 ? 'signMessage-coinBridge' : 'signMessage-erc20';

    transactions.push(
      {
        prepareTransaction: async (context) => {
          const { account } = context;
          if (!account) throw new Error('Account is undefined');
          return {
            type: signatureType,
            owner: account as `0x${string}`,
            spender: realTokenYamUpgradeableAddress,
            amount: buyerTokenAmount.toFixed(0),
            deadline: transactionDeadline,
            contractAddress: offer.buyerTokenAddress as `0x${string}`,
            signatureKey: 'signature',
          };
        },
      },
      {
        prepareTransaction: async (context) => {
          const { signature } = context;
          if (!signature) throw new Error('Permit signature is undefined');
          const { v, r, s } = signature;

          return {
            type: 'onchain',
            to: realTokenYamUpgradeableAddress,
            data: encodeTransaction({
              abi: realTokenYamUpgradeableABI,
              functionName: 'buyWithPermit',
              args: [
                BigInt(offer.offerId),
                BigInt(priceInWei.toFixed(0)),
                BigInt(amountInWei.toFixed(0)),
                BigInt(transactionDeadline),
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
