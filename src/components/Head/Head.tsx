import { FC } from 'react';

import { default as NextHead } from 'next/head';

type HeadProps = {
  title: string;
};

export const Head: FC<HeadProps> = ({ title }) => {
  return (
    <div>
      <NextHead>
        <title>{title}</title>
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1.0'}
        />
        <meta
          name={'Description'}
          content={
            'RealToken YAM, a peer-to-peer platform to exchange your real estate tokens'
          }
        />
      </NextHead>
    </div>
  );
};
