import { Flex, Select } from "@mantine/core";
import { useAtom } from "jotai";
import React, { FC, useMemo } from "react";
import { displayChoosedAtom } from "src/states";
import { Displays } from "src/types/Displays";
import { MarketTable } from "../Market";
import { MarketGrid } from "../Market/MarketGrid/MarketGrid";
import { MarketSort } from "../Market/MarketSort/MarketSort";

interface Display{
  display: Displays
  title: string;
  component: React.ReactElement;
}
const Display: FC = () => {

  const [choosenDisplay,setChoosenDisplay] = useAtom(displayChoosedAtom);

  const availableDisplays = useMemo(() => {
    return new Map<Displays,Display>([
      [Displays.TABLE, {
        display: Displays.TABLE,
        title: "Table",
        component: <MarketTable key={"table"}/> 
      }],
      [Displays.GRID,{
        display: Displays.GRID,
        title: "Grid",
        component: <MarketGrid key={"grid"}/> 
      }]
    ]);
  },[])

  const datas = useMemo(() => {
    return [...availableDisplays].map(([, value]) => ({ value: value.display, label: value.title  }))
  },[availableDisplays]);

  const getDisplay = (): Display|undefined => {
    return [...availableDisplays.values()].find(display => display.display == choosenDisplay)
  }

  return(
    <>
      <Flex justify={"space-between"} mb={16}>
        <MarketSort />
        <Select
          data={datas}
          value={choosenDisplay}
          onChange={(value) => { if(value) setChoosenDisplay(value) }}
        />
      </Flex>
      {getDisplay() ? getDisplay()?.component : undefined}
    </>
  )
}
export default Display;