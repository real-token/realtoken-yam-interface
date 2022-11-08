import { Fragment } from 'react';

import { NextPage } from 'next';

import { MarketTable } from 'src/components/Market';
import 'src/components/Market';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <MarketTable />
      
    </Fragment>
  );
};

export default HomePage;
