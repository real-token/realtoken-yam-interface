import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';

import BigNumber from 'bignumber.js';
import { Contract, ethers } from 'ethers';
import { off } from 'process';

import { Erc20, Erc20ABI } from 'src/abis';
import { PropertiesToken } from 'src/types';
import { Account } from 'src/types/Account';
import { Offer } from 'src/types/Offer';

import { Offer as OfferGraphQl } from '../../../.graphclient/index';
import { getContract } from '../getContract';
import { fetchWallet } from '../wallet/fetchWallet';

const getTheGraphURL = (chainId: number): string => {
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

export const fetchOfferTheGraph = (
  chainId: number,
  propertiesToken: PropertiesToken[]
): Promise<Offer[]> => {
  return new Promise<Offer[]>(async (resolve, reject) => {
    try {
      const offersData: Offer[] = [];
      // const { data } = await execute(getOffersDocument, {}, {
      //   source: source
      // });
      const client = new ApolloClient({
        uri: getTheGraphURL(chainId),
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
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
      });

      await Promise.all(
        data.offers.map(async (offer: OfferGraphQl) => {
          const offerData: Offer = await parseOffer(offer, chainId);

          const hasPropertyToken = propertiesToken.find(
            (propertyToken) =>
              propertyToken.contractAddress == offerData.buyerTokenAddress ||
              propertyToken.contractAddress == offerData.offerTokenAddress
          );
          offerData.hasPropertyToken = hasPropertyToken ? true : false;

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

const parseOffer = (offer: OfferGraphQl, chainId: number): Promise<Offer> => {
  return new Promise<Offer>(async (resolve, reject) => {
    try {
      let balanceWallet = '0';
      let allowance = '0';
      if (BigNumber(offer.availableAmount).gt(0)) {
        if (offer.offerToken.tokenType === 1) {
          const account: Account = await fetchWallet(
            (offer.seller.address as string)?.toLowerCase(),
            (offer.offerToken.address as string)?.toLowerCase(),
            chainId
          );
          console.log(
            'type 1 blance/allowance',
            offer.offerToken.name,
            account.balance,
            account.allowance
          );

          if (account.balance) balanceWallet = account.balance.toString();
          if (account.allowance) allowance = account.allowance.toString();
        } else if (
          offer.offerToken.tokenType === 2 ||
          offer.offerToken.tokenType === 3
        ) {
          balanceWallet = offer.balance?.amount ?? null;
          allowance = offer.allowance?.allowance ?? null;

          console.log(
            'type 2/3 blance/allowance',
            offer.offerToken.name,
            balanceWallet,
            allowance
          );
        }
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

export const fetchOffer = (
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
};

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
