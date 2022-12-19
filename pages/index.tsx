import { NextPage } from 'next';
import { MarketTable } from 'src/components/Market';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { Flex } from '@mantine/core';

const HomePage: NextPage = () => {
  return (
    <Flex
      direction={"column"}
      p={"xl"}
      style={{ flexGrow: 1 }}
    >
      <MarketTableFilter />
      <MarketTable />
    </Flex>
  );
};

export default HomePage;
