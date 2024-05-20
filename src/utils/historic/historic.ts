import { gql } from "@apollo/client";
import { Historic } from "../../types/historic";
import { apiClient } from "../offers/getClientURL";
import { OFFER_TYPE } from "../../types/offer";

export const parseHistoric = (data: any, type: OFFER_TYPE) => {
    const parsedHistoric: Historic[] = [];
    data.forEach((h: any) => {

        const buyerToken = {
            address: h.offer.buyerToken.address,
            name: h.offer.buyerToken.name,
            symbol: h.offer.buyerToken.symbol,
            tokenType: h.offer.buyerToken.tokenType,
        };
        const offerToken = {
            address: h.offer.offerToken.address,
            name: h.offer.offerToken.name,
            symbol: h.offer.offerToken.symbol,
            tokenType: h.offer.offerToken.tokenType,
        }

        parsedHistoric.push({
            type,
            purchaseId: h.id,
            offer: {
                buyerToken: type == OFFER_TYPE.BUY ? buyerToken : offerToken,
                offerToken: type == OFFER_TYPE.BUY ? offerToken : buyerToken,
            },
            seller: {
                address: h.seller.address
            },
            quantity: type == OFFER_TYPE.BUY ? h.price : h.quantity ,
            price: type == OFFER_TYPE.BUY ? h.quantity : h.price,
            createdAtTimestamp: h.createdAtTimestamp,
        } as Historic);
    });

    return parsedHistoric;
}

const getLastTimestamp = async (address: string, graphPrefix: string, type: 'buyer' | 'seller'): Promise<string | undefined> => {

    const { data } = await apiClient.query({
        query: gql`
          query getHistorics {
            ${graphPrefix} {
              purchases(
                where: {
                    ${type}: "${address.toLowerCase()}",
                    createdAtTimestamp_lte: "${Math.floor(Date.now() / 1000)}"
                }
                orderBy: createdAtTimestamp      
                orderDirection: desc
                first: 1000,
              ) {
                  createdAtTimestamp
              } 
            }
          }
        `
    });

    if(data[graphPrefix].purchases.length == 0) return undefined;
    return data[graphPrefix].purchases[0].createdAtTimestamp;
}

export const getPurchases = async (address: string, graphPrefix: string): Promise<Historic[]> => {
    const lastPurchasesTimestamp = await getLastTimestamp(address, graphPrefix, 'buyer');
    if(!lastPurchasesTimestamp) return [];

    const historic = await getAllTx(address, lastPurchasesTimestamp, graphPrefix, 'buyer');
    return historic;
}

export const getSales = async (address: string, graphPrefix: string): Promise<Historic[]> => {
    const lastSaleTimestamp = await getLastTimestamp(address, graphPrefix, 'seller');
    if(!lastSaleTimestamp) return [];
    
    const historic = await getAllTx(address, lastSaleTimestamp, graphPrefix, 'seller');
    return historic;
}

export const getAllTx = async (address: string, lastTimestamp: string, graphPrefix: string, type: 'buyer' | 'seller'): Promise<any[]> => {

    const historics = [];
    let timestamp = lastTimestamp+1;
    while(true){
        const { data } = await apiClient.query({query: gql`
        query getHistorics{
            ${graphPrefix} {
                purchases(
                    where: { 
                        ${type}: "${address.toLowerCase()}",
                        createdAtTimestamp_gt: "0",
                        createdAtTimestamp_lt: "${timestamp}"
                    }, 
                    orderBy: createdAtTimestamp, 
                    orderDirection: desc, 
                    first: 300
                ){
                    id
                    offer{
                        id
                        offerToken{
                        address
                        tokenType
                        name
                        symbol
                        }
                        buyerToken{
                        address
                        tokenType
                        name
                        symbol
                        }
                    }
                    seller{
                        address
                    }
                    buyer {
                        address
                    }
                    price
                    quantity
                    createdAtTimestamp
                }
            }
            }
        `});

        const purchases = data[graphPrefix].purchases;
        if(purchases.length == 0) break;

        const historic: Historic[] | undefined = parseHistoric(purchases, type == 'buyer' ? OFFER_TYPE.BUY : OFFER_TYPE.SELL);
        if(historic) {
            historics.push(...historic);
            timestamp = purchases[purchases.length-1].createdAtTimestamp;
        }

    }

    return historics;
}