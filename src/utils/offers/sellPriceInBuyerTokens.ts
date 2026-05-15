import BigNumber from 'bignumber.js';

/**
 * Prix SELL humain envoyé à la chaîne : quantité de jeton acheteur par 1 unité de jeton d’offre.
 */
export function sellPriceInBuyerTokens(
  priceUnit: 'dollar' | 'token',
  useBuyTokenPrice: boolean,
  internalPrice: string | undefined,
  choosedPriceDollar: number | undefined,
  buyerTokenPrice: number | undefined
): BigNumber | undefined {
  if (priceUnit === 'token') {
    if (internalPrice === undefined || internalPrice === '') return undefined;
    const bn = new BigNumber(internalPrice);
    return bn.isFinite() && bn.gt(0) ? bn : undefined;
  }
  if (useBuyTokenPrice) {
    /* Saisie en $ avec option nominale 1 unité acheteuse ≈ 1 $ */
    if (internalPrice === undefined || internalPrice === '') return undefined;
    const bn = new BigNumber(internalPrice);
    return bn.isFinite() && bn.gt(0) ? bn : undefined;
  }
  if (
    choosedPriceDollar === undefined ||
    buyerTokenPrice === undefined ||
    buyerTokenPrice <= 0
  ) {
    return undefined;
  }
  const bn = new BigNumber(choosedPriceDollar).dividedBy(buyerTokenPrice);
  return bn.isFinite() && bn.gt(0) ? bn : undefined;
}
