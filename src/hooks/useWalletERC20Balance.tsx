import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { FC, useEffect, useState } from "react";
import { Erc20, Erc20ABI } from "src/abis";
import { getContract } from "src/utils";
import { WalletERC20Balance } from "src/components/WalletBalance/WalletERC20Balance";
import { useQuery } from "react-query";

interface TokenInfos{
    balance: BigNumber;
    symbol: string;
    decimals: string;
}

interface UseWalletERC20Balance{
    bigNumberbalance: BigNumber|undefined
    balance: string|undefined
    WalletERC20Balance: any
}

export const useWalletERC20Balance = (
    tokenAddress: string|undefined,
) : UseWalletERC20Balance => {

    const [bigNumberbalance,setBigNumberbalance] = useState<BigNumber|undefined>(undefined);
    const [balance,setBalance] = useState<string|undefined>(undefined);
    const [tokenSymbol,setTokenSymbol] = useState<string|undefined>(undefined);
    const { account, provider } = useWeb3React();

    const contract = getContract<Erc20>(
        tokenAddress ?? "",
        Erc20ABI,
        provider as Web3Provider,
        account,
    )

    const getTokenInfos = async (): Promise<TokenInfos> => {
        return new Promise<TokenInfos>(async (resolove,reject) => {
            try{

                if(!contract || !account) return;
    
                const balance = new BigNumber((await contract.balanceOf(account)).toString());
                const decimals = new BigNumber((await contract.decimals()).toString());
                const tokenSymbol = await contract?.symbol();
    
                resolove({
                    balance: balance,
                    symbol: tokenSymbol ?? "",
                    decimals: decimals.toString() ?? ""
                })
                
            }catch(err){
                console.log("Failed to get wallet balance: ", err);
                reject(err);
            }
        })
    }

    const { data, refetch } = useQuery([tokenAddress], getTokenInfos, { enabled: (!!provider && !!tokenAddress && !!account)}
    );

    useEffect(() => {
        if(tokenAddress){
            setBigNumberbalance(undefined);
            setTokenSymbol(undefined);
            setBalance(undefined);

            refetch();
        }
    },[tokenAddress])

    useEffect(() => {
        if(data){
            setBigNumberbalance(data.balance);
            setTokenSymbol(data.symbol);
            setBalance(data.balance.shiftedBy(-data.decimals).toFixed(10).toString());
        }
    },[data])

    const Component: FC = (): React.ReactElement => <WalletERC20Balance balance={balance} symbol={tokenSymbol}/>

    return{
        WalletERC20Balance: Component,
        bigNumberbalance: bigNumberbalance,
        balance: balance
    }
}