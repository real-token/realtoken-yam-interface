import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react"
import { CHAINS, ChainsID } from "src/constants";
import { getTheGraphUrlYAM } from "src/utils/offers/fetchOffers";

interface UseGraphSyncStatus{
    isOk: boolean;
    errorMessage: string;
}

export const useGraphSyncStatus = (): UseGraphSyncStatus => {

    const [isOk,setIsOk] = useState<boolean>(false);
    const { provider, chainId } = useWeb3React();

    const getBlockNumberFromTheGraph = new Promise<number>(async (resolve,reject) => {
        try{

            const client = new ApolloClient({
                uri: getTheGraphUrlYAM(chainId ?? 100),
                cache: new InMemoryCache(),
            });
    
            const { data } = await client.query({
                query: gql`
                    query getStatus {
                        _meta {
                            block {
                                hash
                                number
                                timestamp
                            }
                        }
                    }
                `,
            });
    
            const blockNumber = data._meta.block.number;
            resolve(blockNumber);

        }catch(err){
            console.log(err);
            reject(err);
        }
    })

    const getBlockNumberFromRpc = new Promise<number>(async (resolve,reject) => {
        try{

            const { rpcUrl } = CHAINS[chainId as ChainsID];

            const response = await fetch(rpcUrl, {
                method: "POST",
                body: JSON.stringify({
                    "jsonrpc":"2.0",
                    "method":"eth_getBlockByNumber",
                    "params":["latest", false],
                    "id":1
                })
            })

            const data: { result: { number: string } } = await response.json();

            const blockNumber = new BigNumber(data.result.number).toNumber();
    
            resolve(blockNumber);

        }catch(err){
            console.log(err);
            reject(err);
        }
    })

    const getSync = async () => {
        Promise.all([getBlockNumberFromTheGraph,getBlockNumberFromRpc]).then(values => {
            if(values[0]-values[1] < 10) setIsOk(true);
        })
    }

    useEffect(() => {
        if(provider && chainId) getSync();
    },[provider,chainId]);

    return{
        isOk: isOk,
        errorMessage: "TheGraph synchronisation is late of ~10 blocks."
    }
}