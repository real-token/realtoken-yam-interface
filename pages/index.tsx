import { Fragment } from 'react';

import { NextPage } from 'next';

import { MarketSell } from 'src/components/Market';
import { MarketTableRow } from 'src/components/Market/MarketTableRow';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <MarketTableRow />
      <MarketSell />
    </Fragment>
  );
};

export default HomePage;
