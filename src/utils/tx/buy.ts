import { showNotification, updateNotification } from '@mantine/notifications';
import { ProviderProps } from '@real-token/aa-core';
import { encodeTransaction } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import { Address, PublicClient } from 'viem';
import { readContract } from 'viem/actions';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';

import { coinBridgeTokenABI, realTokenYamUpgradeableABI } from '../../abis';
import { ExtendedChainConfig } from '../../config/aaConfig';
import coinBridgeTokenPermitSignature from '../../hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from '../../hooks/erc20PermitSignature';
import { Offer } from '../../types/offer';

export enum BUY_METHODS {
  buyWithApprove = 'buyWithApprove',
  buyWithPermit = 'buyWithPermit',
}

export const buy = async (
  aa: ProviderProps,
  account: Address | undefined,
  publicClient: PublicClient | undefined,
  activeChain: ExtendedChainConfig | undefined,
  offer: Offer,
  amount: number,
  method?: string
) => {
  if (!aa || !publicClient || !amount || !activeChain || !account) {
    return;
  }

  const { addTransaction, sendBundles } = aa;

  const realTokenYamUpgradeableAddress = activeChain?.contracts
    .realTokenYamUpgradeableAddress as `0x${string}`;

  const buyMethod = method ?? BUY_METHODS.buyWithApprove;

  const price = parseFloat(offer.price);

  const amountInWei = new BigNumber(
    parseInt(
      new BigNumber(amount)
        .shiftedBy(Number(offer.offerTokenDecimals))
        .toString()
    )
  );
  const priceInWei = new BigNumber(price.toString()).shiftedBy(
    Number(offer.buyerTokenDecimals)
  );

  const accountCode = await publicClient.getCode({
    address: account as `0x${string}`,
  });
  const isAA = accountCode !== '0x';

  const buyerTokenAmount = new BigNumber(
    parseInt(
      amountInWei
        .multipliedBy(priceInWei)
        .shiftedBy(-offer.offerTokenDecimals)
        .toString()
    )
  );
  const transactionDeadline = Math.floor(Date.now() / 1000) + 3600; // permit valable during 1h

  let approveNeeded = false;
  if (buyMethod == BUY_METHODS.buyWithApprove) {
    const allowance = await readContract(publicClient, {
      address: offer.buyerTokenAddress as `0x${string}`,
      abi: coinBridgeTokenABI,
      functionName: 'allowance',
      args: [account as `0x${string}`, realTokenYamUpgradeableAddress],
    });

    const allowanceBN = new BigNumber(allowance.toString());
    if (allowanceBN.lt(buyerTokenAmount.toString(10))) {
      approveNeeded = true;
    }
  }
  console.log('approveNeeded: ', approveNeeded);

  const buyerTokenType = await readContract(publicClient, {
    address: realTokenYamUpgradeableAddress,
    abi: realTokenYamUpgradeableABI,
    functionName: 'getTokenType',
    args: [offer.buyerTokenAddress as `0x${string}`],
  });

  const unsupportedTokenPermit = buyerTokenType === 3;

  if (
    buyMethod == BUY_METHODS.buyWithApprove ||
    (buyMethod == BUY_METHODS.buyWithPermit && unsupportedTokenPermit) ||
    isAA // aa cannot permit because YAM contract are not EIP 1271 compliant
  ) {
    if (approveNeeded) {
      const approveTxData = encodeTransaction({
        abi: coinBridgeTokenABI,
        functionName: 'approve',
        args: [
          realTokenYamUpgradeableAddress,
          BigInt(buyerTokenAmount.toString(10)),
        ],
      });

      await addTransaction({
        to: offer.buyerTokenAddress as `0x${string}`,
        data: approveTxData,
      });

      const approveTx = await sendBundles();

      const notificationApprove = {
        key: approveTx.transactionHash,
        href: `${activeChain?.blockExplorerUrl}tx/${approveTx.transactionHash}`,
        hash: approveTx.transactionHash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.approveOfferLoading](notificationApprove)
      );

      const approveTxReceipt = await publicClient.waitForTransactionReceipt({
        hash: approveTx.transactionHash,
      });

      const status = approveTxReceipt.status;
      updateNotification(
        NOTIFICATIONS[
          status === 'success'
            ? NotificationsID.approveOfferSuccess
            : NotificationsID.approveOfferError
        ](notificationApprove)
      );
    }

    const buyTxData = encodeTransaction({
      abi: realTokenYamUpgradeableABI,
      functionName: 'buy',
      args: [
        BigInt(offer.offerId),
        BigInt(priceInWei.toString()),
        BigInt(amountInWei.toString()),
      ],
    });

    await addTransaction({
      to: realTokenYamUpgradeableAddress,
      data: buyTxData,
    });

    const buyTx = await sendBundles();

    const notificationBuy = {
      key: buyTx.transactionHash,
      href: `${activeChain?.blockExplorerUrl}tx/${buyTx.transactionHash}`,
      hash: buyTx.transactionHash,
    };

    showNotification(
      NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationBuy)
    );

    const buyTxReceipt = await publicClient.waitForTransactionReceipt({
      hash: buyTx.transactionHash,
    });

    updateNotification(
      NOTIFICATIONS[
        buyTxReceipt.status === 'success'
          ? NotificationsID.buyOfferSuccess
          : NotificationsID.buyOfferError
      ](notificationBuy)
    );
  } else {
    let { r, s, v }: any = {};
    if (buyerTokenType === 1) {
      // TokenType = 1: RealToken
      const { r, s, v }: any = await coinBridgeTokenPermitSignature(
        account,
        realTokenYamUpgradeableAddress,
        buyerTokenAmount.toString(),
        transactionDeadline,
        offer.buyerTokenAddress as `0x${string}`,
        publicClient,
        aa
      );
    } else if (buyerTokenType === 2) {
      // TokenType = 2: ERC20 With Permit
      const { r, s, v }: any = await erc20PermitSignature(
        account,
        realTokenYamUpgradeableAddress,
        buyerTokenAmount.toString(),
        transactionDeadline,
        offer.buyerTokenAddress as `0x${string}`,
        publicClient,
        aa
      );
    } else {
      showNotification(NOTIFICATIONS[NotificationsID.buyOfferInvalid]());
      throw new Error('Buy token is not whitelisted');
    }

    const buyTxData = encodeTransaction({
      abi: realTokenYamUpgradeableABI,
      functionName: 'buyWithPermit',
      args: [
        BigInt(offer.offerId),
        BigInt(priceInWei.toString()),
        BigInt(amountInWei.toString()),
        BigInt(transactionDeadline),
        v,
        r,
        s,
      ],
    });

    await addTransaction({
      to: realTokenYamUpgradeableAddress,
      data: buyTxData,
    });

    const buyTx = await sendBundles();

    const notificationBuy = {
      key: buyTx.transactionHash,
      href: `${activeChain?.blockExplorerUrl}tx/${buyTx.transactionHash}`,
      hash: buyTx.transactionHash,
    };

    showNotification(
      NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationBuy)
    );

    const buyTxReceipt = await publicClient.waitForTransactionReceipt({
      hash: buyTx.transactionHash,
    });

    updateNotification(
      NOTIFICATIONS[
        buyTxReceipt.status === 'success'
          ? NotificationsID.buyOfferSuccess
          : NotificationsID.buyOfferError
      ](notificationBuy)
    );
  }
};
