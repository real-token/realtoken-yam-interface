// @ts-nocheck

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { CHAINS, ChainsID } from 'src/constants';
import { Account } from 'src/types/Account';

import { Account as AccountGraphQL } from '../../../.graphclient/index';

const getTheGraphURL = (chainId: number): string => {
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

export const fetchWallet = (
  address: string,
  offerTokenAddress: string,
  chainId: number
) => {
  return new Promise<Account>(async (resolve, reject) => {
    try {
      const client = new ApolloClient({
        uri: getTheGraphURL(chainId),
        cache: new InMemoryCache(),
      });

      const { address: realTokenYamUpgradeable } =
        CHAINS[chainId as ChainsID].contracts.realTokenYamUpgradeable;

      const query = gql`
        query account(
          $address: String!
          $offerTokenAddress: String!
          $realTokenYamUpgradeable: String!
        ) {
          account(id: $address) {
            balances(where: { token_: { address: $offerTokenAddress } }) {
              amount
              allowances(
                where: { spender_: { address: $realTokenYamUpgradeable } }
              ) {
                allowance
                token {
                  fullName
                }
              }
            }
          }
        }
      `;

      const tmpQuery = gql`
        query account($address: String!, $offerTokenAddress: String!) {
          account(id: $address) {
            balances(where: { token_: { address: $offerTokenAddress } }) {
              amount
            }
          }
        }
      `;

      const { data } = await client.query({
        query: chainId === 5 ? query : tmpQuery,
        // eslint-disable-next-line object-shorthand
        variables: {
          address: address.toLowerCase(),
          offerTokenAddress: offerTokenAddress.toLowerCase(),
          realTokenYamUpgradeable: realTokenYamUpgradeable.toLowerCase(),
        },
      });
      const graphAccount: AccountGraphQL = data.account;

      const account: Account = {
        balance: 0,
        allowance: 0,
      };

      console.log('graphAccount', graphAccount);

      if (graphAccount) {
        if (graphAccount.balances[0]?.amount)
          account.balance = graphAccount.balances[0].amount;
        account.allowance = graphAccount.balances[0].allowances.length
          ? graphAccount.balances[0].allowances[0].allowance
          : account.balance.toString();

        // graphAccount.balances.forEach((balance) => {
        //   account.balances.push({
        //     amount: balance.amount,
        //   });
        // });

        // // TODO: wait for allowance to be available for gnosis and eth
        // if(graphAccount.allowances){
        //   graphAccount.allowances.forEach((allowance: any) => {
        //     account.allowances.push({
        //       allowance: allowance.allowances[0]?.allowance ?? account.balances[0].amount,
        //     });
        //   })
        // }
      }

      // console.log('account', account);

      resolve(account);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
