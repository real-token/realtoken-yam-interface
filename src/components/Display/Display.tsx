import { ActionIcon, Flex } from "@mantine/core";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons";
import { useAtom } from "jotai";
import React, { FC, useState } from "react";
import { displayChoosedAtom } from "src/states";
import { Displays } from "src/types/Displays";

interface DisplayProps{
  table?: JSX.Element,
  smallGrid?: JSX.Element,
  grid?: JSX.Element
}
const Display: FC<DisplayProps> = ({ table: Table, smallGrid: SmallGrid, grid: Grid } : DisplayProps) => {

  // const [choosenDisplay,setChoosenDisplay] = useAtom(displayChoosedAtom);
  const [choosenDisplay,setChoosenDisplay] = useState<Displays>(Displays.TABLE);
  // const { refreshOffers, offersIsLoading } = useRefreshOffers(false);

  const getDisplay = () => {
    switch(choosenDisplay){
        case Displays.TABLE:
            return Table ? Table : undefined;
        case Displays.SMALL_GRID:
            return SmallGrid ? SmallGrid : undefined;
        case Displays.GRID:
            return Grid ? Grid : undefined;
    }
  }

  return(
    <>
      {/* <Flex justify={"space-between"} mb={16}> */}
      <Flex justify={"end"} mb={16}>
        {/* <Flex gap={"xs"}>
            <ActionIcon
              size={32}
              color={'brand'}
              variant={"outline"}
              loading={offersIsLoading}
              loaderProps={{ size: 'xs', color: "brand" }}
              onClick={() => refreshOffers()}
            >
              <IconRefresh size={16}/>
            </ActionIcon>
        </Flex> */}
        {/* TODO: Add display switcher */}
        <Flex gap={"xs"} >
          <ActionIcon color={"brand"} size={"lg"} variant={choosenDisplay == Displays.TABLE ? "filled" : "outline"} onClick={() => setChoosenDisplay(Displays.TABLE)}><IconLayoutList size={20}/></ActionIcon>
          <ActionIcon color={"brand"} size={"lg"} variant={choosenDisplay == Displays.GRID ? "filled" :"outline"} onClick={() => setChoosenDisplay(Displays.GRID)}><IconLayoutGrid size={20}/></ActionIcon>
          {/* <ActionIcon color={"brand"} size={"lg"} variant={choosenDisplay == Displays.SMALL_GRID ? "filled" :"outline"} onClick={() => setChoosenDisplay(Displays.SMALL_GRID)}><IconGridDots size={20}/></ActionIcon> */}
        </Flex> 
      </Flex>
      {getDisplay()}
    </>
  )
}
export default Display;