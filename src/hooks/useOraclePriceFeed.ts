import { useWeb3React } from "@web3-react/core"
import BigNumber from "bignumber.js"
import { useEffect, useState } from "react"
import { oraclePriceFeedABI } from "src/abis"
import { OraclePriceFeed } from "src/abis/types/oraclePriceFeed"
import { getContract } from "src/utils"
import { chainLink } from "src/utils/chainlink/chainlink"

type UseOraclePriceFeed = (
    tokenAddress: string
) => {
    price: BigNumber|undefined
}

export const useOraclePriceFeed : UseOraclePriceFeed = (tokenAddress) => {

    const oracleContractAddress: string|undefined = chainLink.get(tokenAddress);

    const { provider } = useWeb3React();

    const [price,setPrice] = useState<BigNumber|undefined>(undefined)

    const getPrice = async (contract: OraclePriceFeed) => {
        try{
            const assetPrice = await contract.latestAnswer();
            const assetDecimals = await contract.decimals()
            setPrice(new BigNumber(assetPrice.toString()).shiftedBy(-assetDecimals));
        }catch(err){
            console.log("Error while getting oracle price: ", err)
        }
    }

    useEffect(() => {
        try{
            if(!provider) return;
            if(!oracleContractAddress){
                setPrice(new BigNumber(1));
                return;
            }

            setPrice(undefined)

            const oracleContract = getContract<OraclePriceFeed>(
                oracleContractAddress,
                oraclePriceFeedABI,
                provider
            );
    
            if(oracleContract) getPrice(oracleContract);
        }catch(err){
            console.log("Error when loading oracle contract: ", err)
        }
    },[oracleContractAddress,provider])

    return {
        price
    }
}