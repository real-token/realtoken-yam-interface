/* eslint-disable react-hooks/exhaustive-deps */
import { PropertiesToken } from "src/types/PropertiesToken";
import { useProperties } from "./interface/useProperties";

type usePropertiesTokenReturn = {
    propertiesToken: PropertiesToken[] | undefined
    propertiesIsloading: boolean
    getPropertyToken: (address: string) => PropertiesToken | undefined
}

export const usePropertiesToken = (): usePropertiesTokenReturn => {

    const { properties, propertiesAreLoading } = useProperties();

    const getPropertyToken = (address: string): PropertiesToken | undefined => {
        if(!address || !properties) return undefined
        return properties.find(propertyToken => propertyToken.contractAddress.toLocaleLowerCase() == address.toLowerCase())
    }

    return{
        propertiesToken: properties,
        propertiesIsloading: propertiesAreLoading,
        getPropertyToken
    }

}