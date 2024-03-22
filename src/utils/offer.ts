import BigNumber from 'bignumber.js';
import { OFFER_TYPE } from 'src/types/offer';
import { Offer } from 'src/types/offer/Offer';

export function currencyTokenSymbol(offer: Offer): string | undefined {
  return offer.type === OFFER_TYPE.BUY
    ? offer.offerTokenSymbol ?? 'USDC'
    : offer.buyerTokenSymbol ?? 'USDC';
}

export function usdAmount(offer: Offer): number {
  return offer.type === OFFER_TYPE.BUY
    ? new BigNumber(offer.amount).toNumber()
    : new BigNumber(offer.price).times(offer.amount).toNumber();
}

export function csmTokenPrice(offer: Offer): number {
  return offer.type === OFFER_TYPE.BUY
    ? new BigNumber(1).dividedBy(offer.price).toNumber()
    : new BigNumber(offer.price).toNumber();
}

export function csmTokenSymbol(offer: Offer): string | undefined {
  return offer.type === OFFER_TYPE.BUY
    ? offer.buyerTokenSymbol ?? offer.buyerTokenName
    : offer.offerTokenSymbol ?? offer.offerTokenName;
}

export function csmTokenAmount(offer: Offer): number {
  return offer.type === OFFER_TYPE.BUY
    ? new BigNumber(offer.amount).times(offer.price).toNumber()
    : new BigNumber(offer.amount).toNumber();
}
