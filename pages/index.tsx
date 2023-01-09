import { NextPage } from 'next';
import { MarketTable } from 'src/components/Market';
import 'src/components/Market';
import { MarketTableFilter } from 'src/components/Market/Filters';
import { Flex } from '@mantine/core';
import Display from 'src/components/Display/Display';
import { MarketGrid } from 'src/components/Market/Grid/MarketGrid';
import { selectPublicOffers } from 'src/store/features/interface/interfaceSelector';
import { useSelector } from 'react-redux';

const HomePage: NextPage = () => {

  const offers = useSelector(selectPublicOffers); 

  return (
    // <Tabs color={'brand'} defaultValue={'realt-token'} mb={"xl"} mt={"xl"}>
    //   <Tabs.List>
    //     <Tabs.Tab value={"realt-token"} icon={<IconExchange size={18} />}>{"Buy Realt token"}</Tabs.Tab>
    //     <Tabs.Tab value={"token-realt"} icon={<IconExchange size={18} />}>{"Sell RealT token"}</Tabs.Tab>
    //     <Tabs.Tab value={"token-token"} icon={<IconExchange size={18} />}>{"Exchange other token"}</Tabs.Tab>
    //   </Tabs.List>

    //   <Tabs.Panel value={"realt-token"} pt={"xs"}>
    //     <MarketTableFilter />
    //     <Display 
    //       table={<MarketTable/>}
    //       grid={<MarketGrid offers={offers}/>}
    //     />
    //   </Tabs.Panel>

    //   <Tabs.Panel value={"token-realt"} pt={"xs"}>
        
    //   </Tabs.Panel>

    //   <Tabs.Panel value={"token-token"} pt={"xs"}>
        
    //   </Tabs.Panel>
    // </Tabs>
    <Flex my={"xl"} direction={"column"}>
      <MarketTableFilter />
         <Display 
            table={<MarketTable/>}
            grid={<MarketGrid offers={offers}/>}
          />
    </Flex>
  );
};

export default HomePage;