import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';

//import { fetchOffer } from "src/utils/offers/fetchOffers";
import { Offer } from '../../types/Offer';
import { usePropertiesToken } from '../usePropertiesToken';

type UseOfferProps = (offerId: number) => {
  offer: Offer | undefined;
};

export const useOffer: UseOfferProps = (offerId: number) => {
  const { chainId } = useWeb3React();
  const [offer, setOffer] = useState<Offer>();

  const { propertiesToken } = usePropertiesToken(false);

  /*    const fetch = async (chainId: number, offerId: number) => {
        fetchOffer(chainId,offerId, propertiesToken)
            .then(setOffer)
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(offerId && chainId && propertiesToken) fetch(chainId, offerId);
    },[offerId, chainId]) */

  return {
    offer,
  };
};
