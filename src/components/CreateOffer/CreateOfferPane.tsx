import { ActionIcon, clsx, createStyles, Flex, Text } from "@mantine/core"
import { openConfirmModal, useModals } from "@mantine/modals"
import { ConfirmModal } from "@mantine/modals/lib/ConfirmModal"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons"
import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/hooks/react-hooks"
import { useCreatedOffer } from "src/hooks/useCreatedOffer"
import { selectCreateOffers } from "src/store/features/createOffers/createOffersSelector"
import { createOfferRemovedDispatchType } from "src/store/features/createOffers/createOffersSlice"
import { CreatedOffer } from "src/types/Offer/CreatedOffer"
import { hexToRgb } from "src/utils/color"

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

    const [hovered,setHovered] = useState<boolean>(true);
    const { classes } = useStyles();
    const dispatch = useAppDispatch()

    const modals = useModals();

    // TODO: quand click sur une offre déjà créer -> modification (on ouvre la modal en lui passant l'offre du store redux)
    // TODO: quand souris par dessus: modification ou supression 

    const openCreateOfferModal = () => {
        modals.openContextModal('createOffer',{innerProps: {}});
    }

    const deleteOffer = () => {
        if(offer) dispatch({ type: createOfferRemovedDispatchType, payload: offer.offerId })
    }

    const openModal = () => openConfirmModal({
        title: 'Are you sure you want to delete this offer ?',
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: () => deleteOffer(),
      });
    

    const { offerTokenSymbol, buyTokenSymbol } = useCreatedOffer(offer)
    
    return(
        <>
        {/* <ConfirmModal 
            onConfirm={() => deleteOffer()}
        /> */}
        {
            isCreating ? (
                <Flex 
                    className={clsx(classes.offerContainer, classes.createOffer)} 
                    gap={"sm"}
                    onClick={() => openCreateOfferModal()}
                    p={"sm"}
                >
                    <IconPlus />
                    {"Add new offer"}
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
                    { hovered ? (
                        <div className={classes.offerActions}>
                            <ActionIcon
                                color={'green'}
                                // onClick={() => account ? onOpenBuyModal(buyOffer) : onOpenWalletModal() }
                            >
                                <IconEdit size={16} aria-label={'Buy'} />
                            </ActionIcon>
                            <ActionIcon
                                color={'red'}
                                onClick={() => openModal()}
                            >
                                <IconTrash size={16} aria-label={'Buy'} />
                            </ActionIcon>
                        </div> 
                    ): undefined }
                    <Flex direction={"column"} p={"sm"}>
                        <Text fw={700}>{offerTokenSymbol}</Text>
                        <Text fs={"italic"} fw={500} color={"gray"}>{buyTokenSymbol}</Text>
                    </Flex>
                </Flex>
            )
            : 
            undefined
        }
        </>
    )
}