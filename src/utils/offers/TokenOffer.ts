import { AllowedToken } from 'src/types/allowedTokens';
import { Offer } from 'src/types/offer';

export function getTokenToBuyWith(
  allowedTokens: AllowedToken[] | undefined,
  offer: Offer
) {
  return allowedTokens
    ? allowedTokens.find(
        (t) =>
          t.contractAddress.toLowerCase() ===
          offer.buyerTokenAddress.toLowerCase()
      )
    : undefined;
}
export function getTokenOffer(
  allowedTokens: AllowedToken[] | undefined,
  offer: Offer
) {
  return allowedTokens
    ? allowedTokens.find(
        (t) =>
          t.contractAddress.toLowerCase() ===
          offer.offerTokenAddress.toLowerCase()
      )
    : undefined;
}
