import { Button, createStyles, Divider, Flex } from "@mantine/core"
import { showNotification, updateNotification } from "@mantine/notifications";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CoinBridgeToken, coinBridgeTokenABI, Erc20, Erc20ABI } from "src/abis";
import { ContractsID, NOTIFICATIONS, NotificationsID } from "src/constants";
import { useActiveChain, useContract } from "src/hooks";
import { useRefreshOffers } from "src/hooks/offers/useRefreshOffers";
import { useAppDispatch, useAppSelector } from "src/hooks/react-hooks";
import { selectCreateOffers } from "src/store/features/createOffers/createOffersSelector";
import { createOfferResetDispatchType } from "src/store/features/createOffers/createOffersSlice";
import { CreatedOffer } from "src/types/offer/CreatedOffer";
import { getContract } from "src/utils";
import { CreateOfferPane } from "./CreateOfferPane";
import { BigNumber as BigN } from "ethers";

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

    const [loading,setLoading] = useState<boolean>(false);

    const { refreshOffers } = useRefreshOffers(false);

    const { classes } = useStyles();
    const offers = useAppSelector(selectCreateOffers);

    const { t } = useTranslation('modals', { keyPrefix: 'sell' });

    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);
    const { account, provider } = useWeb3React();
    const activeChain = useActiveChain();

    const dispatch = useAppDispatch();

    const createOffers = async () => {

        try{

            if(!account || !provider || !realTokenYamUpgradeable) return;

            setLoading(true);

            const _offerTokens = [];
            const _buyerTokens = [];
            const _buyers = [];
            const _prices = [];
            const _amounts = [];

            for await(const createdOffer of offers){

                if(!createdOffer.amount || !createdOffer.price) return;

                const offerToken = getContract<CoinBridgeToken>(
                    createdOffer.offerTokenAddress,
                    coinBridgeTokenABI,
                    provider,
                    account
                );
                const buyerToken = getContract<Erc20>(
                    createdOffer.buyerTokenAddress,
                    Erc20ABI,
                    provider,
                    account
                    );

                const offerTokenDecimals = await offerToken?.decimals();
                const buyerTokenDecimals = await buyerToken?.decimals();

                if (!offerToken) {
                    console.log('offerToken not found');
                    return;
                }

                BigNumber.set({EXPONENTIAL_AT: 25});

                const amountInWei = new BigNumber(parseInt(new BigNumber(createdOffer.amount.toString()).shiftedBy(Number(offerTokenDecimals)).toString()));
                const priceInWei = new BigNumber(parseInt(new BigNumber(createdOffer.price.toString()).shiftedBy(Number(buyerTokenDecimals)).toString()));

                console.log(priceInWei)

                _offerTokens.push(createdOffer.offerTokenAddress);
                _buyerTokens.push(createdOffer.buyerTokenAddress);
                _buyers.push(createdOffer.buyerAddress);
                _prices.push(priceInWei.toString());
                _amounts.push(amountInWei.toString());

            }

            console.log(_offerTokens, _buyerTokens, _buyers, _prices, _amounts)

            const createBatchOffersTx = await realTokenYamUpgradeable.createOfferBatch(_offerTokens,_buyerTokens,_buyers,_prices,_amounts);

            const notificationPayload = {
                key: createBatchOffersTx.hash,
                href: `${activeChain?.blockExplorerUrl}tx/${createBatchOffersTx.hash}`,
                hash: createBatchOffersTx.hash,
            };

            showNotification(
                NOTIFICATIONS[NotificationsID.createOfferLoading](
                notificationPayload
                )
            );

            createBatchOffersTx
                .wait()
                .then(({ status }) => {
                    updateNotification(
                        NOTIFICATIONS[
                            status === 1
                                ? NotificationsID.createOfferSuccess
                                : NotificationsID.createOfferError
                        ](notificationPayload)
                    );

                    if(status == 1){
                        dispatch({ type: createOfferResetDispatchType });
                        refreshOffers();
                    } 
                    setLoading(false);
                }
                
            );

        }catch(err){
            console.log('Error when sending createBatchOffer tx: ', err);
            setLoading(false);
        }

    }

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
            <Button disabled={offers.length == 0 || loading} onClick={() => createOffers()} loading={loading}>
                { offers.length == 0 ? t('buttonCreateOffer') : t('buttonCreateOfferWithNumber', {nbr: offers.length}) }
            </Button>
        </Flex>
    )
}