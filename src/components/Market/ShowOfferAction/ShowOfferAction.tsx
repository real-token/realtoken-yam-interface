import { ActionIcon } from "@mantine/core";
import { IconEye } from "@tabler/icons";
import { useRouter } from "next/router";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Offer } from "src/types/Offer";
import { selectOffersIsLoading } from "src/store/features/interface/interfaceSelector";
interface ShowOfferActionProps{
    offer: Offer
    className?: string;
}
export const ShowOfferAction: FC<ShowOfferActionProps> = ({ offer, className }) => {

    const router = useRouter();
    const offersIsLoading = useSelector(selectOffersIsLoading);

    return(
        <>
        {
            !offersIsLoading ? (
                <ActionIcon
                    color={'brand'}
                    onClick={() => router.push(`/offer/${offer.offerId}`)}
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