import { FC, ReactNode, useEffect } from 'react';

import { Web3ReactProvider } from '@web3-react/core';

import { connectors, metaMask, gnosisSafe, network } from 'src/connectors';

type Web3ProvidersProps = {
  children: ReactNode;
};

const ConnectEagerly: FC = () => {
  useEffect(() => {
    void network.activate();
  }, []);
  
  useEffect(() => {
		console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    console.log('process.env.NEXT_PUBLIC_ENV', process.env.NEXT_PUBLIC_ENV);
    process.env.NEXT_PUBLIC_ENV === "dev" ?  
    void gnosisSafe.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to gnosis safe')
    }): 
    void metaMask.connectEagerly();
  }, [])


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
