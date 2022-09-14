import { Fragment } from 'react';

import { MarketTableRowUser } from 'src/components/Market/MarketTableRow';
import UserTransfers from 'src/modules/transfers/UserTransfers';

const TransfersPage = () => {
  return (
    <Fragment>
      <UserTransfers />
      <MarketTableRowUser />
    </Fragment>
  );
};

export default TransfersPage;
