/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { selectProperties, selectPropertiesIsLoading } from "src/store/features/interface/interfaceSelector";
import { PropertiesToken } from "src/types/PropertiesToken";

type usePropertiesTokenReturn = {
    propertiesToken: PropertiesToken[]
    propertiesIsloading: boolean
    getPropertyToken: (address: string) => PropertiesToken | undefined
}

export const usePropertiesToken = (): usePropertiesTokenReturn => {

    const propertiesToken = useSelector(selectProperties);
    const propertiesIsloading = useSelector(selectPropertiesIsLoading)

    const getPropertyToken = (address: string): PropertiesToken | undefined => {
        return propertiesToken.find(propertyToken => propertyToken.contractAddress.toLocaleLowerCase() == address.toLowerCase())
    }

    return{
        propertiesToken,
        propertiesIsloading,
        getPropertyToken
    }

}