import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import {
  Button,
  Checkbox,
  Flex,
  MantineTheme,
  Text,
  createStyles,
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconArrowRight } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { useAtom } from 'jotai';

import { CoinBridgeToken, coinBridgeTokenABI } from '../../../../abis';
import {
  ContractsID,
  NOTIFICATIONS,
  NotificationsID,
} from '../../../../constants';
import { useActiveChain, useContract } from '../../../../hooks';
import { getRightAllowBuyTokens } from '../../../../hooks/useAllowedTokens';
import { multiPathMultiCurrencyAtom } from '../../../../states';
import { Offer } from '../../../../types/offer';
import { MultiPathOffer } from '../../../../types/offer/MultiPathOffer';
import { getContract } from '../../../../utils';
import { MultiPathDetailsPopover } from './MultiPathDetailsPopover';

const useStyle = createStyles((theme: MantineTheme) => ({
  container: {
    position: 'relative',
    border: `2px solid ${theme.colors.brand[0]}`,
    padding: theme.spacing.md,
    borderRadius: theme.spacing.md,
  },
  floatingButton: {
    bottom: 0,
    right: 0,
    marginBottom: '10px',
    marginRight: '10px',
  },
  currencyLogo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: 'translate(40%,40%)',
  },
  missingTokens: {
    border: `2px solid ${theme.colors.red[9]}`,
    borderRadius: theme.spacing.md,
  },
}));

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
  const { account, provider } = useWeb3React();
  const activeChain = useActiveChain();
  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

  const { t } = useTranslation('modals', { keyPrefix: 'offerMatching' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'buy' });

  const { chainId } = useWeb3React();
  const { classes } = useStyle();

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

  const [buyDatas, setBuyDatas] = useState<BuyDatas | undefined>(undefined);
  useEffect(() => {
    const fetchBuyDatas = async () => {
      if (!realTokenYamUpgradeable || !amount || !account) return;

      const prices: string[] = [];
      const amountsToBuy: string[] = [];
      const amountsToApprove: AmountToApprove[] = [];
      const missingTokenBalance: MissingTokenBalance[] = [];

      let i = 0;
      for await (const offer of offers) {
        const buyerToken = getContract<CoinBridgeToken>(
          offer.buyerTokenAddress,
          coinBridgeTokenABI,
          provider as Web3Provider,
          account
        );

        if (!buyerToken) return;

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

        const userBalance = new BigNumber(
          (await buyerToken.balanceOf(account)).toString()
        );
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
      setBuyDatas({
        prices,
        amountsToBuy,
        missingTokenBalance,
        amountsToApprove,
      });
    };
    if (realTokenYamUpgradeable && amount && account) fetchBuyDatas();
  }, [account, activeChain, amount, offers, provider, realTokenYamUpgradeable]);

  // console.log(buyDatas)

  const buy = async () => {
    try {
      if (!realTokenYamUpgradeable || !amount || !account || !buyDatas) return;

      const ids = offers.map((offer) => parseFloat(offer.offerId));
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

      for await (const contractAddress of Object.keys(allowances)) {
        const amountToApprove = allowances[contractAddress];

        const buyerToken = getContract<CoinBridgeToken>(
          contractAddress,
          coinBridgeTokenABI,
          provider as Web3Provider,
          account
        );

        if (!buyerToken) return;

        // get current allowance
        const oldAllowance = new BigNumber(
          (
            await buyerToken.allowance(account, realTokenYamUpgradeable.address)
          ).toString()
        );

        console.log(oldAllowance.toString(), amountToApprove.toString());

        if (oldAllowance.lt(amountToApprove)) {
          const approveTx = await buyerToken.approve(
            realTokenYamUpgradeable.address,
            amountToApprove.toString(10)
          );

          const notificationApprove = {
            key: approveTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${approveTx.hash}`,
            hash: approveTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.approveOfferLoading](
              notificationApprove
            )
          );

          approveTx
            .wait()
            .then(({ status }) =>
              updateNotification(
                NOTIFICATIONS[
                  status === 1
                    ? NotificationsID.approveOfferSuccess
                    : NotificationsID.approveOfferError
                ](notificationApprove)
              )
            );

          await approveTx.wait(1);
        }
      }

      console.log(ids, prices, amountsToBuy);

      // Buy with buyBatch
      const buyBatchTx = await realTokenYamUpgradeable.buyOfferBatch(
        ids,
        prices,
        amountsToBuy
      );

      const notificationBuy = {
        key: buyBatchTx.hash,
        href: `${activeChain?.blockExplorerUrl}tx/${buyBatchTx.hash}`,
        hash: buyBatchTx.hash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationBuy)
      );

      buyBatchTx.wait().then(({ status }) => {
        updateNotification(
          NOTIFICATIONS[
            status === 1
              ? NotificationsID.buyOfferSuccess
              : NotificationsID.buyOfferError
          ](notificationBuy)
        );
        if (status == 1) closeModal();
      });
    } catch (err) {
      console.log('Error when trying to buy with multipath: ', err);
      showNotification(
        NOTIFICATIONS[NotificationsID.buyOfferInvalid](
          'Error when trying to buy with multipath'
        )
      );
    }
  };

  return (
    <Flex direction={'column'} className={classes.container}>
      <Flex
        sx={(theme) => ({
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
      <Text mb={5} weight={700}>
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
                  sx={(theme) => ({
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
        <Text weight={700}>{t('total')}</Text>
        <MultiPathDetailsPopover averagePrice={averagePrice} />
      </Flex>
      <Flex direction={'column'} gap={5} mb={12}>
        <Text weight={700}>{t('amountFilled')}</Text>
        <Flex>
          {`${
            multiPathAmountFilledPercentage * 100
          }% (${multiPathAmountFilled})`}
        </Flex>
      </Flex>
      <Flex direction={'column'} gap={5} mb={16}>
        <Text weight={700}>{t('averagePricePerToken')}</Text>
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
