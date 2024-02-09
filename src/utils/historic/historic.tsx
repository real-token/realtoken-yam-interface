import { PropertiesToken } from "../../types";
import { Historic } from "../../types/historic";

export const parseHistoric = (data: any) => {
    try{

        const parsedHistoric: Historic[] = [];
        data.forEach((h: any) => {
            parsedHistoric.push({
                purchaseId: h.id,
                offer: {
                    buyerToken: {
                        address: h.offer.buyerToken.address,
                        name: h.offer.buyerToken.name,
                        symbol: h.offer.buyerToken.symbol,
                        tokenType: h.offer.buyerToken.tokenType,
                    },
                    offerToken: {
                        address: h.offer.offerToken.address,
                        name: h.offer.offerToken.name,
                        symbol: h.offer.offerToken.symbol,
                        tokenType: h.offer.offerToken.tokenType,
                    },
                },
                seller: {
                    address: h.seller.address
                },
                quantity: h.quantity,
                price: h.price,
                createdAtTimestamp: h.createdAtTimestamp,
            } as Historic);
        });

        return parsedHistoric;

    }catch(err){
        console.error(err);
    }
}