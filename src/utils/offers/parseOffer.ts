import BigNumber from 'bignumber.js';
import { Offer, OFFER_TYPE } from 'src/types/Offer';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { Offer as OfferGraphQl } from '../../../.graphclient/index';

export const getOfferType = (offerTokenType: number, buyerTokenType: number): OFFER_TYPE => {

  if(offerTokenType == 1 && (buyerTokenType == 2 || buyerTokenType == 3)) return OFFER_TYPE.SELL
  if((offerTokenType == 2 || offerTokenType == 3) && buyerTokenType == 1) return OFFER_TYPE.BUY;

  return OFFER_TYPE.EXCHANGE;

}

export const parseOffer = (
    offer: OfferGraphQl,
    accountUserRealtoken: DataRealtokenType,
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
        };

        o.type = getOfferType(o.offerTokenType,o.buyerTokenType);
  
        // console.log(offer.availableAmount, balanceWallet, allowance)
        resolve(o);
      } catch (err) {
        console.log('Error when fetching account from TheGraph', err);
        reject(err);
      }
    });
};