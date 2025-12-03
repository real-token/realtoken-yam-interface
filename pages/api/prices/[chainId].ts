import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { NetworkId } from '@real-token/core';

import { tokenToGetPrice } from '../../../src/constants/GetPriceToken';
import { getChainlinkPrice } from '../../../src/controllers/ChainLinkCall';
import { getCoingeckoApiPrice } from '../../../src/controllers/CoingeckoApiCall';
import {
  GetPriceTokenChainLink,
  GetPriceTokenCoingecko,
} from '../../../src/types/GetPriceTokens';
import { Price } from '../../../src/types/price';

const gnosisRpcUrl = process.env.GNOSIS_RPC_URL as string;
const ethereumRpcUrl = process.env.ETHEREUM_RPC_URL as string;
const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL as string;

const rpcUrls = new Map<number, string>([
  [Number(NetworkId.gnosis), gnosisRpcUrl],
  [Number(NetworkId.ethereum), ethereumRpcUrl],
  [Number(NetworkId.sepolia), sepoliaRpcUrl],
]);

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { chainId: id } = req.query;
    const chainId: number = id as unknown as number;
    if (!chainId) return res.status(400).json({ error: 'ChainId is missing.' });

    const tokens = tokenToGetPrice.get(Number(chainId));
    if (!tokens) return res.status(400).json({ error: 'ChainId is invalid.' });

    const rpcUrl = rpcUrls.get(Number(chainId));
    if (!rpcUrl) return res.status(400).json({ error: 'Cannot find rpc url' });

    const prices = await Promise.all<Price>(
      tokens.map((token) => {
        return new Promise(async (resolve) => {
          const getPriceType = token.priceFnc.type;
          if (getPriceType === 'chainlink') {
            const price = await getChainlinkPrice(
              chainId,
              token as GetPriceTokenChainLink,
              rpcUrl
            );
            resolve(price);
          } else if (getPriceType === 'coingecko-api') {
            const price = await getCoingeckoApiPrice(
              token as GetPriceTokenCoingecko,
              chainId
            );
            resolve(price);
          } else if (getPriceType === 'custom-fnc') {
            const price = await token.priceFnc.fnc();
            resolve({
              contractAddress: token.contractAddress,
              price: price.toString(),
            });
          }
          resolve({
            contractAddress: token.contractAddress,
            price: '0',
          });
        });
      })
    );

    const pricesParsed = prices.reduce<Record<string, number>>((acc, price) => {
      if (!price) return acc;
      acc[price.contractAddress.toLowerCase()] = Number(price.price);
      return acc;
    }, {});

    return res
      .setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
      .status(200)
      .json(pricesParsed);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to fetch asset prices' });
  }
};
export default handler;
