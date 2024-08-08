import React from 'react';

import { NextPage } from 'next';

import { Flex } from '@mantine/core';

import { CheckCompliance } from 'src/components/CheckCompliance/CheckCompliance';
import Display from 'src/components/Display/Display';
import 'src/components/Market';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { ConnectedProvider } from 'src/providers/ConnectProvider';
import { buyOfferReset } from 'src/store/features/buyOffer/buyOfferSlice';

const HomePage: NextPage = () => {
  const dispatch = useAppDispatch();
  dispatch({ type: buyOfferReset.type });

  return (
    <ConnectedProvider>
      <Flex my={'xl'} direction={'column'}>
        <CheckCompliance></CheckCompliance>

        <Display />
      </Flex>
    </ConnectedProvider>
  );
};

export default HomePage;
