import { Fragment } from 'react';

import { MarketSellWithPermit } from 'src/components/Market';
import { MarketTableRow } from 'src/components/Market/MarketTableRow';
import UserTransfers from 'src/modules/transfers/UserTransfers';

const TransfersPage = () => {
  return (
    <Fragment>
      <MarketTableRow />
      <MarketSellWithPermit />
    </Fragment>
  );
};

export default TransfersPage;
