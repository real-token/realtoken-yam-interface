import { useQuery } from "react-query";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { useWeb3React } from "@web3-react/core";
import { mergeExtendedProperties } from "../../utils/properties";
import { PropertiesToken } from "@realtoken/realt-commons";
import { getExtendedTokens } from "../../constants/GetPriceToken";

type UseProperties = () => {
    propertiesAreLoading: boolean;
    properties: PropertiesToken[] | undefined;
}
export const useProperties: UseProperties = ()  => {

    const { chainId } = useWeb3React();
    
    // Fetch properties
    const { isLoading, data: properties, isSuccess } = useQuery({
        queryKey: ['properties', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
        enabled: !!chainId,
        staleTime: 24 * 60 * 60 * 1000, // 24h (changement rare)
        cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 jours
        retry: 2, // Retry 2 fois en cas d'erreur
        retryDelay: 1000, // 1 seconde entre les retries
        queryFn: async (): Promise<PropertiesToken[]> => {
            if(!chainId) return [];
            const response = await fetch(`/api/properties/${chainId}`);
            if (response.ok) {
                const responseJson: PropertiesToken[] = await response.json();
                return mergeExtendedProperties(responseJson, getExtendedTokens(chainId));
            }
            return [];
        }
    });

    return { 
        propertiesAreLoading: isLoading, 
        properties: properties
    };
}