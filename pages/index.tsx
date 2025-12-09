import { NextPage } from 'next';

import { Flex } from '@mantine/core';
import { useWeb3AuthPrivate } from '@real-token/web3';

import Display from 'src/components/Display/Display';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { ConnectedProvider } from 'src/providers/ConnectProvider';

const HomePage: NextPage = () => {
  const web3Auth = useWeb3AuthPrivate();
  console.dir(web3Auth, { depth: 10 });

  return (
    <ConnectedProvider>
      <Flex my={'xl'} direction={'column'}>
        <MarketTableFilter />
        <Display />
      </Flex>
    </ConnectedProvider>
  );
};

export default HomePage;
