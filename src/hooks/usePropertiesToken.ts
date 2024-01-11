/* eslint-disable react-hooks/exhaustive-deps */
import { PropertiesToken } from "src/types/PropertiesToken";
import { useRootStore } from "../zustandStore/store";

type usePropertiesTokenReturn = {
    propertiesToken: PropertiesToken[]
    propertiesIsloading: boolean
    getPropertyToken: (address: string) => PropertiesToken | undefined
}

export const usePropertiesToken = (): usePropertiesTokenReturn => {

    const [propertiesToken, propertiesAreloading ] = useRootStore((state) => [state.properties, state.propertiesAreLoading])

    const getPropertyToken = (address: string): PropertiesToken | undefined => {
        return propertiesToken.find(propertyToken => propertyToken.contractAddress.toLocaleLowerCase() == address.toLowerCase())
    }

    return{
        propertiesToken,
        propertiesIsloading: propertiesAreloading,
        getPropertyToken
    }

}