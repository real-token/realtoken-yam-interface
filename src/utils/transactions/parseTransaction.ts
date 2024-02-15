import BigNumber from 'bignumber.js';

import { Offer } from 'src/types/offer/Offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';
import { TokenData, Transaction } from 'src/types/transaction/Transaction';
import {
  TRANSACTION_METHOD,
  TRANSACTION_TYPE,
} from 'src/types/transaction/TransactionType';

import { Transaction as TransactionGraphQl } from '../../../.graphclient/index';

// TOKEN TYPE
// 1 = RealToken
// 2 = ERC20 avec permit
// 3 = ERC20 sans permit
export const getOfferType = (
  offerTokenType: number,
  buyerTokenType: number,
): OFFER_TYPE => {
  if (offerTokenType == 1 && (buyerTokenType == 2 || buyerTokenType == 3))
    return OFFER_TYPE.SELL;
  if ((offerTokenType == 2 || offerTokenType == 3) && buyerTokenType == 1)
    return OFFER_TYPE.BUY;

  return OFFER_TYPE.EXCHANGE;
};

export const parseTransaction = (
  transactionGraphQL: TransactionGraphQl,
  offers: Offer[],
): Promise<Transaction> => {
  return new Promise<Transaction>(async (resolve, reject) => {
    try {
      const { amountGwei, offerId, priceGwei, type } = parseInput(
        transactionGraphQL.input,
      );
      const amount = new BigNumber(amountGwei)
        .dividedBy(transactionGraphQL.transferEvents[0].token.decimals)
        .toNumber();
      const t: Transaction = {
        offerId: offerId,
        blockNumber: transactionGraphQL.block,
        hash: transactionGraphQL.id,
        timeStamp: transactionGraphQL.timestamp,
        from: transactionGraphQL.transferEvents[0].sender,
        price: 0,
        amount: amount,
        amountGwei: amountGwei,
        priceGwei: priceGwei,
        type: type,
      };

      associateTransactionWithOffer(t, offers);

      // console.log(offer.availableAmount, balanceWallet, allowance)
      resolve(t);
    } catch (err) {
      console.log('Error when fetching transaction from TheGraph', err);
      reject(err);
    }
  });
};

function parseInput(inputString: string): {
  methodId: string;
  offerId: string;
  priceGwei: number;
  amountGwei: number;
  type: TRANSACTION_TYPE;
} {
  const methodId = inputString.slice(2, 10);

  if (
    methodId.toLowerCase() !== TRANSACTION_METHOD.BUY_METHOD.toLowerCase() &&
    methodId.toLowerCase() !==
      TRANSACTION_METHOD.BUY_OFFER_BATCH_METHOD.toLowerCase() &&
    methodId.toLowerCase() !==
      TRANSACTION_METHOD.BUY_OFFER_WITH_PERMIT_METHOD.toLowerCase()
  ) {
    return {
      methodId: methodId,
      offerId: '',
      priceGwei: 0,
      amountGwei: 0,
      type: TRANSACTION_TYPE.UNKNOWN,
    };
  }

  if (inputString.length < 202) {
    console.log('parseInput', inputString);
    throw new Error("La longueur de la chaîne n'est pas valide.");
  }

  const offerId = parseInt(inputString.slice(10, 74), 16).toString();
  const priceGwei = parseInt(inputString.slice(74, 138), 16);
  const amountGwei = parseInt(inputString.slice(138, 202), 16);
  const type = TRANSACTION_TYPE.BUY;
  return {
    methodId,
    offerId,
    priceGwei,
    amountGwei,
    type,
  };
}

export const associateTransactionWithOffer = (
  transaction: Transaction,
  offers: Offer[],
): {
  transactionWithOffer: Transaction;
} => {
  // Boucle à travers chaque transaction
  //const transactionWithOffer = transactions.map((transaction) => {
  // Trouve l'offre correspondante en utilisant offerId
  const correspondingOffer = offers.find(
    (offer) => offer.offerId === transaction.offerId,
  );

  const tokenForSale: TokenData = {
    address: correspondingOffer?.offerTokenAddress ?? '?',
    decimals: parseInt(correspondingOffer?.offerTokenDecimals ?? '0'),
    name: correspondingOffer?.offerTokenName ?? '?',
    symbol: correspondingOffer?.offerTokenSymbol,
    //Logo: tokenForSaleData?.logo,
  };

  const tokenBuyWith: TokenData = {
    address: correspondingOffer?.buyerTokenAddress ?? '?',
    decimals: parseInt(correspondingOffer?.buyerTokenDecimals ?? '0'),
    name: correspondingOffer?.buyerTokenName ?? '?',
    symbol: correspondingOffer?.buyerTokenSymbol,
    //Logo: tokenBuyWithData?.logo,
  };

  const amount = new BigNumber(transaction.amountGwei).dividedBy(
    new BigNumber(10).pow(tokenForSale.decimals),
  );
  transaction.amount = amount.toNumber();

  const price = new BigNumber(transaction.priceGwei).dividedBy(
    new BigNumber(10).pow(tokenBuyWith.decimals),
  );
  transaction.price = price.toNumber();
  transaction.usdAmount = price.times(transaction.amount).toNumber();

  transaction.tokenForSale = tokenForSale;
  transaction.tokenBuyWith = tokenBuyWith;
  transaction.offerType = correspondingOffer?.type;
  transaction.offerTimestamp = correspondingOffer?.createdAtTimestamp;
  transaction.currentOfferAmount = correspondingOffer?.amount
    ? parseInt(correspondingOffer.amount)
    : undefined;
  transaction.initialOfferAmount = correspondingOffer?.initialAmount;

  //console.log('correspondingOffer', correspondingOffer);

  transaction.isPrivate = correspondingOffer
    ? correspondingOffer.buyerAddress !== undefined
    : false;

  return { transactionWithOffer: transaction };
};
