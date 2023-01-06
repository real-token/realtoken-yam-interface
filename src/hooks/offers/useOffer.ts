import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react"
import { fetchOffer } from "src/utils/offers/fetchOffers";
import { DEFAULT_OFFER, Offer } from "../../types/Offer";
import { usePropertiesToken } from "../usePropertiesToken";

type UseOfferProps  = (offerId: number) => {
    offer: Offer | undefined
    isLoading: boolean
};

export const useOffer: UseOfferProps = (offerId: number) => {

    const { chainId } = useWeb3React();
    const [offer,setOffer] = useState<Offer>(DEFAULT_OFFER);
    const [isLoading,setIsLoading] = useState<boolean>(true);

    const { propertiesToken, propertiesIsloading } = usePropertiesToken(false);

    const fetch = async (chainId: number, offerId: number) => {
        fetchOffer(chainId,offerId, propertiesToken)
            .then((offer: Offer) => { 
                setOffer(offer);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(offerId && chainId && propertiesToken && !propertiesIsloading) fetch(chainId, offerId);
    },[offerId, chainId,propertiesIsloading,propertiesToken])

    return{
        offer,
        isLoading
    }
}