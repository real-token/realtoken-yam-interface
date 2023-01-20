/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectProperties, selectPropertiesIsLoading } from "src/store/features/interface/interfaceSelector";
import { chainPropertiesChangedDispatchType, fetchProperties } from "src/store/features/interface/interfaceSlice";
import { APIPropertiesToken, PropertiesToken, ShortProperty } from "src/types/PropertiesToken";
import { getWhitelistedProperties } from "src/utils/properties";
import { useAppDispatch } from "./react-hooks";
import { useQuery } from "react-query";

type usePropertiesTokenReturn = {
    propertiesToken: PropertiesToken[]
    propertiesIsloading: boolean
    getPropertyToken: (address: string) => PropertiesToken | undefined
}

export const usePropertiesToken = (refreshOnMount: boolean): usePropertiesTokenReturn => {

    const { chainId } = useWeb3React();
    const [propertiesToken,setPropertiesToken] = useState<PropertiesToken[]>([]);
    const properties = useSelector(selectProperties);
    const propertiesIsloading = useSelector(selectPropertiesIsLoading)
    const dispatch = useAppDispatch();

    const { isLoading, data: whitelistedTokens } = useQuery(["whitelistedTokens", chainId], getWhitelistedProperties, { enabled: !!chainId });

    const refreshProperties = () => {
        dispatch(fetchProperties());
    }

    useEffect(() => {
        if(refreshOnMount) refreshProperties();
    },[refreshOnMount])

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
        if(!chainId || !whitelistedTokens) return;
        try{

            setPropertiesToken([])

            const propertiesNonFiltered: PropertiesToken[] = [];
            
            // TODO: BYPASS IF NETWORK IS GOERLI / TMP => WAIT FOR API TO BE UPDATED
            if(chainId == 5){

                const propertiesGoerli: PropertiesToken[] = [
                    {
                        uuid: "15777 Ardmore",
                        shortName: "15777 Ardmore",
                        fullName: "RealToken S 15777 Ardmore St Detroit M",
                        contractAddress: "0x7401F1A495c4d13aF56fd1d880F1aA646FD1017C",
                        officialPrice: 48.37,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "14319 Rosemary",
                        shortName: "14319 Rosemary",
                        fullName: "RealToken S 14319 Rosemary St Detroit MI",
                        contractAddress: "0x50620ab68605C43aD8f29f2EA2Bb98d4931C28CD",
                        officialPrice: 49.69,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "14078 Carlisle",
                        shortName: "14078 Carlisle",
                        fullName: "RealToken S 14078 Carlisle St Detroit MI",
                        contractAddress: "0xF1AAaCdB0E5acd8f725b4f1eB33e4d976bAE87A7",
                        officialPrice: 54.25,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "13895 Saratoga",
                        shortName: "13895 Saratoga",
                        fullName: "RealToken S 13895 Saratoga St Detroit MI",
                        contractAddress: "0x2c30612Fb6dAD2cE58Eb703C261162f1B42B290b",
                        officialPrice: 58.5,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "4380 Beaconsfield",
                        shortName: "4380 Beaconsfield",
                        fullName: "RealToken S 4380 Beaconsfield St Detroit MI",
                        contractAddress: "0xf9DE16b821545D78295E50d944C9e1fF075Cd969",
                        officialPrice: 53.88,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "17813 Bradford",
                        shortName: "17813 Bradford",
                        fullName: "RealToken S 17813 Bradford St Detroit MI",
                        contractAddress: "0x8364A90496Be1c47261aca2563845496c91C8d69",
                        officialPrice: 51.33,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "15796 Hartwell",
                        shortName: "15796 Hartwell",
                        fullName: "RealToken S 15796 Hartwell St Detroit MI",
                        contractAddress: "0xB3D3C1bBcEf737204AADb4fA6D90e974bc262197",
                        officialPrice: 53.04,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "9717 Everts",
                        shortName: "9717 Everts",
                        fullName: "RealToken S 9717 Everts St Detroit MI",
                        contractAddress: "0x73BdE888664DF8DDfD156B52e6999EEaBAB57C94",
                        officialPrice: 50.5,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "19201 Westphalia",
                        shortName: "19201 Westphalia",
                        fullName: "RealToken S 19201 Westphalia St Detroit MI",
                        contractAddress: "0x830B0e9a5ecf36D0A886D21e1C20043cD2d16515",
                        officialPrice: 52.17,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "19163 Mitchell",
                        shortName: "19163 Mitchell",
                        fullName: "RealToken S 19163 Mitchell St Detroit MI",
                        contractAddress: "0x4Cc53Ee5ef306a95d407321d4B4acc30814C04ee",
                        officialPrice: 56.33,
                        imageLink: [],
                        marketplaceLink: ""
                    },
                    {
                        uuid: "4061 Grand",
                        shortName: "4061 Grand",
                        fullName: "RealToken S 4061 Grand St Detroit MI",
                        contractAddress: "0xd9e89bFebAe447B42C1Fa85C590716eC8820f737",
                        officialPrice: 71.11,
                        imageLink: [],
                        marketplaceLink: ""
                    }
                ]

                propertiesNonFiltered.push(...propertiesGoerli);
            }else{
                properties.forEach((propertyToken: APIPropertiesToken) => {
                    const contractAddress = getContractAddressFromChainId(propertyToken);
                    if(contractAddress){
                        propertiesNonFiltered.push({
                            uuid: propertyToken.uuid,
                            shortName: propertyToken.shortName,
                            fullName: propertyToken.fullName,
                            contractAddress: contractAddress.toLowerCase(),
                            officialPrice: propertyToken.tokenPrice,
                            marketplaceLink: propertyToken.marketplaceLink,
                            imageLink: propertyToken.imageLink
                        })
                    }
                    
                });
            }

            const onlyWLProperties = propertiesNonFiltered.filter(
                (property) => !!whitelistedTokens.find((wlProperty) => wlProperty.contractAddress.toLowerCase() == property.contractAddress.toLowerCase())
            );

            setPropertiesToken(onlyWLProperties)
            dispatch({ type: chainPropertiesChangedDispatchType, payload: onlyWLProperties });

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => { if(chainId && properties && !isLoading) getPropertiesTokenList() },[chainId,properties,isLoading])

    const getPropertyToken = (address: string): PropertiesToken | undefined => {
        return propertiesToken.find(propertyToken => propertyToken.contractAddress == address.toLowerCase())
    }

    return{
        propertiesToken,
        propertiesIsloading,
        getPropertyToken
    }

}