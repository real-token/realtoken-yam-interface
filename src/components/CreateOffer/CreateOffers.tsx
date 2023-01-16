import { Button, createStyles, Divider, Flex } from "@mantine/core"
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/hooks/react-hooks";
import { selectCreateOffers } from "src/store/features/createOffers/createOffersSelector";
import { CreatedOffer } from "src/types/Offer/CreatedOffer";
import { CreateOfferPane } from "./CreateOfferPane";

const useStyles = createStyles((theme) => ({
    container:{
        display: "flex",
        width: "33%",
        borderStyle: "solid",
        borderColor: theme.colors.brand,
        borderWidth: "2px",
        borderRadius: theme.spacing.sm,
        padding: theme.spacing.md,
        height: "40vh",
        
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: "100%",
        },
    },
    offersContainer: {
        overflowY: "scroll",
        // paddingRight: "20px"
    },
}))

export const CreateOffer = () => {

    const { classes } = useStyles();
    const offers = useAppSelector(selectCreateOffers);

    const { t } = useTranslation('modals', { keyPrefix: 'sell' });

    return(
        <Flex direction={"column"} align={"center"}>
            <h3>{"Create offer(s)"}</h3>
            <Flex direction={"column"} className={classes.container} gap={"sm"} mb={'sm'}>
                <Flex direction={"column"} className={classes.offersContainer} gap={"sm"}>
                    {offers?.map((offer: CreatedOffer,index: number) => <CreateOfferPane key={`created-offer-${index}`} isCreating={false} offer={offer}/>)}
                </Flex>
                { offers.length > 0 ? <Divider/> : undefined }
                <CreateOfferPane isCreating={true}/>
            </Flex>
            <Button disabled={offers.length == 0}>
                { offers.length == 0 ? t('buttonCreateOffer') : t('buttonCreateOfferWithNumber', {nbr: offers.length}) }
            </Button>
        </Flex>
    )
}