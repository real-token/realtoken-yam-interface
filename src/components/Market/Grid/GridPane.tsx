import { createStyles, Flex, Text } from "@mantine/core"
import { FC } from "react"
import { Offer } from "src/types/Offer"

const useStyle = createStyles((theme, _params, getRef) => ({
    title: {
        backgroundColor: theme.colors.brand,
        width: '100%',
        height: "60px",
        lineHeight: "60px",
        textAlign: "center",
        color: "white",
        fontSize: theme.fontSizes.lg
    }
}));

interface GridPaneProps{
    offer: Offer
}
export const GridPane: FC<GridPaneProps> = ({ offer }) => {

    const { classes } = useStyle();

    return(
        <Flex color={"brand"}>
            <Text className={classes.title}>{offer.offerTokenName}</Text>
        </Flex>
    )
}