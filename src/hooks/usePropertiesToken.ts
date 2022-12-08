import { useEffect, useState } from "react"
import { APIPropertiesToken, PropertiesToken } from "src/types/PropertiesToken";

type usePropertiesTokenReturn = {
    propertiesToken: PropertiesToken[]
}

export const usePropertiesToken = (): usePropertiesTokenReturn => {

    const [propertiesToken,setPropertiesToken] = useState<PropertiesToken[]>([]);

    const getPropertiesTokenList = async () => {
        try{
            
            const response = await fetch("https://api.realt.community/v1/token");

            if(response.ok){
                const responseJson: APIPropertiesToken[] = await response.json();

                const propertiesToken: PropertiesToken[] = [];
                responseJson.forEach((propertyToken: APIPropertiesToken) => propertiesToken.push({
                    uuid: propertyToken.uuid,
                    shortName: propertyToken.shortName,
                    contractAddress: propertyToken.ethereumContract ?? propertyToken.gnosisContract ?? propertyToken.xDaiContract
                }));

                console.log(propertiesToken)

                setPropertiesToken(propertiesToken);

            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => { getPropertiesTokenList() },[])

    return{
        propertiesToken
    }

}