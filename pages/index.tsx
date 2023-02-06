import { NextPage } from 'next';
import { MarketTable } from 'src/components/Market';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { Flex } from '@mantine/core';
import Display from 'src/components/Display/Display';
import { MarketGrid } from 'src/components/Market/MarketGrid/MarketGrid';

const HomePage: NextPage = () => {

  return (
    <Flex my={"xl"} direction={"column"}>
      <MarketTableFilter />
      <Display 
        table={<MarketTable/>}
        grid={<MarketGrid/>}
      />
    </Flex>
  );
};

export default HomePage;