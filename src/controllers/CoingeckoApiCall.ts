import { NetworkId } from '@real-token/core';

import { Price } from '../types/price';

// Simplified type for API usage (no React dependencies)
export interface CoingeckoPriceParams {
  contractAddress: string;
  priceFnc: {
    type: 'coingecko-api';
    address?: string;
  };
}

// Map chainId to coingecko network ID (avoid importing aaConfig which has env checks)
const coingeckoNetworkIds = new Map<number, string>([
  [Number(NetworkId.gnosis), 'xdai'],
  [Number(NetworkId.ethereum), 'eth'],
  [Number(NetworkId.sepolia), 'xdai'], // Sepolia uses xdai for price lookup
]);

export const getCoingeckoApiPrice = async (
  allowedToken: CoingeckoPriceParams,
  chainId: number
): Promise<Price> => {
  const startTime = Date.now();
  const defaultPrice: Price = {
    contractAddress: allowedToken.contractAddress,
    price: '0',
  };

  const coingeckoNetworkId = coingeckoNetworkIds.get(chainId);
  if (!coingeckoNetworkId) {
    console.error(`[coingecko] Network ID not found for chainId ${chainId}`);
    return defaultPrice;
  }

  const tokenAddress =
    allowedToken.priceFnc.address ?? allowedToken.contractAddress;

  try {
    console.log(`[coingecko] Fetching price for ${tokenAddress.slice(0, 10)}...`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `https://api.geckoterminal.com/api/v2/simple/networks/${coingeckoNetworkId}/token_price/${tokenAddress}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(
        `[coingecko] API error for ${tokenAddress.slice(0, 10)}: ${res.status} ${res.statusText}`
      );
      return defaultPrice;
    }

    const data = await res.json();
    const price = data.data?.attributes?.token_prices?.[tokenAddress];

    console.log(`[coingecko] Got price for ${tokenAddress.slice(0, 10)} in ${Date.now() - startTime}ms`);
    return {
      contractAddress: allowedToken.contractAddress,
      price: price ?? '0',
    };
  } catch (err) {
    console.error(`[coingecko] Error for ${tokenAddress.slice(0, 10)} after ${Date.now() - startTime}ms:`, err);
    return defaultPrice;
  }
};
