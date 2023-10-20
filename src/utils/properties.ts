import { Token } from ".graphclient";
import { gql } from "@apollo/client";
import { ShortProperty } from "src/types";
import { Offer, OFFER_TYPE } from "src/types/offer";
import { getYamClient } from "./offers/getClientURL";

export const getWhitelistedProperties = async (chainId: number): Promise<ShortProperty[]> => {
    return new Promise<ShortProperty[]>(async (resolove,reject) => {
        try{

            const client = getYamClient(chainId);
            await client.query({ query: gql`
                query GetWLProperties {
                    tokens(first: 1000, where: {tokenType: 1, name_not: null}) {
                        name
                        tokenType
                        address
                    }
                }
            `}).then((data) => {
                // console.log(data)

                // if(data.tokens){
                //     const propertiesToken: ShortProperty[] = [];
                //     // console.log("lenght: ", data.tokens.length);
                //     data.tokens.forEach((token: Token) => {
                //         // if(token.name?.toLowerCase().includes('19003')){
                //         //     console.log(token)
                //         // }
                //         propertiesToken.push({
                //             contractAddress: token.address,
                //             name: token.name ?? ""
                //         })
                //     })
                //     resolove(propertiesToken);
                // }else{
                //     resolove([])
                // }
            })
            
            
        }catch(err){
            console.log("Failed to get propertieqs from YAM TheGraph: ", err);
            reject(err);
        }
    })
}

export const getPropertyTokenAddress = (offer: Offer): string => {
    return offer.type == OFFER_TYPE.SELL ? offer.buyerTokenAddress : offer.offerTokenAddress
}   