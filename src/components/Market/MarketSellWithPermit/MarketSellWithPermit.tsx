import { useCallback, useState } from 'react';

import { showNotification, updateNotification } from '@mantine/notifications';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import styles from 'styles/MarketSell.module.css';

import { CoinBridgeToken, Erc20, Erc20ABI, coinBridgeTokenABI } from 'src/abis';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain } from 'src/hooks';
import coinBridgeTokenPermitSignature from 'src/hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from 'src/hooks/erc20PermitSignature';
import { useContract } from 'src/hooks/useContract';
import { getContract } from 'src/utils';

type CreateOfferFormValues = {
  offerTokenAddress: string;
  buyerTokenAddress: string;
  price: string;
  offerId: string;
};

export const MarketSellWithPermit = () => {
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

  const permitHandler = async (event: any) => {
    event.preventDefault();
    try {
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

      const offerToken = getContract<CoinBridgeToken>(
        enteredOfferToken,
        coinBridgeTokenABI,
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

      const transactionDeadline = Date.now() + 60 * 60 * 24 * 365; // permit valable during 1 year

      const { r, s, v }: any = await coinBridgeTokenPermitSignature(
        account,
        swapCatUpgradeable.address,
        enteredAmountInWei.toString(),
        transactionDeadline,
        offerToken,
        provider
      );

      const tx1 = await swapCatUpgradeable.createOfferWithPermit(
        enteredOfferToken,
        enteredBuyerToken,
        enteredOfferId,
        enteredPriceInWei.toString(),
        enteredAmountInWei.toString(),
        transactionDeadline.toString(),
        v,
        r,
        s
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.new_offer}>
      <form onSubmit={permitHandler}>
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
          <button onClick={permitHandler} type={'submit'}>
            {'Permit and Create Offer'}
          </button>
        </div>
      </form>
    </div>
  );
};
