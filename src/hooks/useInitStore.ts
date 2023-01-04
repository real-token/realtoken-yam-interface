import { useEffect } from "react";
import { useAppDispatch } from "./react-hooks";
import { usePropertiesToken } from "./usePropertiesToken";
import { useRefreshOffers } from "./offers/useRefreshOffers";
import { useWeb3React } from "@web3-react/core";
import { addressChangedDispatchType } from "src/store/features/settings/settingsSlice";
import { useAutoRefresh } from "./offers/useAutoRefresh";

export default function useInitStore(){

    const dispatch = useAppDispatch();
    const { account } = useWeb3React();

    // INIT REDUX STORE HERE
    useRefreshOffers(true);
    usePropertiesToken(true);

    useAutoRefresh();

    useEffect(() => {
        if(account) dispatch({ type: addressChangedDispatchType, payload: account })
    },[account])

}