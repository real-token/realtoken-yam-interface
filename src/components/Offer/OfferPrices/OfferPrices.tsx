import { Flex, Text } from "@mantine/core";
import { IconArrowRight, IconMoneybag } from "@tabler/icons";
import { FC } from "react";
import { Offer } from "src/types/offer";
import classes from "./OfferPrices.module.css";

interface OfferPricesProps{
    offer: Offer | undefined
}

export const OfferPrices : FC<OfferPricesProps> = ({ offer }) => {
    
    return(
        <Flex direction={"column"}>
            <Flex gap={2} mb={6}>
                <IconMoneybag />
                <Text>Prices</Text>
            </Flex>
            <Flex direction={"column"} className={classes.container}>
                <Flex>
                    <Text color={"brand"} fw={700} fz={"xl"}>
                        {`1 ${offer?.offerTokenName}`}
                    </Text>
                    <IconArrowRight/>
                    <Text color={"brand"} fw={700} fz={"xl"}>
                        {offer?.buyerTokenName}
                    </Text>
                </Flex>
                <Flex>
                    <Text color={"brand"} fw={700} fz={"xl"}>
                        {`1 ${offer?.offerTokenName}`}
                    </Text>
                    <IconArrowRight/>
                    <Text color={"brand"} fw={700} fz={"xl"}>
                        {offer?.buyerTokenName}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}