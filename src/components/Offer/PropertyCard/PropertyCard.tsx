import { Flex, Skeleton, Text, useMantineTheme } from "@mantine/core"
import { IconExternalLink } from "@tabler/icons"
import { PropertiesToken } from "src/types"
import { Offer } from "src/types/offer"
import { openInNewTab } from "src/utils/window"
import { OfferDeltaTable } from "../../Table/OfferDeltaTable/OfferDeltaTable"
import { PropertyImage } from "../Image/PropertyImage"
import classes from './PropertyCard.module.css';

interface PropertyCardProps{
    propertyToken: PropertiesToken,
    offer: Offer
}
export const PropertyCard = ({ propertyToken, offer }: PropertyCardProps) => {

    const { colors } = useMantineTheme();

    return(
        <Flex className={classes.container}>
            <Flex className={classes.propertyInfosContainer}>
                <PropertyImage property={propertyToken}/>
                <Flex direction={"column"}>
                    <div className={classes.propertyNameContainer}>
                    {   propertyToken ?
                            <Flex className={classes.propertyName} gap={5} align={"center"} onClick={() => openInNewTab(propertyToken.marketplaceLink)}>
                                <Text c={"brand"} fw={700} fz={"xl"}>{propertyToken.shortName}</Text>
                                <IconExternalLink size={20} color={colors.brand[9]}/>
                            </Flex>
                        : 
                            <Skeleton height={25} width={200}/> 
                    }
                    </div>
                    <Flex direction={"column"} gap={"sm"}>
                        { offer ?
                            <OfferDeltaTable 
                                offer={offer}
                                offerPrice={offer.offerPrice}
                                offerYield={offer.offerYield}
                                officialPrice={propertyToken.officialPrice}
                                officialYield={propertyToken.annualYield ? propertyToken.annualYield*100 : 0}
                            />
                            :
                            <Skeleton height={15}/>
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}