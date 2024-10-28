import { useWeb3React } from "@web3-react/core";
import { YamProvider } from "../zustandStore/context";
import { useQuery } from "react-query";
import { Offer, OFFER_LOADING } from "../types/offer";
import { PropertiesToken } from "../types";
import { mergeExtendedProperties } from "../utils/properties";
import { getExtendedTokens } from "../constants/GetPriceToken";
import { ALLOWED_CHAINS_ID, CHAINS, ChainsID } from "../constants";
import { UserBalances } from "../types/UserBalance";
import BigNumber from "bignumber.js";
import { apiClient } from "../utils/offers/getClientURL";
import { gql } from "@apollo/client";
import { Price } from "../types/price";
import { REACT_QUERY_ERRORS } from "../types/ReactQueryErrors";
import { fetchOffersTheGraph } from "../utils/offers/fetchOffers";
import { useRootStore } from "../zustandStore/store";

interface InitStoreProps{
    children: React.ReactElement | React.ReactElement[]
}
export default function InitStoreProvider({ children }: InitStoreProps){

    // INIT REDUX STORE HERE
    // useInitStore();

    // const setTheGraphIssue = useRootStore((state) => state.setTheGraphIssue);

    const { account, chainId } = useWeb3React();

    // Fetch properties
    const { isLoading: propertiesAreLoading, data: properties } = useQuery({
        queryKey: ['properties', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
        enabled: !!chainId,
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

    // Fetch prices
    const { isLoading: pricesAreLoading, data: prices } = useQuery({
        queryKey: ['prices', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_PRICES },
        enabled: !!chainId,
        queryFn: async (): Promise<Price> => {
            const res = await fetch(
                `/api/prices/${chainId}`,
                // { ...(abortController ? { signal: abortController.signal } : {}) }
            );
            const prices = await res.json();
            return prices;
        }
    });

    // Fetch user balances
    const { isLoading: userBalancesAreLoading, data: userBalances } = useQuery({
        queryKey: ['userBalances', chainId, account],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_USER_BALANCES },
        enabled: !!chainId && !!account,
        queryFn: async (): Promise<UserBalances> => {
            if(!chainId || !account) return {};
            
            const chainDatas = CHAINS[chainId as ChainsID];
            const prefix = chainDatas.graphPrefixes.realtoken;

            const res = await apiClient.query({
                query: gql`
                query getBalances{
                    ${prefix}{
                        accountBalances(where: { account: "${account.toLowerCase()}" }, first: 1000){
                        token{
                            address
                        }
                        amount
                        }
                    }
                    }
                `,
                // context: {
                //     fetchOptions: {
                //         signal: abortController.signal,
                //     },
                // }
            });

            const balances = res.data[prefix].accountBalances;
            console.log('USER BALANCES: ', balances);

            const userBalances: UserBalances = {};
            balances.forEach((balance: any) => {
                userBalances[balance.token.address.toLowerCase()] = new BigNumber(balance.amount);
            });

            return userBalances;
        }
    })

    // Fetch WL properties
    const { isLoading: wlPropertiesAreLoading, data: wlProperties } = useQuery({
        queryKey: ['wlProperties', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
        enabled: !!chainId,
        queryFn: async (): Promise<number[]> => {
            if(!chainId || !account) return [];

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
            // context: {
            //     fetchOptions: {
            //     signal: abortController.signal
            //     }
            // }
            });
    
            const userIds = data[prefix]?.account?.userIds;
    
            let wlTokenIds: string[] | undefined = undefined;
            if(userIds){
                wlTokenIds = userIds[0].attributeKeys;
            }

            return wlTokenIds ? wlTokenIds.map(str => parseInt(str)) : [];

        }
    });

    // Fetch offers
    const { isLoading: offersAreLoading, data: offers } = useQuery({
        queryKey: ['offers', chainId],
        meta: { errCode: REACT_QUERY_ERRORS.FETCH_OFFERS },
        enabled: !!chainId && !!account && !!properties && !!prices && !!wlProperties,
        queryFn: async (): Promise<Offer[]> => {
            if(!chainId || !account || !properties || !prices || !wlProperties) return OFFER_LOADING;

            let offersData = OFFER_LOADING;
            if (ALLOWED_CHAINS_ID.includes(chainId.toString()) && wlProperties && prices) {
                //offersData = await fetchOfferTheGraph(chainId,properties);
                offersData = await fetchOffersTheGraph(account,chainId, properties, wlProperties, prices, () => {} );
            }
        
            return offersData;
        }
    });
    // console.log('OFFERS: ', offers, offersAreLoading);

    return(
        <YamProvider
            initProps={{
                interfaceIsLoading: propertiesAreLoading || pricesAreLoading || userBalancesAreLoading || wlPropertiesAreLoading,
                account,
                chainId: chainId || ChainsID.Gnosis,
                offersAreLoading,
                offers: offers || OFFER_LOADING,
                propertiesAreLoading,
                properties: properties || [],
                userBalancesAreLoading,
                userBalances: userBalances || {},
                pricesAreLoading,
                prices: prices || {},
                wlPropertiesAreLoading,
                wlProperties: wlProperties || []
            }}
        >
            {children}
        </YamProvider>
    )
}