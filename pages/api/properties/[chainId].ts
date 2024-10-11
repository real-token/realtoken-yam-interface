import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { APIPropertiesToken, PropertiesToken, ShortProperty } from "src/types";
import axios from "axios";
import { tokenToGetPrice } from "../../../src/constants/GetPriceToken";
import { ChainsID } from "../../../src/constants";

const getTokenFromCommunityAPI = new Promise<APIPropertiesToken[]>( async (resolve, reject) => {
    try{

        const response = await axios.get<APIPropertiesToken[]>("https://api.realt.community/v1/token", {
            headers: {
                "X-AUTH-REALT-TOKEN": process.env.COMMUNITY_API_KEY ?? ""
            }
        });

        const tokens: APIPropertiesToken[] = response.data;
        resolve(tokens);

    }catch(err){
        console.error("Failed to fetch properties from community")
        reject(err);
    }
}) 

const getContractAddressFromChainId = (propertyToken: APIPropertiesToken, chainId: number): string|undefined => {

    let addressKey;
    switch(chainId){
        case ChainsID.Ethereum:
            addressKey = "ethereum";
        case ChainsID.Gnosis:
            addressKey = "xDai";
        case ChainsID.Sepolia:
            addressKey = "sepolia";
    }

    return propertyToken.blockchainAddresses[addressKey as keyof typeof propertyToken.blockchainAddresses]?.contract;
}

const getTokens = async (chainId: number, communityProperties: APIPropertiesToken[], wlProperties: ShortProperty[]): Promise<PropertiesToken[]> => {
    const propertiesNonFiltered: PropertiesToken[] = [];

    // blockchainAddresses


    // if(chainId == ChainsID.Sepolia){

    //     const chainConfig = CHAINS[ChainsID.Sepolia];
    //     const { graphPrefixes } = chainConfig;

    //     // 
    //     const res = await apiClient.query({
    //         query: gql`
    //             query getTokens{
    //                 ${graphPrefixes.realtoken}{
    //                     tokens{
    //                         tokenId
    //                         address
    //                     }
    //                 }
    //             }
    //         `
    //     })
    //     const properties: any[] = res.data[graphPrefixes.realtoken].tokens;
        
    //     properties.forEach((propertie) => {
    //         const propertiesCommunity = communityProperties.find((token) => token.tokenIdRules == propertie.tokenId);
    //         if(propertiesCommunity){
    //             propertiesNonFiltered.push({
    //                 ...propertiesCommunity,
    //                 contractAddress: propertie.address,
    //                 officialPrice: propertiesCommunity.tokenPrice,
    //                 annualYield: propertiesCommunity.tokenPrice ? propertiesCommunity.netRentYearPerToken/propertiesCommunity.tokenPrice : 0
    //             })
    //         }
    //     })
        
    // }else{

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
    // }

    return propertiesNonFiltered;

    console.log(propertiesNonFiltered)

    const onlyWLProperties = propertiesNonFiltered.filter(
        (property) => !!wlProperties.find((wlProperty) => wlProperty.contractAddress.toLowerCase() == property.contractAddress.toLowerCase())
    );

    return onlyWLProperties;
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    try{

        const { chainId: id } = req.query;
        const chainId: string = id as string;

        if(!chainId){
            return res.status(400).json({ "error": "ChainId is missing." });
        }

        // const [communityApiToken,wlTokens] = await Promise.all([getTokenFromCommunityAPI,getWhitelistedProperties(parseInt(chainId))]);
        const [communityApiToken] = await Promise.all([getTokenFromCommunityAPI]);
        const tokens = await getTokens(parseInt(chainId), communityApiToken, []);

        // const extendedTokens = tokenToGetPrice.get(parseInt(chainId))?.filter(token => !token.isBuyToken) ?? [] as PropertiesToken[];
        // console.log(extendedTokens);

        return res
            .setHeader('cache-control', 'public, s-maxage=1200, stale-while-revalidate=600')
            .status(200)
            .json(tokens);
  
      }catch(err){
        console.log(err);
        return res.status(500).json({error: "Failed to fetch properties"});
      }
}
export default handler;