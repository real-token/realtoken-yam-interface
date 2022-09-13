import { FC, useEffect, useState } from 'react';

import { MarketTable } from 'src/components/Market';
import { useOffers } from 'src/hooks';
import { Offer } from 'src/hooks/types';

export const UserPortfolio: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedOffers, setFetchedOffers] = useState<Offer[]>([
    {
      offerId: '100',
      offerTokenAddress: 'string;',
      offerTokenName: 'string;',
      buyerTokenAddress: '	string;',
      buyerTokenName: 'string;',
      sellerAddress: '	string;',
      price: '100',
      amount: '100',
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
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenName: offer.buyerTokenName,
        sellerAddress: offer.sellerAddress,
        price: offer.price,
        amount: offer.amount,
      }))
    );
    setIsLoading(false);
  }, []);

  console.log('Offer 2: ', offers);
  console.log('Offer 3: ', fetchedOffers);
  if (isLoading) {
    return <div>{'Loading...'}</div>;
  }
  return <MarketTable data={fetchedOffers} />;
};
