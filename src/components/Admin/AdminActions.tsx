import { Flex } from "@mantine/core"
import { AddWLAction } from "./actions/addWL/AddWLAction"
import { GrantRole } from "./actions/GrandRole"
import { PauseAction } from "./actions/PauseAction"


export const AdminActions = () => {

    return(
        <Flex direction={"column"} gap={"md"}>
            <AddWLAction/>
            <GrantRole />
            <PauseAction />
        </Flex>
    )
}