import { useEffect, useMemo, useState } from 'react';

import { showNotification, updateNotification } from '@mantine/notifications';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransaction } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import { useAccount, useReadContract } from 'wagmi';

import { CoinBridgeToken, coinBridgeTokenABI } from '../abis';
import { ExtendedChainConfig } from '../config/aaConfig';
import { ContractsID, NOTIFICATIONS, NotificationsID } from '../constants';
import { Offer } from '../types/offer';

type UseOffersComputedDatas = (
  offer: Offer,
  amount: number
) => {
  amountInWei: BigNumber;
  buyerTokenAmount: BigNumber;
  priceInWei: BigNumber;
};
export const useOffersComputedDatas: UseOffersComputedDatas = (
  offer,
  amount
) => {
  const price = parseFloat(offer.price);
  const priceInWei = new BigNumber(price.toString()).shiftedBy(
    Number(offer.buyerTokenDecimals)
  );

  const amountInWei = new BigNumber(
    parseInt(
      new BigNumber(amount.toString())
        .shiftedBy(Number(offer.offerTokenDecimals))
        .toString()
    )
  );
  const buyerTokenAmount = new BigNumber(
    parseInt(
      amountInWei
        .multipliedBy(priceInWei)
        .shiftedBy(-offer.offerTokenDecimals)
        .toString()
    )
  );

  return {
    amountInWei,
    buyerTokenAmount,
    priceInWei,
  };
};

type UseApproveOffer = (
  offer: Offer,
  amountToCheck: number
) => {
  approveNeeded: boolean;
  approve: () => Promise<void>;
  approveLoading: boolean;
};
export const useApproveOffer: UseApproveOffer = (offer, amount) => {
  const { buyerTokenAmount } = useOffersComputedDatas(offer, amount);

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { sendTransaction, isPending: isLoading } = useSendTransaction({
    onSent: () => {
      showNotification(
        NOTIFICATIONS[NotificationsID.approveOfferLoading]({
          key: 'approve',
          hash: '',
          href: '',
        })
      );
    },
    onSuccess: (receipt) => {
      updateNotification(
        NOTIFICATIONS[NotificationsID.approveOfferSuccess]({
          key: receipt.txHash,
          href: `${currentNetwork?.blockExplorerUrl}tx/${receipt.txHash}`,
          hash: receipt.txHash,
        })
      );
      refetchAllowance();
    },
    onError: (error) => {
      console.error(error);
      updateNotification(
        NOTIFICATIONS[NotificationsID.approveOfferError]({
          key: 'approve',
          hash: '',
          href: '',
        })
      );
    },
  });

  const { address: account } = useAccount();

  const realTokenYamUpgradeableAddress =
    currentNetwork?.contracts.realTokenYamUpgradeableAddress;

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    query: {
      enabled: !!account && !!realTokenYamUpgradeableAddress && !!offer,
    },
    address: offer.buyerTokenAddress as `0x${string}`,
    abi: coinBridgeTokenABI,
    functionName: 'allowance',
    args: [
      account as `0x${string}`,
      realTokenYamUpgradeableAddress as `0x${string}`,
    ],
  });
  const approveNeeded = allowance
    ? new BigNumber(allowance.toString()).lt(buyerTokenAmount.toString(10))
    : true;

  const approve = async () => {
    sendTransaction({
      to: offer.buyerTokenAddress as `0x${string}`,
      abi: coinBridgeTokenABI,
      functionName: 'approve',
      args: [
        realTokenYamUpgradeableAddress as `0x${string}`,
        BigInt(buyerTokenAmount.toString(10)),
      ],
    });
  };

  return {
    approveNeeded: approveNeeded,
    approve,
    approveLoading: isLoading,
  };
};
