import { Fragment } from 'react';

import { NextPage } from 'next';

import { MarketSell, MarketSellWithPermit } from 'src/components/Market';
import { MarketTableRow } from 'src/components/Market/MarketTableRow';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <MarketTableRow />
      <MarketSellWithPermit />
    </Fragment>
  );
};

export default HomePage;
