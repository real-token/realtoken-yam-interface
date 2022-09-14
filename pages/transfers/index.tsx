import { Fragment } from 'react';

import { MarketSellWithPermit } from 'src/components/Market';
import { MarketTableRowUser } from 'src/components/Market/MarketTableRow';
import UserTransfers from 'src/modules/transfers/UserTransfers';

const TransfersPage = () => {
  return (
    <Fragment>
      <MarketTableRowUser />
      <MarketSellWithPermit />
    </Fragment>
  );
};

export default TransfersPage;
