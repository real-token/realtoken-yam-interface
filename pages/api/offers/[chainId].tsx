import BigNumber from "bignumber.js";
import { Contract, ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { Erc20ABI } from "src/abis";
import { CHAINS, ChainsID, ContractsID } from "src/constants";
import { Offer } from "src/hooks/types";

const getOffer = async (realTokenYamUpgradeable: Contract, provider: any, i: number, offers: Offer[]) => {
        try{

            const getO = () => realTokenYamUpgradeable.showOffer(i);

            const [
                offerTokenAddress,
                buyerTokenAddress,
                sellerAddress,
                buyerAddress,
                price,
                amount,
            ] = await getO();
        
            const offerToken = new Contract(offerTokenAddress, Erc20ABI, provider);
            const buyerToken = new Contract(buyerTokenAddress, Erc20ABI, provider);
            const offerTokenName = (await offerToken?.name()) as string;
            const buyerTokenName = (await buyerToken?.name());
            const offerTokenDecimals = await offerToken?.decimals() as number;
            const buyerTokenDecimals = await buyerToken?.decimals() as number;
        
            //   const hasPropertyToken = propertiesToken.find(propertyToken => (propertyToken.contractAddress == buyerTokenAddress || propertyToken.contractAddress == offerTokenAddress));
        
            const bnAmount = new BigNumber(amount.toString());
            const offerData: Offer = {
                offerId: i.toString(),
                offerTokenAddress: offerTokenAddress,
                offerTokenName: offerTokenName,
                offerTokenDecimals: offerTokenDecimals.toString(),
                buyerTokenAddress: buyerTokenAddress,
                buyerTokenName: buyerTokenName,
                buyerTokenDecimals: buyerTokenDecimals.toString(),
                sellerAddress: sellerAddress,
                buyerAddress: buyerAddress,
                price: (new BigNumber(price.toString())).shiftedBy(- buyerTokenDecimals).toFixed(10).toString(),
                amount: (bnAmount.shiftedBy(- offerTokenDecimals)).toFixed(10).toString(),
            }

            console.log(i)
            offers.push(offerData)

        }catch(err){
            console.log(err)
        }
    
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { chainId: s } = req.query;

    const chainId: number = parseInt(s as string);

    const chain = CHAINS[chainId as ChainsID];

    if(!chainId || !chain){
        res.status(400).json({ error: "chainId parameter invalid" })
    }
    
    const { abi, address, metadata } = chain.contracts[ContractsID.realTokenYamUpgradeable];
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    const realTokenYamUpgradeable = new Contract(address, abi, provider); 

    const offersData: Offer[] = [];
    
    if(realTokenYamUpgradeable){

        try{
    
            const getEvents = () =>
              realTokenYamUpgradeable.queryFilter(
              realTokenYamUpgradeable.filters.OfferDeleted(),
              metadata.fromBlock
            );
    
            const events = await getEvents();
            const offersDeleted = events.map(event => event?.args?.offerId.toNumber());
            const offerCount = (await realTokenYamUpgradeable.getOfferCount()).toNumber();
    
            const offerCountArray = Array.from(Array(offerCount).keys());
            const offersToFetch = offerCountArray.filter(x => !offersDeleted.includes(x));

            console.log(offersToFetch)

            for(const i of offersToFetch){
                getOffer(realTokenYamUpgradeable,provider,i,offersData)
            }

            console.log(offersData)

            res.status(200).json(offersData);

        }catch(err){
            console.log(err)
            res.status(500).json({ error: "error" })
        }

    }else{
        res.status(500).json({ error: "error" })
    }

}

export default handler;