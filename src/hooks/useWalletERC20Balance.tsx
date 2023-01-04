import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { FC, useEffect, useState } from "react";
import { Erc20, Erc20ABI } from "src/abis";
import { getContract } from "src/utils";
import { WalletERC20Balance } from "src/components/WalletBalance/WalletERC20Balance";

interface useWalletERC20Balance{
    bigNumberbalance: BigNumber|undefined
    balance: number|undefined
    WalletERC20Balance: any
}

export const useWalletERC20Balance = (
    tokenAddress: string,
    tokenDecimals: number
) : useWalletERC20Balance => {

    const [bigNumberbalance,setBigNumberbalance] = useState<BigNumber|undefined>(undefined);
    const [balance,setBalance] = useState<number|undefined>(undefined);
    const [tokenSymbol,setTokenSymbol] = useState<string|undefined>("");
    const { account, provider } = useWeb3React();
    
    const tokenERC20 = getContract<Erc20>(
        tokenAddress,
        Erc20ABI,
        provider as Web3Provider,
        account,
    )

    const getTokenInfos = async () => {

        if(!account || !tokenERC20) return;

        const balance = new BigNumber((await tokenERC20.balanceOf(account)).toString());

        setBigNumberbalance(balance);
        setBalance(balance ? parseFloat(balance.shiftedBy(-tokenDecimals).toFixed(10).toString()) : undefined)

        const tokenSymbol = await tokenERC20?.symbol();
        setTokenSymbol(tokenSymbol);
    }

    useEffect(() => {
        if(tokenERC20 && !bigNumberbalance) getTokenInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tokenERC20])

    const Component: FC = (): React.ReactElement => <WalletERC20Balance balance={balance} symbol={tokenSymbol}/>

    return{
        WalletERC20Balance: Component,
        bigNumberbalance: bigNumberbalance,
        balance: balance
    }
}