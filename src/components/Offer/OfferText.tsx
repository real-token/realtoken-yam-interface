import { Flex, Skeleton, Text } from "@mantine/core"
import { FC } from "react"

interface OfferTextProps{
    title: string
    value: string | undefined
}

export const OfferText: FC<OfferTextProps> = ({ title, value }) => {
    return(
        <Flex direction={"column"}>
            <Text fw={700}>{title}</Text>
            { value ? <Text>{value}</Text> : <Skeleton height={25} width={400}/> }
        </Flex>
    )
}