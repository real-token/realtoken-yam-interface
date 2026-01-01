import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { Price } from "../../types/price";
import { createLogger } from "../../utils/logger";

const logger = createLogger('usePrices');

type UsePrices = () => {
    pricesAreLoading: boolean;
    prices: Price | undefined;
}
export const usePrices: UsePrices = () => {

    const { chainId } = useWeb3React();
    
    const { isLoading: pricesAreLoading, data: prices, isSuccess } = useQuery({
        queryKey: ['prices', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_PRICES },
        enabled: !!chainId,
        staleTime: 60 * 60 * 1000, // 1h (changement modéré)
        cacheTime: 24 * 60 * 60 * 1000, // 24h
        retry: 2, // Retry 2 fois en cas d'erreur
        retryDelay: 1000, // 1 seconde entre les retries
        queryFn: async (): Promise<Price> => {
            const res = await fetch(
                `/api/prices/${chainId}`,
            );
            if (!res.ok) {
                // Si erreur, retourner un objet vide plutôt que de planter
                // Cela sera amélioré en Phase 1 avec le mode dégradé
                logger.warn(`Failed to fetch prices for chainId ${chainId}:`, res.status, res.statusText);
                return {};
            }
            return await res.json();
        }
    });

    return {
        pricesAreLoading,
        prices
    }
}