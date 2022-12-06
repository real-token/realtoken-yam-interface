import { Fragment } from 'react';

import { NextPage } from 'next';

import { MarketTable } from 'src/components/Market';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <MarketTableFilter />
      <MarketTable />
    </Fragment>
  );
};

export default HomePage;
