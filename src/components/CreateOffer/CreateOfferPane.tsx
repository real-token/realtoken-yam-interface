import { ActionIcon, clsx, createStyles, Flex, Skeleton, Text } from "@mantine/core"
import { openConfirmModal, useModals } from "@mantine/modals"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "src/hooks/react-hooks"
import { useCreatedOffer } from "src/hooks/useCreatedOffer"
import { createOfferRemovedDispatchType } from "src/store/features/createOffers/createOffersSlice"
import { CreatedOffer } from "src/types/Offer/CreatedOffer"
import { hexToRgb } from "src/utils/color"
import { OfferTypeBadge } from "../Offer/OfferTypeBadge"

const useStyles = createStyles((theme) => ({
    offerContainer: {
        display: "flex",
        width: "100%",
        borderColor: theme.colors.brand,
        borderWidth: "2px",
        borderRadius: theme.spacing.sm,
    },
    createOffer: {
        alignItems: "center",
        borderStyle: "dotted",
        '&:hover': {
            backgroundColor: theme.colors.brand,
            borderStyle: "solid",
            cursor: "pointer"
        },
    },
    offerCreated: {
        borderStyle: "solid",
        position: "relative",
        backgroundColor: theme.colors.brand,
        '&:hover': {
            cursor: "pointer"
        },
    },
    offerActions: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing.xl,
        backgroundColor: `${hexToRgb(theme.colors.brand[9],0.85)}`,
        width: "100%",
        height: "100%",
        borderRadius: theme.spacing.sm,
        zIndex: 99
    }
}))

interface CreateOfferPaneProps{
    isCreating: boolean
    offer?: CreatedOffer
}

export const CreateOfferPane: FC<CreateOfferPaneProps> = ({ isCreating, offer }) => {

    const [hovered,setHovered] = useState<boolean>(false);
    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const modals = useModals();

    const openChooseOfferModal = () => {
        modals.openContextModal('chooseOfferType',{innerProps: {}});
    }

    const modifyCreateOffer = () => {
        modals.openContextModal('createOffer',{innerProps: { offer }});
    }

    const deleteOffer = () => {
        if(offer) dispatch({ type: createOfferRemovedDispatchType, payload: offer.offerId })
    }

    const openConfirmDeleteModal = () => openConfirmModal({
        title: 'Are you sure you want to delete this offer ?',
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: () => deleteOffer(),
    });

    const { offerTokenSymbol, buyTokenSymbol } = useCreatedOffer(offer);
    const { t } = useTranslation('modals', { keyPrefix: 'sell' });
    
    return(
        <>
        {
            isCreating ? (
                <Flex 
                    className={clsx(classes.offerContainer, classes.createOffer)} 
                    gap={"sm"}
                    onClick={() => openChooseOfferModal()}
                    p={"sm"}
                >
                    <IconPlus />
                    {t('buttonCreateOffer')}
                </Flex>
            )
            : offer ?
            (
                <Flex 
                    className={clsx(classes.offerContainer, classes.offerCreated)} 
                    direction={"column"}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {   hovered ? (
                            <div className={classes.offerActions}>
                                <ActionIcon
                                    color={'green'}
                                    onClick={() => modifyCreateOffer() }
                                >
                                    <IconEdit size={16} aria-label={'Buy'} />
                                </ActionIcon>
                                <ActionIcon
                                    color={'red'}
                                    onClick={() => openConfirmDeleteModal()}
                                >
                                    <IconTrash size={16} aria-label={'Buy'} />
                                </ActionIcon>
                            </div> 
                        ): undefined 
                    }
                    <Flex direction={"column"} p={"sm"} align={"start"}>
                        <OfferTypeBadge offerType={offer.offerType}/>
                        <Text fw={700}>{offerTokenSymbol ? offerTokenSymbol : <Skeleton height={35} width={"100%"}/>}</Text>
                        <Text fs={"italic"} fw={500} color={"gray"}>{buyTokenSymbol ? buyTokenSymbol : <Skeleton height={35} width={"100%"}/>}</Text>
                    </Flex>
                </Flex>
            )
            : 
            undefined
        }
        </>
    )
}