import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { fetchOffer } from "src/utils/offers/fetchOffers";
import { Offer } from "../../types/Offer";

type UseOfferProps  = (offerId: number) => {
    offer: Offer | undefined
};

export const useOffer: UseOfferProps = (offerId: number) => {

    const { chainId } = useWeb3React();
    const [offer,setOffer] = useState<Offer>();

    const fetch = async (chainId: number, offerId: number) => {
        fetchOffer(chainId,offerId)
            .then(setOffer)
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(offerId && chainId) fetch(chainId, offerId);
    },[offerId, chainId])

    return{
        offer
    }
}