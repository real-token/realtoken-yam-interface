import { useInterval } from "@mantine/hooks";
import { useWeb3React } from "@web3-react/core";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { ContractsID } from "src/constants";
import { isRefreshedAutoAtom } from "src/states";
import { useContract } from "../useContract";
import { useRefreshOffers } from "./useRefreshOffers";

export const useAutoRefresh = () => {

  const { provider, account } = useWeb3React();
  const { refreshOffers } = useRefreshOffers(false);

  const interval = useInterval(() => refreshOffers(), 60000);
  const isAutoRefreshEnabled = useAtomValue(isRefreshedAutoAtom);

  const realTokenYamUpgradeable = useContract(ContractsID.realTokenYamUpgradeable);

  useEffect(() => {
	  if(realTokenYamUpgradeable && provider && account) refreshOffers();
  }, [realTokenYamUpgradeable]);

  useEffect(() => {
    if(!isAutoRefreshEnabled || !realTokenYamUpgradeable) return;

    refreshOffers();
    isAutoRefreshEnabled ? interval.start() : interval.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realTokenYamUpgradeable,isAutoRefreshEnabled]);

}
