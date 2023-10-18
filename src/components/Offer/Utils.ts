import { Offer } from 'src/types/offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';

export function getOfferType(offer: Offer): OFFER_TYPE {
  return offer.offerTokenType === 1 || offer.offerTokenType === 0
    ? OFFER_TYPE.SELL
    : offer.offerTokenType === 2
    ? OFFER_TYPE.BUY
    : OFFER_TYPE.EXCHANGE;
}

export function getOfferPropertyAddress(offer: Offer): string {
  if (offer.buyerTokenType == 1) {
    return offer.buyerTokenAddress;
  }

  if (offer.offerTokenType == 1) {
    return offer.offerTokenAddress;
  }

  return offer.buyerTokenAddress;
}
