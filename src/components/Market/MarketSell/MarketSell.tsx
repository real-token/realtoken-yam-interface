import { useCallback, useRef, useState } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import { useForm } from '@mantine/form';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@web3-react/types';

import { BigNumber } from 'ethers';
import { BigNumberish, Signature, Wallet, constants } from 'ethers';
import { splitSignature } from 'ethers/lib/utils';
import styles from 'styles/MarketSell.module.css';

import { BridgeToken, bridgeTokenABI } from 'src/abis';
import { ContractsID } from 'src/constants';
import { useActiveChain } from 'src/hooks';
import { useAsync } from 'src/hooks/useAsync';
import { useContract } from 'src/hooks/useContract';
import { asyncRetry, getContract } from 'src/utils';

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

  const { connector, account, chainId, provider } = useWeb3React();
  const activeChain = useActiveChain();
  const swapCatUpgradeable = useContract(ContractsID.swapCatUpgradeable);
  const bridgeToken = getContract<BridgeToken>(
    enteredOfferToken,
    bridgeTokenABI,
    provider as Web3Provider,
    account
  );

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

    await swapCatUpgradeable.createOffer(
      enteredOfferToken,
      enteredBuyerToken,
      enteredOfferId,
      enteredPrice
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
            {'Create Offer'}
          </button>
        </div>
      </form>
    </div>
  );
};
