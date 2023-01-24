import { Flex, Skeleton, Text } from "@mantine/core"
import { FC } from "react"

interface OfferTextProps{
    title?: string;
    value: string | undefined;
    width?: number;
}

export const OfferText: FC<OfferTextProps> = ({ title, value, width }) => {
    return(
        <Flex direction={"column"}>
            { title ? <Text fw={700}>{title}</Text> : undefined }
            { value ? <Text>{value}</Text> : <Skeleton height={25} width={width ? width : 400}/> }
        </Flex>
    )
}