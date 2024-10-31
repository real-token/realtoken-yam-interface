import { useMemo } from "react";
import { useOffers } from "../interface/useOffers";
import { Offer } from "../../types/offer";
import { useWeb3React } from "@web3-react/core";

type UsePrivateOffers = () => {
    offers: Offer[];
    offersAreLoading: boolean;
    refetch: () => void;
}
export const usePrivateOffers: UsePrivateOffers = () => {

    const { account } = useWeb3React();
    const { offers, offersAreLoading, refetch } = useOffers();

    const privateOffers = useMemo(() => {
        if(!account || !offers) return [];
        return offers.filter((offer: Offer) => offer.buyerAddress && offer.buyerAddress.toLowerCase() == account.toLowerCase());
    }, [offers, account]);

    return { offers: privateOffers, offersAreLoading, refetch };
}