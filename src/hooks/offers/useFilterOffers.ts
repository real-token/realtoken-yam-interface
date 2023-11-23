import { useCallback, useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { statesFilterTokenAtom, tableOfferTypeAtom } from 'src/states';
import { selectOffersIsLoading } from 'src/store/features/interface/interfaceSelector';
import { OFFER_LOADING, OFFER_TYPE, Offer } from 'src/types/offer';

import { useAppSelector } from '../react-hooks';

type UseFilterOffers = (offers: Offer[]) => {
  offers: Offer[];
  sellCount: number | undefined;
  buyCount: number | undefined;
  exchangeCount: number | undefined;
};

export const useFilterOffers: UseFilterOffers = (offers) => {
  const offersLoading = useAppSelector<boolean>(selectOffersIsLoading);
  const tableOfferType = useAtomValue(tableOfferTypeAtom);
  const tokenOfferFilter = useAtomValue(statesFilterTokenAtom);

  const getTypedOffers = useCallback(
    (type: OFFER_TYPE): Offer[] => {
      if (!offers || offersLoading) return OFFER_LOADING;
      return offers.filter((offer: Offer) => {
        const hasFilter = tokenOfferFilter.keys.length > 0;
        const offerTokenFilter = tokenOfferFilter.has(
          offer.offerTokenAddress.toLowerCase()
        )
          ? tokenOfferFilter.get(offer.offerTokenAddress.toLowerCase())
          : false;
        const buyerTokenFilter = tokenOfferFilter.has(
          offer.buyerTokenAddress.toLowerCase()
        )
          ? tokenOfferFilter.get(offer.offerTokenAddress.toLowerCase())
          : false;
        return (
          offer.type == type &&
          (hasFilter || offerTokenFilter || buyerTokenFilter)
        );
      });
    },
    [offers, offersLoading, tokenOfferFilter]
  );

  const sellCount: number | undefined = useMemo(() => {
    if (offersLoading) return undefined;
    return getTypedOffers(OFFER_TYPE.SELL).length;
  }, [getTypedOffers, offersLoading]);

  const buyCount: number | undefined = useMemo(() => {
    if (offersLoading) return undefined;
    return getTypedOffers(OFFER_TYPE.BUY).length;
  }, [getTypedOffers, offersLoading]);

  const exchangeCount: number | undefined = useMemo(() => {
    if (offersLoading) return undefined;
    return getTypedOffers(OFFER_TYPE.EXCHANGE).length;
  }, [getTypedOffers, offersLoading]);

  const rightTypedOffers: Offer[] = useMemo(() => {
    return getTypedOffers(tableOfferType);
  }, [getTypedOffers, tableOfferType]);

  return {
    offers: rightTypedOffers,
    sellCount: sellCount,
    buyCount: buyCount,
    exchangeCount: exchangeCount,
  };
};
