import { useWeb3React } from "@web3-react/core";
import { useQuery } from "react-query";
import { REACT_QUERY_ERRORS } from "../../types/ReactQueryErrors";
import { UserBalances } from "../../types/UserBalance";
import BigNumber from "bignumber.js";
import { graphqlQuery } from "../../utils/graphql/graphqlApiClient";
import { CHAINS, ChainsID } from "../../constants";
import { createLogger } from "../../utils/logger";

const logger = createLogger('useUserBalance');

type UseUserBalance = () => {
    userBalancesAreLoading: boolean;
    userBalances: UserBalances;
}
export const useUserBalance: UseUserBalance = () => {

    const { chainId, account } = useWeb3React();

    const { isLoading: userBalancesAreLoading, data: userBalances, isSuccess } = useQuery({
        queryKey: ['userBalances', chainId, account],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_USER_BALANCES },
        enabled: !!chainId && !!account,
        queryFn: async (): Promise<UserBalances> => {
            if(!chainId || !account) return {};
            
            try {
                const prefix = CHAINS[chainId as ChainsID]?.graphPrefixes?.realtoken;
                if (!prefix) {
                    logger.warn(`Unsupported chainId: ${chainId}`);
                    return {};
                }

                // Utiliser graphqlQuery pour passer par /api/graphql unifié
                const { data, errors } = await graphqlQuery<{ 
                    [key: string]: { 
                        accountBalances: { 
                            token: { address: string };
                            amount: string;
                        }[];
                    };
                }>({
                    query: `
                        query getBalances {
                            ${prefix} {
                                accountBalances(where: { account: "${account.toLowerCase()}" }, first: 1000) {
                                    token {
                                        address
                                    }
                                    amount
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
                        logger.error('Authentication error in user balances, blocking interface:', authError);
                        throw new Error(authError.message || 'Authentication error');
                    }

                    // Pour les autres erreurs, retourner objet vide
                    logger.warn('Failed to fetch user balances with GraphQL errors, returning empty object:', errors);
                    return {};
                }

                const balances = data?.[prefix]?.accountBalances || [];
                const userBalances: UserBalances = {};
                balances.forEach((balance: any) => {
                    userBalances[balance.token.address.toLowerCase()] = new BigNumber(balance.amount);
                });

                return userBalances;
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
                    logger.error('Authentication error in user balances, blocking interface:', error);
                    throw error;
                }

                // Pour les autres erreurs (réseau, etc.), retourner objet vide
                logger.warn('Failed to fetch user balances (non-auth error), returning empty object:', error);
                return {};
            }
        }
    })

    return {
        userBalancesAreLoading,
        userBalances: isSuccess ? userBalances : {}
    }

}