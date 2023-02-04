import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from '@apollo/client';
import BigNumber from 'bignumber.js';
import { CHAINS, ChainsID } from 'src/constants';
import { Offer } from 'src/types/offer/Offer';
import { Offer as OfferGraphQl } from '../../../.graphclient/index';
import { parseOffer } from './parseOffer';
import { getTheGraphUrlYAM, getTheGraphUrlRealtoken } from './getClientURL';
import { getOfferQuery } from './getOfferQuery';
import { DataRealtokenType } from 'src/types/offer/DataRealTokenType';
import { PropertiesToken } from 'src/types';
import { Web3Provider } from '@ethersproject/providers';

export const getBigDataGraphRealtoken = async (
  chainId: number,
  client: ApolloClient<NormalizedCacheObject>,
  realtokenAccount: string[]
) => {
  const { address: realTokenYamUpgradeable } =
    CHAINS[chainId as ChainsID].contracts.realTokenYamUpgradeable;

  console.log('getBigDataGraphRealtoken', realtokenAccount.length);

  const accountRealtoken: string =
    '"' + realtokenAccount.map((account: string) => account).join('","') + '"';
  //console.log('DEBUG accountRealtoken', accountRealtoken);

  const { data } = await client.query({
    query: gql`
      query getAccountsRealtoken {
        accountBalances(
          first: 1000 
          where: {amount_gt: "0",id_in: [${accountRealtoken}]}
        ) {
          id
          amount
          allowances(
            where: {spender: "${realTokenYamUpgradeable}"}
          ) {
            allowance
            id
          }
        }
      }
    `,
  });
  //console.log('DEBUG getBigDataGraphRealtoken data', data);

  return data.accountBalances.map((accountBalance: DataRealtokenType) => {
    const allowance: { id: string; allowance: string } | undefined =
      accountBalance.allowances?.find(
        (allowance: { id: string; allowance: string }) =>
          accountBalance.id + '-' + realTokenYamUpgradeable === allowance.id
      );
    /*  console.log(
      'DEBUG data.accountBalances.map allowance',
      allowance,
      data.allowances,
      accountBalance.id + '-' + realTokenYamUpgradeable
    ); */

    return {
      id: accountBalance.id,
      amount: accountBalance.amount,
      allowance: allowance?.allowance ?? '0',
    };
  });
};

export const fetchOfferTheGraph = (
  provider: Web3Provider,
  chainId: number,
  propertiesToken: PropertiesToken[]
): Promise<Offer[]> => {
  return new Promise<Offer[]>(async (resolve, reject) => {
    try {
      const offersData: Offer[] = [];
      // const { data } = await execute(getOffersDocument, {}, {
      //   source: source
      // });
      const clientYAM = new ApolloClient({
        uri: getTheGraphUrlYAM(chainId),
        cache: new InMemoryCache(),
      });

      const clientRealtoken = new ApolloClient({
        uri: getTheGraphUrlRealtoken(chainId),
        cache: new InMemoryCache(),
      });

      //Récupère la liste des users qui ont créer une offre et les token associer a ses offres
      const { data: usersDataYAM } = await clientYAM.query({
        query: gql`
          query getUersData {
            accounts(
              first: 1000
              where: { offers_: { removedAtBlock: null } }
            ) {
              address
              offers(first: 1000){
                id
                offerToken {
                  address
                }
              }
            }
          }
        `,
      });

      //console.log('Debug Query usersDataYAM', usersDataYAM);

      //TODO: tmp supprimer la partie false quant déploiement ok sur Eth et Gnosis, remettre en const a la place de let try = new graph, catch = old graph
      
      // Pagination
      const offers: OfferGraphQl[]  = [];
      let skip = 0;
      let stop = false;
      while(!stop){
        const { data } = await clientYAM.query({
          query: gql`
            query getOffers {
              offers(first: 1000, skip: ${skip}, where: { removedAtBlock: null }) {
                ${getOfferQuery()}
              }
            }
          `,
        });

        if(data.offers && data.offers.length > 0){
          skip+=1000;

          console.log(data.offers)

          offers.push(...data.offers);

          // Avoid one request more
          if(data.offers.length < 1000) stop = true;
        }else{
          stop = true;
        }
      }

      console.log('Query dataYAM', offers.length);

      const accountRealtoken: string[] = usersDataYAM.accounts.map((account: { address: string; offers: [] }) =>
          account.offers.map((offer: { id: string; offerToken: { address: string } }) =>
              account.address + '-' + offer.offerToken.address
          )
      );
      const accountBalanceId: string[] = accountRealtoken.flat();
      //console.log('Debug liste accountBalanceId', accountBalanceId);

      const batchSize = 1000;
      const dataRealtoken: [DataRealtokenType] = [
        {
          amount: '0',
          id: '0',
        },
      ];
      for (let i = 0; i < accountBalanceId.length; i += batchSize) {
        const batch: string[] = accountBalanceId.slice(i, i + batchSize);
        /* dataRealtoken.push(
          await getBigDataGraphRealtoken(chainId, clientRealtoken, batch)
        ); */
        if (batch.length <= 0) break;

        const realtokenData: [DataRealtokenType] = await getBigDataGraphRealtoken(chainId, clientRealtoken, batch);

        //console.log('DEBUG for realtokenData', i, batchSize, realtokenData);
        dataRealtoken.push(...realtokenData);
      }

      //console.log('Debug Query dataRealtoken', dataRealtoken);

      await Promise.all(
        offers.map(async (offer: OfferGraphQl) => {
          const accountUserRealtoken: DataRealtokenType = dataRealtoken.find(
            (accountBalance: DataRealtokenType): boolean =>
              accountBalance.id ===
              offer.seller.address + '-' + offer.offerToken.address
          )!;

          const offerData: Offer = await parseOffer(
            provider,
            offer,
            accountUserRealtoken,
            propertiesToken
          );

          /* const hasPropertyToken = propertiesToken.find(
            (propertyToken) =>
              propertyToken.contractAddress == offerData.buyerTokenAddress ||
              propertyToken.contractAddress == offerData.offerTokenAddress
          ); */
          //offerData.hasPropertyToken = hasPropertyToken ? true : false;

          offerData.hasPropertyToken =
            BigNumber(offerData.buyerTokenType).eq(1) ||
            BigNumber(offerData.offerTokenType).eq(1);

          offersData.push({ ...offerData });
        })
      );

      console.log('Offers formated', offersData.length);

      resolve(offersData);
    } catch (err) {
      console.log('Error while fetching offers from TheGraph', err);
      reject(err);
    }
  });
};