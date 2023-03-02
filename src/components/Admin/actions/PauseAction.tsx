import { Checkbox, Flex, Skeleton, Text } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ContractsID, NOTIFICATIONS, NotificationsID } from "src/constants";
import { useActiveChain, useContract } from "src/hooks";
import { Action } from "../Action"

export const PauseAction = () => {

    const [isPaused,setIsPaused] = useState<boolean>(false);
    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

    const getContratPauseStatus = () => realTokenYamUpgradeable ? realTokenYamUpgradeable?.paused() : false;

    const { data, isLoading } = useQuery(["contractPaused"],getContratPauseStatus,{ enabled: !!realTokenYamUpgradeable });
    useEffect(() => { if(data) setIsPaused(data) },[data]);

    const activeChain = useActiveChain();

    const changeStatus = async () => {

        try{

            if(!realTokenYamUpgradeable) return;

            let tx;
            if(isPaused){
                tx = await realTokenYamUpgradeable.unpause();
            }else{
                tx = await realTokenYamUpgradeable.pause();
            }

            const notificationPayload = {
                key: tx.hash,
                href: `${activeChain?.blockExplorerUrl}tx/${tx.hash}`,
                hash: tx.hash,
            };

            //TODO: add translation
            showNotification(
                NOTIFICATIONS[NotificationsID.createOfferLoading](
                notificationPayload
                )
            );

            tx
            .wait()
            .then(({ status }) => {
                updateNotification(
                    //TODO: add translation
                    NOTIFICATIONS[
                        status === 1
                            ? NotificationsID.createOfferSuccess
                            : NotificationsID.createOfferError
                    ](notificationPayload)
                );

                if(status == 1){
                    setIsPaused(!isPaused);
                } 
            }
                
            );

        }catch(err){
            console.log(err);
        }

    }

    return(
        <Action title={"Pause contract"}>
            <Flex align={"center"} gap={6}>
                { isLoading ? <Skeleton width={75} height={15}/> : 
                <Checkbox
                    label={"Paused"}
                    color={"brand"}
                    checked={isPaused}
                    onChange={() => changeStatus()}
                />
                }
            </Flex>
        </Action>
    )
}