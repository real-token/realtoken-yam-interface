import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react"
import { fetchOffer } from "src/utils/offers/fetchOffer";
import { Offer, DEFAULT_OFFER } from '../../types/offer/Offer';
import { usePropertiesToken } from '../usePropertiesToken';

type UseOfferProps  = (offerId: number) => {
    offer: Offer | undefined
    isLoading: boolean
};

export const useOffer: UseOfferProps = (offerId: number) => {
    const { chainId } = useWeb3React();
    const [offer,setOffer] = useState<Offer>(DEFAULT_OFFER);
    const [isLoading,setIsLoading] = useState<boolean>(true);

    const { propertiesToken, propertiesIsloading } = usePropertiesToken();

    const fetch = useCallback(async (chainId: number, offerId: number) => {
        fetchOffer(chainId,offerId, propertiesToken)
            .then((offer: Offer) => { 
                setOffer(offer);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    },[propertiesToken])

    useEffect(() => {
        if(offerId && chainId && propertiesToken && !propertiesIsloading && propertiesToken.length > 0) fetch(chainId, offerId);
    },[offerId, chainId, propertiesIsloading, propertiesToken, fetch])

    return{
        offer,
        isLoading
    }
}
