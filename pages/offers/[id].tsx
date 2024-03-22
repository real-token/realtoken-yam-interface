import { FC } from 'react';
import { ConnectedProvider } from 'src/providers/ConnectProvider';

import { useRouter } from 'next/router';
import { DisplayOffer } from 'src/components/Offer/DisplayOffer';

const ShowOfferPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = `${router.basePath}`;
  return (
    <ConnectedProvider>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          marginLeft: '-10%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          marginTop: '-5px', // -20 Tailwind units, assuming 1 unit = 0.25rem

          zIndex: '-10',
          width: '100%',
          height: 'calc(100vh - 150px)',
          backgroundImage: `url(${baseUrl}/Degrade_Homepage_CSM.svg)`,
          backgroundSize: 'cover',
        }}
        aria-hidden={'true'}
      ></div>
      <DisplayOffer offerId={id as string} backArrow={false}></DisplayOffer>
    </ConnectedProvider>
  );
};

export default ShowOfferPage;
