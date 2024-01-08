import { Flex, Skeleton, Text } from "@mantine/core"
import React from "react"
import { FC } from "react"
import classes from './OfferPropertyCard.module.css';

interface OfferPropertyCardProps{
    title: string
    value: string | undefined
    logo?: React.ReactNode
}

export const OfferPropertyCard: FC<OfferPropertyCardProps> = ({ value, logo, title }) => {

    return(
        <Flex direction={"column"} gap={"sx"} className={classes.container}>
            { value ? <Text fz={32}>{value} </Text> : <Skeleton width={"100%"} height={30}/> }
            <Text fz={"sm"} fw={500}>{title}</Text>
        </Flex>
    )
}