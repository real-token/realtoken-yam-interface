import { Fragment } from 'react';

import { MarketSellWithPermit } from 'src/components/Market/MarketSellWithPermit';
import PortfolioDashboard from 'src/modules/portfolio/PortfolioDashboard';
import { UserPortfolio } from 'src/modules/portfolio/UserPortfolio';

const PortfolioPage = () => {
  return (
    <Fragment>
      <UserPortfolio />
      <MarketSellWithPermit />
    </Fragment>
  );
};

export default PortfolioPage;
