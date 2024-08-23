import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import {
  selectPrices,
  selectPricesIsLoading,
} from 'src/store/features/interface/interfaceSelector';
import { fetchOffer } from 'src/utils/offers/fetchOffer';
import { Offer, DEFAULT_OFFER } from '../../types/offer/Offer';
import { useAppSelector } from '../react-hooks';
import { usePropertiesToken } from '../usePropertiesToken';

type UseOfferProps = (offerId: number) => {
  offer: Offer | undefined;
  isLoading: boolean;
};

export const useOffer: UseOfferProps = (offerId: number) => {
  const { chainId, provider, account } = useWeb3React();
  const [offer, setOffer] = useState<Offer>(DEFAULT_OFFER);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { propertiesToken, propertiesIsloading } = usePropertiesToken();

  const pricesIsLoading = useAppSelector(selectPricesIsLoading);
  const prices = useAppSelector(selectPrices);

  const fetch = useCallback(
    async (provider: Web3Provider, chainId: number, offerId: number) => {
      if (!account || pricesIsLoading) return;
      fetchOffer(provider, account, chainId, offerId, propertiesToken, prices)
        .then((offer: Offer) => {
          setOffer(offer);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    },
    [account, pricesIsLoading, propertiesToken, prices],
  );

  useEffect(() => {
    if (
      offerId &&
      chainId &&
      provider &&
      account &&
      propertiesToken &&
      !propertiesIsloading &&
      propertiesToken.length > 0
    )
      fetch(provider, chainId, offerId);
  }, [
    offerId,
    chainId,
    propertiesIsloading,
    provider,
    account,
    propertiesToken,
  ]);

  return {
    offer,
    isLoading,
  };
};
