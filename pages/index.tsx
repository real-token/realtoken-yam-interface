import { Fragment } from 'react';

import { NextPage } from 'next';

import { MarketSell } from 'src/components/Market';
import { MarketTableRow } from 'src/components/Market/MarketTableRow';
import { MarketDashboard } from 'src/modules/market';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <MarketTableRow />
      {/* <MarketDashboard /> */}
      <MarketSell />
    </Fragment>
  );
};

export default HomePage;
