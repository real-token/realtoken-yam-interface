import { useState } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useWeb3React } from '@web3-react/core';

import { BigNumber } from 'ethers';
import styles from 'styles/MarketSell.module.css';

import { BridgeToken, Erc20, Erc20ABI, bridgeTokenABI } from 'src/abis';
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

  const { account, chainId, provider } = useWeb3React();
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
    console.log('offer token event');
    console.log(event);

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

    const offerTokenContract = getContract<Erc20>(
      enteredOfferToken,
      Erc20ABI,
      provider,
      account
    );
    const buyerTokenContract = getContract<Erc20>(
      enteredBuyerToken,
      Erc20ABI,
      provider,
      account
    );

    if (!offerTokenContract || !buyerTokenContract) {
      console.log('offerTokenContract or buyerTokenContract not found');
      return;
    }

    const offerTokenDecimals = await offerTokenContract.decimals();
    const enteredAmountInWei = BigNumber.from(
      Math.round(100 * parseFloat(enteredAmount))
    ).mul(BigNumber.from(10).pow(offerTokenDecimals - 2));

    const buyerTokenDecimals = await buyerTokenContract?.decimals();
    const enteredPriceInWei = BigNumber.from(
      Math.round(100 * parseFloat(enteredPrice))
    ).mul(BigNumber.from(10).pow(buyerTokenDecimals - 2));

    const tx1 = await offerTokenContract.approve(
      swapCatUpgradeable.address,
      enteredAmountInWei
    );

    const notificationPayloadTx1 = {
      key: tx1.hash,
      href: `${activeChain?.blockExplorerUrl}tx/${tx1.hash}`,
      hash: tx1.hash,
    };

    showNotification(
      NOTIFICATIONS[NotificationsID.approveOfferLoading](notificationPayloadTx1)
    );

    tx1
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

    const tx2 = await swapCatUpgradeable.createOffer(
      enteredOfferToken,
      enteredBuyerToken,
      enteredOfferId,
      enteredPriceInWei.toString(),
      enteredAmountInWei.toString()
    );

    const notificationPayload = {
      key: tx2.hash,
      href: `${activeChain?.blockExplorerUrl}tx/${tx2.hash}`,
      hash: tx2.hash,
    };

    showNotification(
      NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
    );

    tx2
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
          <button onClick={submitHandler} type={'submit'}>
            {'Approve and Create Offer'}
          </button>
        </div>
      </form>
    </div>
  );
};
