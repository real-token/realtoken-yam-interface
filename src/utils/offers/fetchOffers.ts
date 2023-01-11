import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';

import { strict } from 'assert';
import BigNumber from 'bignumber.js';
import { Contract, ethers } from 'ethers';
import { id } from 'ethers/lib/utils';
import { off } from 'process';
import { stringify } from 'querystring';

import { Erc20, Erc20ABI } from 'src/abis';
import { CHAINS, ChainsID } from 'src/constants';
import { PropertiesToken } from 'src/types';
import { Account, AccountRealtoken } from 'src/types/Account';
import { Offer } from 'src/types/Offer';

import {
  AccountBalance,
  Offer as OfferGraphQl,
} from '../../../.graphclient/index';
import { getContract } from '../getContract';
import { fetchWallet } from '../wallet/fetchWallet';

type DataRealtokenType = { amount: string; id: string; allowance?: string };

const getTheGraphUrlYAM = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph';
    case 5:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-goerli';
    case 100:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-gnosis';
    default:
      return '';
  }
};

const getTheGraphUrlRealtoken = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-eth';
    case 5:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-goerli';
    case 100:
      return 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/realtoken-xdai';
    default:
      return '';
  }
};

const getBigDataGraphRealtoken = async (
  chainId: number,
  client: ApolloClient<NormalizedCacheObject>,
  realtokenAccount: string[]
) => {
  const { address: realTokenYamUpgradeable } =
    CHAINS[chainId as ChainsID].contracts.realTokenYamUpgradeable;

  const accountRealtoken: string =
    '"' + realtokenAccount.map((account: string) => account).join('","') + '"';
  /* console.log(
    'DEBUG getBigDataGraphRealtoken accountRealtoken',
    accountRealtoken
  ); */
  const { data } = await client.query({
    query: gql`
      query getAccountsRealtoken {
        accountBalances(
          first: 1000 
          where: {amount_gt: "0",id_in: [${accountRealtoken}]}
        ) {
          id
          amount
        }
        allowances(
          first: 1000
          where: {spender: "${realTokenYamUpgradeable}"}
        ) {
          allowance
          id
        }
      }
    `,
  });
  //console.log('DEBUG getBigDataGraphRealtoken data', data);

  return data.accountBalances.map((accountBalance: DataRealtokenType) => {
    const allowance: { id: string; allowance: string } = data.allowances.find(
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

const getBigDataGraphRealtokenTMP = async (
  chainId: number,
  client: ApolloClient<NormalizedCacheObject>,
  realtokenAccount: string[]
) => {
  const { address: realTokenYamUpgradeable } =
    CHAINS[chainId as ChainsID].contracts.realTokenYamUpgradeable;

  const accountRealtoken: string =
    '"' + realtokenAccount.map((account: string) => account).join('","') + '"';
  /* console.log(
    'DEBUG getBigDataGraphRealtokenTMP accountRealtoken',
    accountRealtoken
  ); */

  /* 
  //TODO: optimisation, filtrer les balance pour ne garder que celles des offres du seller a la place de toutes les récupérer
  const { data } = await client.query({
    query: gql`
          query getAccountsRealtoken {
            accounts(
              where: {
                address_in: [${accountRealtoken}]
              }
            ) {
              address
              balances (first:10) {
                amount
                token {
                  fullName
                  address
                }
              }
            }
          }
        `,
  }); */

  const { data } = await client.query({
    query: gql`
          query getAccountsRealtoken {
            accountBalances(
              first: 1000
              where: {id_in: [${accountRealtoken}], amount_gt: "0"}
            ) {
              id
              amount
            }
          }
        `,
  });

  /*{
  accountBalances(first: 1000, where: {amount_gt: "0"}) {
    id
    amount
  }
  allowances(
    first: 1000
    where: {spender: ${realTokenYamUpgradeable}}
  ) {
    allowance
    id
  }
} */
  //console.log('DEBUG getBigDataGraphRealtokenTMP data', data);

  return data.accountBalances;
};

export const fetchOfferTheGraph = (
  chainId: number
  //propertiesToken: PropertiesToken[]
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
              offers {
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

      let dataYAM; //TODO: tmp supprimer la partie false quant déploiement ok sur Eth et Gonosis, remettre en const a la place de let
      chainId === 5
        ? ({ data: dataYAM } = await clientYAM.query({
            query: gql`
              query getOffers {
                offers(first: 1000, where: { removedAtBlock: null }) {
                  id
                  seller {
                    id
                    address
                  }
                  removedAtBlock
                  availableAmount
                  allowance {
                    allowance
                  }
                  balance {
                    amount
                  }
                  offerToken {
                    address
                    name
                    decimals
                    symbol
                    tokenType
                  }
                  price {
                    price
                    amount
                  }
                  buyerToken {
                    name
                    symbol
                    address
                    decimals
                    tokenType
                  }
                  buyer {
                    address
                  }
                }
              }
            `,
          }))
        : ({ data: dataYAM } = await clientYAM.query({
            query: gql`
              query getOffers {
                offers(first: 1000, where: { removedAtBlock: null }) {
                  id
                  seller {
                    id
                    address
                  }
                  removedAtBlock
                  availableAmount
                  offerToken {
                    address
                    name
                    decimals
                    symbol
                    tokenType
                  }
                  price {
                    price
                    amount
                  }
                  buyerToken {
                    name
                    symbol
                    address
                    decimals
                    tokenType
                  }
                  buyer {
                    address
                  }
                }
              }
            `,
          }));

      //console.log('Debug Query dataYAM', dataYAM);

      /* const accountRealtoken: string =
        '"' +
        dataYAM.accounts
          .map((account: { address: string }) => account.address)
          .join('","') +
        '"'; */
      const accountRealtoken: string[] = usersDataYAM.accounts.map(
        (account: { address: string; offers: [] }) =>
          account.offers.map(
            (offer: { id: string; offerToken: { address: string } }) =>
              account.address + '-' + offer.offerToken.address
          )
      );
      const accountBalanceId: string[] = accountRealtoken.flat();
      //console.log('Debug liste accountBalanceId', accountBalanceId);

      const batchSize = 500;
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

        const realtokenData =
          chainId === 5
            ? await getBigDataGraphRealtoken(chainId, clientRealtoken, batch)
            : await getBigDataGraphRealtokenTMP(
                chainId,
                clientRealtoken,
                batch
              );

        //console.log('DEBUG for realtokenData', i, batchSize, realtokenData);
        dataRealtoken.push(...realtokenData);
      }
      //let dataRealtoken: { accounts: any[] }; //TODO: tmp supprimer la partie false quant déploiement ok sur Eth et Gonosis, remettre en const a la place de let
      /* chainId === 5
        ? ({ data: dataRealtoken } = await clientRealtoken.query({
            query: gql`
          query getAccountsRealtoken {
            accounts(
              where: {
                address_in: [${accountRealtoken}]
              }
            ) {
              address
              allowances(
                where: { spender: "${realTokenYamUpgradeable}" }
              ) {
                allowance
                token {
                  fullName
                  address
                }
                spender {
                  address
                }
              }
              balances {
                amount
                token {
                  fullName
                  address
                }
              }
            }
          }
        `,
          }))
        : ({ data: dataRealtoken } = await clientRealtoken.query({
            query: gql`
          query getAccountsRealtoken {
            accounts(
              where: {
                address_in: [${accountRealtoken}]
              }
            ) {
              address
              balances {
                amount
                token {
                  fullName
                  address
                }
              }
            }
          }
        `,
          }));*/

      //console.log('Debug Query dataRealtoken', dataRealtoken);

      await Promise.all(
        dataYAM.offers.map(async (offer: OfferGraphQl) => {
          const accountUserRealtoken: DataRealtokenType = dataRealtoken.find(
            (accountBalance: DataRealtokenType): boolean =>
              accountBalance.id ===
              offer.seller.address + '-' + offer.offerToken.address
          )!;

          const offerData: Offer = await parseOffer(
            offer,
            accountUserRealtoken,
            chainId
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

      resolve(offersData);
    } catch (err) {
      console.log('Error while fetching offers from TheGraph', err);
      reject(err);
    }
  });
};

const parseOffer = (
  offer: OfferGraphQl,
  accountUserRealtoken: DataRealtokenType,
  chainId: number
): Promise<Offer> => {
  return new Promise<Offer>(async (resolve, reject) => {
    try {
      /*       console.log(
        'DEBUG parseOffer accountUserRealtoken',
        accountUserRealtoken
      ); */

      let balanceWallet = '0';
      let allowance = '0';
      let logLabel =
        'Erreur Type token parseOffer or seller not data in graph realtoken';
      if (BigNumber(offer.availableAmount).gt(0)) {
        if (
          offer.offerToken.tokenType === 1 &&
          accountUserRealtoken != undefined
        ) {
          balanceWallet = accountUserRealtoken.amount ?? '0';

          allowance =
            chainId === 5 //TODO: chainId === 5, temporaire le temps que les graph soie mis a jours
              ? accountUserRealtoken.allowance ?? '0'
              : offer.availableAmount;

          logLabel = 'parseOffer type 1 blance/allowance';

          //if (account.balance) balanceWallet = account.balance.toString();
          //if (account.allowance) allowance = account.allowance.toString();
        } else if (
          offer.offerToken.tokenType === 2 ||
          offer.offerToken.tokenType === 3
        ) {
          balanceWallet = offer.balance?.amount ?? offer.availableAmount;
          allowance = offer.allowance?.allowance ?? offer.availableAmount;

          logLabel = 'parseOffer type 2/3 blance/allowance';
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
        removed: false,
      };

      // console.log(offer.availableAmount, balanceWallet, allowance)

      resolve(o);
    } catch (err) {
      console.log('Error when fetching account from TheGraph', err);
      reject(err);
    }
  });
};

/* export const fetchOffer = (
  chainId: number,
  offerId: number,
  propertiesToken: PropertiesToken[]
): Promise<Offer> => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new ApolloClient({
        uri:
          chainId == 100
            ? 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-gnosis'
            : 'https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph',
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: gql`
          query MyQuery($id: String!) {
            offer(id: $id) {
              id
              offerToken {
                address
                name
                decimals
                symbol
              }
              price {
                price
                amount
              }
              prices {
                amount
                price
              }
              seller {
                address
              }
              buyerToken {
                name
                symbol
                address
                decimals
              }
              removedAtBlock
              availableAmount
            }
          }
        `,
        variables: {
          id: `0x${offerId.toString(16)}`,
        },
      });

      const offer = await parseOffer(data.offer, chainId);

      const hasPropertyToken = propertiesToken.find(
        (propertyToken) =>
          propertyToken.contractAddress == offer.buyerTokenAddress ||
          propertyToken.contractAddress == offer.offerTokenAddress
      );
      offer.hasPropertyToken = hasPropertyToken ? true : false;

      resolve(offer);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}; */

// export const fetchOffers = (realTokenYamUpgradeable: Contract, provider: ethers.providers.BaseProvider, account: string, propertiesToken: PropertiesToken[]) : Promise<Offer[]> => {
//     return new Promise<Offer[]>(async (resolve, reject) => {
//         try{

//           const offersData: Offer[] = [];

//           const getEvents = () =>
//             realTokenYamUpgradeable.queryFilter(
//             realTokenYamUpgradeable.filters.OfferDeleted(),
//             realTokenYamUpgradeable.metadata.fromBlock
//           );

//           const events = await getEvents();
//           const offersDeleted = events.map(event => event.args?.offerId.toNumber());
//           const offerCount = realTokenYamUpgradeable.getOfferCount().toNumber();

//           const offerCountArray = Array.from(Array(offerCount).keys());
//           const offersToFetch = offerCountArray.filter(x => !offersDeleted.includes(x));

//           for (const i of offersToFetch) {
//             const getOffer = () => realTokenYamUpgradeable.showOffer(i);

//             const [
//               offerTokenAddress,
//               buyerTokenAddress,
//               sellerAddress,
//               buyerAddress,
//               price,
//               amount,
//             ] = await getOffer();

//             const offerToken = getContract<Erc20>(offerTokenAddress, Erc20ABI, <Web3Provider>provider, account);
//             const buyerToken = getContract<Erc20>(buyerTokenAddress, Erc20ABI, <Web3Provider>provider, account);
//             const offerTokenName = <string>(await offerToken?.name());
//             const buyerTokenName = <string>(await buyerToken?.name());
//             const offerTokenDecimals = <number>await offerToken?.decimals();
//             const buyerTokenDecimals = <number>await buyerToken?.decimals();

//             const hasPropertyToken = propertiesToken.find(propertyToken => (propertyToken.contractAddress == buyerTokenAddress || propertyToken.contractAddress == offerTokenAddress));

//             const bnAmount = new BigNumber(amount.toString());
//             const offerData: Offer = {
//               offerId: i.toString(),
//               offerTokenAddress: offerTokenAddress,
//               offerTokenName: <string>offerTokenName,
//               offerTokenDecimals: offerTokenDecimals.toString(),
//               buyerTokenAddress: buyerTokenAddress,
//               buyerTokenName: <string>buyerTokenName,
//               buyerTokenDecimals: buyerTokenDecimals.toString(),
//               sellerAddress: sellerAddress,
//               buyerAddress: buyerAddress,
//               price: (new BigNumber(price.toString())).shiftedBy(- buyerTokenDecimals).toFixed(10).toString(),
//               amount: (bnAmount.shiftedBy(- offerTokenDecimals)).toFixed(10).toString(),
//               hasPropertyToken: hasPropertyToken ? true : false,
//               removed: false,
//               availableAmount: ""
//             };

//             offersData.push(offerData);

//           }

//           resolve(offersData);

//         }catch(err){
//           console.log("Error getting when fetching offers: ", err);
//           reject(err);
//         }
//     })
// }
