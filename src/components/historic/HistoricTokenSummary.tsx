import { Flex, Text, Skeleton, Image } from "@mantine/core";
import { Historic } from "../../types/historic";
import { HistoricTokenInfos } from "./HistoricTokenInfos";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons";
import { OFFER_TYPE } from "../../types/offer";

interface HistoricTokenSummaryProps{
    historic: Historic;
}
export const HistoricTokenSummary = ({ historic }: HistoricTokenSummaryProps) => {

    const buyerToken = historic.offer.buyerToken;
    const offerToken = historic.offer.offerToken;

    const outQuantity = historic.type == OFFER_TYPE.BUY ? parseFloat(historic.quantity)*parseFloat(historic.price) : parseFloat(historic.quantity);
    const inQuantity = historic.type == OFFER_TYPE.BUY ? parseFloat(historic.quantity) : parseFloat(historic.quantity)*parseFloat(historic.price);

    if(historic.purchaseId == "0x20510f991a3c1120610c2cd1b5db98d6999c297e6fdd4ace744fc5ba53876686"){
        console.log(historic)
    }

    return(
        <Flex direction={'column'} gap={4}>
            <HistoricTokenInfos token={buyerToken} historic={historic}>
                {({ token, iconUrl, isPropertyToken, property, name }) => (
                    <Flex gap={'sm'} align={'center'}>
                        <IconArrowUpRight color={'red'}/>
                        {token ? (
                            <Flex gap={4}>
                                <Text fw={700}>{outQuantity}</Text>
                                <Text>{isPropertyToken ? property?.shortName : name}</Text>
                            </Flex>
                        ) : <Skeleton width={100} />}
                        <Image src={iconUrl} h={20} />
                    </Flex>
                )}
            </HistoricTokenInfos>
            <HistoricTokenInfos token={offerToken} historic={historic}>
                {({ token, iconUrl, isPropertyToken, property, name }) => (
                    <Flex gap={'sm'} align={'center'}>
                        <IconArrowDownRight color={'green'}/>
                        {token ? (
                            <Flex gap={4}>
                                <Text fw={700}>{inQuantity}</Text>
                                <Text>{isPropertyToken ? property?.shortName : name}</Text>
                            </Flex>
                        ) : <Skeleton width={100} />}
                        <Image src={iconUrl} h={20} />
                    </Flex>
                )}
            </HistoricTokenInfos>
        </Flex>
    )
}