export type Currency = {
  name: string;
  symbol: string;
  decimals: number;
};

export const DAI: Currency = {
  name: 'xDai',
  symbol: 'DAI',
  decimals: 18,
};

export const ETH: Currency = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};
