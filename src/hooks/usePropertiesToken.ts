import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react"
import { APIPropertiesToken, PropertiesToken } from "src/types/PropertiesToken";

type usePropertiesTokenReturn = {
    propertiesToken: PropertiesToken[]
}

export const usePropertiesToken = (): usePropertiesTokenReturn => {

    const { chainId } = useWeb3React();
    const [propertiesToken,setPropertiesToken] = useState<PropertiesToken[]>([]);

    const getContractAddressFromChainId = (propertyToken: APIPropertiesToken): string|undefined => {
        switch(chainId){
            case 1:
                propertyToken.ethereumContract;
            case 100:
                return propertyToken.gnosisContract ? propertyToken.gnosisContract : propertyToken.xDaiContract;
            // case 5:
            //     return propertyToken.goerliContract
            default:
                return undefined;
        }
    }

    const getPropertiesTokenList = async () => {
        try{

            if(!chainId) setPropertiesToken([]);
            
            // BYPASS IF NETWORK IS GOERLI / TMP => WAIT FOR API TO BE UPDATED
            if(chainId == 5){

                const properties: PropertiesToken[] = [
                    {
                        uuid: "15777 Ardmore",
                        shortName: "15777 Ardmore",
                        fullName: "RealToken S 15777 Ardmore St Detroit M",
                        contractAddress: "0x7401F1A495c4d13aF56fd1d880F1aA646FD1017C",
                        officialPrice: 48.37
                    },
                    {
                        uuid: "14319 Rosemary",
                        shortName: "14319 Rosemary",
                        fullName: "RealToken S 14319 Rosemary St Detroit MI",
                        contractAddress: "0x50620ab68605C43aD8f29f2EA2Bb98d4931C28CD",
                        officialPrice: 49.69
                    },
                    {
                        uuid: "14078 Carlisle",
                        shortName: "14078 Carlisle",
                        fullName: "RealToken S 14078 Carlisle St Detroit MI",
                        contractAddress: "0xF1AAaCdB0E5acd8f725b4f1eB33e4d976bAE87A7",
                        officialPrice: 54.25
                    },
                    {
                        uuid: "13895 Saratoga",
                        shortName: "13895 Saratoga",
                        fullName: "RealToken S 13895 Saratoga St Detroit MI",
                        contractAddress: "0x2c30612Fb6dAD2cE58Eb703C261162f1B42B290b",
                        officialPrice: 58.5
                    },
                    {
                        uuid: "4380 Beaconsfield",
                        shortName: "4380 Beaconsfield",
                        fullName: "RealToken S 4380 Beaconsfield St Detroit MI",
                        contractAddress: "0xf9DE16b821545D78295E50d944C9e1fF075Cd969",
                        officialPrice: 53.88
                    },
                    {
                        uuid: "17813 Bradford",
                        shortName: "17813 Bradford",
                        fullName: "RealToken S 17813 Bradford St Detroit MI",
                        contractAddress: "0x8364A90496Be1c47261aca2563845496c91C8d69",
                        officialPrice: 51.33
                    },
                    {
                        uuid: "15796 Hartwell",
                        shortName: "15796 Hartwell",
                        fullName: "RealToken S 15796 Hartwell St Detroit MI",
                        contractAddress: "0xB3D3C1bBcEf737204AADb4fA6D90e974bc262197",
                        officialPrice: 53.04
                    },
                    {
                        uuid: "9717 Everts",
                        shortName: "9717 Everts",
                        fullName: "RealToken S 9717 Everts St Detroit MI",
                        contractAddress: "0x73BdE888664DF8DDfD156B52e6999EEaBAB57C94",
                        officialPrice: 50.5
                    },
                    {
                        uuid: "19201 Westphalia",
                        shortName: "19201 Westphalia",
                        fullName: "RealToken S 19201 Westphalia St Detroit MI",
                        contractAddress: "0x830B0e9a5ecf36D0A886D21e1C20043cD2d16515",
                        officialPrice: 52.17
                    },
                    {
                        uuid: "19163 Mitchell",
                        shortName: "19163 Mitchell",
                        fullName: "RealToken S 19163 Mitchell St Detroit MI",
                        contractAddress: "0x4Cc53Ee5ef306a95d407321d4B4acc30814C04ee",
                        officialPrice: 56.33
                    },
                    {
                        uuid: "4061 Grand",
                        shortName: "4061 Grand",
                        fullName: "RealToken S 4061 Grand St Detroit MI",
                        contractAddress: "0xd9e89bFebAe447B42C1Fa85C590716eC8820f737",
                        officialPrice: 71.11
                    }
                ]

                setPropertiesToken(properties);
                return;
            }

            const response = await fetch("https://api.realt.community/v1/token");

            if(response.ok){
                const responseJson: APIPropertiesToken[] = await response.json();
                const propertiesToken: PropertiesToken[] = [];
                responseJson.forEach((propertyToken: APIPropertiesToken) => {
                    const contractAddress = getContractAddressFromChainId(propertyToken);
                    if(contractAddress){
                        propertiesToken.push({
                            uuid: propertyToken.uuid,
                            shortName: propertyToken.shortName,
                            fullName: propertyToken.fullName,
                            contractAddress: contractAddress,
                            officialPrice: propertyToken.tokenPrice
                        })
                    }
                    
                });
                setPropertiesToken(propertiesToken);
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => { if(chainId) getPropertiesTokenList() },[chainId])

    return{
        propertiesToken
    }

}