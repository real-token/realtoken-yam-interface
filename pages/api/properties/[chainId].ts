import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { APIPropertiesToken, PropertiesToken, ShortProperty } from "src/types";
import { getWhitelistedProperties } from "src/utils/properties";

const getTokenFromCommunityAPI = new Promise<APIPropertiesToken[]>( async (resolve, reject) => {
    try{
        const headers: {[key: string]: any} = {};
        if (process.env.COMMUNITY_API_KEY !== undefined) {
            headers["X-AUTH-REALT-TOKEN"] = process.env.COMMUNITY_API_KEY;
        }

        const response = await fetch("https://api.realt.community/v1/token",{
            method: "GET",
            headers: headers
        });

        if(response.ok){
            const tokens: APIPropertiesToken[] = await response.json();
            resolve(tokens);
        }else{
            reject("Failed to fetch properties from community")
        } 
    }catch(err){
        reject(err);
    }
}) 

const getContractAddressFromChainId = (propertyToken: APIPropertiesToken, chainId: number): string|undefined => {
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

const getTokens = (chainId: number, communityProperties: APIPropertiesToken[], wlProperties: ShortProperty[]): PropertiesToken[] => {
    const propertiesNonFiltered: PropertiesToken[] = []; 
    if(chainId == 5){
        const propertiesGoerli: PropertiesToken[] = [
            {
                uuid: "15777 Ardmore",
                shortName: "15777 Ardmore",
                fullName: "RealToken S 15777 Ardmore St Detroit M",
                contractAddress: "0x7401F1A495c4d13aF56fd1d880F1aA646FD1017C",
                officialPrice: 48.37,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 4.8929230769231,
                tokenIdRules: 100038
            },
            {
                uuid: "14319 Rosemary",
                shortName: "14319 Rosemary",
                fullName: "RealToken S 14319 Rosemary St Detroit MI",
                contractAddress: "0x50620ab68605C43aD8f29f2EA2Bb98d4931C28CD",
                officialPrice: 49.69,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.28,
                tokenIdRules: 100040
            },
            {
                uuid: "14078 Carlisle",
                shortName: "14078 Carlisle",
                fullName: "RealToken S 14078 Carlisle St Detroit MI",
                contractAddress: "0xF1AAaCdB0E5acd8f725b4f1eB33e4d976bAE87A7",
                officialPrice: 54.25,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.6167,
                tokenIdRules: 100041
            },
            {
                uuid: "13895 Saratoga",
                shortName: "13895 Saratoga",
                fullName: "RealToken S 13895 Saratoga St Detroit MI",
                contractAddress: "0x2c30612Fb6dAD2cE58Eb703C261162f1B42B290b",
                officialPrice: 58.5,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 6.0808333333333,
                tokenIdRules: 100042
            },
            {
                uuid: "4380 Beaconsfield",
                shortName: "4380 Beaconsfield",
                fullName: "RealToken S 4380 Beaconsfield St Detroit MI",
                contractAddress: "0xf9DE16b821545D78295E50d944C9e1fF075Cd969",
                officialPrice: 53.88,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.7141666666667,
                tokenIdRules: 100043
            },
            {
                uuid: "17813 Bradford",
                shortName: "17813 Bradford",
                fullName: "RealToken S 17813 Bradford St Detroit MI",
                contractAddress: "0x8364A90496Be1c47261aca2563845496c91C8d69",
                officialPrice: 51.33,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.5625,
                tokenIdRules: 100044
            },
            {
                uuid: "15796 Hartwell",
                shortName: "15796 Hartwell",
                fullName: "RealToken S 15796 Hartwell St Detroit MI",
                contractAddress: "0xB3D3C1bBcEf737204AADb4fA6D90e974bc262197",
                officialPrice: 53.04,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.6866666666667,
                tokenIdRules: 100045
            },
            {
                uuid: "9717 Everts",
                shortName: "9717 Everts",
                fullName: "RealToken S 9717 Everts St Detroit MI",
                contractAddress: "0x73BdE888664DF8DDfD156B52e6999EEaBAB57C94",
                officialPrice: 50.5,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.2358333333333,
                tokenIdRules: 100046
            },
            {
                uuid: "19201 Westphalia",
                shortName: "19201 Westphalia",
                fullName: "RealToken S 19201 Westphalia St Detroit MI",
                contractAddress: "0x830B0e9a5ecf36D0A886D21e1C20043cD2d16515",
                officialPrice: 52.17,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.4633333333333,
                tokenIdRules: 100047
            },
            {
                uuid: "19163 Mitchell",
                shortName: "19163 Mitchell",
                fullName: "RealToken S 19163 Mitchell St Detroit MI",
                contractAddress: "0x4Cc53Ee5ef306a95d407321d4B4acc30814C04ee",
                officialPrice: 56.33,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.7441666666667,
                tokenIdRules: 100048
            },
            {
                uuid: "4061 Grand",
                shortName: "4061 Grand",
                fullName: "RealToken S 4061 Grand St Detroit MI",
                contractAddress: "0xd9e89bFebAe447B42C1Fa85C590716eC8820f737",
                officialPrice: 71.11,
                currency: "USDC",
                imageLink: [],
                marketplaceLink: "",
                netRentYearPerToken: 5.8627777777778,
                tokenIdRules: 100049
            }
        ]
        propertiesGoerli.forEach((token) => token.annualYield = token.officialPrice ? token.netRentYearPerToken/token.officialPrice : 0)
        propertiesNonFiltered.push(...propertiesGoerli);
    }else{
        communityProperties.forEach((propertyToken: APIPropertiesToken) => {
            const contractAddress = getContractAddressFromChainId(propertyToken,chainId);
            if(contractAddress){
                propertiesNonFiltered.push({
                    uuid: propertyToken.uuid,
                    shortName: propertyToken.shortName,
                    fullName: propertyToken.fullName,
                    contractAddress: contractAddress.toLowerCase(),
                    officialPrice: propertyToken.tokenPrice,
                    currency: propertyToken.currency,
                    marketplaceLink: propertyToken.marketplaceLink,
                    imageLink: propertyToken.imageLink,
                    netRentYearPerToken: propertyToken.netRentYearPerToken ?? 0,
                    annualYield: propertyToken.netRentYearPerToken && propertyToken.tokenPrice ? propertyToken.netRentYearPerToken/propertyToken.tokenPrice : 0,
                    tokenIdRules: propertyToken.tokenIdRules
                });
            }
            
        });
    }

    const onlyWLProperties = propertiesNonFiltered.filter(
        (property) => !!wlProperties.find((wlProperty) => wlProperty.contractAddress.toLowerCase() == property.contractAddress.toLowerCase())
    );

    return onlyWLProperties;
}

const handler: NextApiHandler = async (req: NextApiRequest,res: NextApiResponse) => {

    try{

        const { chainId: id } = req.query;
        const chainId: string = id as string;

        if(!chainId){
            return res.status(400).json({ "error": "ChainId is missing." });
        }

        const [communityApiToken,wlTokens] = await Promise.all([getTokenFromCommunityAPI,getWhitelistedProperties(parseInt(chainId))]);

        const tokens = getTokens(parseInt(chainId), communityApiToken, wlTokens);

        return res.status(200).json(tokens);
  
      }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch properties"});
      }
}

export default handler;