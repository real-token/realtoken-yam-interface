import { TFunction } from 'react-i18next';

import { CsmSvg } from 'src/assets/currency/CSM';
import { AllowedToken } from 'src/types/allowedTokens';
import { Offer } from 'src/types/offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';

import { OfferData } from './Types';

export function mapOfferToOfferData(
  offer: Offer,
  offerType: OFFER_TYPE,
  allowedTokens?: AllowedToken[]
): OfferData {
  console.log('allowedTokens', JSON.stringify(allowedTokens, null, 4));

  const allowedTokenOffer = allowedTokens
    ? allowedTokens.findLast(
        (t) =>
          t.contractAddress.toLowerCase() ===
          offer.offerTokenAddress.toLowerCase()
      )
    : undefined;

  const allowedTokenBuy = allowedTokens
    ? allowedTokens.findLast(
        (t) =>
          t.contractAddress.toLowerCase() ===
          offer.buyerTokenAddress.toLowerCase()
      )
    : undefined;

  console.log(
    'allowedTokens',
    JSON.stringify(allowedTokenOffer, null, 4),
    JSON.stringify(allowedTokenBuy, null, 4)
  );

  return {
    id: offer.offerId,
    transferedToken: allowedTokenBuy
      ? allowedTokenBuy.symbol
      : offer.buyerTokenName,
    transferedTokenAddress: offer.offerTokenAddress,
    transferedTokenLogo: allowedTokenBuy?.logo ?? CsmSvg,
    requestedToken: allowedTokenOffer
      ? allowedTokenOffer.symbol
      : offer.offerTokenName,
    requestedTokenAddress: offer.buyerTokenAddress,
    requestedTokenLogo: allowedTokenOffer?.logo ?? CsmSvg,
    launchDate: offer.sellDate,
    requesterName: offer.sellerName,
    requesterAddress: offer.sellerAddress,
    sites: {
      buying: {
        name: offer.sites.buying.name,
        aera: offer.sites.buying.location.aera,
        country: offer.sites.buying.location.country,
        energy: offer.sites.buying.energy,
      },
      selling: {
        name: offer.sites.selling.name,
        aera: offer.sites.selling.location.aera,
        country: offer.sites.selling.location.country,
        energy: offer.sites.selling.energy,
      },
    },

    electricityPrice: offer.electricityPrice,
    initialSellingPrice: offer.officialPrice,
    requestedPrice: offer.offerPrice,
    requestedAmount: parseFloat(offer.amount),
    balanceWallet: offer.balanceWallet
      ? parseFloat(offer.balanceWallet)
      : undefined,
    image: '', // Vous devrez spécifier l'image appropriée ici
    type: offerType,
    // offer.offerTokenType === 1 || offer.offerTokenType === 0
    //   ? OFFER_TYPE.SELL
    //   : offer.offerTokenType === 2
    //   ? OFFER_TYPE.BUY
    //   : OFFER_TYPE.EXCHANGE,
  };
}

export function mapColumnLabels(
  t: TFunction<'buy' | 'sell' | 'exchange', 'list'>
): {
  [key: string]: string;
} {
  // si rename => renommer aussi la column dans Types Columns
  // si rename => renommer aussi la column dans Types OfferData
  return {
    requesterName: t('requesterName'),
    requestedPrice: t('requestedPrice'),
    requestedToken: t('requestedToken'),
    requestedAmount: t('requestedAmount'),
  };
}

export function columnLabel(
  key: string,
  t: TFunction<'buy' | 'sell' | 'exchange', 'list'>
): string {
  const columnLabels: { [key: string]: string } = mapColumnLabels(t);

  return columnLabels[key];
}

export function getOfferColor(offer: OfferData) {
  return offer.type === OFFER_TYPE.BUY
    ? 'green'
    : offer.type === OFFER_TYPE.EXCHANGE
    ? 'orange'
    : 'red';
}

export function truncateInMiddle(inputString: string): string {
  if (inputString.length <= 7) {
    return inputString; // No need to truncate
  }

  const startLength = 4;
  const endLength = 3;
  const beginning = inputString.slice(0, startLength);
  const end = inputString.slice(-endLength);

  return beginning + '...' + end;
}

export function getSiteInfo(offer: OfferData): string[] {
  switch (offer.type) {
    case OFFER_TYPE.BUY:
      // Action à effectuer lorsque OFFER_TYPE est "BUY"
      return [
        offer.sites.buying.aera,
        offer.sites.buying.country,
        offer.sites.buying.energy.join(', '),
      ];
    case OFFER_TYPE.SELL:
      // Action à effectuer lorsque OFFER_TYPE est "SELL"
      return [
        offer.sites.selling.aera,
        offer.sites.selling.country,
        offer.sites.selling.energy.join(', '),
      ];

    case OFFER_TYPE.EXCHANGE:
      // Action à effectuer lorsque OFFER_TYPE est "EXCHANGE"
      return [
        offer.sites.buying.aera,
        offer.sites.buying.country,
        offer.sites.buying.energy.join(', '),
        offer.sites.selling.aera,
        offer.sites.selling.country,
        offer.sites.selling.energy.join(', '),
      ];

    default:
      // Action par défaut si OFFER_TYPE ne correspond à aucun des cas précédents
      console.log("Type d'offre non reconnu.");
      return [];
  }
}

export function getAction(offer: OfferData): string {
  // Action à effectuer lorsque OFFER_TYPE est "BUY"
  return offer.requestedToken + ' vs ' + offer.transferedToken;
}
