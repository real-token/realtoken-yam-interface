import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react"
import { selectPrices, selectPricesIsLoading } from "src/store/features/interface/interfaceSelector";
import { fetchOffer } from "src/utils/offers/fetchOffer";
import { Offer, DEFAULT_OFFER } from '../../types/offer/Offer';
import { useAppSelector } from "../react-hooks";
import { usePropertiesToken } from '../usePropertiesToken';
import { useQuery } from "react-query";

type UseOfferProps  = (offerId: number) => {
    offer: Offer | undefined
    isLoading: boolean
    hasError: boolean;
};

export const useOffer: UseOfferProps = (offerId: number) => {
    const { chainId, provider, account } = useWeb3React();
    const [offer,setOffer] = useState<Offer|undefined>(DEFAULT_OFFER);
    const [isLoading,setIsLoading] = useState<boolean>(true);

    const [hasError, setHasError] = useState<boolean>(false);

    const { propertiesToken, propertiesIsloading } = usePropertiesToken();

    const pricesIsLoading = useAppSelector(selectPricesIsLoading);
    const prices = useAppSelector(selectPrices)

    const { } = useQuery({
        queryKey: [offerId],
        // @ts-ignore
        queryFn: () => fetchOffer(provider, account, chainId,offerId, propertiesToken,prices),
        enabled: !!offerId && !!chainId && !!provider && !!account && !!propertiesToken && !propertiesIsloading && propertiesToken.length > 0,
        onSuccess: (offer: Offer|undefined) => {
            if(offer){
                setOffer(offer);
            }else{
                setOffer(undefined);
            }
            setIsLoading(false);
        },
        onError: () => {
            setOffer(undefined);
            setHasError(true);
            setIsLoading(false);
        }
    })

    return{
        offer,
        isLoading,
        hasError
    }
}
