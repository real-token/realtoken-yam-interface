import { FC } from 'react';

import { MarketTable } from 'src/components/Market';

const DUMMY_DATA = [
  {
    offerId: '1',
    offerTokenAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    offerTokenName: 'REALTOKEN-S-15039-WARD-AVE-DETROIT-MI',
    buyerTokenAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    buyerTokenName: 'USDC',
    sellerAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    price: '50',
    amount: '10',
  },
  {
    offerId: '2',
    offerTokenAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    offerTokenName: 'REALTOKEN-S-9717-EVERTS-ST-DETROIT-MI',
    buyerTokenAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    buyerTokenName: 'USDC',
    sellerAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    price: '60',
    amount: '20',
  },
  {
    offerId: '3',
    offerTokenAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    offerTokenName: 'REALTOKEN-S-4680-BUCKINGHAM-AVE-DETROIT-MI',
    buyerTokenAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    buyerTokenName: 'USDC',
    sellerAddress: '0x71C7D067f4046f146419f4FC72c18601C5eB7545',
    price: '60',
    amount: '30',
  },
];
export const MarketDashboard: FC = () => {
  return <MarketTable data={DUMMY_DATA} />;
};
