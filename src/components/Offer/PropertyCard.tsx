import { createStyles, Flex, Skeleton, Text, useMantineTheme } from "@mantine/core"
import { IconExternalLink } from "@tabler/icons"
import { PropertiesToken } from "src/types"
import { Offer } from "src/types/offer"
import { openInNewTab } from "src/utils/window"
import { PropertyImage } from "./Image/PropertyImage"

const useStyle = createStyles((theme) => ({
    container: {
        alignItems: "start",
        width: "50%"
    },
    propertyInfosContainer: {
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderWidth: "3px",
        borderColor: theme.colors.brand,
        borderRadius: theme.radius.md,
        padding: theme.radius.lg,
        gap: theme.spacing.md
    },
    propertyNameContainer: {
        display: "flex",
        justifyContent: "start",
    },
    propertyName: {
        borderBottomStyle: "solid",
        borderBottomWidth: "2px",
        borderBottomColor: "transparent",
        '&:hover': {
            borderBottomColor: theme.colors.brand,
            cursor: "pointer"
        },
    }
}));


interface PropertyCardProps{
    propertyToken: PropertiesToken,
    offer: Offer
}
export const PropertyCard = ({ propertyToken, offer }: PropertyCardProps) => {

    const { classes } = useStyle();
    const { colors } = useMantineTheme();

    return(
        <Flex className={classes.container}>
            <Flex className={classes.propertyInfosContainer}>
                <Flex direction={"column"}>
                    <div className={classes.propertyNameContainer}>
                    {   propertyToken ?
                            <Flex className={classes.propertyName} gap={5} align={"center"} onClick={() => openInNewTab(propertyToken.marketplaceLink)}>
                                <Text color={"brand"} fw={700} fz={"xl"}>{propertyToken.shortName}</Text>
                                <IconExternalLink size={20} color={colors.brand[9]}/>
                            </Flex>
                        : 
                            <Skeleton height={25} width={200}/> 
                    }
                    </div>
                    {/* <Flex direction={"column"} gap={"sm"}>
                        { offer ?
                            <OfferDeltaTable 
                                offer={offer}
                                offerPrice={undefined}
                                offerYield={undefined}
                                officialPrice={propertyToken.officialPrice}
                                officialYield={propertyToken.annualYield ? propertyToken.annualYield*100 : 0}
                            />
                            :
                            <Skeleton height={15}/>
                        }
                    </Flex> */}
                </Flex>
                <PropertyImage property={propertyToken}/>
            </Flex>
        </Flex>
    )
}