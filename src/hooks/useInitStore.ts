import { useEffect } from "react";
import { useRefreshOffers } from "./offers/useRefreshOffers";
import { useWeb3React } from "@web3-react/core";
import { useRootStore } from "../zustandStore/store";
import { useAutoRefresh } from "./offers/useAutoRefresh";
import { useGetOffers } from "./useGetOffers";

export default function useInitStore(){

    const { account, chainId } = useWeb3React();
    const [setAccount, setChainId] = useRootStore(state => [state.setAccount, state.setChainId]);

    // INIT REDUX STORE HERE
    useGetOffers();
    useAutoRefresh();

    useEffect(() => {
        if(account) setAccount(account)
    },[account]);

    useEffect(() => {
        if(chainId) setChainId(chainId)
    },[chainId])

}