import { useMemo } from "react";
import { PropertiesToken } from "src/types";
import { usePropertiesToken } from "./usePropertiesToken";

type UsePropertyToken = (
    propertyAdress: string
) => {
    propertyToken: PropertiesToken|undefined
}
export const usePropertyToken: UsePropertyToken = (propertyAdress: string) => {

    const { getPropertyToken } = usePropertiesToken();

    const propertyToken: PropertiesToken|undefined = useMemo(() => {
        if(!getPropertyToken || !propertyAdress) return undefined;
        return getPropertyToken(propertyAdress);
    },[getPropertyToken, propertyAdress]);

    return{
        propertyToken
    }
}