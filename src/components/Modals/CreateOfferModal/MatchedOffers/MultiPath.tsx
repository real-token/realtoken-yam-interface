import { useMemo } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Flex, Text } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useCurrentNetwork } from '@real-token/core';
import { useSendBatchTransaction } from '@real-token/web3';
import { IconArrowRight } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import { multicall, readContract } from '@wagmi/core';

import BigNumber from 'bignumber.js';
import { useAtom } from 'jotai';
import { useAccount, useChainId, useConfig } from 'wagmi';

import {
  coinBridgeTokenABI,
  realTokenYamUpgradeableABI,
} from '../../../../abis';
import { ExtendedChainConfig } from '../../../../config/aaConfig';
import { NOTIFICATIONS, NotificationsID } from '../../../../constants';
import { getRightAllowBuyTokens } from '../../../../hooks/useAllowedTokens';
import { multiPathMultiCurrencyAtom } from '../../../../states';
import { MultiPathOffer } from '../../../../types/offer/MultiPathOffer';
import classes from './MultiPath.module.css';
import { MultiPathDetailsPopover } from './MultiPathDetailsPopover';

export interface AveragePrice {
  totalPriceInDollar: number;
  details: { [symbol: string]: number };
}

interface MissingTokenBalance {
  symbol: string;
  amount: number;
  contractAddress: string;
}

interface AmountToApprove {
  amount: BigNumber;
  contractAddress: string;
}

interface BuyDatas {
  prices: string[];
  amountsToBuy: string[];
  amountsToApprove: AmountToApprove[];
  missingTokenBalance: MissingTokenBalance[];
}

interface MultiPathProps {
  offers: MultiPathOffer[];
  amount: number | undefined;
  multiPathAmountFilled: number;
  multiPathAmountFilledPercentage: number;
  closeModal: () => void;
}
export const MultiPath = ({
  offers,
  amount,
  multiPathAmountFilledPercentage,
  multiPathAmountFilled,
  closeModal,
}: MultiPathProps) => {
  const { address: account } = useAccount();
  const chainId = useChainId();
  const config = useConfig();

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { t } = useTranslation('modals', { keyPrefix: 'offerMatching' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'buy' });

  const [multiCurrencies, setMultiCurrencies] = useAtom(
    multiPathMultiCurrencyAtom
  );

  const averagePrice: AveragePrice = useMemo(() => {
    const averagePrice: AveragePrice = {
      totalPriceInDollar: 0,
      details: {},
    };

    if (!amount) return averagePrice;

    offers.forEach((offer) => {
      const numberOfTokenToBuyInOffer = parseFloat(
        new BigNumber(offer.multiPathAmount)
          .shiftedBy(-offer.offerTokenDecimals)
          .toString()
      );
      const total = offer.offerPrice
        ? offer.offerPrice * numberOfTokenToBuyInOffer
        : 0;
      averagePrice.totalPriceInDollar = averagePrice.totalPriceInDollar + total;
      if (averagePrice.details[offer.buyerTokenName]) {
        averagePrice.details[offer.buyerTokenName] =
          averagePrice.details[offer.buyerTokenName] + total;
      } else {
        averagePrice.details[offer.buyerTokenName] = total;
      }
    });
    return averagePrice;
  }, [amount, offers]);

  //   const [buyDatas, setBuyDatas] = useState<BuyDatas | undefined>(undefined);

  const { data: buyDatas } = useQuery({
    queryKey: ['buyDatas', offers, amount, account],
    enabled: !!amount && !!account && !!offers,
    queryFn: async () => {
      if (!amount || !account) return;

      const prices: string[] = [];
      const amountsToBuy: string[] = [];
      const amountsToApprove: AmountToApprove[] = [];
      const missingTokenBalance: MissingTokenBalance[] = [];

      const calls: Array<{
        address: `0x${string}`;
        abi: typeof coinBridgeTokenABI;
        functionName: 'balanceOf';
        args: [`0x${string}`];
      }> = offers.map((offer) => ({
        address: offer.buyerTokenAddress as `0x${string}`,
        abi: coinBridgeTokenABI,
        functionName: 'balanceOf',
        args: [account as `0x${string}`],
      }));

      const multiCallResult = await multicall(config, {
        contracts: calls,
      });

      const balances = multiCallResult.map((result) => result.result);

      let i = 0;
      for await (const offer of offers) {
        if (!balances[i]) continue;
        // Price
        const priceInWei = new BigNumber(offer.price.toString()).shiftedBy(
          Number(offer.buyerTokenDecimals)
        );
        prices.push(priceInWei.toString());

        const offerAmountToApprove = new BigNumber(
          offer.multiPathAmountToApprove
        );

        // console.log("offer decimals: ", Number(offer.offerTokenDecimals), offer.offerTokenName)
        // console.log("buyer decimals: ", Number(offer.buyerTokenDecimals), offer.buyerTokenName)

        amountsToApprove.push({
          amount: offerAmountToApprove,
          contractAddress: offer.buyerTokenAddress,
        });
        amountsToBuy.push(offer.multiPathAmount);

        const userBalance = new BigNumber(balances?.[i]?.toString() ?? '0');
        // console.log("userBalance: ", userBalance.toString());
        // console.log("amountToApprove: ", amountToApprove.toString());

        if (userBalance.lt(offerAmountToApprove)) {
          missingTokenBalance.push({
            symbol: offer.buyerTokenName,
            amount: parseFloat(
              offerAmountToApprove
                .minus(userBalance)
                .shiftedBy(-Number(offer.buyerTokenDecimals))
                .toString()
            ),
            contractAddress: offer.buyerTokenAddress,
          });
        }

        i = i + 1;
      }

      return {
        prices,
        amountsToBuy,
        missingTokenBalance,
        amountsToApprove,
      };
    },
  });

  const { sendBatchTransactions } = useSendBatchTransaction({
    onTxSent: () => {
      const notificationApprove = {
        key: 'approve-and-buy',
        href: '',
        hash: '',
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationApprove)
      );
    },
    onSuccess: (tx) => {
      updateNotification(
        NOTIFICATIONS[NotificationsID.buyOfferSuccess]({
          key: 'approve-and-buy',
          href: `${currentNetwork?.blockExplorerUrl}tx/${tx.transactionHash}`,
          hash: tx.transactionHash,
        })
      );
    },
    onError: (error) => {
      console.log('Error when trying to buy with multipath: ', error);
      updateNotification(
        NOTIFICATIONS[NotificationsID.buyOfferError]({
          key: 'approve-and-buy',
          href: '',
          hash: '',
        })
      );
    },
  });

  const buy = async () => {
    if (!amount || !account || !buyDatas || !currentNetwork) return;

    const ids = offers.map((offer) => BigInt(offer.offerId));
    const { prices, amountsToBuy, amountsToApprove } = buyDatas;

    const allowances: { [key: string]: BigNumber } = {};
    //Group allowance for same tokens
    for (const amountToApprove of amountsToApprove) {
      if (allowances[amountToApprove.contractAddress]) {
        allowances[amountToApprove.contractAddress] = allowances[
          amountToApprove.contractAddress
        ].plus(amountToApprove.amount);
      } else {
        allowances[amountToApprove.contractAddress] = amountToApprove.amount;
      }
    }

    const approveNeeded: {
      toContractAddress: `0x${string}`;
      amount: BigInt;
    }[] = [];
    for await (const contractAddress of Object.keys(allowances)) {
      const amountToApprove = allowances[contractAddress];

      const oldAllowanceResult = await readContract(config, {
        address: contractAddress as `0x${string}`,
        abi: coinBridgeTokenABI,
        functionName: 'allowance',
        args: [
          account as `0x${string}`,
          currentNetwork.contracts.realTokenYamUpgradeableAddress,
        ],
      });
      const oldAllowance = new BigNumber(oldAllowanceResult.toString());

      if (oldAllowance.lt(amountToApprove)) {
        approveNeeded.push({
          toContractAddress: contractAddress as `0x${string}`,
          amount: BigInt(amountToApprove.toString(10)),
        });
      }
    }

    console.log(ids, prices, amountsToBuy);

    sendBatchTransactions([
      ...approveNeeded.map((approve) => ({
        address: approve.toContractAddress,
        abi: coinBridgeTokenABI,
        functionName: 'approve',
        args: [
          currentNetwork.contracts.realTokenYamUpgradeableAddress,
          approve.amount,
        ],
      })),
      {
        address: currentNetwork.contracts
          .realTokenYamUpgradeableAddress as `0x${string}`,
        abi: realTokenYamUpgradeableABI,
        functionName: 'buyOfferBatch',
        args: [ids, prices, amountsToBuy.map((amount) => BigInt(amount))],
      },
    ]);
  };

  return (
    <Flex
      direction={'column'}
      style={(theme) => ({
        position: 'relative',
        border: `2px solid ${theme.colors.brand[0]}`,
        padding: theme.spacing.md,
        borderRadius: theme.spacing.md,
      })}
    >
      <Flex
        style={(theme) => ({
          backgroundColor: theme.colors.blue,
          borderRadius: theme.radius.md,
          fontWeight: 700,
          padding: `0 ${theme.spacing.sm}px`,
          color: 'white',
          justifyContent: 'center',
        })}
        mb={12}
      >
        {t('multiPath')}
      </Flex>
      <Checkbox
        label={t('multiCurrency')}
        mb={10}
        checked={multiCurrencies}
        onChange={(event) => setMultiCurrencies(event.currentTarget.checked)}
      />
      <Text mb={5} fw={700}>
        {t('bestPath')}
      </Text>
      <Flex gap={15} mb={12} wrap={'wrap'}>
        {offers &&
          offers.map((offer, index) => {
            const Logo = getRightAllowBuyTokens(chainId).find(
              (allowedToken) =>
                allowedToken.contractAddress.toLowerCase() ==
                offer.buyerTokenAddress.toLowerCase()
            )?.logo;
            return (
              <Flex
                key={`multi-path-${offer.offerId}`}
                gap={'xs'}
                align={'center'}
              >
                <Flex
                  style={(theme) => ({
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.brand,
                    borderRadius: theme.radius.md,
                    height: '30px',
                    padding: `0 ${10}px`,
                    fontWeight: 700,
                    fontSize: theme.fontSizes.xl,
                  })}
                  gap={4}
                >
                  <Flex className={classes.currencyLogo}>
                    {Logo
                      ? React.cloneElement(<Logo />, { width: '18' })
                      : undefined}
                  </Flex>
                  <Text>{offer.offerId}</Text>
                </Flex>
                {index != offers.length - 1 ? <IconArrowRight /> : undefined}
              </Flex>
            );
          })}
      </Flex>
      <Flex direction={'column'} gap={5} mb={12}>
        <Text fw={700}>{t('total')}</Text>
        <MultiPathDetailsPopover averagePrice={averagePrice} />
      </Flex>
      <Flex direction={'column'} gap={5} mb={12}>
        <Text fw={700}>{t('amountFilled')}</Text>
        <Flex>
          {`${
            multiPathAmountFilledPercentage * 100
          }% (${multiPathAmountFilled})`}
        </Flex>
      </Flex>
      <Flex direction={'column'} gap={5} mb={16}>
        <Text fw={700}>{t('averagePricePerToken')}</Text>
        <Text>{`$ ${
          multiPathAmountFilled
            ? averagePrice?.totalPriceInDollar / multiPathAmountFilled
            : 0
        }`}</Text>
      </Flex>
      {buyDatas && buyDatas.missingTokenBalance.length > 0 ? (
        <Flex
          direction={'column'}
          className={classes.missingTokens}
          mb={16}
          p={'xs'}
        >
          <Text fw={700}>{t('missingTokenBalance')}</Text>
          <ul>
            {buyDatas.missingTokenBalance.map((missingToken) => {
              const Logo = getRightAllowBuyTokens(chainId).find(
                (allowedToken) =>
                  allowedToken.contractAddress.toLowerCase() ==
                  missingToken.contractAddress.toLowerCase()
              )?.logo;
              return (
                <li key={`missing-token-${missingToken.symbol}`}>
                  <Flex gap={'xs'}>
                    <Text>
                      {t('missingToken', {
                        missingTokenAmount: missingToken.amount,
                        missingTokenSymbol: missingToken.symbol,
                      })}
                    </Text>
                    {Logo
                      ? React.cloneElement(<Logo />, { width: '14' })
                      : undefined}
                  </Flex>
                </li>
              );
            })}
          </ul>
        </Flex>
      ) : undefined}
      <Button
        className={classes.floatingButton}
        onClick={() => buy()}
        disabled={buyDatas && buyDatas.missingTokenBalance.length > 0}
      >
        {t1('buy')}
      </Button>
    </Flex>
  );
};
