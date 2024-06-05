import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { tokenToGetPrice } from "../../../src/constants/GetPriceToken";
import { getChainlinkPrice } from "../../../src/controllers/ChainLinkCall";
import { GetPriceTokenChainLink, GetPriceTokenCoingecko } from "../../../src/types/GetPriceTokens";
import { getCoingeckoApiPrice } from "../../../src/controllers/CoingeckoApiCall";
import { ChainsID } from "../../../src/constants";

const gnosisRpcUrl = process.env.GNOSIS_RPC_URL as string;
const ethereumRpcUrl = process.env.ETHEREUM_RPC_URL as string;
const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL as string;

const rpcUrls = new Map<number, string>([
    [ChainsID.Gnosis, gnosisRpcUrl],
    [ChainsID.Ethereum, ethereumRpcUrl],
    [ChainsID.Sepolia, sepoliaRpcUrl]
]);

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try{

        const { chainId: id } = req.query;
        const chainId: number = id as unknown as number;
        if(!chainId) return res.status(400).json({ "error": "ChainId is missing." });

        const tokens = tokenToGetPrice.get(Number(chainId));
        if(!tokens) return res.status(400).json({ "error": "ChainId is invalid." });

        const rpcUrl = rpcUrls.get(Number(chainId));
        if(!rpcUrl) return res.status(400).json({ "error": "Cannot find rpc url" });

        const prices = await Promise.all(tokens.map((token) => {
            const getPriceType = token.priceFnc.type;
            if(getPriceType == 'chainlink'){
                return getChainlinkPrice(token as GetPriceTokenChainLink, rpcUrl);
            }else if(getPriceType == 'coingecko-api'){
                return getCoingeckoApiPrice(token as GetPriceTokenCoingecko, chainId)
            }
        }));

        const pricesParsed = prices.reduce((acc, price) => {
            if(price == null || !acc) return acc;
            acc[price.contractAddress.toLowerCase()] = price.price;
            return acc;
        }, {});

        return res
            .setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
            .status(200)
            .json(pricesParsed);
        
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Failed to fetch asset prices"});
    }
}
export default handler;