import { Select, TextInput, Flex, ActionIcon, Tooltip, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconX } from "@tabler/icons";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { ContractsID } from "src/constants";
import { useContract } from "src/hooks";
import { wlTokensAtom } from "src/states";
import { calcRem } from "src/utils/style";
import { utils } from "ethers";

interface AddWLForm{
    type: string;
    address: string;
}

interface AddWLProps{
    index: number;
}
export const AddWL: FC<AddWLProps> = ({ index }) => {

    const datas = [
        {
            label: "RealT token",
            value: "1"
        },
        {
            label: "ERC20 with permit",
            value: "2"
        },
        {
            label: "ERC20 witeout permit",
            value: "3"
        }
    ];

    const { getInputProps, values, isValid, onSubmit, reset } = useForm<AddWLForm>({
        initialValues: {
            type: datas[0].value,
            address: ""
        },
        validate: {
            type: (value) => value !== "" ? null : "Wrong token type.",
            address: (value) => utils.isAddress(value) && value !== "" ? null : "Address is not valid."
        }
    });

    const [isEdit,setIsEdit] = useState<boolean>(true);

    const [wlTokens,setWlTokens] = useAtom(wlTokensAtom);

    // useEffect(() => {
    //     console.log(wlTokens)
    // },[wlTokens])

    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);
    const [isAlreadyWL,setIsAlreadyWL] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const getIsAlreadyWL = (): Promise<boolean> => {
        return new Promise<boolean>(async (resolve,reject) => {
            console.log("TEST, ", realTokenYamUpgradeable)
            try{
                if(!realTokenYamUpgradeable) return;

                const tokenType = await realTokenYamUpgradeable.getTokenType(values.address);

                console.log("tokenType: ", tokenType)

                if(tokenType == 0){
                    resolve(false);
                    return;
                }
                if(tokenType == parseInt(values.type)){
                    resolve(true);
                    return;
                }
                resolve(false);
            }catch(err){
                console.log(err);
                reject(err);
            }
        });
    }

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)
            const isWL = await getIsAlreadyWL();
            setIsAlreadyWL(isWL);
            setIsLoading(false)
        }
        if(values.address !== undefined && utils.isAddress(values.address)) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[values.address]); 

    const save = async (formValues: AddWLForm) => {
        const newToken = {
            type: formValues.type,
            address: formValues.address
        } 

        const newWLTokens = [...wlTokens];
        newWLTokens[index] = newToken;

        setWlTokens(newWLTokens)
        setIsEdit(false);
    }

    const deleteWL = () => {
        const tokens = [...wlTokens];
        delete tokens[index];
        setWlTokens(tokens);
    }

    return(
        <form onSubmit={onSubmit(save)}>
            <Flex gap={"md"} align={"center"}>
                <ActionIcon color={"red"} onClick={() => deleteWL()}>
                    <IconX />
                </ActionIcon>
                <Select
                    data={datas}
                    {...getInputProps("type")}
                    style={{ width: calcRem(400) }}
                    disabled={!isEdit}
                />
                <Tooltip label={"Token already whitelisted."} position={"right"} opened={isAlreadyWL} color={"red"} withArrow={true} offset={10}>
                    <TextInput
                        style={{ width: calcRem(400) }}
                        disabled={!isEdit}
                        {...getInputProps("address")}
                    />
                </Tooltip>
                <ActionIcon color={"green"} disabled={isEdit} onClick={() => setIsEdit(true)}>
                    <IconEdit />
                </ActionIcon>
                <Button disabled={!isEdit || !isValid() || isAlreadyWL} loading={isLoading} type={"submit"}>{"Add"}</Button>
            </Flex>
        </form>
    )
}