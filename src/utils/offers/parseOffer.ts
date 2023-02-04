import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { oraclePriceFeedABI } from 'src/abis';
import { OraclePriceFeed } from 'src/abis/types/oraclePriceFeed';
import { PropertiesToken } from 'src/types';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { Offer } from 'src/types/offer/Offer';
import { OFFER_TYPE } from 'src/types/offer/OfferType';
import { Offer as OfferGraphQl } from '../../../.graphclient/index';
import { chainLink } from '../chainlink/chainlink';
import { getContract } from '../getContract';

// TOKEN TYPE
// 1 = RealToken
//2 = avec permit
//3 = sans permit
export const getOfferType = (offerTokenType: number, buyerTokenType: number): OFFER_TYPE => {

  if(offerTokenType == 1 && (buyerTokenType == 2 || buyerTokenType == 3)) return OFFER_TYPE.SELL
  if((offerTokenType == 2 || offerTokenType == 3) && buyerTokenType == 1) return OFFER_TYPE.BUY;

  return OFFER_TYPE.EXCHANGE;

}

export const parseOffer = (
    provider: Web3Provider,
    offer: OfferGraphQl,
    accountUserRealtoken: DataRealtokenType,
    propertiesToken: PropertiesToken[]
  ): Promise<Offer> => {
    return new Promise<Offer>(async (resolve, reject) => {
      try {
        // console.log(
        //   'DEBUG parseOffer accountUserRealtoken',
        //   accountUserRealtoken
        // );
  
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

            // console.log(
            //   "TESTTTTTTTT",
            //   balanceWallet,
            //   allowance
            // )
  
            //if (account.balance) balanceWallet = account.balance.toString();
            //if (account.allowance) allowance = account.allowance.toString();
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
              offer.availableAmount,
              balanceWallet,
              allowance
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
          offerPrice: "",
          officialYield: undefined,
          offerYield: undefined
        };

        o.type = getOfferType(o.offerTokenType,o.buyerTokenType);

        const propertyToken = getProperty(
          o.type == OFFER_TYPE.BUY ? o.buyerTokenAddress : o.offerTokenAddress,
          propertiesToken
        );

        //add price and yield infos
        o.buyCurrency = propertyToken?.currency ?? "";
        o.officialPrice = getOfficialPrice(propertyToken);
        o.officialYield = getOfficialYield(propertyToken);

        // const prices: { [address: string]: BigNumber} = {};
        // const price = await getPrice(prices,provider,o);
        // if(price){
        //  o.offerYield = getOfferYield(price,o,propertyToken);
        //}

        // console.log(offer.availableAmount, balanceWallet, allowance)
        resolve(o);
      } catch (err) {
        console.log('Error when fetching account from TheGraph', err);
        reject(err);
      }
    });
};

const getProperty = (propertyAddress: string, propertiesToken: PropertiesToken[]) => {
  return propertiesToken.find(propertyToken => propertyToken.contractAddress.toLowerCase() == propertyAddress.toLowerCase())
}

const getOfficialPrice = (propertyToken: PropertiesToken|undefined): number|undefined => {
  if(propertyToken){
    const buyPrice = propertyToken.officialPrice;
    return buyPrice;
  }else{
    return undefined;
  }
}

const getOfficialYield = (propertyToken: PropertiesToken|undefined): number|undefined => {
  if(propertyToken){
    const originalYield = propertyToken.annualYield ? propertyToken.annualYield*100 : 0;
    return originalYield;
  }else{
    return undefined;
  }
}

const getPrice = (prices: { [address: string]: BigNumber}, provider: Web3Provider, offer: Offer) => {
  return new Promise<BigNumber|undefined>(async (resolve) => {
    try{

      console.log(prices);

      const tokenAddress = offer.type == OFFER_TYPE.BUY ? offer.offerTokenAddress: offer.buyerTokenAddress;

      console.log("tokenAddress: ", tokenAddress)

      let tokenPrice = prices[tokenAddress];
      if(!tokenPrice){

        const oracleContractAddress: string|undefined = chainLink.get(tokenAddress);

        if(!oracleContractAddress) return undefined;

        const oracleContract = getContract<OraclePriceFeed>(
          oracleContractAddress,
          oraclePriceFeedABI,
          provider
        );

        if(!oracleContract) return undefined;

        const assetPrice = await oracleContract.latestAnswer();
        const assetDecimals = await oracleContract.decimals()
        tokenPrice = new BigNumber(assetPrice.toString()).shiftedBy(-assetDecimals);

        console.log("tokenPrice: ", tokenPrice.toString())

        prices[tokenAddress] = tokenPrice;

      }

      resolve(tokenPrice)

      }catch(err){
        console.log("Error while getting oracle price: ", err);
      }
  });
}

const getOfferYield = (tokenPrice: BigNumber, offer: Offer, propertyToken: PropertiesToken|undefined): number|undefined => {
  const tokenPriceInDollar = new BigNumber(offer.price).multipliedBy(tokenPrice);
  if(propertyToken){
    const offerAdjusted = new BigNumber(propertyToken.netRentYearPerToken).dividedBy(tokenPriceInDollar);
    return parseFloat(offerAdjusted.multipliedBy(100).toString());
  }else{
    return undefined;
  }
}