import { useCallback, useRef, useState } from 'react';

import {
  JsonRpcProvider,
  JsonRpcSigner,
  Web3Provider,
} from '@ethersproject/providers';
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

export async function getPermitSignature(
  account: string,
  wallet: JsonRpcSigner,
  token: BridgeToken,
  spender: string,
  value: BigNumberish = constants.MaxUint256,
  deadline = constants.MaxUint256,
  permitConfig?: {
    nonce?: BigNumberish;
    name?: string;
    chainId?: number;
    version?: string;
  }
): Promise<Signature> {
  const [nonce, name, version, chainId] = await Promise.all([
    permitConfig?.nonce,
    permitConfig?.name,
    permitConfig?.version,
    permitConfig?.chainId,
  ]);

  return splitSignature(
    await wallet._signTypedData(
      // eslint-disable-next-line object-shorthand
      { name, version, chainId, verifyingContract: token.address },
      {
        Permit: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'deadline',
            type: 'uint256',
          },
        ],
      },
      // eslint-disable-next-line object-shorthand
      {
        owner: account,
        spender,
        value,
        nonce,
        deadline,
      }
    )
  );
}

export const MarketSellWithPermit = () => {
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

  const permitHandler = async (event: any) => {
    event.preventDefault();
    console.log('permitHandler');
    console.log('chainId: ', chainId);
    console.log('token name: ', await bridgeToken.name());
    if (
      !account ||
      !connector ||
      !provider ||
      !bridgeToken ||
      !swapCatUpgradeable ||
      !enteredOfferToken ||
      !enteredBuyerToken ||
      !enteredPrice ||
      !enteredAmount
    ) {
      return;
    }

    const permitAmount = BigNumber.from(enteredAmount);
    const currentDate = new Date();
    const permitDeadline = BigNumber.from(
      Math.floor(currentDate.getTime() / 1000) + 60 * 60 * 24 * 365
    );

    const { v, r, s } = await getPermitSignature(
      account,
      provider.getSigner(),
      bridgeToken as BridgeToken,
      swapCatUpgradeable.address,
      permitAmount,
      permitDeadline,
      {
        nonce: await bridgeToken.nonces(account),
        name: await bridgeToken.name(),
        chainId: chainId,
        version: '1',
      }
    );
    console.log('BridgeToken: ', bridgeToken);

    // await bridgeToken.permit(
    //   account,
    //   swapCatUpgradeable.address,
    //   permitAmount,
    //   permitDeadline,
    //   v,
    //   r,
    //   s
    // );

    await swapCatUpgradeable.createOffer(
      enteredOfferToken,
      enteredBuyerToken,
      enteredOfferId,
      enteredPrice
    );
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
          <button onClick={permitHandler} type={'submit'}>
            {'Permit'}
          </button>
          <button onClick={submitHandler} type={'submit'}>
            {'Create Offer'}
          </button>
        </div>
      </form>
    </div>
  );
};

// const { getInputProps, onSubmit } = useForm({
//   initialValues: {
//     offerTokenAddress: '',
//     buyererTokenAddress: '',
//     price: '',
//     offerId: '',
//   },
// });

// const createOfferHandler = useCallback(
//   async (formValues: CreateOfferFormValues) => {
//     try {
//       if (
//         !account ||
//         !provider ||
//         !swapCatUpgradeable ||
//         !formValues.offerTokenAddress ||
//         !formValues.buyerTokenAddress ||
//         !formValues.price ||
//         !formValues.offerId
//       ) {
//         return;
//       }
//       const createOfferTransaction = await swapCatUpgradeable.createOffer(
//         formValues.offerTokenAddress,
//         formValues.buyerTokenAddress,
//         formValues.price,
//         formValues.offerId
//       );
//       console.log(formValues);
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   [account, activeChain, swapCatUpgradeable]
// );
