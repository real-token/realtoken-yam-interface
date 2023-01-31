import { Button, Flex, TextInput, Text } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ROLE, USER_ROLE } from "src/types/admin";
import { Action } from "../Action";
import { utils } from "ethers";
import { ContractsID } from "src/constants";
import { useContract } from "src/hooks";
import { calcRem } from "src/utils/style";

interface GetRoleForm{
    address: string;
}

export const CheckRole = () => {

    const { getInputProps, isValid, onSubmit } = useForm<GetRoleForm>({
        initialValues: {
            address: ""
        },
        validate: {
            address: (value) => utils.isAddress(value) && value !== "" ? null : "Address is not valid."
        }
    });

    const [role,setRole] = useState<USER_ROLE|undefined>(undefined);
    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

    const getRole = async (values: GetRoleForm) => {
        try{
            if(!realTokenYamUpgradeable) return;

            const [isAdmin,isModerator] = await Promise.all([
                realTokenYamUpgradeable.hasRole(ROLE.get(USER_ROLE.ADMIN) ?? "", values.address),
                realTokenYamUpgradeable.hasRole(ROLE.get(USER_ROLE.MODERATOR) ?? "",values.address)
            ]);

            if(isAdmin){
                setRole(USER_ROLE.ADMIN);
                return;
            }
            if(isModerator){
                setRole(USER_ROLE.MODERATOR);
                return;
            }

        setRole(USER_ROLE.NO_ROLE)

        }catch(err){
            console.log("Failed to check role: ", err);
        }

    }

    return(
        <Action title={"Check address role"}>
            <form onSubmit={onSubmit(getRole)}>
                <Flex gap={"sm"}>
                    <TextInput {...getInputProps("address")} style={{ width: calcRem(400) }}/>
                    <Button type={"submit"} disabled={!isValid()}>{"Get address Role"}</Button>
                </Flex>
            </form>
            { role ? <Text>{`Role: ${role}`}</Text> : undefined }
        </Action>
    )
}