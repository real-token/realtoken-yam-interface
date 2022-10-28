import { Fragment } from 'react';

import { NextPage } from 'next';

import { MarketTable, SellActions } from 'src/components/Market';
import 'src/components/Market';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <MarketTable />
      <SellActions />
    </Fragment>
  );
};

export default HomePage;
