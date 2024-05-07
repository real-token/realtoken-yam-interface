import { Offer, OFFER_TYPE } from "src/types/offer";
import { Price as P } from "src/types/price";

export interface Price{
  contractAddress: string;
  price: string;
}

export const getPriceInDollar = (prices: P, offer: Offer): number|undefined => {
  if(offer.type == OFFER_TYPE.SELL){
    const buyTokenPriceInDollar = parseFloat(prices[offer.buyerTokenAddress.toLowerCase()]);
    return buyTokenPriceInDollar*parseFloat(offer.price);
  }
  if(offer.type == OFFER_TYPE.BUY && offer.officialPrice){
    const buyTokenPriceInDollar = 1/parseFloat(offer.price);
    return buyTokenPriceInDollar;
  }
}

export const getBuyPriceInDollar = (prices: P, offer: Offer): number|undefined => {
  return parseFloat(prices[offer.offerTokenAddress.toLowerCase()]);
}