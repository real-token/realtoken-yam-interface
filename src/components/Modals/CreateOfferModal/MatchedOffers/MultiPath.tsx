import { Flex, MantineTheme, createStyles, Text, Button, Checkbox } from "@mantine/core"
import { Offer } from "../../../../types/offer"
import { IconArrowRight } from "@tabler/icons"
import { useMemo } from "react";
import { MultiPathDetailsPopover } from "./MultiPathDetailsPopover";
import { multiPathMultiCurrencyAtom } from "../../../../states";
import { useAtom } from "jotai";
import { getRightAllowBuyTokens } from "../../../../hooks/useAllowedTokens";
import { useWeb3React } from "@web3-react/core";
import React from "react";

const useStyle = createStyles((theme: MantineTheme) => ({
    container: {
        position: 'relative',
        border: `2px solid ${theme.colors.brand[0]}`,
        padding: theme.spacing.md,
        borderRadius: theme.spacing.md
    },
    floatingButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: '10px',
        marginRight: '10px'
    },
    currencyLogo: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        transform: 'translate(40%,40%)'
    }
}));

export interface AveragePrice{
    totalPriceInDollar: number;
    details: { [symbol: string] : number }
}

interface MultiPathProps{
    offers: Offer[]
    amount: number|undefined;
    multiPathAmountFilled: number;
    multiPathAmountFilledPercentage: number;
}
export const MultiPath = ({ offers, amount, multiPathAmountFilledPercentage }: MultiPathProps) => {

    const { chainId } = useWeb3React();
    const { classes } = useStyle();

    const [multiCurrencies,setMultiCurrencies] = useAtom(multiPathMultiCurrencyAtom);

    const averagePrice: AveragePrice = useMemo(() => {
        const averagePrice: AveragePrice = {
            totalPriceInDollar: 0,
            details: {}
        }

        if(!amount) return averagePrice;

        let totalAmount = 0;
        offers.forEach((offer,index) => {
            let numberOfTokenToBuyInOffer = 0;
            if(index != offers.length-1){
                numberOfTokenToBuyInOffer = parseFloat(offer.amount);
            }else{
                // ici on doit calculer combien on prend sur le total vu que c'est le dernier c'est forcément celui dont on prend une partie
                numberOfTokenToBuyInOffer = amount-totalAmount;
            }
            const total = offer.offerPrice ? offer.offerPrice*numberOfTokenToBuyInOffer : 0;
            averagePrice.totalPriceInDollar = averagePrice.totalPriceInDollar+total;
            if(averagePrice.details[offer.buyerTokenName]){
                averagePrice.details[offer.buyerTokenName] = averagePrice.details[offer.buyerTokenName] + total;
            }else{
                averagePrice.details[offer.buyerTokenName] = total;
            }
            
            totalAmount+=parseFloat(offer.amount);
        });
        return averagePrice;

    },[amount, offers]);

    const buy = () => {
        //TODO: finish BUY
        return;
    }

    return(
        <Flex direction={"column"} className={classes.container}>
            <Flex 
                sx={(theme) => ({ 
                    backgroundColor: theme.colors.blue,
                    borderRadius: theme.radius.md,
                    fontWeight: 700,
                    padding: `0 ${theme.spacing.sm}px`,
                    color: "white",
                    justifyContent: 'center'
                })}
                mb={12}
            >
                {"Multi path"}
            </Flex>
            <Checkbox 
                label={"Allow multi currencies"} 
                mb={10}
                checked={multiCurrencies} 
                onChange={(event) => setMultiCurrencies(event.currentTarget.checked)}
            />
            <Text mb={5} weight={700}>{"Best path (offer id):"}</Text>
            <Flex gap={"xs"} mb={12} wrap={"wrap"}>
            {offers && offers.map((offer,index) => {

                console.log(offer.buyerTokenAddress.toLowerCase())
                const Logo = getRightAllowBuyTokens(chainId).find((allowedToken) => allowedToken.contractAddress.toLowerCase() == offer.buyerTokenAddress.toLowerCase())?.logo;

                return(
                <Flex key={`multi-path-${offer.offerId}`} gap={"xs"} align={"center"}>
                    <Flex
                        sx={(theme) => ({
                            display: "flex",
                            position: "relative",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: theme.colors.brand,
                            borderRadius: theme.radius.md,
                            height: "30px",
                            padding: `0 ${10}px`,
                            fontWeight: 700,
                            fontSize: theme.fontSizes.xl
                        })}
                        gap={4}
                    >
                        <Flex className={classes.currencyLogo}>{ Logo ? React.cloneElement(<Logo/>, { width: '18' }) : undefined}</Flex>
                        <Text>{offer.offerId}</Text>
                    </Flex>
                    {index != offers.length-1 ? <IconArrowRight/> : undefined}
                </Flex>
                );
            })}
            </Flex>
            <Flex direction={"column"} gap={5} mb={12}>
                <Text weight={700}>{"Total:"}</Text>
                <MultiPathDetailsPopover averagePrice={averagePrice} />
            </Flex>
            <Flex direction={"column"} gap={5} mb={12}>
                <Text weight={700}>{"Amount filled:"}</Text>
                <Flex>
                    {`${multiPathAmountFilledPercentage*100}%`}
                </Flex>
            </Flex>
            <Flex direction={"column"} gap={5}>
                <Text weight={700}>{"Average buy price/token:"}</Text>
                <Text>{`$ ${amount ? averagePrice?.totalPriceInDollar/amount : 0}`}</Text>
            </Flex>
            <Button className={classes.floatingButton} onClick={() => buy()}>{"Buy"}</Button>
        </Flex>
    )
}