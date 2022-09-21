import { useState } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import styles from 'styles/MarketSell.module.css';

import { CoinBridgeToken, Erc20, Erc20ABI, coinBridgeTokenABI } from 'src/abis';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain } from 'src/hooks';
import { useContract } from 'src/hooks/useContract';
import { getContract } from 'src/utils';

type CreateOfferFormValues = {
  offerTokenAddress: string;
  buyerTokenAddress: string;
  price: string;
  offerId: string;
};

export const MarketSell = () => {
  const [enteredOfferToken, setEnteredOfferToken] = useState('');
  const [enteredBuyerToken, setEnteredBuyerToken] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredOfferId, setEnteredOfferId] = useState('0');

  const { account, provider } = useWeb3React();
  const activeChain = useActiveChain();
  const swapCatUpgradeable = useContract(ContractsID.swapCatUpgradeable);

  const offerTokenHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredOfferToken(event.target.value);
  };
  const buyerTokenHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredBuyerToken(event.target.value);
  };
  const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPrice(event.target.value);
  };
  const amountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAmount(event.target.value);
  };
  const offerIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredOfferId(event.target.value);
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (
      !account ||
      !provider ||
      !swapCatUpgradeable ||
      !enteredOfferToken ||
      !enteredBuyerToken ||
      !enteredPrice ||
      !enteredAmount
    ) {
      return;
    }

    const offerToken = getContract<Erc20>(
      enteredOfferToken,
      Erc20ABI,
      provider,
      account
    );
    const buyerToken = getContract<Erc20>(
      enteredBuyerToken,
      Erc20ABI,
      provider,
      account
    );

    if (!offerToken || !buyerToken) {
      console.log('offerToken or buyerToken not found');
      return;
    }

    const offerTokenDecimals = await offerToken.decimals();
    const buyerTokenDecimals = await buyerToken.decimals();

    const enteredAmountInWei = new BigNumber(enteredAmount).shiftedBy(
      Number(offerTokenDecimals)
    );

    const enteredPriceInWei = new BigNumber(enteredPrice).shiftedBy(
      Number(buyerTokenDecimals)
    );

    try {
      const tx1 = await swapCatUpgradeable.createOffer(
        enteredOfferToken,
        enteredBuyerToken,
        enteredOfferId,
        enteredPriceInWei.toString(),
        enteredAmountInWei.toString()
      );

      const notificationPayload = {
        key: tx1.hash,
        href: `${activeChain?.blockExplorerUrl}tx/${tx1.hash}`,
        hash: tx1.hash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
      );

      tx1
        .wait()
        .then(({ status }) =>
          updateNotification(
            NOTIFICATIONS[
              status === 1
                ? NotificationsID.createOfferSuccess
                : NotificationsID.createOfferError
            ](notificationPayload)
          )
        );

      const tx2 = await offerToken.approve(
        swapCatUpgradeable.address,
        enteredAmountInWei.toString()
      );

      const notificationPayloadTx2 = {
        key: tx2.hash,
        href: `${activeChain?.blockExplorerUrl}tx/${tx2.hash}`,
        hash: tx2.hash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.approveOfferLoading](
          notificationPayloadTx2
        )
      );

      tx2
        .wait()
        .then(({ status }) =>
          updateNotification(
            NOTIFICATIONS[
              status === 1
                ? NotificationsID.approveOfferSuccess
                : NotificationsID.approveOfferError
            ](notificationPayload)
          )
        );
    } catch (e: any) {
      alert('You are not allowed to create offer');
      console.error(e);
    }

    // setEnteredOfferToken('');
    // setEnteredBuyerToken('');
    // setEnteredPrice('');
    // setEnteredAmount('');
  };

  return (
    <div className={styles.new_offer}>
      <form onSubmit={submitHandler}>
        <div className={styles.market_sells}>
          <div className={styles.market_sell}>
            <label>{'Offer Token Address'}</label>
            <input
              type={'text'}
              value={enteredOfferToken}
              onChange={offerTokenHandler}
            />
          </div>
          <div className={styles.market_sell}>
            <label>{'Buyer Token Address'}</label>
            <input
              type={'text'}
              value={enteredBuyerToken}
              onChange={buyerTokenHandler}
            />
          </div>
          <div className={styles.market_sell}>
            <label>{'Price (per unit)'}</label>
            <input
              type={'number'}
              min={'0.01'}
              step={'0.01'}
              value={enteredPrice}
              onChange={priceHandler}
            />
          </div>
          <div className={styles.market_sell}>
            <label>{'Amount'}</label>
            <input
              type={'number'}
              min={'0'}
              step={'0.01'}
              value={enteredAmount}
              onChange={amountHandler}
            />
          </div>

          <div className={styles.market_sell}>
            <label>{'OfferId'}</label>
            <input
              type={'number'}
              min={'0'}
              step={'1'}
              value={enteredOfferId}
              onChange={offerIdHandler}
            />
          </div>
        </div>
        <div className={styles.market_sell_actions}>
          <button type={'submit'}>{'Create offer then Approve'}</button>
        </div>
      </form>
    </div>
  );
};
