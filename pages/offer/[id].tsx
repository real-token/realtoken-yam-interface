import { Flex, Loader, Text } from "@mantine/core";
import { useRouter } from "next/router"
import { FC } from "react"
import { useSelector } from "react-redux";
import { useOffer } from "src/hooks/offers/useOffer";
import { selectOffersIsLoading } from "src/store/features/interface/interfaceSelector";

const ShowOfferPage: FC = () => {

    const router = useRouter();
    const { id } = router.query;

    const offerId: number = parseInt(id as string);

    const offersIsLoading = useSelector(selectOffersIsLoading);
    const { offer } = useOffer(offerId);

    return(
        <>
        {
            offersIsLoading ? (
                <Flex align={"center"} justify={"center"} direction={"column"}>
                    <Loader color={"brand"}/>
                    <Text fw={700}>Offers are loading</Text>
                </Flex>
            )
            : offer ? (
                <Flex>
                    <Text>{offer.offerTokenName}</Text>
                </Flex>
            ):
            (
                <div>Offer doesn't exist :/</div>
            )
        }
        </>
    )

}
export default ShowOfferPage;