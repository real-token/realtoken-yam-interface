import { useQuery } from "react-query";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { CHAINS, ChainsID } from "../../constants";
import { useWeb3React } from "@web3-react/core";
import { apiClient } from "../../utils/offers/getClientURL";
import { gql } from "@apollo/client";

type UseWlProperties = () => {
    wlPropertiesAreLoading: boolean;
    wlProperties: number[] | undefined;
}
export const useWlProperties: UseWlProperties = () => {
    
    const { chainId, account } = useWeb3React();

    const { isLoading: wlPropertiesAreLoading, data: wlProperties, isSuccess } = useQuery({
        queryKey: ['wlProperties', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
        enabled: !!chainId && !!account,
        staleTime: 12 * 60 * 60 * 1000, // 12h
        cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 jours
        retry: 1, // Retry 1 fois seulement
        retryDelay: 1000,
        queryFn: async (): Promise<number[]> => {
            if(!chainId || !account) return [];

            try {
                const prefix = CHAINS[chainId as ChainsID].graphPrefixes.realtoken;
            
                const { data } = await apiClient.query({
                query: gql`
                    query getWlProperties{
                    ${prefix}{
                        account(id: "${account.toLowerCase()}") {
                        userIds{
                            userId
                            attributeKeys
                            trustedIntermediary{
                            address 
                            weight
                            }
                        }
                        }
                    }
                    }
                `,
                });
        
                const userIds = data[prefix]?.account?.userIds;
        
                let wlTokenIds: string[] | undefined = undefined;
                if(userIds){
                    wlTokenIds = userIds[0].attributeKeys;
                }

                return wlTokenIds ? wlTokenIds.map(str => parseInt(str)) : [];
            } catch (error: any) {
                // Vérifier si c'est une erreur d'authentification
                const errorMessage = error?.message?.toLowerCase() || '';
                const graphQLErrors = error?.graphQLErrors || [];
                const hasAuthError = graphQLErrors.some((e: any) => {
                  const code = e?.extensions?.code;
                  const msg = e?.message?.toLowerCase() || '';
                  return (
                    code === 'THEGRAPH_AUTH_ERROR' ||
                    code === 'AUTHENTICATION_ERROR' ||
                    msg.includes('invalid authentication token') ||
                    msg.includes('invalid authentication') ||
                    msg.includes('authentication failed') ||
                    msg.includes('unauthorized') ||
                    msg.includes('forbidden')
                  );
                }) || 
                errorMessage.includes('invalid authentication token') ||
                errorMessage.includes('invalid authentication') ||
                errorMessage.includes('authentication failed') ||
                errorMessage.includes('unauthorized') ||
                errorMessage.includes('forbidden') ||
                error?.networkError?.statusCode === 401 ||
                error?.networkError?.statusCode === 403;

                // Si erreur d'authentification, laisser remonter pour bloquer l'interface
                if (hasAuthError) {
                  console.error('Authentication error in WL properties, blocking interface:', error);
                  throw error; // Laisser remonter l'erreur pour qu'elle soit détectée par useAuthError
                }

                // Pour les autres erreurs (réseau, etc.), retourner tableau vide
                // Cela permet de ne pas bloquer le chargement des offres
                console.warn('Failed to fetch WL properties (non-auth error), using empty array as fallback:', error);
                return [];
            }
        }
    });

    return {
        wlPropertiesAreLoading,
        wlProperties: wlProperties ?? [] // Fallback à tableau vide si undefined
    }
}