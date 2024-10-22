import { Flex, Skeleton, Text, Button } from "@mantine/core"
import BigNumber from "bignumber.js";
import classes from "./CreateOfferApprovePane.module.css"
import { useRootStore } from "../../zustandStore/store";
import { useMemo } from "react";
import { IconCheck } from "@tabler/icons";
import { getContract } from "@realtoken/realt-commons";
import { Erc20, Erc20ABI } from "../../abis";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ContractsID } from "../../constants";
import { useContract } from "../../hooks";
import { Approves } from "../../hooks/getBatchApprove";
import { useMutation, useQuery } from "react-query";
import { usePropertiesToken } from "../../hooks/usePropertiesToken";
import { useAllowedTokens } from "../../hooks/useAllowedTokens";

const checkNeedApprove = (amount: BigNumber, tokenAddress: string, provider: Web3Provider, account: string, realTokenYamUpgradeable: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const contract = getContract<Erc20>(tokenAddress, Erc20ABI, provider);
            if(!contract) throw new Error('Contract not found');
            const allowance = await contract.allowance(account, realTokenYamUpgradeable);
            console.log(allowance.toString(), amount.toString(10));
            console.log(new BigNumber(allowance.toString()).lt(amount).toString());
            resolve(new BigNumber(allowance.toString()).lt(amount));
        }catch(e){
            reject(e);
        }
    });
}

const approveAmount = (amount: BigNumber, tokenAddress: string, provider: Web3Provider, account: string, realTokenYamUpgradeable: string) => {
    return new Promise<void>(async (resolve, reject) => {
        try{
            const contract = getContract<Erc20>(tokenAddress, Erc20ABI, provider, account);
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
    tokenAddress: string;
    approval: Approves;
}
export const CreateOfferApprovePane = ({ tokenAddress, approval }: CreateOfferApprovePaneProps) => {

    const { provider, account } = useWeb3React();

    const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

    const { propertiesToken } = usePropertiesToken();
    const { allowedTokens } = useAllowedTokens();

    const token = useMemo(() => {
        if(!propertiesToken || !allowedTokens) return 'Unknown';
        const token = propertiesToken?.find((token) => token.contractAddress.toLowerCase() === tokenAddress.toLowerCase());
        const allowedToken = allowedTokens?.find((token) => token.contractAddress.toLowerCase() === tokenAddress.toLowerCase());
        return token ? token.shortName : allowedToken ? allowedToken.name : 'Unknown';
    },[propertiesToken, allowedTokens, tokenAddress]);

    const [addApproval] = useRootStore(state => [state.addApproval]);

    const { data: needApprove, isLoading: checkIfApproveNeeded, refetch } = useQuery({
        queryKey: ['need-approve', tokenAddress],
        enabled: !!approval && !!provider && !!realTokenYamUpgradeable && !!account,
        queryFn: async () => {
            if(!provider || !realTokenYamUpgradeable || !account || !approval) return false;

            const needApprove = await checkNeedApprove(
                new BigNumber(approval.amount), 
                tokenAddress, 
                provider,
                account,
                realTokenYamUpgradeable.address
            );
            console.log('needApprove: ',needApprove);
            addApproval(tokenAddress, !needApprove);
            return needApprove;
        }
    })

    const { mutate: approve, isLoading: isApproving } = useMutation({
        mutationFn: async () => {
            if(!provider || !realTokenYamUpgradeable || !account || !approval) return;
            await approveAmount(
                new BigNumber(approval.amount), 
                tokenAddress, 
                provider,
                account,
                realTokenYamUpgradeable.address
            );
            addApproval(tokenAddress, true);
            refetch();
        },
        onError: (e) => {
            console.error(e);
        }
    })

    const amount = useMemo(() => {
        return new BigNumber(approval.amount).shiftedBy(-approval.decimals).toFixed(0);
    },[approval]);

    return(
        <Flex
            className={classes.container}
            justify={"space-between"}
        >
            <Flex direction={'column'}>
                <Text fw={700}>{token ? token : <Skeleton height={35} width={"100%"}/>}</Text>
                <Text fs={"italic"} fw={500} c={"gray"}>{amount ? amount : <Skeleton height={35} width={"100%"}/>}</Text>
            </Flex>
            <Button 
                color={'green'} 
                h={'100%'}
                loading={isApproving || checkIfApproveNeeded}
                disabled={isApproving || !needApprove}
                leftSection={!needApprove ? <IconCheck size={18}/> : undefined}
                onClick={() => approve()}
            >
                {needApprove ? 'Approve' : 'Approved'}
            </Button>
        </Flex>
    )
}