import { ActionIcon } from "@mantine/core";
import { IconEye } from "@tabler/icons";
import { FC } from "react";
import { Offer } from "src/types/offer/Offer";
import { openInNewTab } from "src/utils/window";
import { useRootStore } from "../../../zustandStore/store";
interface ShowOfferActionProps{
    offer: Offer
    className?: string;
}
export const ShowOfferAction: FC<ShowOfferActionProps> = ({ offer, className }) => {

    const offersAreLoading = useRootStore((state) => state.offersAreLoading);

    return(
        <>
        {
            !offersAreLoading ? (
                <ActionIcon
                    color={'brand'}
                    onClick={() => openInNewTab(`/offer/${offer.offerId}`)}
                    className={className}
                >
                    <IconEye size={16} aria-label={'Show Offer'} />
                </ActionIcon>
            )
            : undefined
        }
        </>
    )
}