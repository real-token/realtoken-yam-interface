import { FC, ReactNode, useEffect } from 'react';

import { Web3ReactProvider } from '@web3-react/core';

import { connectors, metaMask, network } from 'src/connectors';

type Web3ProvidersProps = {
  children: ReactNode;
};

const ConnectEagerly: FC = () => {
  useEffect(() => {
    void network.activate();
  }, []);

  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return null;
};

export const Web3Providers: FC<Web3ProvidersProps> = ({ children }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <ConnectEagerly />
      {children}
    </Web3ReactProvider>
  );
};
