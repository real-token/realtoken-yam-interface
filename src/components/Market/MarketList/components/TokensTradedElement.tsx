import React, { FC } from 'react';

import { TokenExchangeElement } from 'src/components/Offer/components/TokenExchangeElement';

import { OfferData } from '../Types';

interface TokensTradedElementProps {
  offer: OfferData;
}
export const TokensTradedElement: FC<TokensTradedElementProps> = ({
  offer,
}) => {
  const LogoRequested = offer.requestedTokenLogo;
  const LogoOffer = offer.transferedTokenLogo;

  return (
    <TokenExchangeElement
      token1={offer.requestedToken}
      token2={offer.transferedToken}
      LogoToken1={LogoRequested}
      LogoToken2={LogoOffer}
    ></TokenExchangeElement>
  );
};
