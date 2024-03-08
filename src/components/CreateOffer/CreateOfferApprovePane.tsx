import { Flex, Skeleton, Text, Button } from "@mantine/core"
import BigNumber from "bignumber.js";
import classes from "./CreateOfferApprovePane.module.css"
import { useRootStore } from "../../zustandStore/store";
import { useEffect, useMemo, useState } from "react";
import { IconCheck } from "@tabler/icons";
import { getContract } from "@realtoken/realt-commons";
import { Erc20, Erc20ABI } from "../../abis";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ContractsID } from "../../constants";
import { useContract } from "../../hooks";

const checkNeedApprove = (amount: BigNumber, token: string, provider: Web3Provider, account: string, realTokenYamUpgradeable: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const contract = getContract<Erc20>(token, Erc20ABI, provider);
            if(!contract) throw new Error('Contract not found');
    
            const allowance = await contract.allowance(account, realTokenYamUpgradeable);
            resolve(amount.gt(new BigNumber(allowance.toString())));
        }catch(e){
            reject(e);
        }
    });
}

const approveAmount = (amount: BigNumber, token: string, provider: Web3Provider, account: string, realTokenYamUpgradeable: string) => {
    return new Promise<void>(async (resolve, reject) => {
        try{
            const contract = getContract<Erc20>(token, Erc20ABI, provider, account);
            if(!contract) throw new Error('Contract not found');

            console.log(amount.toString(10))

            const tx = await contract.approve(realTokenYamUpgradeable, amount.toString(10));

            tx.wait(1)
                .then(() => resolve())
                .catch((e) => reject(e));
                
        }catch(e){
            reject(e);
        }
    });
}

interface CreateOfferApprovePaneProps{
    token: string;
    amount: BigNumber;
}
export const CreateOfferApprovePane = ({ token, amount }: CreateOfferApprovePaneProps) => {

    const { provider, account } = useWeb3React();

    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

    const [addApproval] = useRootStore(state => [state.addApproval]);

    const [checkIfApproveNeeded, setCheckIfApproveNeeded] = useState<boolean>(true);
    const [needApprove, setNeedApprove] = useState<boolean>(false);
    const getNeedApprove = async () => {
        try{
            if(!provider || !realTokenYamUpgradeable || !account) return;
            setCheckIfApproveNeeded(true);
            const needApprove = await checkNeedApprove(
                amount, 
                token, 
                provider,
                account,
                realTokenYamUpgradeable.address
            );
            addApproval(token, !needApprove);
            setNeedApprove(needApprove);
            setCheckIfApproveNeeded(false);
        }catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        getNeedApprove();
    },[amount]);

    const [isAppproving, setIsApproving] = useState<boolean>(false);
    const approve = async () => {
        try{
            setIsApproving(true);
            if(!provider || !realTokenYamUpgradeable || !account) return;
            await approveAmount(
                amount, 
                token, 
                provider,
                account,
                realTokenYamUpgradeable.address
            );

            addApproval(token, true)

            setIsApproving(false);
            setNeedApprove(false);

        }catch(e){
            // TODO: add notification when error
            console.error(e);
            setIsApproving(false);
        }
    }

    const [properties] = useRootStore(state => [state.properties]);

    const propertie = useMemo(() => {
        return properties.find((prop) => prop.contractAddress.toLowerCase() === token.toLowerCase())
    },[properties]);

    const amountInEther = amount.shiftedBy(-18).toString(10);

    return(
        <Flex
            className={classes.container}
           
            justify={"space-between"}
        >
            <Flex direction={'column'}>
                <Text fw={700}>{propertie ? propertie.shortName : <Skeleton height={35} width={"100%"}/>}</Text>
                <Text fs={"italic"} fw={500} c={"gray"}>{amount ? amountInEther : <Skeleton height={35} width={"100%"}/>}</Text>
            </Flex>
            <Button 
                color={'green'} 
                h={'100%'}
                loading={isAppproving || checkIfApproveNeeded}
                disabled={isAppproving || !needApprove}
                leftSection={!needApprove ? <IconCheck size={18}/> : undefined}
                onClick={() => approve()}
            >
                {needApprove ? 'Approve' : 'Approved'}
            </Button>
        </Flex>
    )
}