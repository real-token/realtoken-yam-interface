import { showNotification, updateNotification } from '@mantine/notifications';
import { ProviderProps } from '@real-token/aa-core';
import {
  encodeTransaction,
  waitAllTransactionsConfirmed,
} from '@real-token/web3';

import { Address, PublicClient } from 'viem';

import { coinBridgeTokenABI, realTokenYamUpgradeableABI } from '../../abis';
import { ExtendedChainConfig } from '../../config/aaConfig';
import { NOTIFICATIONS, NotificationsID } from '../../constants';
import coinBridgeTokenPermitSignature, {
  PermitSignature,
} from '../../hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from '../../hooks/erc20PermitSignature';
import { CreatedOffer } from '../../types/offer';

export const createOffer = async (
  aa: ProviderProps,
  account: Address | undefined,
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  offer: CreatedOffer,
  amount: string
) => {
  if (
    !aa ||
    !publicClient ||
    !amount ||
    !activeChain ||
    !account ||
    !offer.price
  ) {
    return;
  }

  const { addTransaction, confirmAllTxs } = aa;

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const offerTokenType = await publicClient.readContract({
    address: realTokenYamUpgradeableAddress,
    abi: realTokenYamUpgradeableABI,
    functionName: 'getTokenType',
    args: [offer.offerTokenAddress as `0x${string}`],
  });
  const unsupportedPermitToken = offerTokenType == 3;

  const accountCode = await publicClient.getCode({
    address: account as `0x${string}`,
  });
  const isAA = accountCode !== '0x';

  if (unsupportedPermitToken || isAA) {
    // Approve offer token
    // We are additionning allowance because of how YAM is working (virtual allowance)

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

    const approveTxData = encodeTransaction({
      abi: coinBridgeTokenABI,
      functionName: 'approve',
      args: [realTokenYamUpgradeableAddress, BigInt(amountInWeiToPermit)],
    });

    await addTransaction({
      to: offer.offerTokenAddress as `0x${string}`,
      data: approveTxData,
    });
    const { txHash: transactionHashsApprove } = await confirmAllTxs();
    if (!transactionHashsApprove) {
      throw new Error('Approve tx hash not defined');
    }

    const approveTxHash = transactionHashsApprove[0];

    const notificationApprove = {
      key: approveTxHash,
      href: `${activeChain?.blockExplorerUrl}tx/${approveTxHash}`,
      hash: approveTxHash,
    };

    showNotification(
      NOTIFICATIONS[NotificationsID.approveOfferLoading](notificationApprove)
    );

    const approveTxReceipt = await publicClient.waitForTransactionReceipt({
      hash: approveTxHash as `0x${string}`,
    });

    const status = approveTxReceipt.status;
    updateNotification(
      NOTIFICATIONS[
        status === 'success'
          ? NotificationsID.approveOfferSuccess
          : NotificationsID.approveOfferError
      ](notificationApprove)
    );

    const createOfferTxData = await encodeTransaction({
      abi: realTokenYamUpgradeableABI,
      functionName: 'createOffer',
      args: [
        offer.offerTokenAddress as `0x${string}`,
        offer.buyerTokenAddress as `0x${string}`,
        offer.buyerAddress as `0x${string}`,
        BigInt(new BigNumber(offer.price).toString(10)),
        BigInt(new BigNumber(amount).toString(10)),
      ],
    });

    await addTransaction({
      to: realTokenYamUpgradeableAddress,
      data: createOfferTxData,
    });

    const { txHash: transactionHashs } = await confirmAllTxs();
    if (!transactionHashs) {
      throw new Error('Create offer tx hash not defined');
    }

    const createOfferTxHash = transactionHashs[0];

    const notificationPayload = {
      key: createOfferTxHash,
      href: `${activeChain?.blockExplorerUrl}tx/${createOfferTxHash}`,
      hash: createOfferTxHash,
    };

    showNotification(
      NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
    );

    const createOfferTxReceipt = await publicClient.waitForTransactionReceipt({
      hash: createOfferTxHash as `0x${string}`,
    });

    const createOfferTxStatus = createOfferTxReceipt.status;
    updateNotification(
      NOTIFICATIONS[
        createOfferTxStatus === 'success'
          ? NotificationsID.createOfferSuccess
          : NotificationsID.createOfferError
      ](notificationPayload)
    );
  } else {
    const transactionDeadline = Math.floor(Date.now() / 1000) + 3600;

    let permitAnswer: PermitSignature | undefined;
    if (offerTokenType == 1) {
      // TokenType = 1: RealToken
      permitAnswer = await coinBridgeTokenPermitSignature(
        account,
        realTokenYamUpgradeableAddress,
        new BigNumber(amount).toString(10),
        transactionDeadline,
        offer.offerTokenAddress as `0x${string}`,
        publicClient,
        aa
      );
    } else if (offerTokenType == 2) {
      // TokenType = 2: ERC20 With Permit
      permitAnswer = await erc20PermitSignature(
        account,
        realTokenYamUpgradeableAddress,
        new BigNumber(amount).toString(10),
        transactionDeadline,
        offer.offerTokenAddress as `0x${string}`,
        publicClient,
        aa
      );
    }
    if (!permitAnswer || !permitAnswer.v) {
      throw new Error('Permit answer is undefined');
    }

    const createOfferTxData = await encodeTransaction({
      abi: realTokenYamUpgradeableABI,
      functionName: 'createOfferWithPermit',
      args: [
        offer.offerTokenAddress as `0x${string}`,
        offer.buyerTokenAddress as `0x${string}`,
        offer.buyerAddress as `0x${string}`,
        BigInt(new BigNumber(offer.price).toString(10)),
        BigInt(new BigNumber(amount).toString(10)),
        BigInt(new BigNumber(amount).toString(10)),
        BigInt(transactionDeadline),
        Number(permitAnswer.v),
        permitAnswer.r,
        permitAnswer.s,
      ],
    });

    await addTransaction({
      to: realTokenYamUpgradeableAddress,
      data: createOfferTxData,
    });

    const { txHash: transactionHashs } = await confirmAllTxs();
    if (!transactionHashs) {
      throw new Error('Create offer tx hash not defined');
    }

    const createOfferTxHash = transactionHashs[0];

    const notificationPayload = {
      key: createOfferTxHash,
      href: `${activeChain?.blockExplorerUrl}tx/${createOfferTxHash}`,
      hash: createOfferTxHash,
    };

    showNotification(
      NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
    );

    const createOfferTxReceipt = await publicClient.waitForTransactionReceipt({
      hash: createOfferTxHash as `0x${string}`,
    });

    const createOfferTxStatus = createOfferTxReceipt.status;
    updateNotification(
      NOTIFICATIONS[
        createOfferTxStatus === 'success'
          ? NotificationsID.createOfferSuccess
          : NotificationsID.createOfferError
      ](notificationPayload)
    );
  }
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
export const createBatchOffers = async (
  aa: ProviderProps,
  account: Address | undefined,
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  offers: CreatedOffer[]
) => {
  if (!publicClient) {
    return;
  }

  const { addTransaction, confirmAllTxs } = aa;

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const approves = createApproves(offers);
  for await (const approveContractAddress of Object.keys(approves)) {
    const amountToApprove = approves[approveContractAddress];
    const approveTxData = encodeTransaction({
      abi: coinBridgeTokenABI,
      functionName: 'approve',
      args: [
        approveContractAddress as `0x${string}`,
        BigInt(amountToApprove.toString(10)),
      ],
    });

    await addTransaction({
      to: approveContractAddress as `0x${string}`,
      data: approveTxData,
    });
  }

  for await (const offer of offers) {
    if (!offer.amount || !offer.price) {
      return;
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
    await addTransaction({
      to: realTokenYamUpgradeableAddress,
      data,
    });
  }

  const { txHash: transactionHashs } = await confirmAllTxs();
  if (!transactionHashs) {
    throw new Error('');
  }

  await waitAllTransactionsConfirmed(
    publicClient,
    transactionHashs as `0x${string}`[]
  );

  const transactionHash = transactionHashs[0];

  const notificationPayload = {
    key: transactionHash,
    href: `${activeChain?.blockExplorerUrl}tx/${transactionHash}`,
    hash: transactionHash,
  };

  showNotification(
    NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
  );

  updateNotification(
    NOTIFICATIONS[
      status === 'success'
        ? NotificationsID.createOfferSuccess
        : NotificationsID.createOfferError
    ](notificationPayload)
  );
};
