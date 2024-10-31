import { useMemo } from "react";
import { Offer, OFFER_LOADING } from "../../types/offer";
import { useOffers } from "../interface/useOffers";
import { useWeb3React } from "@web3-react/core";

type UseUserOffers = () => {
    offers: Offer[];
    offersAreLoading: boolean;
    refetch: () => void;
}
export const useUserOffers: UseUserOffers = () => {
    
    const { offers, offersAreLoading, refetch } = useOffers();
    const { account } = useWeb3React();

    const userOffers = useMemo(() => {
        if (!account || !offers) return OFFER_LOADING;
        return offers.filter((offer: Offer) => offer.sellerAddress && offer.sellerAddress.toLowerCase() == account.toLowerCase());
    }, [offers, account]);
    
    return { offers: userOffers, offersAreLoading, refetch };
}