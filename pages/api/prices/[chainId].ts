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

// RPC URLs avec valeurs par défaut (public RPCs)
// Vérifier si les variables sont définies ET non vides
const gnosisRpcUrl =
  process.env.GNOSIS_RPC_URL && process.env.GNOSIS_RPC_URL.trim() !== ''
    ? process.env.GNOSIS_RPC_URL
    : 'https://gnosis-rpc.publicnode.com';
const ethereumRpcUrl =
  process.env.ETHEREUM_RPC_URL && process.env.ETHEREUM_RPC_URL.trim() !== ''
    ? process.env.ETHEREUM_RPC_URL
    : 'https://eth.llamarpc.com';
const sepoliaRpcUrl =
  process.env.SEPOLIA_RPC_URL && process.env.SEPOLIA_RPC_URL.trim() !== ''
    ? process.env.SEPOLIA_RPC_URL
    : 'https://ethereum-sepolia-rpc.publicnode.com';

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
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ChainId is missing or invalid.' });
    }

    const chainId = Number(id);
    if (isNaN(chainId)) {
      return res.status(400).json({ error: 'ChainId must be a valid number.' });
    }

    const tokens = tokenToGetPrice.get(chainId);
    if (!tokens) {
      return res.status(400).json({
        error: `ChainId ${chainId} is not supported. Supported chains: ${Array.from(
          tokenToGetPrice.keys()
        ).join(', ')}`,
      });
    }

    const rpcUrl = rpcUrls.get(chainId);
    if (!rpcUrl) {
      return res.status(400).json({
        error: `RPC URL not configured for chainId ${chainId}. Please set ${
          chainId.toString() === NetworkId.gnosis
            ? 'GNOSIS_RPC_URL'
            : chainId.toString() === NetworkId.ethereum
            ? 'ETHEREUM_RPC_URL'
            : 'SEPOLIA_RPC_URL'
        } in your .env file.`,
      });
    }

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
