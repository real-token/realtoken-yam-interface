import { Offer } from 'src/types/offer';

export type OfferData = {
  id: string;
  forSaleToken: string;
  forSaleTokenAddress: string;
  purchaseToken: string;
  purchaseTokenAddress: string;
  launchDate: string;
  balanceWallet?: number;
  sellerName: string;
  siteLocation: string;
  electricityPrice: number;
  initialSellingPrice?: number;
  requestedSellingPrice?: number;
  quantityAvailable?: number;
  image: string;
  type: OfferType;
};

export enum OfferType {
  Sell = 'sell',
  Buy = 'buy',
  Exchange = 'exchange',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum Arrow {
  None = 0,
  Up = 1,
  Down = 2,
}

export enum HeaderElementId {
  Quantity = 'quantity',
  Seller = 'seller',
  UnitPrice = 'unit_price',
  ElectricityCost = 'electricity_cost',
  BuyWith = 'buy_with',
}

export function mapOfferToOfferData(offer: Offer): OfferData {
  return {
    id: offer.offerId,
    forSaleToken: offer.offerTokenName,
    forSaleTokenAddress: offer.offerTokenAddress,
    purchaseToken: offer.buyerTokenName,
    purchaseTokenAddress: offer.buyerTokenAddress,
    launchDate: offer.sellDate,
    sellerName: offer.sellerName,
    siteLocation: offer.miningSite,
    electricityPrice: offer.electricityPrice,
    initialSellingPrice: offer.officialPrice,
    requestedSellingPrice: offer.offerPrice,
    quantityAvailable: parseFloat(offer.amount),
    balanceWallet: offer.balanceWallet
      ? parseFloat(offer.balanceWallet)
      : undefined,
    image: '', // Vous devrez spécifier l'image appropriée ici
    type: OfferType.Sell,
  };
}

export enum MaxHeight {
  Mobile = 411,
  Medium = 280,
  Large = 155,
}

export enum Columns {
  sellerName = 'sellerName',
  requestedSellingPrice = 'requestedSellingPrice',
  purchaseToken = 'purchaseToken',
  quantityAvailable = 'quantityAvailable',
}

export const columnLabels: { [key: string]: string } = {
  sellerName: 'Seller',
  requestedSellingPrice: 'Unit Price',
  purchaseToken: 'Buy with',
  quantityAvailable: 'For Sale',
};
