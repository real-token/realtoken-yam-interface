import React from 'react';

import { NextPage } from 'next';

import { Flex } from '@mantine/core';

import { CheckCompliance } from 'src/components/CheckCompliance/CheckCompliance';
import Display from 'src/components/Display/Display';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { ConnectedProvider } from 'src/providers/ConnectProvider';

const HomePage: NextPage = () => {
  return (
    <ConnectedProvider>
      <Flex my={'xl'} direction={'column'}>
        <CheckCompliance></CheckCompliance>
        <MarketTableFilter />
        <Display />
      </Flex>
    </ConnectedProvider>
  );
};

export default HomePage;
