import { useMemo } from "react";
import { usePrices } from "./usePrices";
import { useProperties } from "./useProperties";
import { useWlProperties } from "./useWlProperties";
import { useOffers } from "./useOffers";

type UseInterfaceLoading = () => boolean;
export const useInterfaceLoading: UseInterfaceLoading = () => {

    const { propertiesAreLoading } = useProperties();
    const { pricesAreLoading } = usePrices();
    const { wlPropertiesAreLoading } = useWlProperties();
    const { offersAreLoading } = useOffers();

    return useMemo(() => 
        propertiesAreLoading || pricesAreLoading || wlPropertiesAreLoading || offersAreLoading, 
    [propertiesAreLoading, pricesAreLoading, wlPropertiesAreLoading, offersAreLoading]);
}