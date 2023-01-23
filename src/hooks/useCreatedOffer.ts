import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { Dispatch, useEffect, useState } from "react"
import { Erc20ABI } from "src/abis";
import { PropertiesToken } from "src/types";
import { CreatedOffer } from "src/types/offer/CreatedOffer";
import { getContract } from "src/utils";
import { usePropertiesToken } from "./usePropertiesToken";

type UseCreatedOffer = (
    createdOffer: CreatedOffer|undefined
) => {
    offerTokenSymbol: string|undefined;
    buyTokenSymbol: string|undefined
}

export const useCreatedOffer: UseCreatedOffer = (createdOffer) => {

    const { propertiesToken } = usePropertiesToken(false);
    const { account, provider } = useWeb3React();

    const [offerTokenSymbol,setOfferTokenSymbol] = useState<string|undefined>(undefined);
    const [buyTokenSymbol,setBuyTokenSymbol] = useState<string|undefined>(undefined);

    const getTokenSymbol = async (contract: Contract, setSymbol: Dispatch<string>) => {
        const symbol = await contract.symbol();
        setSymbol(symbol);
    }

    useEffect(() => {
        try{
            if(!createdOffer || !account || !provider || !propertiesToken) return;

            const realtToken: PropertiesToken|undefined = propertiesToken.find((propertiesToken) => propertiesToken.contractAddress.toLowerCase() == createdOffer.offerTokenAddress.toLowerCase());

            if(realtToken){
                setOfferTokenSymbol(realtToken.shortName);
            }else{
                const contract = getContract(createdOffer.offerTokenAddress,Erc20ABI,provider);
                if(contract) getTokenSymbol(contract,setOfferTokenSymbol);
            }
        }catch(err){
            console.log("Error while getting offerToken symbol", err);
        }
    },[propertiesToken, createdOffer, account, provider])

    useEffect(() => {
        try{
            if(!createdOffer || !account || !provider || !propertiesToken) return;

            const realtToken: PropertiesToken|undefined = propertiesToken.find((propertiesToken) => propertiesToken.contractAddress.toLowerCase() == createdOffer.buyerTokenAddress.toLowerCase());

            if(realtToken){
                setBuyTokenSymbol(realtToken.shortName);
            }else{
                const contract = getContract(createdOffer.buyerTokenAddress,Erc20ABI,provider);
                if(contract) getTokenSymbol(contract,setBuyTokenSymbol);
            }
        }catch(err){
            console.log("Error while getting offerToken symbol", err);
        }
    },[propertiesToken, createdOffer, account, provider])

    return{
        offerTokenSymbol,
        buyTokenSymbol
    }
}