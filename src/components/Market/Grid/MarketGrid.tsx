import { Flex, Grid, Text } from "@mantine/core";
import { FC } from "react";
import { Offer } from "src/types/Offer/Offer";
import { GridPane } from "./GridPane";

interface MarketGridProps{
    offers: Offer[]
}
export const MarketGrid: FC<MarketGridProps> = ({ offers }) => {

    return(
        <Grid>
            {offers?.map((offer: Offer, index: number) => (
                <Grid.Col span={4} key={`grid-${index}`}>
                    <GridPane offer={offer}/>
                </Grid.Col>
            ))}
        </Grid>
    )
}