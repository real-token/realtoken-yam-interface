import { useQuery } from "react-query";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { useWeb3React } from "@web3-react/core";
import { graphqlQuery } from "../../utils/graphql/graphqlApiClient";
import { CHAINS, ChainsID } from "../../constants";

type UseWlProperties = () => {
    wlPropertiesAreLoading: boolean;
    wlProperties: number[] | undefined;
    isError?: boolean;
    error?: unknown;
}
export const useWlProperties: UseWlProperties = () => {
    
    const { chainId, account } = useWeb3React();

    const { isLoading: wlPropertiesAreLoading, data: wlProperties, isSuccess, isError, error } = useQuery({
        queryKey: ['wlProperties', chainId, account],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
        enabled: !!chainId && !!account,
        staleTime: 12 * 60 * 60 * 1000, // 12h
        cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 jours
        retry: 1, // Retry 1 fois seulement
        retryDelay: 1000,
        queryFn: async (): Promise<number[]> => {
            if(!chainId || !account) return [];

            try {
                const prefix = CHAINS[chainId as ChainsID]?.graphPrefixes?.realtoken;
                if (!prefix) {
                    console.warn(`Unsupported chainId: ${chainId}`);
                    return [];
                }

                // Utiliser graphqlQuery pour passer par /api/graphql unifié
                const { data, errors } = await graphqlQuery<{ 
                    [key: string]: { 
                        account: { 
                            userIds: { 
                                attributeKeys: string[];
                            }[];
                        };
                    };
                }>({
                    query: `
                        query getWlProperties {
                            ${prefix} {
                                account(id: "${account.toLowerCase()}") {
                                    userIds {
                                        userId
                                        attributeKeys
                                        trustedIntermediary {
                                            address
                                            weight
                                        }
                                    }
                                }
                            }
                        }
                    `,
                });

                if (errors) {
                    // Vérifier si c'est une erreur d'authentification
                    const authError = errors.find(e => 
                        e.extensions?.code === 'THEGRAPH_AUTH_ERROR' || 
                        e.extensions?.code === 'AUTHENTICATION_ERROR' ||
                        e.message?.toLowerCase().includes('invalid authentication token')
                    );

                    if (authError) {
                        console.error('Authentication error in WL properties, blocking interface:', authError);
                        throw new Error(authError.message || 'Authentication error');
                    }

                    // Pour les autres erreurs, retourner tableau vide
                    console.warn('Failed to fetch WL properties with GraphQL errors, using empty array as fallback:', errors);
                    return [];
                }

                const userIds = data?.[prefix]?.account?.userIds;
                let wlTokenIds: string[] | undefined = undefined;
                
                if (userIds && userIds.length > 0) {
                    wlTokenIds = userIds[0].attributeKeys;
                }

                const parsedWlTokenIds = wlTokenIds ? wlTokenIds.map(str => parseInt(str)) : [];
                return parsedWlTokenIds;
            } catch (error: any) {
                // Vérifier si c'est une erreur d'authentification
                const errorMessage = error?.message?.toLowerCase() || '';
                const hasAuthError = 
                    errorMessage.includes('authentication error') ||
                    errorMessage.includes('invalid authentication token') ||
                    errorMessage.includes('invalid authentication') ||
                    errorMessage.includes('authentication failed') ||
                    errorMessage.includes('unauthorized') ||
                    errorMessage.includes('forbidden') ||
                    errorMessage.includes('no authentication token provided');

                // Si erreur d'authentification, laisser remonter pour bloquer l'interface
                if (hasAuthError) {
                    console.error('Authentication error in WL properties, blocking interface:', error);
                    throw error; // Laisser remonter l'erreur pour qu'elle soit détectée par useAuthError
                }

                // Pour les autres erreurs (réseau, etc.), retourner tableau vide
                console.warn('Failed to fetch WL properties (non-auth error), using empty array as fallback:', error);
                return [];
            }
        }
    });

    return {
        wlPropertiesAreLoading,
        wlProperties: wlProperties ?? [], // Fallback à tableau vide si undefined
        isError,
        error
    }
}