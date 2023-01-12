import { useEffect, useState } from 'react';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';

import { CHAINS, ChainsID } from 'src/constants';
import { getTheGraphUrlYAM } from 'src/utils/offers/fetchOffers';

interface UseGraphSyncStatus {
  isOk: boolean;
  errorMessage: string;
}

const getBlockNumberFromTheGraph = (chainId: number) => new Promise<number>(async (resolve, reject) => {
  try {
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
  } catch (err) {
    console.log(err);
    reject(err);
  }
});

const getBlockNumberFromRpc = (chainId: number) => new Promise<number>(async (resolve, reject) => {
try {
  if (chainId) {
    const { rpcUrl } = CHAINS[chainId as ChainsID];
    console.log('rpcUrl', rpcUrl);
    await fetch(rpcUrl, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
        id: 1,
      }),
    }).then((response) =>
      response.json().then((data) => {
        resolve(new BigNumber(data.result.number).toNumber());
      })
    );
  }
} catch (err) {
  console.log(err);
  reject(err);
}
});

export const useGraphSyncStatus = (): UseGraphSyncStatus => {

  const [init,setInit] = useState<boolean>(false);
  const [isOk, setIsOk] = useState<boolean>(false);
  const { provider, chainId } = useWeb3React();

  const getSync = async () => {
    if(!chainId) return;
    Promise.all([getBlockNumberFromTheGraph(chainId), getBlockNumberFromRpc(chainId)]).then(
      (values) => {
        // console.log("GET SYNC")
        if (values[0] - values[1] < 10) setIsOk(true);
        setInit(true);
      }
    );
  };

  useEffect(() => {
    if (provider && chainId && !init) getSync();
  }, [provider, chainId]);

  return {
    isOk: isOk,
    errorMessage: 'TheGraph synchronisation is late of ~10 blocks.',
  };
};
