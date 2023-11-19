import { TFunction } from 'react-i18next';

import BigNumber from 'bignumber.js';

import { CsmSvg } from 'src/assets/currency/Csm';
import { AllowedToken } from 'src/types/allowedTokens';
import { Offer } from 'src/types/offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';

import { OfferData } from './Types';

export function mapOfferToOfferData(
  offer: Offer,
  offerType: OFFER_TYPE,
  allowedTokens?: AllowedToken[]
): OfferData {
  const allowedTokenOffer = allowedTokens
    ? allowedTokens.find(
        (t) =>
          t.contractAddress.toLowerCase() ===
          offer.offerTokenAddress.toLowerCase()
      )
    : undefined;

  const allowedTokenBuy = allowedTokens
    ? allowedTokens.find(
        (t) =>
          t.contractAddress.toLowerCase() ===
          offer.buyerTokenAddress.toLowerCase()
      )
    : undefined;

  const requestedUsdPrice =
    offer.offerPrice ??
    (offer.sites.buying.tokenOfficialPrice > 0
      ? new BigNumber(parseFloat(offer.price))
          .times(offer.sites.buying.tokenOfficialPrice ?? 1)
          .toNumber()
      : parseFloat(offer.price));

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
      requested: {
        name: offer.sites.buying.name,
        shortName: allowedTokenBuy
          ? allowedTokenBuy.symbol
          : offer.buyerTokenName,
        aera: offer.sites.buying.location.aera,
        country: offer.sites.buying.location.country,
        energy: offer.sites.buying.energy,
        image: offer.sites.buying.imageLink,
        electricityPrice: offer.sites.buying.electricityPrice,
        tokenOfficialPrice: offer.sites.buying.tokenOfficialPrice,
        tokenSellDate: offer.sites.buying.tokenSellDate,
      },
      transfered: {
        name: offer.sites.selling.name,
        shortName: allowedTokenOffer
          ? allowedTokenOffer.symbol
          : offer.offerTokenName,
        aera: offer.sites.selling.location.aera,
        country: offer.sites.selling.location.country,
        energy: offer.sites.selling.energy,
        image: offer.sites.selling.imageLink,
        electricityPrice: offer.sites.selling.electricityPrice,
        tokenOfficialPrice: offer.sites.selling.tokenOfficialPrice,
        tokenSellDate: offer.sites.selling.tokenSellDate,
      },
    },
    requestedRate: parseFloat(offer.price),
    electricityPrice: offer.electricityPrice,
    initialSellingPrice:
      offer.officialPrice ?? offer.sites.selling.tokenOfficialPrice,
    requestedPrice: requestedUsdPrice,
    requestedAmount: parseFloat(offer.amount),
    balanceWallet: offer.balanceWallet
      ? parseFloat(offer.balanceWallet)
      : undefined,
    image: '', // Vous devrez spécifier l'image appropriée ici
    type: offerType,
    priceDelta: offer.priceDelta,
    initialAmount: offer.initialAmount,
    createdAt: offer.createdAtTimestamp,
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
    createdAt: t('createdAt'),
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
        offer.sites.requested.aera,
        offer.sites.requested.country,
        offer.sites.requested.energy.join(', '),
      ];
    case OFFER_TYPE.SELL:
      // Action à effectuer lorsque OFFER_TYPE est "SELL"
      return [
        offer.sites.transfered.aera,
        offer.sites.transfered.country,
        offer.sites.transfered.energy.join(', '),
      ];

    case OFFER_TYPE.EXCHANGE:
      // Action à effectuer lorsque OFFER_TYPE est "EXCHANGE"
      return [
        offer.sites.requested.aera,
        offer.sites.requested.country,
        offer.sites.requested.energy.join(', '),
        offer.sites.transfered.aera,
        offer.sites.transfered.country,
        offer.sites.transfered.energy.join(', '),
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
