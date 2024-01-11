import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { usePropertiesToken } from "./usePropertiesToken";
import { useRootStore } from "../zustandStore/store";

export const useGetOffers = () => {

    const { account, provider } = useWeb3React();
    const { propertiesToken, propertiesIsloading } = usePropertiesToken();

    const [currentChainId, setCurrentChainId] = useState<number>(1);
    const [initiated, setInitiated] = useState<boolean>(false);

    const [
        chainId,
        wlProperties,
        wlPropertiesAreLoading,
        fetchOffers,
        askForRefresh,
        setAskForRefresh
      ] = useRootStore((state) => [
        state.chainId,
        state.wlProperties,
        state.wlPropertiesAreLoading,
        state.fetchOffers,
        state.askForRefresh,
        state.setAskForRefresh
      ]);

    const disableQuery = useMemo(() => {
        return !provider || 
          !account || 
          !chainId || 
          !propertiesToken || 
          propertiesToken.length == 0 || 
          propertiesIsloading ||
          wlPropertiesAreLoading || 
          wlProperties == undefined;
    },[provider, account, chainId, propertiesToken, propertiesIsloading, wlPropertiesAreLoading, wlProperties]);

    const { refetch } = useQuery({
        queryKey: ['offers'],
        // @ts-ignore
        queryFn: () => fetchOffers(provider, account, chainId, propertiesToken, wlProperties),
        onSuccess: () => {
          setAskForRefresh(false);
        },
        enabled: false,
        refetchOnMount: false,
    });

    useEffect(() => {
      if(!askForRefresh) return;
      refetch();
    },[askForRefresh])

    useEffect(() => {
        if(currentChainId == chainId) return;
        refetch();
        setCurrentChainId(chainId);
    }, [chainId, currentChainId]);

    useEffect(() => {
        if(initiated || disableQuery) return;
        refetch();
        setInitiated(true)
    },[initiated, disableQuery]);

}