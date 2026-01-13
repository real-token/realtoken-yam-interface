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
  const defaultPrice: Price = {
    contractAddress: allowedToken.contractAddress,
    price: '0',
  };

  const coingeckoNetworkId = coingeckoNetworkIds.get(chainId);
  if (!coingeckoNetworkId) {
    console.error(`Coingecko network ID not found for chainId ${chainId}`);
    return defaultPrice;
  }

  const tokenAddress =
    allowedToken.priceFnc.address ?? allowedToken.contractAddress;

  try {
    const res = await fetch(
      `https://api.geckoterminal.com/api/v2/simple/networks/${coingeckoNetworkId}/token_price/${tokenAddress}`,
      { signal: AbortSignal.timeout(5000) } // 5s timeout
    );

    if (!res.ok) {
      console.error(
        `Coingecko API error for ${tokenAddress}: ${res.status} ${res.statusText}`
      );
      return defaultPrice;
    }

    const data = await res.json();
    const price = data.data?.attributes?.token_prices?.[tokenAddress];

    return {
      contractAddress: allowedToken.contractAddress,
      price: price ?? '0',
    };
  } catch (err) {
    console.error(`Error fetching coingecko price for ${tokenAddress}:`, err);
    return defaultPrice;
  }
};
