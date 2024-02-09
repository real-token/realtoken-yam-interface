import { useWeb3React } from "@web3-react/core";
import { useState } from "react"
import { fetchOffer } from "src/utils/offers/fetchOffer";
import { Offer, DEFAULT_OFFER } from '../../types/offer/Offer';
import { usePropertiesToken } from '../usePropertiesToken';
import { useQuery } from "react-query";
import { useRootStore } from "../../zustandStore/store";

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

    const [prices, wlProperties] = useRootStore((state) => [state.prices, state.wlProperties])

    const { } = useQuery({
        queryKey: [offerId],
        // @ts-ignore
        queryFn: () => fetchOffer(provider, account, chainId,offerId, propertiesToken, wlProperties, prices),
        enabled: !!offerId && !!chainId && !!provider && !!account && !!propertiesToken && !propertiesIsloading && propertiesToken.length > 0 && wlProperties !== undefined,
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
