import BigNumber from 'bignumber.js';
import { OFFER_TYPE } from 'src/types/offer';
import { Transaction } from 'src/types/transaction/Transaction';

export function currencyTokenSymbol(
  transaction: Transaction,
): string | undefined {
  return transaction.offerType === OFFER_TYPE.BUY
    ? transaction.tokenForSale?.symbol ?? 'USDC'
    : transaction.tokenBuyWith?.symbol ?? 'USDC';
}

export function usdAmount(transaction: Transaction): number {
  return transaction.offerType === OFFER_TYPE.BUY
    ? transaction.amount
    : new BigNumber(transaction.price).times(transaction.amount).toNumber();
}

export function csmTokenPrice(transaction: Transaction): number {
  return transaction.offerType === OFFER_TYPE.BUY
    ? new BigNumber(1).dividedBy(transaction.price).toNumber()
    : transaction.price;
}

export function csmTokenSymbol(transaction: Transaction): string | undefined {
  return transaction.offerType === OFFER_TYPE.BUY
    ? transaction.tokenBuyWith?.symbol ?? transaction.tokenBuyWith?.name
    : transaction.tokenForSale?.symbol ?? transaction.tokenForSale?.name;
}

export function csmTokenAmount(transaction: Transaction): number {
  return transaction.offerType === OFFER_TYPE.BUY
    ? new BigNumber(transaction.amount).times(transaction.price).toNumber()
    : transaction.amount;
}
