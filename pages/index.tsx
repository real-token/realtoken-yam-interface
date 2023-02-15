import { NextPage } from 'next';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { Flex } from '@mantine/core';
import Display from 'src/components/Display/Display';

const HomePage: NextPage = () => {

  return (
    <Flex my={"xl"} direction={"column"}>
      <MarketTableFilter />
      <Display />
    </Flex>
  );
};

export default HomePage;