import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react"
import { network } from "src/connectors";
import { APIPropertiesToken, PropertiesToken } from "src/types/PropertiesToken";

type usePropertiesTokenReturn = {
    propertiesToken: PropertiesToken[]
}

export const usePropertiesToken = (): usePropertiesTokenReturn => {

    const { chainId } = useWeb3React();
    const [propertiesToken,setPropertiesToken] = useState<PropertiesToken[]>([]);

    const convertNetworkToValue = (chainId: number|undefined): string[] => {
        if(!chainId) return []
        switch(chainId){
            case 1:
                return ["ethereumContract"];
            case 100:
                return ["gnosisContract","xDaiContract"];
            case 5:
                return ["goerliContract"]
            default:
                return [];
        }
    }

    const getPropertiesTokenList = async () => {
        try{
            
            // BYPASS IF NETWORK IS GOERLI / TMP: WAIT FOR API TO BE UPDATED
            if(chainId == 5){
                const properties: PropertiesToken[] = [
                    {
                        uuid: "15777 Ardmore",
                        shortName: "15777 Ardmore",
                        contractAddress: "0x7401F1A495c4d13aF56fd1d880F1aA646FD1017C"
                    },
                    {
                        uuid: "14319 Rosemary",
                        shortName: "14319 Rosemary",
                        contractAddress: "0x50620ab68605C43aD8f29f2EA2Bb98d4931C28CD"
                    },
                    {
                        uuid: "14078 Carlisle",
                        shortName: "14078 Carlisle",
                        contractAddress: "0xF1AAaCdB0E5acd8f725b4f1eB33e4d976bAE87A7"
                    },
                    {
                        uuid: "13895 Saratoga",
                        shortName: "13895 Saratoga",
                        contractAddress: "0x2c30612Fb6dAD2cE58Eb703C261162f1B42B290b"
                    },
                    {
                        uuid: "4380 Beaconsfield",
                        shortName: "4380 Beaconsfield",
                        contractAddress: "0xf9DE16b821545D78295E50d944C9e1fF075Cd969"
                    },
                    {
                        uuid: "17813 Bradford",
                        shortName: "17813 Bradford",
                        contractAddress: "0x8364A90496Be1c47261aca2563845496c91C8d69"
                    },
                    {
                        uuid: "15796 Hartwell",
                        shortName: "15796 Hartwell",
                        contractAddress: "0xB3D3C1bBcEf737204AADb4fA6D90e974bc262197"
                    },
                    {
                        uuid: "9717 Everts",
                        shortName: "9717 Everts",
                        contractAddress: "0x73BdE888664DF8DDfD156B52e6999EEaBAB57C94"
                    },
                    {
                        uuid: "19201 Westphalia",
                        shortName: "19201 Westphalia",
                        contractAddress: "0x830B0e9a5ecf36D0A886D21e1C20043cD2d16515"
                    },
                    {
                        uuid: "19163 Mitchell",
                        shortName: "19163 Mitchell",
                        contractAddress: "0x4Cc53Ee5ef306a95d407321d4B4acc30814C04ee"
                    },
                    {
                        uuid: "4061 Grand",
                        shortName: "4061 Grand",
                        contractAddress: "0xd9e89bFebAe447B42C1Fa85C590716eC8820f737"
                    }
                ]

                setPropertiesToken(properties);
                return;
            }

            const rightChainId: string[] = convertNetworkToValue(chainId)

            const response = await fetch("https://api.realt.community/v1/token");

            if(response.ok){
                const responseJson: APIPropertiesToken[] = await response.json();

                const propertiesToken: PropertiesToken[] = [];
                responseJson.forEach((propertyToken: APIPropertiesToken) => propertiesToken.push({
                    uuid: propertyToken.uuid,
                    shortName: propertyToken.shortName,
                    contractAddress: rightChainId[0] ?? rightChainId[1]
                }));

                setPropertiesToken(propertiesToken);

            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => { getPropertiesTokenList() },[chainId])

    return{
        propertiesToken
    }

}