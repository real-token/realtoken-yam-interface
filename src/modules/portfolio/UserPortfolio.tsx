import { FC, useEffect, useState } from 'react';

import { MarketTable } from 'src/components/Market';
import { useOffers } from 'src/hooks';
import { Offer } from 'src/hooks/types';

export const UserPortfolio: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedOffers, setFetchedOffers] = useState<Offer[]>([
    {
      offerId: 'loading...',
      offerTokenAddress: 'loading...',
      offerTokenName: 'loading...',
      offerTokenDecimals: 'loading...',
      buyerTokenAddress: 'loading...',
      buyerTokenName: 'loading...',
      buyerTokenDecimals: 'loading...',
      sellerAddress: 'loading...',
      price: 'loading...',
      amount: 'loading...',
    },
  ]);
  const { offers, refreshState } = useOffers();

  // const renderedOffers = useMemo<Offer[]>(() => {
  //   setFetchedOffers(
  //     offers.map((offer) => ({
  //       offerId: offer.offerId,
  //       offerTokenAddress: offer.offerTokenAddress,
  //       offerTokenName: offer.offerTokenName,
  //       buyerTokenAddress: offer.buyerTokenAddress,
  //       buyerTokenName: offer.buyerTokenName,
  //       sellerAddress: offer.sellerAddress,
  //       price: offer.price,
  //       amount: offer.amount,
  //     }))
  //   );
  //   setIsLoading(false);
  //   return fetchedOffers;
  // }, [refreshState]);

  useEffect(() => {
    setIsLoading(true);
    setFetchedOffers(
      offers.map((offer) => ({
        offerId: offer.offerId,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenName: offer.offerTokenName,
        offerTokenDecimals: offer.offerTokenDecimals,
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenName: offer.buyerTokenName,
        buyerTokenDecimals: offer.buyerTokenDecimals,
        sellerAddress: offer.sellerAddress,
        price: offer.price,
        amount: offer.amount,
      }))
    );
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>{'Loading...'}</div>;
  }
  return <MarketTable data={fetchedOffers} />;
};
