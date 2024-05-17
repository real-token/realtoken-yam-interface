import BigNumber from 'bignumber.js';
import { PropertiesToken } from 'src/types';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { Offer } from 'src/types/offer/Offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';
import { Price } from 'src/types/price';
import { Offer as OfferGraphQl } from '../../../gql/graphql';
import { getPriceInDollar } from '../price';
import { getNotWhitelistedTokens } from '../whitelist';

// TOKEN TYPE
// 1 = RealToken
// 2 = ERC20 avec permit
// 3 = ERC20 sans permit
export const getOfferType = (
  offerTokenType: number,
  buyerTokenType: number
): OFFER_TYPE => {
  if (offerTokenType == 1 && (buyerTokenType == 2 || buyerTokenType == 3))
    return OFFER_TYPE.SELL;
  if ((offerTokenType == 2 || offerTokenType == 3) && buyerTokenType == 1)
    return OFFER_TYPE.BUY;

  return OFFER_TYPE.EXCHANGE;
};

export const parseOffer = (
    account: string,
    offer: OfferGraphQl,
    accountUserRealtoken: DataRealtokenType,
    propertiesToken: PropertiesToken[],
    wlPropertiesId: number[],
    prices: Price,
    extendedTokensAddress: string[]
  ): Promise<Offer> => {
    return new Promise<Offer>(async (resolve, reject) => {
      try {
        // console.log(
        //   'DEBUG parseOffer accountUserRealtoken',
        //   accountUserRealtoken
        // );

        // console.log('proopertiesToken', propertiesToken);
  
        let balanceWallet = '0';
        let allowance = '0';
        // let logLabel = 'Erreur Type token parseOffer or seller not data in graph realtoken';
        // console.log("OFFER: ", offer)
        if (BigNumber(offer.availableAmount).gt(0)) {
          if (
            offer.offerToken.tokenType === 1 &&
            accountUserRealtoken != undefined
          ) {
            balanceWallet = accountUserRealtoken.amount ?? '0';
            allowance = accountUserRealtoken.allowance ?? '0';
  
            // logLabel = 'parseOffer type 1 blance/allowance';

          } else if (
            offer.offerToken.tokenType === 2 ||
            offer.offerToken.tokenType === 3
          ) {
            balanceWallet = offer.balance?.amount ?? offer.availableAmount;
            allowance = offer.allowance?.allowance ?? offer.availableAmount;

            // logLabel = 'parseOffer type 2/3 blance/allowance';
          }

        /*  console.log(logLabel, {
            sellerAdress: offer.seller.address,
            'offer ID': BigNumber(offer.id).toString(),
            'Token name': offer.offerToken.name,
            'Token type': offer.offerToken.tokenType,
            BalanceWallet: balanceWallet,
            Allowance: allowance,
            'YAM autorisé': offer.availableAmount,
          }); */
        }

        const isExtendedToken = extendedTokensAddress.includes(offer.seller.address) || extendedTokensAddress.includes(offer.offerToken.address);

        if(offer.id == "41774"){
          console.log("offer: ", offer)
          console.log("balanceWallet: ", balanceWallet)
          console.log("allowance: ", allowance)
          console.log("offer.availableAmount", offer.availableAmount)
        }

        const o: Offer = {
          offerId: BigNumber(offer.id).toString(),
          offerTokenAddress: (offer.offerToken.address as string)?.toLowerCase(),
          offerTokenName: offer.offerToken.name ?? '',
          offerTokenDecimals: offer.offerToken.decimals?.toString() ?? '',
          offerTokenType: offer.offerToken.tokenType ?? 0,
          buyerTokenAddress: (offer.buyerToken.address as string)?.toLowerCase(),
          buyerTokenName: offer.buyerToken.name ?? '',
          buyerTokenDecimals: offer.buyerToken.decimals?.toString() ?? '',
          buyerTokenType: offer.buyerToken.tokenType ?? 0,
          sellerAddress: (offer.seller.address as string)?.toLowerCase(),
          buyerAddress: (offer.buyer?.address as string)?.toLowerCase(),
          price: offer.price.price.toString(),
          amount:
            BigNumber.minimum(
              offer.availableAmount, //5.4
              balanceWallet, // 0
              allowance //0
            ).toString(10) ?? '0',
          availableAmount: offer.availableAmount.toString(),
          balanceWallet: balanceWallet ?? '0',
          allowanceToken: allowance ?? '0',
          hasPropertyToken: false,
          type: undefined,
          removed: false,
          createdAtTimestamp: offer.createdAtTimestamp,
          buyCurrency: "",
          officialPrice: undefined,
          offerPrice: undefined,
          priceDelta: undefined,
          officialYield: undefined,
          offerYield: undefined,
          yieldDelta: undefined,
          accountWhitelisted: false
        };
      
        o.type = getOfferType(o.offerTokenType,o.buyerTokenType);
      
        const propertyToken = getProperty(
          o.type == OFFER_TYPE.BUY ? o.buyerTokenAddress : o.offerTokenAddress,
          propertiesToken
        );
      
        //add price and yield infos
        o.buyCurrency = propertyToken?.currency ?? "";
        o.officialPrice = getOfficialPrice(propertyToken);
        o.offerPrice = getPriceInDollar(prices,o);
        o.officialYield = getOfficialYield(propertyToken);
        o.offerYield = getOfferYield(prices,o,propertyToken);
        o.yieldDelta = getYieldDelta(o);
        o.priceDelta = getPriceDelta(prices,o);
        o.accountWhitelisted = getNotWhitelistedTokens(wlPropertiesId, o, propertiesToken).length == 0;

        // console.log(offer.availableAmount, balanceWallet, allowance)
        resolve(o);
      } catch (err) {
        console.log('Error when fetching account from TheGraph', err);
        reject(err);
      }
  });
};

const parseRealtoken = (
  offer: OfferGraphQl, 
  propertiesToken: PropertiesToken[],
  wlPropertiesId: number[],
  prices: Price,
  balanceWallet: string,
  allowance: string,
): Offer => {
  const o: Offer = {
    offerId: BigNumber(offer.id).toString(),
    offerTokenAddress: (offer.offerToken.address as string)?.toLowerCase(),
    offerTokenName: offer.offerToken.name ?? '',
    offerTokenDecimals: offer.offerToken.decimals?.toString() ?? '',
    offerTokenType: offer.offerToken.tokenType ?? 0,
    buyerTokenAddress: (offer.buyerToken.address as string)?.toLowerCase(),
    buyerTokenName: offer.buyerToken.name ?? '',
    buyerTokenDecimals: offer.buyerToken.decimals?.toString() ?? '',
    buyerTokenType: offer.buyerToken.tokenType ?? 0,
    sellerAddress: (offer.seller.address as string)?.toLowerCase(),
    buyerAddress: (offer.buyer?.address as string)?.toLowerCase(),
    price: offer.price.price.toString(),
    amount:
      BigNumber.minimum(
        offer.availableAmount, //5.4
        balanceWallet, // 0
        allowance //0
      ).toString(10) ?? '0',
    availableAmount: offer.availableAmount.toString(),
    balanceWallet: balanceWallet ?? '0',
    allowanceToken: allowance ?? '0',
    hasPropertyToken: false,
    type: undefined,
    removed: false,
    createdAtTimestamp: offer.createdAtTimestamp,
    buyCurrency: "",
    officialPrice: undefined,
    offerPrice: undefined,
    priceDelta: undefined,
    officialYield: undefined,
    offerYield: undefined,
    yieldDelta: undefined,
    accountWhitelisted: false
  };

  o.type = getOfferType(o.offerTokenType,o.buyerTokenType);

  const propertyToken = getProperty(
    o.type == OFFER_TYPE.BUY ? o.buyerTokenAddress : o.offerTokenAddress,
    propertiesToken
  );

  //add price and yield infos
  o.buyCurrency = propertyToken?.currency ?? "";
  o.officialPrice = getOfficialPrice(propertyToken);
  o.offerPrice = getPriceInDollar(prices,o);
  o.officialYield = getOfficialYield(propertyToken);
  o.offerYield = getOfferYield(prices,o,propertyToken);
  o.yieldDelta = getYieldDelta(o);
  o.priceDelta = getPriceDelta(prices,o);
  o.accountWhitelisted = getNotWhitelistedTokens(wlPropertiesId, o, propertiesToken).length == 0;

  return o;
}

const getProperty = (
  propertyAddress: string,
  propertiesToken: PropertiesToken[]
) => {
  return propertiesToken.find(
    (propertyToken) =>
      propertyToken.contractAddress.toLowerCase() ==
      propertyAddress.toLowerCase()
  );
};

const getOfficialPrice = (
  propertyToken: PropertiesToken | undefined
): number | undefined => {
  if (propertyToken) {
    const buyPrice = propertyToken.officialPrice;
    return buyPrice;
  } else {
    return 0;
  }
};

const getOfficialYield = (
  propertyToken: PropertiesToken | undefined
): number | undefined => {
  // console.log("getOfficialYield: ", propertyToken)
  if (propertyToken) {
    const originalYield = propertyToken.annualYield
      ? propertyToken.annualYield * 100
      : 0;
    return originalYield;
  } else {
    return 0;
  }
};

const getOfferYield = (
  prices: Price,
  offer: Offer,
  propertyToken: PropertiesToken | undefined
): number | undefined => {
  const tokenPriceInDollar = getPriceInDollar(prices, offer);
  if (propertyToken && tokenPriceInDollar) {
    const offerAdjusted = new BigNumber(
      propertyToken.netRentYearPerToken
    ).dividedBy(tokenPriceInDollar);
    return parseFloat(offerAdjusted.multipliedBy(100).toString());
  } else {
    return 0;
  }
};

const getYieldDelta = (offer: Offer): number | undefined => {
  const offerYield = offer.offerYield;
  const officialYield = offer.officialYield;

  return offerYield && officialYield
    ? parseFloat(
        new BigNumber(offerYield)
          .multipliedBy(new BigNumber(1))
          .dividedBy(new BigNumber(officialYield))
          .minus(1)
          .toString()
      )
    : 0;
};

const getPriceDelta = (prices: Price, offer: Offer): number | undefined => {
  const tokenPriceInDollar = getPriceInDollar(prices, offer);
  const officialPrice = offer.officialPrice;

  if (offer.type == OFFER_TYPE.SELL) {
    return officialPrice && tokenPriceInDollar
      ? parseFloat(
          new BigNumber(tokenPriceInDollar)
            .dividedBy(new BigNumber(officialPrice))
            .minus(1)
            .toString()
        )
      : undefined;
  }
  if (offer.type == OFFER_TYPE.BUY && officialPrice) {
    const tokenInDollar = 1 / parseFloat(offer.price.toString());
    const ratio = officialPrice / tokenInDollar;

    // if(offer.offerId == "135"){
    //   console.log("offer price: ", offer.price.toString())
    //   console.log("officialPrice: ", officialPrice)
    //   console.log("tokenInDollar: ", tokenInDollar)
    //   console.log("ratio: ", ratio)
    // }

    return 1 - ratio;
  }
};
