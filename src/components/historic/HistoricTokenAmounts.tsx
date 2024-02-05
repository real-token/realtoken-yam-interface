import { Flex, Text, Skeleton, Image } from "@mantine/core";
import { Historic } from "../../types/historic";
import { HistoricTokenInfos } from "./HistoricTokenInfos";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons";

interface HistoricTokenSummaryProps{
    historic: Historic;
}
export const HistoricTokenSummary = ({ historic }: HistoricTokenSummaryProps) => {

    const buyerToken = historic.offer.buyerToken;
    const offerToken = historic.offer.offerToken;

    return(
        <Flex direction={'column'} gap={4}>
            <HistoricTokenInfos token={buyerToken} historic={historic}>
                {({ token, iconUrl, isPropertyToken, property, name }) => (
                    <Flex gap={'sm'} align={'center'}>
                        <IconArrowUpRight color={'red'}/>
                        {token ? <Text>{ isPropertyToken ? property?.shortName : name}</Text> : <Skeleton width={100} />}
                        <Image src={iconUrl} h={20} />
                    </Flex>
                )}
            </HistoricTokenInfos>
            <HistoricTokenInfos token={offerToken} historic={historic}>
                {({ token, iconUrl, isPropertyToken, property, name }) => (
                    <Flex gap={'sm'} align={'center'}>
                        <IconArrowDownRight color={'green'}/>
                        {token ? <Text>{ isPropertyToken ? property?.shortName : name}</Text> : <Skeleton width={100} />}
                        <Image src={iconUrl} h={20} />
                    </Flex>
                )}
            </HistoricTokenInfos>
        </Flex>
    )
}