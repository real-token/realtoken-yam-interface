import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRootStore } from "../zustandStore/store";

export default function useInitStore(){

    const { account, chainId } = useWeb3React();
    const [
        setAccount, 
        setChainId, 
        currentChainId, 
        currentAccount
    ] = useRootStore(state => [
        state.setAccount, 
        state.setChainId, 
        state.chainId, 
        state.account
    ]);

    useEffect(() => {
        if(account && currentAccount !== account){
            setAccount(account);
            console.log("account", account)
        }
    },[account, currentAccount]);

    useEffect(() => {
        if(chainId && currentChainId !== chainId){
            setChainId(chainId) 
            console.log("chainId", chainId)
        }
    },[chainId, currentChainId])

}