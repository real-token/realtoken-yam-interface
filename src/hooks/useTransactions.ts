import React, { useMemo } from 'react';

import BigNumber from 'bignumber.js';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';

import { AllowedToken } from 'src/types/allowedTokens';
import { Offer } from 'src/types/offer/Offer';

import { TransactionData } from '../components/Transactions/Types';
import {
  associateBuyWithCreateOfferTransaction,
  associateTransactionWithOffer,
  guessCreateOfferTransactionId,
} from '../components/Transactions/Utils';

interface Transaction {
  blockNumber: number;
  timeStamp: number;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: number;
  gas: number;
  gasPrice: number;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: number;
  confirmations: number;
  methodId: string;
  functionName: string;
}

interface Result {
  status: number;
  result: Transaction[];
}

const BUY_METHOD = '0x40993b26';
const BUY_OFFER_BATCH_METHOD = '0x14b2051f';
const BUY_OFFER_WITH_PERMIT_METHOD = '0x1bcae916';
const CREATE_OFFER_METHOD = '0x2befd4ad';
const CREATE_OFFER_WITH_PERMIT_METHOD = '0xdc3033fc';
const CREATE_OFFER_BATCH_METHOD = '0x1a2caf6f';

const PAGE_SIZE = 30; // Nombre d'éléments par page

const MAX_TOKEN_AVAILABLE = 500000; //token max par site (pour filtré les valeur impossible)

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

function useTransaction(
  address: string,
  page = 1,
  offers: Offer[] = [],
  allowedTokens: AllowedToken[] = []
) {
  console.log('HOOK useTransaction', page);

  // Définissez une fonction pour obtenir la clé de pagination
  const getKey = (pageIndex: number, previousPageData: Result | null) => {
    // Si pageIndex est 0, c'est la première page, pas besoin de page précédente
    if (pageIndex === 0) {
      return `/api/transactions?address=${address}&page=1&pageSize=${PAGE_SIZE}`;
    }

    // Utilisez la clé de la page précédente pour obtenir la suivante
    const nextPage = pageIndex + 1;

    if (previousPageData && previousPageData.result.length === PAGE_SIZE) {
      return `/api/transactions?address=${address}&page=${nextPage}&pageSize=${PAGE_SIZE}`;
    }

    // S'il n'y a plus de données, arrêtez de demander
    return null;
  };

  //const apiUrl = `/api/transactions?address=${address}&page=${page}&pageSize=${PAGE_SIZE}`; // Utilisez le chemin de l'API Next.js

  //const { data, error } = useSWR<{ result: Transaction[] }>(apiUrl, fetcher);

  // Utilisez useSWRInfinite pour la pagination
  const { data, error, size, setSize, isValidating } = useSWRInfinite<Result>(
    getKey,
    fetcher
  ) as SWRInfiniteResponse<Result>;

  const allTransactions: Transaction[] = useMemo(
    () =>
      data
        ? data.reduce(
            (acc, page) => acc.concat(page.result),
            [] as Transaction[]
          )
        : [],
    [data]
  );

  const buyTransactions = allTransactions.filter(
    (transaction) =>
      transaction.methodId &&
      (transaction.methodId.toLowerCase() === BUY_METHOD.toLowerCase() ||
        transaction.methodId.toLowerCase() ==
          BUY_OFFER_BATCH_METHOD.toLowerCase() ||
        transaction.methodId.toLowerCase() ==
          BUY_OFFER_WITH_PERMIT_METHOD.toLowerCase())
  );

  const createOfferTransactions = useMemo(
    () =>
      allTransactions.filter(
        (transaction) =>
          transaction.methodId &&
          (transaction.methodId.toLowerCase() ===
            CREATE_OFFER_METHOD.toLowerCase() ||
            transaction.methodId.toLowerCase() ==
              CREATE_OFFER_WITH_PERMIT_METHOD.toLowerCase() ||
            transaction.methodId.toLowerCase() ==
              CREATE_OFFER_BATCH_METHOD.toLowerCase())
      ),
    [allTransactions]
  );

  const formattedBuyTransactions: TransactionData[] | undefined = useMemo(
    () =>
      buyTransactions?.map((transaction) => {
        const { offerId, price, amount, priceGwei, amountGwei } =
          formatBuyInput(transaction.input);

        return {
          blockNumber: transaction.blockNumber,
          timeStamp: transaction.timeStamp,
          hash: transaction.hash,
          from: transaction.from,
          isError: transaction.isError,
          txreceipt_status: transaction.txreceipt_status,
          offerId: offerId,
          price: price,
          amount: amount,
          priceGwei: priceGwei,
          amountGwei: amountGwei,
        };
      }),
    [buyTransactions]
  );

  const formattedCreateOfferTransactions: TransactionData[] | undefined =
    useMemo(
      () =>
        createOfferTransactions?.map((transaction) => {
          const {
            tokenBuyWith,
            tokenForSell,
            price,
            amount,
            priceGwei,
            amountGwei,
          } = formatCreateOfferInput(transaction.input);

          return {
            blockNumber: transaction.blockNumber,
            timeStamp: transaction.timeStamp,
            hash: transaction.hash,
            from: transaction.from,
            isError: transaction.isError,
            txreceipt_status: transaction.txreceipt_status,
            offerId: '0',
            price: price,
            amount: amount,
            priceGwei: priceGwei,
            amountGwei: amountGwei,
            offerTimestamp: transaction.timeStamp,
            tokenBuyWith: {
              address: tokenBuyWith,
              decimals: 0,
              name: '',
            },
            tokenForSale: {
              address: tokenForSell,
              decimals: 0,
              name: '',
            },
            initialOfferAmount: amount,
            initialOfferAmountGwei: amountGwei,
          };
        }),
      [createOfferTransactions]
    );

  if (formattedBuyTransactions && formattedCreateOfferTransactions) {
    agregateTransactions(
      formattedBuyTransactions,
      formattedCreateOfferTransactions,
      offers,
      allowedTokens
    );
  }

  return {
    buyTransactions: formattedBuyTransactions,
    createOfferTransactions: formattedCreateOfferTransactions,
    isLoading: !error && !data,
    isError: error,
    size: size,
    setSize: setSize,
    isValidating: isValidating,
  };
}

export default useTransaction;

function agregateTransactions(
  formattedBuyTransactions: TransactionData[],
  formattedCreateOfferTransactions: TransactionData[],
  offers: Offer[],
  allowedTokens: AllowedToken[]
) {
  associateTransactionWithOffer(
    formattedBuyTransactions,
    formattedCreateOfferTransactions,
    offers,
    allowedTokens
  );

  guessCreateOfferTransactionId(
    formattedBuyTransactions,
    formattedCreateOfferTransactions
  );

  associateBuyWithCreateOfferTransaction(
    formattedBuyTransactions,
    formattedCreateOfferTransactions
  );

  guessCreateOfferTransactionId(
    formattedBuyTransactions,
    formattedCreateOfferTransactions
  );
}

/**
 * formatInput
 * @param inputString
 * @returns
 */
function formatBuyInput(inputString: string): {
  methodId: string;
  offerId: string;
  price: number;
  amount: number;
  priceGwei: number;
  amountGwei: number;
} {
  if (inputString.length < 202) {
    throw new Error("La longueur de la chaîne n'est pas valide.");
  }

  const methodId = inputString.slice(2, 10);
  const offerId = parseInt(inputString.slice(10, 74), 16).toString();
  const priceUSDC = new BigNumber(parseInt(inputString.slice(74, 138), 16))
    .dividedBy(1000000)
    .toNumber();
  const priceXDAI = new BigNumber(parseInt(inputString.slice(74, 138), 16))
    .dividedBy(1000000000000000000)
    .toNumber();
  const price = priceUSDC < 1000000 ? priceUSDC : priceXDAI;

  const amount = new BigNumber(parseInt(inputString.slice(138, 202), 16))
    .dividedBy(1000000000)
    .toNumber();
  const priceGwei = parseInt(inputString.slice(74, 138), 16);
  const amountGwei = parseInt(inputString.slice(138, 202), 16);

  return {
    methodId: methodId,
    offerId: offerId,
    price: price,
    amount: amount > MAX_TOKEN_AVAILABLE ? 0 : amount,
    priceGwei: priceGwei,
    amountGwei: amountGwei,
  };
}

function formatCreateOfferInput(inputString: string): {
  methodId: string;
  tokenForSell: string;
  tokenBuyWith: string;
  price: number;
  amount: number;
  priceGwei: number;
  amountGwei: number;
} {
  if (inputString.length < 202) {
    throw new Error("La longueur de la chaîne n'est pas valide.");
  }

  const methodId = inputString.slice(2, 10);
  const tokenForSell = parseInt(inputString.slice(10, 74), 16).toString();
  const tokenBuyWith = parseInt(inputString.slice(74, 138), 16).toString();
  //const buyer = parseInt(inputString.slice(138, 202), 16).toString();
  const priceGwei = new BigNumber(
    parseInt(inputString.slice(202, 266), 16)
  ).toNumber();
  const amountGwei = new BigNumber(
    parseInt(inputString.slice(266, 330), 16)
  ).toNumber();

  const price = new BigNumber(parseInt(inputString.slice(202, 266), 16))
    .dividedBy(1000000)
    .toNumber();
  const amount = new BigNumber(parseInt(inputString.slice(266, 330), 16))
    .dividedBy(1000000000)
    .toNumber();

  return {
    methodId,
    tokenForSell,
    tokenBuyWith,
    priceGwei,
    amountGwei,
    price,
    amount,
  };
}
