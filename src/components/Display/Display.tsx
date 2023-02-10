import { ActionIcon, Flex } from "@mantine/core";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons";
import React, { FC, useState } from "react";
import { Displays } from "src/types/Displays";
import { MarketSort } from "../Market/MarketSort/MarketSort";

interface DisplayProps{
  table?: JSX.Element,
  smallGrid?: JSX.Element,
  grid?: JSX.Element
}
const Display: FC<DisplayProps> = ({ table: Table, grid: Grid } : DisplayProps) => {

  const [choosenDisplay,setChoosenDisplay] = useState<Displays>(Displays.TABLE);

  const getDisplay = () => {
    switch(choosenDisplay){
        case Displays.TABLE:
            return Table ? Table : undefined;
        case Displays.GRID:
            return Grid ? Grid : undefined;
    }
  }

  return(
    <>
      <Flex justify={"space-between"} mb={16}>
        <MarketSort />
        <Flex gap={"xs"} >
          <ActionIcon 
            color={"brand"} 
            size={"lg"} 
            variant={choosenDisplay == Displays.TABLE ? "filled" : "outline"} 
            onClick={() => setChoosenDisplay(Displays.TABLE)}
          >
              <IconLayoutList size={20}/>
          </ActionIcon>
          { Grid ? 
            <ActionIcon 
              color={"brand"} 
              size={"lg"} 
              variant={choosenDisplay == Displays.GRID ? "filled" :"outline"} 
              onClick={() => setChoosenDisplay(Displays.GRID)}
            >
                <IconLayoutGrid size={20}/>
            </ActionIcon>
            :
            undefined
          }
        </Flex> 
      </Flex>
      {getDisplay()}
    </>
  )
}
export default Display;