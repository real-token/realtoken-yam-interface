import { ActionIcon } from "@mantine/core";
import { IconEye } from "@tabler/icons";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Offer } from "src/types/offer/Offer";
import { selectOffersIsLoading } from "src/store/features/interface/interfaceSelector";
import { openInNewTab } from "src/utils/window";
interface ShowOfferActionProps{
    offer: Offer
    className?: string;
}
export const ShowOfferAction: FC<ShowOfferActionProps> = ({ offer, className }) => {

    const offersIsLoading = useSelector(selectOffersIsLoading);

    return(
        <>
        {
            !offersIsLoading ? (
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