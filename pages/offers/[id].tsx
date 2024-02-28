import { FC } from 'react';
import { ConnectedProvider } from 'src/providers/ConnectProvider';

import { useRouter } from 'next/router';
import { DisplayOffer } from 'src/components/Offer/DisplayOffer';

const ShowOfferPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ConnectedProvider>
      <DisplayOffer offerId={id as string} backArrow={false}></DisplayOffer>
    </ConnectedProvider>
  );
};

export default ShowOfferPage;
