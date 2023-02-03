import { Flex, Text } from "@mantine/core"
import { FC } from "react"

interface ActionProps{
    title: string;
    children: React.ReactNode;
}

export const Action: FC<ActionProps> = ({ title, children }) => {

    return(
        <Flex direction={"column"} gap={"md"}>
            <Text color={"brand"} fw={700} fz={"xl"}>{title}</Text>
            {children}
        </Flex>
    )
}