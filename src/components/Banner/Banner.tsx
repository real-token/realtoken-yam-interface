import { createStyles, Flex, Text } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons";
import { useMemo } from "react";
import { useGraphSyncStatus } from "src/hooks/banner/useGraphSyncStatus";

const useStyles = createStyles((theme) => ({
    banner: {
        background: theme.colors.brand,
        // alignItems: "center",
        padding: 5
    }
}));

export const Banner = () => {

    const { classes } = useStyles();

    const { isOk: graphOk, errorMessage: theGraphErrorMessage } = useGraphSyncStatus();

    const showBanner: boolean = useMemo(() => {
        return !graphOk
    },[graphOk]);

    return(
        <Flex direction={"column"} className={classes.banner} gap={"sm"} hidden={!showBanner}>
            <Flex hidden={graphOk} gap={5}>
                <IconAlertTriangle color={"white"}/>
                <Text color={"white"}>{theGraphErrorMessage}</Text>
            </Flex>
            {/* <Flex hidden={graphOk} gap={5}>
                <IconAlertTriangle color={"white"}/>
                <Text color={"white"}>{theGraphErrorMessage}</Text>
            </Flex> */}
        </Flex>
    )
}