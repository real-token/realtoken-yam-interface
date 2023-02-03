import { Flex } from "@mantine/core"
import { useRole } from "src/hooks/useRole"
import { isRole, USER_ROLE } from "src/types/admin"
import { AddWLAction } from "./actions/addWL/AddWLAction"
import { CheckRole } from "./actions/CheckRole"
import { GrantRole } from "./actions/GrandRole"

export const AdminActions = () => {

    const { role } = useRole();

    return(
        <Flex direction={"column"} gap={"md"}>
            { isRole(role,[USER_ROLE.ADMIN]) ? <AddWLAction/> : undefined }
            { isRole(role,[USER_ROLE.ADMIN]) ? <GrantRole /> : undefined }
            <CheckRole />
            {/* { isRole(role,[USER_ROLE.ADMIN]) ? <PauseAction /> : undefined } */}
        </Flex>
    )
}