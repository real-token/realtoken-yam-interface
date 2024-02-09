import { useQuery } from "react-query";
import { useEffect, useMemo, useState } from "react";
import { useRootStore } from "../zustandStore/store";

export const useGetOffers = () => {

    const [initiated, setInitiated] = useState<boolean>(false);

    const [
        chainId,
        account,
        refreshInterface,
      ] = useRootStore((state) => [
        state.chainId,
        state.account,
        state.refreshInterface,
      ]);

    const disableQuery = useMemo(() => {
        return !account || !chainId;
    },[account, chainId]);

    const { refetch } = useQuery({
        queryKey: ['offers'],
        queryFn: () => refreshInterface(),
        enabled: false,
        refetchOnMount: false,
    });

    useEffect(() => {
        if(initiated || disableQuery) return;
        refetch();
        setInitiated(true)
    },[initiated, disableQuery]);

}